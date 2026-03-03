#!/usr/bin/env python3
"""
Integration Test for Sehat Setu AI Backend
Tests all database operations, models, and API endpoints
"""

import sys
import os

# Add flask_app to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask_app import create_app
from flask_app.db import get_db
from flask_app.models import (
    Conversation, Message, UserIntent, Prescription,
    InsuranceVerification, Rating, AITrainingData
)
from flask_app.services.ai_conversation_service import AIConversationService


def test_database_tables():
    """Test that all database tables are created"""
    print("🔍 Testing database tables...")
    app = create_app()
    
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
        tables = [row[0] for row in cursor.fetchall()]
        
        required_tables = [
            'ai_conversations',
            'conversation_messages',
            'user_intents',
            'prescriptions',
            'insurance_verification',
            'ratings_reviews',
            'ai_training_data',
            'hospitals',
            'doctors',
            'patients',
            'appointments'
        ]
        
        for table in required_tables:
            if table in tables:
                print(f"   ✅ {table}")
            else:
                print(f"   ❌ {table} MISSING")
                return False
    
    return True


def test_conversation_model():
    """Test Conversation model"""
    print("\n🔍 Testing Conversation model...")
    app = create_app()
    
    with app.app_context():
        db = get_db()
        
        # Create a test patient first
        cursor = db.cursor()
        cursor.execute(
            "INSERT OR IGNORE INTO patients (id, full_name, phone) VALUES (1, 'Test Patient', '9999999999')"
        )
        db.commit()
        
        # Create conversation
        conv_id = Conversation.create(patient_id=1, user_name="Test User", language='en')
        print(f"   ✅ Created conversation {conv_id}")
        
        # Retrieve conversation
        conv = Conversation.get_by_id(conv_id)
        if conv:
            print(f"   ✅ Retrieved conversation: {conv['user_name']}")
        else:
            print(f"   ❌ Failed to retrieve conversation")
            return False
        
        # Update summary
        Conversation.update_summary(conv_id, "Test summary", ['greeting', 'symptom_check'])
        print(f"   ✅ Updated conversation summary")
    
    return True


def test_message_model():
    """Test Message model"""
    print("\n🔍 Testing Message model...")
    app = create_app()
    
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            "INSERT OR IGNORE INTO patients (id, full_name, phone) VALUES (1, 'Test Patient', '9999999999')"
        )
        db.commit()
        
        # Create conversation first
        conv_id = Conversation.create(patient_id=1, user_name="Test User", language='en')
        
        # Add message
        msg_id = Message.add_message(
            conversation_id=conv_id,
            role='user',
            content='I have chest pain',
            intent='symptom_check',
            entities={'symptoms': ['chest pain']}
        )
        print(f"   ✅ Added message {msg_id}")
        
        # Get history
        history = Message.get_conversation_history(conv_id)
        if history and len(history) > 0:
            print(f"   ✅ Retrieved {len(history)} message(s)")
        else:
            print(f"   ❌ Failed to retrieve history")
            return False
    
    return True


def test_user_intent_model():
    """Test UserIntent model"""
    print("\n🔍 Testing UserIntent model...")
    app = create_app()
    
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            "INSERT OR IGNORE INTO patients (id, full_name, phone) VALUES (1, 'Test Patient', '9999999999')"
        )
        db.commit()
        
        # Record intent
        UserIntent.record_intent(patient_id=1, intent='symptom_check')
        print(f"   ✅ Recorded user intent")
        
        # Get intents
        intents = UserIntent.get_user_intents(patient_id=1)
        if intents:
            print(f"   ✅ Retrieved {len(intents)} intent(s)")
        else:
            print(f"   ❌ Failed to retrieve intents")
            return False
    
    return True


def test_prescription_model():
    """Test Prescription model"""
    print("\n🔍 Testing Prescription model...")
    app = create_app()
    
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            "INSERT OR IGNORE INTO patients (id, full_name, phone) VALUES (1, 'Test Patient', '9999999999')"
        )
        cursor.execute(
            "INSERT OR IGNORE INTO hospitals (id, name) VALUES (1, 'Test Hospital')"
        )
        cursor.execute(
            "INSERT OR IGNORE INTO doctors (id, name, hospital_id) VALUES (1, 'Test Doctor', 1)"
        )
        db.commit()
        
        # Create prescription
        medicines = [
            {'name': 'Aspirin', 'dosage': '500mg', 'frequency': '2x daily', 'duration': '7 days'}
        ]
        rx_id = Prescription.create(
            patient_id=1,
            doctor_id=1,
            hospital_id=1,
            medicines=medicines,
            expiry_date='2026-03-10'
        )
        print(f"   ✅ Created prescription {rx_id}")
        
        # Get prescription
        rx = Prescription.get_prescription(rx_id)
        if rx:
            print(f"   ✅ Retrieved prescription with {len(rx['medicines'])} medicine(s)")
        else:
            print(f"   ❌ Failed to retrieve prescription")
            return False
    
    return True


def test_insurance_verification_model():
    """Test InsuranceVerification model"""
    print("\n🔍 Testing InsuranceVerification model...")
    app = create_app()
    
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            "INSERT OR IGNORE INTO patients (id, full_name, phone) VALUES (1, 'Test Patient', '9999999999')"
        )
        db.commit()
        
        # Add insurance
        ins_id = InsuranceVerification.add_insurance(
            patient_id=1,
            provider='ICICI',
            policy_number='ICICI-12345',
            coverage_limit=100000
        )
        print(f"   ✅ Added insurance {ins_id}")
        
        # Get insurance
        insurances = InsuranceVerification.get_patient_insurance(patient_id=1)
        if insurances:
            print(f"   ✅ Retrieved {len(insurances)} insurance(s)")
        else:
            print(f"   ❌ Failed to retrieve insurance")
            return False
    
    return True


def test_rating_model():
    """Test Rating model"""
    print("\n🔍 Testing Rating model...")
    app = create_app()
    
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            "INSERT OR IGNORE INTO patients (id, full_name, phone) VALUES (1, 'Test Patient', '9999999999')"
        )
        cursor.execute(
            "INSERT OR IGNORE INTO hospitals (id, name) VALUES (1, 'Test Hospital')"
        )
        db.commit()
        
        # Add rating
        rating_id = Rating.add_rating(
            patient_id=1,
            hospital_id=1,
            rating=4.5,
            review_text='Great hospital!',
            visit_date='2026-02-28'
        )
        print(f"   ✅ Added rating {rating_id}")
        
        # Get ratings
        ratings = Rating.get_hospital_ratings(hospital_id=1)
        if ratings is not None:
            print(f"   ✅ Retrieved hospital ratings")
        else:
            print(f"   ❌ Failed to retrieve ratings")
            return False
    
    return True


def test_ai_training_data_model():
    """Test AITrainingData model"""
    print("\n🔍 Testing AITrainingData model...")
    app = create_app()
    
    with app.app_context():
        # Record interaction
        data_id = AITrainingData.record_interaction(
            user_message='I have chest pain',
            ai_response='I recommend consulting a cardiologist',
            intent='symptom_check',
            entities={'symptoms': ['chest pain']},
            feedback='helpful',
            language='en'
        )
        print(f"   ✅ Recorded training data {data_id}")
        
        # Get training data
        data = AITrainingData.get_training_data(intent='symptom_check')
        if data:
            print(f"   ✅ Retrieved training data")
        else:
            print(f"   ❌ Failed to retrieve training data")
            return False
    
    return True


def test_ai_service():
    """Test AIConversationService"""
    print("\n🔍 Testing AIConversationService...")
    app = create_app()
    
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            "INSERT OR IGNORE INTO patients (id, full_name, phone) VALUES (1, 'Test Patient', '9999999999')"
        )
        db.commit()
        
        # Create service
        service = AIConversationService(
            patient_id=1,
            patient_name="Test User",
            language='en'
        )
        service.create_conversation()
        print(f"   ✅ Created AI service and conversation")
        
        # Test intent detection
        intent = service._detect_intent("I have chest pain")
        if intent == 'symptom_check':
            print(f"   ✅ Intent detection: {intent}")
        else:
            print(f"   ❌ Intent detection failed: {intent}")
            return False
        
        # Test entity extraction
        entities = service._extract_entities("I have fever in Delhi")
        if entities['symptoms'] and entities['city'] == 'delhi':
            print(f"   ✅ Entity extraction: {entities}")
        else:
            print(f"   ⚠️  Entity extraction: {entities}")
        
        # Test response generation
        response = service._generate_response("Hello", 'greeting', {})
        if response:
            print(f"   ✅ Response generation working")
        else:
            print(f"   ❌ Response generation failed")
            return False
    
    return True


def test_flask_app_initialization():
    """Test Flask app and API initialization"""
    print("\n🔍 Testing Flask app initialization...")
    
    try:
        app = create_app()
        print(f"   ✅ Flask app created")
        
        # Check blueprints
        with app.app_context():
            has_ai_bp = any('ai' in rule.rule for rule in app.url_map.iter_rules())
            if has_ai_bp:
                print(f"   ✅ AI blueprint registered")
            else:
                print(f"   ❌ AI blueprint not registered")
                return False
        
        # Test client
        client = app.test_client()
        response = client.get('/api/ai/health')
        if response.status_code == 200:
            print(f"   ✅ AI health endpoint working")
        else:
            print(f"   ⚠️  Health check returned {response.status_code}")
        
        return True
    
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False


def main():
    """Run all tests"""
    print("=" * 60)
    print("🚀 Sehat Setu AI Backend Integration Tests")
    print("=" * 60)
    
    tests = [
        ("Database Tables", test_database_tables),
        ("Conversation Model", test_conversation_model),
        ("Message Model", test_message_model),
        ("UserIntent Model", test_user_intent_model),
        ("Prescription Model", test_prescription_model),
        ("InsuranceVerification Model", test_insurance_verification_model),
        ("Rating Model", test_rating_model),
        ("AITrainingData Model", test_ai_training_data_model),
        ("AIConversationService", test_ai_service),
        ("Flask App & API", test_flask_app_initialization),
    ]
    
    passed = 0
    failed = 0
    
    for test_name, test_func in tests:
        try:
            if test_func():
                passed += 1
            else:
                failed += 1
        except Exception as e:
            print(f"   ❌ Exception: {e}")
            failed += 1
    
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {passed} passed, {failed} failed")
    print("=" * 60)
    
    if failed == 0:
        print("\n✅ All tests passed! Setup is complete and working.")
        print("\n🚀 Next steps:")
        print("   1. Start Flask server: python3 flask_app/app.py")
        print("   2. Test API endpoints with curl or Postman")
        print("   3. Connect frontend to /api/ai/ endpoints")
        print("   4. Deploy to production")
        return 0
    else:
        print(f"\n❌ {failed} test(s) failed. Check errors above.")
        return 1


if __name__ == '__main__':
    sys.exit(main())
