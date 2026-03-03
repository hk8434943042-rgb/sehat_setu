from flask import Blueprint, request, jsonify, abort
from ..db import get_db
from datetime import datetime, timedelta

appointment_bp = Blueprint('appointment', __name__, url_prefix='/api/appointments')


@appointment_bp.post('/')
def create_appointment():
    """Create a new appointment"""
    payload = request.get_json(force=True, silent=True) or {}
    
    # Required fields
    hospital_id = payload.get('hospital_id')
    appointment_date = (payload.get('appointment_date') or '').strip()
    appointment_time = (payload.get('appointment_time') or '').strip()
    
    if not hospital_id:
        return jsonify({"error": "hospital_id is required"}), 400
    if not appointment_date:
        return jsonify({"error": "appointment_date is required"}), 400
    if not appointment_time:
        return jsonify({"error": "appointment_time is required"}), 400
    
    # Validate date format (YYYY-MM-DD)
    try:
        appt_date = datetime.strptime(appointment_date, '%Y-%m-%d').date()
        if appt_date < datetime.now().date():
            return jsonify({"error": "appointment_date cannot be in the past"}), 400
    except ValueError:
        return jsonify({"error": "invalid appointment_date format (use YYYY-MM-DD)"}), 400
    
    # Validate time format (HH:MM)
    try:
        datetime.strptime(appointment_time, '%H:%M')
    except ValueError:
        return jsonify({"error": "invalid appointment_time format (use HH:MM)"}), 400
    
    db = get_db()
    
    # Verify hospital exists
    hospital = db.execute("SELECT id FROM hospitals WHERE id = ?", (hospital_id,)).fetchone()
    if not hospital:
        return jsonify({"error": "hospital not found"}), 404
    
    # Verify doctor exists if provided
    doctor_id = payload.get('doctor_id')
    if doctor_id:
        doctor = db.execute("SELECT id FROM doctors WHERE id = ? AND hospital_id = ?", 
                          (doctor_id, hospital_id)).fetchone()
        if not doctor:
            return jsonify({"error": "doctor not found at this hospital"}), 404
    
    # Patient can be optional for now (walk-in appointments)
    patient_id = payload.get('patient_id')
    if patient_id:
        patient = db.execute("SELECT id FROM patients WHERE id = ?", (patient_id,)).fetchone()
        if not patient:
            return jsonify({"error": "patient not found"}), 404
    
    cursor = db.execute(
        """
        INSERT INTO appointments (
            patient_id, hospital_id, doctor_id, appointment_date, appointment_time,
            reason, status, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            patient_id,
            hospital_id,
            doctor_id,
            appointment_date,
            appointment_time,
            payload.get('reason'),
            payload.get('status', 'pending'),
            payload.get('notes')
        )
    )
    db.commit()
    
    return jsonify({"status": "ok", "appointment_id": cursor.lastrowid}), 201


@appointment_bp.get('/<int:appointment_id>')
def get_appointment(appointment_id):
    """Get appointment details"""
    db = get_db()
    
    appointment = db.execute(
        """
        SELECT a.*, 
               h.name as hospital_name, h.address as hospital_address, h.contact_phone as hospital_phone,
               d.name as doctor_name, d.specialization, d.op_timings,
               p.full_name as patient_name, p.phone as patient_phone
        FROM appointments a
        LEFT JOIN hospitals h ON a.hospital_id = h.id
        LEFT JOIN doctors d ON a.doctor_id = d.id
        LEFT JOIN patients p ON a.patient_id = p.id
        WHERE a.id = ?
        """,
        (appointment_id,)
    ).fetchone()
    
    if not appointment:
        abort(404, description='Appointment not found')
    
    return jsonify(dict(appointment))


@appointment_bp.put('/<int:appointment_id>')
@appointment_bp.patch('/<int:appointment_id>')
def update_appointment(appointment_id):
    """Update appointment"""
    payload = request.get_json(force=True, silent=True) or {}
    
    db = get_db()
    appointment = db.execute("SELECT id FROM appointments WHERE id = ?", (appointment_id,)).fetchone()
    if not appointment:
        abort(404, description='Appointment not found')
    
    allowed = ['appointment_date', 'appointment_time', 'doctor_id', 'reason', 'status', 'notes']
    sets = []
    params = []
    
    for k in allowed:
        if k in payload:
            sets.append(f"{k} = ?")
            params.append(payload[k])
    
    if not sets:
        return jsonify({"error": "no updatable fields provided"}), 400
    
    # Always update the updated_at timestamp
    sets.append("updated_at = datetime('now')")
    params.append(appointment_id)
    
    db.execute(f"UPDATE appointments SET {', '.join(sets)} WHERE id = ?", params)
    db.commit()
    
    return jsonify({"status": "ok"})


@appointment_bp.delete('/<int:appointment_id>')
def cancel_appointment(appointment_id):
    """Cancel/delete appointment"""
    db = get_db()
    
    appointment = db.execute("SELECT id FROM appointments WHERE id = ?", (appointment_id,)).fetchone()
    if not appointment:
        abort(404, description='Appointment not found')
    
    # Option 1: Soft delete (update status)
    db.execute("UPDATE appointments SET status = 'cancelled', updated_at = datetime('now') WHERE id = ?", 
               (appointment_id,))
    
    # Option 2: Hard delete (uncomment if preferred)
    # db.execute("DELETE FROM appointments WHERE id = ?", (appointment_id,))
    
    db.commit()
    return jsonify({"status": "ok", "message": "Appointment cancelled"})


@appointment_bp.get('/hospital/<int:hospital_id>')
def get_hospital_appointments(hospital_id):
    """Get all appointments for a hospital"""
    db = get_db()
    
    status_filter = request.args.get('status')
    date_filter = request.args.get('date')
    
    sql = """
        SELECT a.*, 
               d.name as doctor_name, d.specialization,
               p.full_name as patient_name, p.phone as patient_phone
        FROM appointments a
        LEFT JOIN doctors d ON a.doctor_id = d.id
        LEFT JOIN patients p ON a.patient_id = p.id
        WHERE a.hospital_id = ?
    """
    params = [hospital_id]
    
    if status_filter:
        sql += " AND a.status = ?"
        params.append(status_filter)
    
    if date_filter:
        sql += " AND a.appointment_date = ?"
        params.append(date_filter)
    
    sql += " ORDER BY a.appointment_date DESC, a.appointment_time DESC"
    
    appointments = db.execute(sql, params).fetchall()
    return jsonify([dict(a) for a in appointments])


@appointment_bp.get('/doctor/<int:doctor_id>')
def get_doctor_appointments(doctor_id):
    """Get all appointments for a doctor"""
    db = get_db()
    
    status_filter = request.args.get('status')
    date_filter = request.args.get('date')
    
    sql = """
        SELECT a.*, 
               h.name as hospital_name,
               p.full_name as patient_name, p.phone as patient_phone
        FROM appointments a
        LEFT JOIN hospitals h ON a.hospital_id = h.id
        LEFT JOIN patients p ON a.patient_id = p.id
        WHERE a.doctor_id = ?
    """
    params = [doctor_id]
    
    if status_filter:
        sql += " AND a.status = ?"
        params.append(status_filter)
    
    if date_filter:
        sql += " AND a.appointment_date = ?"
        params.append(date_filter)
    
    sql += " ORDER BY a.appointment_date DESC, a.appointment_time DESC"
    
    appointments = db.execute(sql, params).fetchall()
    return jsonify([dict(a) for a in appointments])
