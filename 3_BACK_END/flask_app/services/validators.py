import re

def is_valid_phone(phone: str) -> bool:
    if phone is None:
        return False
    phone = str(phone).strip()
    return bool(re.fullmatch(r"[6-9]\d{9}", phone))


def is_valid_email(email: str) -> bool:
    if not email:
        return True  # optional field
    email = email.strip()
    return bool(re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email))


def validate_cost_range(cost_min, cost_max) -> bool:
    if cost_min is None or cost_max is None:
        return False
    try:
        return float(cost_min) <= float(cost_max)
    except Exception:
        return False
