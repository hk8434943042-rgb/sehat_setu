import os
import sqlite3
from flask import g, current_app

from .config import DATABASE_PATH, DATABASE_DIR

SCHEMA_RELATIVE = os.path.join(os.path.dirname(__file__), '..', 'database', 'schema.sql')
SEEDS_RELATIVE = os.path.join(os.path.dirname(__file__), '..', 'database', 'seeds.sql')


def _resolve_db_path():
    # Prefer app-config override if present
    try:
        app_path = current_app.config.get('DATABASE_PATH')
        if app_path:
            return app_path
    except Exception:
        pass
    return DATABASE_PATH


def get_db():
    """Get a SQLite connection for the current request."""
    if 'db' not in g:
        path = _resolve_db_path()
        os.makedirs(os.path.dirname(path), exist_ok=True)
        conn = sqlite3.connect(path)
        conn.row_factory = sqlite3.Row
        conn.execute('PRAGMA foreign_keys = ON;')
        g.db = conn
    return g.db


def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_db(app=None):
    """Initialize DB and create tables from schema.sql."""
    # Ensure DB directory exists
    path = _resolve_db_path()
    os.makedirs(os.path.dirname(path), exist_ok=True)

    with (app or current_app).app_context():
        db = get_db()
        with open(os.path.abspath(SCHEMA_RELATIVE), 'r', encoding='utf-8') as f:
            db.executescript(f.read())
        db.commit()


def seed_db(app=None):
    """Load seed data if tables are empty."""
    with (app or current_app).app_context():
        db = get_db()
        cur = db.execute('SELECT COUNT(*) AS c FROM hospitals')
        if cur.fetchone()['c'] == 0:
            with open(os.path.abspath(SEEDS_RELATIVE), 'r', encoding='utf-8') as f:
                db.executescript(f.read())
            db.commit()
