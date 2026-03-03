# Sehat Setu – Backend (Complete Starter)

A clean Flask + SQLite backend with app factory, blueprints, schema bootstrap, and sample endpoints.

## ✅ Folder layout
```
Backend/
  flask_app/
    app.py              # Entrypoint (module mode supported)
    __init__.py         # create_app()
    config.py           # DB path + secret key
    db.py               # get_db/close_db/init_db/seed_db
    public/
      routes.py         # GET /, /hospitals, /hospital/<id>, /search
    admin/
      routes.py         # POST/PUT/DELETE hospital
    services/
      validators.py     # phone/email/cost validation
    templates/          # (placeholder templates)
    static/
  database/
    schema.sql          # SQLite schema
    seeds.sql           # Seed data for dev
  tests/
    test_basic.py       # Pytest smoke tests
  scripts/
    reset_db.py         # Recreate DB from schema + seeds
  requirements.txt
  .env.example
  postman/SehatSetu.postman_collection.json
```

## 🚀 Quick start
### 1) Create & activate venv
**Windows PowerShell**
```
python -m venv .venv
.venv\Scripts\Activate.ps1
```
If PowerShell blocks activation, either set execution policy for CurrentUser or use:
```
.venv\Scripts\activate.bat
```

### 2) Install dependencies
```
pip install -r requirements.txt
```

### 3) Run the server (module mode)
Run from `Backend/` (one level above `flask_app`):
```
python -m flask_app.app
```
If you prefer, inside `flask_app` you can run:
```
python app.py
```

### 4) Test endpoints
- `GET http://127.0.0.1:5000/` → health
- `GET http://127.0.0.1:5000/hospitals` → list
- `GET http://127.0.0.1:5000/hospital/1` → detail
- `GET http://127.0.0.1:5000/search?q=care` → search
- `POST http://127.0.0.1:5000/admin/hospital` with JSON body (see Postman collection)

## 🧪 Tests
```
pip install -r requirements.txt
pytest -q
```

## 🔧 Scripts
Recreate DB from schema + seeds:
```
python scripts/reset_db.py
```

## ⚙️ Configuration
- `.env.example` shows environment variables you can set. By default DB is `database/sehat_setu.db`.
- To override DB path at runtime: set env `DATABASE_PATH` or in `app.config['DATABASE_PATH']` before create_app().

## 🛡️ Notes
- All SQL queries use parameters.
- Keep `requirements.txt` pinned for reproducibility in later phases.
