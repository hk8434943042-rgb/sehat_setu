from flask import Blueprint, jsonify, request, abort
from ..db import get_db

public_bp = Blueprint('public', __name__)

@public_bp.get('/')
def home():
    return "Sehat Setu Backend Running Successfully!"


@public_bp.get('/hospitals')
def hospitals_list():
    db = get_db()
    q = request.args.get('q', '').strip()
    area = request.args.get('area', '').strip()

    sql = """
        SELECT id, name, type, address, area, city, pincode, contact_phone, website, last_verified_on
        FROM hospitals
        WHERE 1=1
    """
    params = []
    if q:
        sql += " AND (name LIKE ? OR area LIKE ?)"
        params += [f"%{q}%", f"%{q}%"]
    if area:
        sql += " AND area LIKE ?"
        params += [f"%{area}%"]

    sql += " ORDER BY id DESC LIMIT 100"

    rows = db.execute(sql, params).fetchall()
    data = [dict(r) for r in rows]
    return jsonify(data)


@public_bp.get('/hospital/<int:hospital_id>')
def hospital_detail(hospital_id: int):
    db = get_db()
    h = db.execute(
        "SELECT * FROM hospitals WHERE id = ?",
        (hospital_id,)
    ).fetchone()
    if not h:
        abort(404, description='Hospital not found')

    doctors = db.execute(
        "SELECT id, name, specialization, experience_years, op_timings, days_available FROM doctors WHERE hospital_id = ?",
        (hospital_id,)
    ).fetchall()

    treatments = db.execute(
        "SELECT id, treatment_name, cost_min, cost_max, notes FROM treatments WHERE hospital_id = ?",
        (hospital_id,)
    ).fetchall()

    ins = db.execute(
        "SELECT id, insurer_name, cashless_available, tpa_details FROM insurance WHERE hospital_id = ?",
        (hospital_id,)
    ).fetchall()

    resp = dict(h)
    resp['doctors'] = [dict(d) for d in doctors]
    resp['treatments'] = [dict(t) for t in treatments]
    resp['insurance'] = [dict(i) for i in ins]
    return jsonify(resp)


@public_bp.get('/search')
def search():
    db = get_db()
    q = (request.args.get('q') or '').strip()
    if not q:
        return jsonify({"error": "q is required"}), 400

    # Simple tokenized LIKE search across hospitals and treatments
    tokens = [t for t in q.split() if t]
    where = []
    params = []
    for tok in tokens:
        where.append("(h.name LIKE ? OR h.area LIKE ? OR t.treatment_name LIKE ?)")
        like = f"%{tok}%"
        params += [like, like, like]

    sql = f"""
        SELECT DISTINCT h.id, h.name, h.area, h.city, h.contact_phone
        FROM hospitals h
        LEFT JOIN treatments t ON t.hospital_id = h.id
        WHERE {' AND '.join(where)}
        ORDER BY h.name ASC
        LIMIT 100
    """
    rows = db.execute(sql, params).fetchall()
    return jsonify([dict(r) for r in rows])
