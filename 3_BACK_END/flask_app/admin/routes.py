from flask import Blueprint, request, jsonify
from ..db import get_db
from ..services.validators import is_valid_phone, is_valid_email

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.post('/hospital')
def create_hospital():
    payload = request.get_json(force=True, silent=True) or {}

    name = (payload.get('name') or '').strip()
    if not name:
        return jsonify({"error": "name is required"}), 400

    phone = (payload.get('contact_phone') or '').strip()
    if phone and not is_valid_phone(phone):
        return jsonify({"error": "invalid contact_phone"}), 400

    email = (payload.get('contact_email') or '').strip()
    if email and not is_valid_email(email):
        return jsonify({"error": "invalid contact_email"}), 400

    db = get_db()
    db.execute(
        """
        INSERT INTO hospitals (name, type, address, area, city, pincode, contact_phone, contact_email, website, facilities_json, photo, last_verified_on)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date('now'))
        """,
        (
            name,
            payload.get('type'),
            payload.get('address'),
            payload.get('area'),
            payload.get('city') or 'Patna',
            payload.get('pincode'),
            phone or None,
            email or None,
            payload.get('website'),
            payload.get('facilities_json'),
            payload.get('photo'),
        )
    )
    db.commit()
    return jsonify({"status": "ok"}), 201


@admin_bp.put('/hospital/<int:hospital_id>')
@admin_bp.patch('/hospital/<int:hospital_id>')
def update_hospital(hospital_id: int):
    payload = request.get_json(force=True, silent=True) or {}
    allowed = ['name','type','address','area','city','pincode','contact_phone','contact_email','website','facilities_json','photo']
    sets = []
    params = []
    for k in allowed:
        if k in payload:
            if k == 'contact_phone' and payload[k] and not is_valid_phone(payload[k]):
                return jsonify({"error":"invalid contact_phone"}), 400
            if k == 'contact_email' and payload[k] and not is_valid_email(payload[k]):
                return jsonify({"error":"invalid contact_email"}), 400
            sets.append(f"{k} = ?")
            params.append(payload[k])
    if not sets:
        return jsonify({"error": "no updatable fields provided"}), 400
    params.append(hospital_id)

    db = get_db()
    db.execute(f"UPDATE hospitals SET {', '.join(sets)} WHERE id = ?", params)
    db.commit()
    return jsonify({"status":"ok"})


@admin_bp.delete('/hospital/<int:hospital_id>')
def delete_hospital(hospital_id: int):
    db = get_db()
    db.execute("DELETE FROM hospitals WHERE id = ?", (hospital_id,))
    db.commit()
    return jsonify({"status":"ok"})
