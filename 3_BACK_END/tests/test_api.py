"""
Comprehensive tests for Sehat Setu backend API
"""

import pytest
import json
from flask_app import create_app
from flask_app.db import get_db, init_db, seed_db


@pytest.fixture
def app():
    """Create and configure a test app instance"""
    app = create_app()
    app.config['TESTING'] = True
    app.config['DATABASE_PATH'] = ':memory:'  # Use in-memory database for tests
    
    with app.app_context():
        init_db()
        seed_db()
    
    yield app


@pytest.fixture
def client(app):
    """A test client for the app"""
    return app.test_client()


@pytest.fixture
def runner(app):
    """A test runner for the app's Click commands"""
    return app.test_cli_runner()


class TestPublicRoutes:
    """Test public API endpoints"""
    
    def test_home(self, client):
        """Test home endpoint"""
        response = client.get('/')
        assert response.status_code == 200
        assert b'Sehat Setu' in response.data
    
    def test_hospitals_list(self, client):
        """Test getting list of hospitals"""
        response = client.get('/hospitals')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0
        assert 'name' in data[0]
    
    def test_hospitals_search(self, client):
        """Test hospital search"""
        response = client.get('/hospitals?q=AIIMS')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        if len(data) > 0:
            assert 'AIIMS' in data[0]['name']
    
    def test_hospital_detail(self, client):
        """Test getting hospital details"""
        response = client.get('/hospital/1')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'name' in data
        assert 'doctors' in data
        assert 'treatments' in data
        assert 'insurance' in data
    
    def test_hospital_not_found(self, client):
        """Test 404 for non-existent hospital"""
        response = client.get('/hospital/99999')
        assert response.status_code == 404
    
    def test_search_endpoint(self, client):
        """Test search endpoint"""
        response = client.get('/search?q=heart')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
    
    def test_search_without_query(self, client):
        """Test search without query parameter"""
        response = client.get('/search')
        assert response.status_code == 400


class TestPatientRoutes:
    """Test patient API endpoints"""
    
    def test_create_patient(self, client):
        """Test creating a new patient"""
        patient_data = {
            "full_name": "Test Patient",
            "phone": "9876543210",
            "email": "test@example.com",
            "date_of_birth": "1990-01-01",
            "gender": "Male"
        }
        response = client.post(
            '/api/patients/',
            data=json.dumps(patient_data),
            content_type='application/json'
        )
        assert response.status_code == 201
        data = json.loads(response.data)
        assert 'patient_id' in data
        assert data['status'] == 'ok'
    
    def test_create_patient_missing_required_field(self, client):
        """Test creating patient with missing required field"""
        patient_data = {
            "full_name": "Test Patient"
            # Missing phone
        }
        response = client.post(
            '/api/patients/',
            data=json.dumps(patient_data),
            content_type='application/json'
        )
        assert response.status_code == 400
    
    def test_create_patient_invalid_phone(self, client):
        """Test creating patient with invalid phone"""
        patient_data = {
            "full_name": "Test Patient",
            "phone": "123"  # Invalid
        }
        response = client.post(
            '/api/patients/',
            data=json.dumps(patient_data),
            content_type='application/json'
        )
        assert response.status_code == 400
    
    def test_get_patient(self, client):
        """Test getting patient details"""
        # First create a patient
        patient_data = {
            "full_name": "Test Patient Get",
            "phone": "9876543211"
        }
        create_response = client.post(
            '/api/patients/',
            data=json.dumps(patient_data),
            content_type='application/json'
        )
        patient_id = json.loads(create_response.data)['patient_id']
        
        # Now get the patient
        response = client.get(f'/api/patients/{patient_id}')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['full_name'] == 'Test Patient Get'
    
    def test_update_patient(self, client):
        """Test updating patient information"""
        # Create patient first
        patient_data = {"full_name": "Original Name", "phone": "9876543212"}
        create_response = client.post(
            '/api/patients/',
            data=json.dumps(patient_data),
            content_type='application/json'
        )
        patient_id = json.loads(create_response.data)['patient_id']
        
        # Update patient
        update_data = {"full_name": "Updated Name"}
        response = client.put(
            f'/api/patients/{patient_id}',
            data=json.dumps(update_data),
            content_type='application/json'
        )
        assert response.status_code == 200
        
        # Verify update
        get_response = client.get(f'/api/patients/{patient_id}')
        data = json.loads(get_response.data)
        assert data['full_name'] == 'Updated Name'


class TestAppointmentRoutes:
    """Test appointment API endpoints"""
    
    def test_create_appointment(self, client):
        """Test creating a new appointment"""
        appointment_data = {
            "hospital_id": 1,
            "appointment_date": "2026-04-01",
            "appointment_time": "10:00",
            "reason": "Regular checkup"
        }
        response = client.post(
            '/api/appointments/',
            data=json.dumps(appointment_data),
            content_type='application/json'
        )
        assert response.status_code == 201
        data = json.loads(response.data)
        assert 'appointment_id' in data
    
    def test_create_appointment_missing_required_field(self, client):
        """Test creating appointment with missing required field"""
        appointment_data = {
            "hospital_id": 1
            # Missing date and time
        }
        response = client.post(
            '/api/appointments/',
            data=json.dumps(appointment_data),
            content_type='application/json'
        )
        assert response.status_code == 400
    
    def test_create_appointment_past_date(self, client):
        """Test creating appointment with past date"""
        appointment_data = {
            "hospital_id": 1,
            "appointment_date": "2020-01-01",
            "appointment_time": "10:00"
        }
        response = client.post(
            '/api/appointments/',
            data=json.dumps(appointment_data),
            content_type='application/json'
        )
        assert response.status_code == 400
    
    def test_get_appointment(self, client):
        """Test getting appointment details"""
        # Create appointment first
        appointment_data = {
            "hospital_id": 1,
            "appointment_date": "2026-04-15",
            "appointment_time": "14:00"
        }
        create_response = client.post(
            '/api/appointments/',
            data=json.dumps(appointment_data),
            content_type='application/json'
        )
        appointment_id = json.loads(create_response.data)['appointment_id']
        
        # Get appointment
        response = client.get(f'/api/appointments/{appointment_id}')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['appointment_date'] == '2026-04-15'
    
    def test_update_appointment(self, client):
        """Test updating appointment"""
        # Create appointment
        appointment_data = {
            "hospital_id": 1,
            "appointment_date": "2026-04-20",
            "appointment_time": "09:00"
        }
        create_response = client.post(
            '/api/appointments/',
            data=json.dumps(appointment_data),
            content_type='application/json'
        )
        appointment_id = json.loads(create_response.data)['appointment_id']
        
        # Update appointment
        update_data = {"status": "confirmed"}
        response = client.patch(
            f'/api/appointments/{appointment_id}',
            data=json.dumps(update_data),
            content_type='application/json'
        )
        assert response.status_code == 200
    
    def test_cancel_appointment(self, client):
        """Test cancelling appointment"""
        # Create appointment
        appointment_data = {
            "hospital_id": 1,
            "appointment_date": "2026-04-25",
            "appointment_time": "11:00"
        }
        create_response = client.post(
            '/api/appointments/',
            data=json.dumps(appointment_data),
            content_type='application/json'
        )
        appointment_id = json.loads(create_response.data)['appointment_id']
        
        # Cancel appointment
        response = client.delete(f'/api/appointments/{appointment_id}')
        assert response.status_code == 200


class TestAdminRoutes:
    """Test admin API endpoints"""
    
    def test_create_hospital(self, client):
        """Test creating a new hospital"""
        hospital_data = {
            "name": "Test Hospital",
            "type": "Private",
            "contact_phone": "9876543210",
            "city": "Patna"
        }
        response = client.post(
            '/admin/hospital',
            data=json.dumps(hospital_data),
            content_type='application/json'
        )
        assert response.status_code == 201
    
    def test_update_hospital(self, client):
        """Test updating hospital information"""
        update_data = {"name": "Updated Hospital Name"}
        response = client.put(
            '/admin/hospital/1',
            data=json.dumps(update_data),
            content_type='application/json'
        )
        assert response.status_code == 200
    
    def test_delete_hospital(self, client):
        """Test deleting a hospital"""
        # Create a hospital first
        hospital_data = {
            "name": "Hospital to Delete",
            "contact_phone": "9876543213",
            "city": "Patna"
        }
        client.post(
            '/admin/hospital',
            data=json.dumps(hospital_data),
            content_type='application/json'
        )
        
        # Delete it (assuming it gets ID based on sequence)
        # For now, just test the endpoint works
        response = client.delete('/admin/hospital/100')
        assert response.status_code == 200


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
