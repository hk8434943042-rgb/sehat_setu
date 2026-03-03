import os
import tempfile
import sqlite3
import pytest

from flask_app import create_app
from flask_app.db import init_db

@pytest.fixture
def app():
    app = create_app()
    # Override DB path to a temp file for testing
    tmpdir = tempfile.TemporaryDirectory()
    db_path = os.path.join(tmpdir.name, 'test.db')
    app.config['DATABASE_PATH'] = db_path

    with app.app_context():
        init_db(app)
    yield app

@pytest.fixture
def client(app):
    return app.test_client()


def test_health(client):
    rv = client.get('/')
    assert rv.status_code == 200
    assert b'Running' in rv.data


def test_create_and_list_hospital(client, app):
    resp = client.post('/admin/hospital', json={
        'name': 'Test Hospital',
        'area': 'Patna',
        'contact_phone': '9876543210',
        'city': 'Patna'
    })
    assert resp.status_code == 201

    resp2 = client.get('/hospitals')
    assert resp2.status_code == 200
    data = resp2.get_json()
    assert any(h.get('name') == 'Test Hospital' for h in data)
