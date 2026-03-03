import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, '..'))
DATABASE_DIR = os.path.join(PROJECT_ROOT, 'database')
DEFAULT_DATABASE_PATH = os.path.join(DATABASE_DIR, 'sehat_setu.db')

# Flask config
SECRET_KEY = os.environ.get('SEHAT_SETU_SECRET', 'dev-secret-change-me')

# Allow overriding DB path via env or app.config
DATABASE_PATH = os.environ.get('DATABASE_PATH', DEFAULT_DATABASE_PATH)
