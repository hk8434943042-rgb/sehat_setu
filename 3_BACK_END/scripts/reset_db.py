import os
from flask_app import create_app
from flask_app.db import init_db, seed_db

app = create_app()

if __name__ == '__main__':
    print('Recreating database...')
    init_db(app)
    seed_db(app)
    print('Done. DB path:', app.config.get('DATABASE_PATH'))
