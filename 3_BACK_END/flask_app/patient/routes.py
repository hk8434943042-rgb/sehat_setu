from flask import Blueprint, request, jsonify, abort
from ..db import get_db
from ..services.validators import is_valid_phone, is_valid_email
from datetime import datetime

patient_bp = Blueprint('patient', __name__, url_prefix='/api/patients')


@patient_bp.post('/')
def create_patient():
    """Register a new patient"""
    payload = request.get_json(force=True, silent=True) or {}
    
    # Required fields
    full_name = (payload.get('full_name') or '').strip()
    phone = (payload.get('phone') or '').strip()
    
    if not full_name:
        return jsonify({"error": "full_name is required"}), 400
    if not phone:
        return jsonify({"error": "phone is required"}), 400
    if not is_valid_phone(phone):
        return jsonify({"error": "invalid phone number"}), 400
    
    email = (payload.get('email') or '').strip()
    if email and not is_valid_email(email):
        return jsonify({"error": "invalid email"}), 400
    
    db = get_db()
    
    # Check if patient with same phone already exists
    existing = db.execute("SELECT id FROM patients WHERE phone = ?", (phone,)).fetchone()
    if existing:
        return jsonify({"error": "Patient with this phone number already exists", "patient_id": existing['id']}), 409
    
    cursor = db.execute(
        """
        INSERT INTO patients (
            full_name, date_of_birth, gender, blood_group, phone, email, 
            address, city, pincode, emergency_contact_name, emergency_contact_phone,
            medical_history, allergies, current_medications, insurance_provider, insurance_number
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            full_name,
            payload.get('date_of_birth'),
            payload.get('gender'),
            payload.get('blood_group'),
            phone,
            email or None,
            payload.get('address'),
            payload.get('city'),
            payload.get('pincode'),
            payload.get('emergency_contact_name'),
            payload.get('emergency_contact_phone'),
            payload.get('medical_history'),
            payload.get('allergies'),
            payload.get('current_medications'),
            payload.get('insurance_provider'),
            payload.get('insurance_number')
        )
    )
    db.commit()
    
    return jsonify({"status": "ok", "patient_id": cursor.lastrowid}), 201


@patient_bp.get('/<int:patient_id>')
def get_patient(patient_id):
    """Get patient details"""
    db = get_db()
    patient = db.execute("SELECT * FROM patients WHERE id = ?", (patient_id,)).fetchone()
    
    if not patient:
        abort(404, description='Patient not found')
    
    return jsonify(dict(patient))


@patient_bp.put('/<int:patient_id>')
@patient_bp.patch('/<int:patient_id>')
def update_patient(patient_id):
    """Update patient information"""
    payload = request.get_json(force=True, silent=True) or {}
    
    db = get_db()
    patient = db.execute("SELECT id FROM patients WHERE id = ?", (patient_id,)).fetchone()
    if not patient:
        abort(404, description='Patient not found')
    
    allowed = [
        'full_name', 'date_of_birth', 'gender', 'blood_group', 'phone', 'email',
        'address', 'city', 'pincode', 'emergency_contact_name', 'emergency_contact_phone',
        'medical_history', 'allergies', 'current_medications', 'insurance_provider', 'insurance_number'
    ]
    
    sets = []
    params = []
    
    for k in allowed:
        if k in payload:
            if k == 'phone' and payload[k] and not is_valid_phone(payload[k]):
                return jsonify({"error": "invalid phone number"}), 400
            if k == 'email' and payload[k] and not is_valid_email(payload[k]):
                return jsonify({"error": "invalid email"}), 400
            sets.append(f"{k} = ?")
            params.append(payload[k])
    
    if not sets:
        return jsonify({"error": "no updatable fields provided"}), 400
    
    params.append(patient_id)
    db.execute(f"UPDATE patients SET {', '.join(sets)} WHERE id = ?", params)
    db.commit()
    
    return jsonify({"status": "ok"})


@patient_bp.get('/<int:patient_id>/appointments')
def get_patient_appointments(patient_id):
    """Get all appointments for a patient"""
    db = get_db()
    
    appointments = db.execute(
        """
        SELECT a.*, h.name as hospital_name, d.name as doctor_name, d.specialization
        FROM appointments a
        LEFT JOIN hospitals h ON a.hospital_id = h.id
        LEFT JOIN doctors d ON a.doctor_id = d.id
        WHERE a.patient_id = ?
        ORDER BY a.appointment_date DESC, a.appointment_time DESC
        """,
        (patient_id,)
    ).fetchall()
    
    return jsonify([dict(a) for a in appointments])
