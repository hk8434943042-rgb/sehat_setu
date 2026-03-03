"""
Database Models for Sehat Setu AI Healthcare Chatbot
Handles data access for conversations, prescriptions, insurance, and AI training
"""

from datetime import datetime
import json
from .db import get_db


class Conversation:
    """AI Conversation tracking"""
    
    @staticmethod
    def create(patient_id, user_name, language='en'):
        """Create a new conversation"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """INSERT INTO ai_conversations 
               (patient_id, user_name, language, created_at, updated_at)
               VALUES (?, ?, ?, datetime('now'), datetime('now'))""",
            (patient_id, user_name, language)
        )
        db.commit()
        return cursor.lastrowid
    
    @staticmethod
    def get_by_id(conversation_id):
        """Get conversation by ID"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            "SELECT * FROM ai_conversations WHERE id = ?",
            (conversation_id,)
        )
        return cursor.fetchone()
    
    @staticmethod
    def get_patient_conversations(patient_id, limit=10):
        """Get all conversations for a patient"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """SELECT * FROM ai_conversations 
               WHERE patient_id = ? 
               ORDER BY created_at DESC 
               LIMIT ?""",
            (patient_id, limit)
        )
        return cursor.fetchall()
    
    @staticmethod
    def update_summary(conversation_id, summary, intents):
        """Update conversation summary and intents"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """UPDATE ai_conversations 
               SET conversation_summary = ?, user_intent_sequence = ?, updated_at = datetime('now')
               WHERE id = ?""",
            (summary, json.dumps(intents), conversation_id)
        )
        db.commit()


class Message:
    """Conversation messages"""
    
    @staticmethod
    def add_message(conversation_id, role, content, intent=None, entities=None):
        """Add a message to conversation"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """INSERT INTO conversation_messages 
               (conversation_id, role, content, intent, entities_json, timestamp)
               VALUES (?, ?, ?, ?, ?, datetime('now'))""",
            (conversation_id, role, content, intent, 
             json.dumps(entities) if entities else None)
        )
        db.commit()
        return cursor.lastrowid
    
    @staticmethod
    def get_conversation_history(conversation_id, limit=50):
        """Get message history for a conversation"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """SELECT id, role, content, intent, entities_json, timestamp 
               FROM conversation_messages 
               WHERE conversation_id = ? 
               ORDER BY timestamp DESC 
               LIMIT ?""",
            (conversation_id, limit)
        )
        messages = cursor.fetchall()
        return list(reversed(messages))  # Return in chronological order
    
    @staticmethod
    def get_recent_messages(conversation_id, count=5):
        """Get last N messages"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """SELECT role, content, intent FROM conversation_messages 
               WHERE conversation_id = ? 
               ORDER BY timestamp DESC 
               LIMIT ?""",
            (conversation_id, count)
        )
        return list(reversed(cursor.fetchall()))


class UserIntent:
    """Track user intents for personalization"""
    
    @staticmethod
    def record_intent(patient_id, intent, preferred_times=None, preferred_doctors=None):
        """Record or update user intent"""
        db = get_db()
        cursor = db.cursor()
        
        # Check if intent exists
        cursor.execute(
            "SELECT id FROM user_intents WHERE patient_id = ? AND intent = ?",
            (patient_id, intent)
        )
        existing = cursor.fetchone()
        
        if existing:
            cursor.execute(
                """UPDATE user_intents 
                   SET frequency = frequency + 1, last_used = datetime('now')
                   WHERE patient_id = ? AND intent = ?""",
                (patient_id, intent)
            )
        else:
            cursor.execute(
                """INSERT INTO user_intents 
                   (patient_id, intent, frequency, last_used, preferred_times, preferred_doctors)
                   VALUES (?, ?, 1, datetime('now'), ?, ?)""",
                (patient_id, intent, 
                 json.dumps(preferred_times) if preferred_times else None,
                 json.dumps(preferred_doctors) if preferred_doctors else None)
            )
        db.commit()
    
    @staticmethod
    def get_user_intents(patient_id):
        """Get all intents for a user"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """SELECT intent, frequency, last_used, preferred_times, preferred_doctors 
               FROM user_intents 
               WHERE patient_id = ? 
               ORDER BY frequency DESC""",
            (patient_id,)
        )
        return cursor.fetchall()
    
    @staticmethod
    def get_top_intents(patient_id, limit=5):
        """Get top intents for a user"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """SELECT intent, frequency FROM user_intents 
               WHERE patient_id = ? 
               ORDER BY frequency DESC 
               LIMIT ?""",
            (patient_id, limit)
        )
        return cursor.fetchall()


class Prescription:
    """Prescription management"""
    
    @staticmethod
    def create(patient_id, doctor_id, hospital_id, medicines, expiry_date, notes=None):
        """Create a new prescription"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """INSERT INTO prescriptions 
               (patient_id, doctor_id, hospital_id, medicines_json, 
                date_issued, expiry_date, notes)
               VALUES (?, ?, ?, ?, datetime('now'), ?, ?)""",
            (patient_id, doctor_id, hospital_id, 
             json.dumps(medicines), expiry_date, notes)
        )
        db.commit()
        return cursor.lastrowid
    
    @staticmethod
    def get_patient_prescriptions(patient_id, active_only=True):
        """Get prescriptions for a patient"""
        db = get_db()
        cursor = db.cursor()
        
        if active_only:
            cursor.execute(
                """SELECT * FROM prescriptions 
                   WHERE patient_id = ? AND expiry_date >= date('now')
                   ORDER BY date_issued DESC""",
                (patient_id,)
            )
        else:
            cursor.execute(
                """SELECT * FROM prescriptions 
                   WHERE patient_id = ? 
                   ORDER BY date_issued DESC""",
                (patient_id,)
            )
        return cursor.fetchall()
    
    @staticmethod
    def get_prescription(prescription_id):
        """Get specific prescription"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            "SELECT * FROM prescriptions WHERE id = ?",
            (prescription_id,)
        )
        result = cursor.fetchone()
        if result:
            # Parse JSON medicines
            result_dict = dict(result)
            result_dict['medicines'] = json.loads(result['medicines_json'])
            return result_dict
        return None


class InsuranceVerification:
    """Insurance verification"""
    
    @staticmethod
    def add_insurance(patient_id, provider, policy_number, coverage_limit):
        """Add insurance for patient"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """INSERT INTO insurance_verification 
               (patient_id, provider, policy_number, coverage_limit, active)
               VALUES (?, ?, ?, ?, 1)""",
            (patient_id, provider, policy_number, coverage_limit)
        )
        db.commit()
        return cursor.lastrowid
    
    @staticmethod
    def get_patient_insurance(patient_id, active_only=True):
        """Get insurance details for patient"""
        db = get_db()
        cursor = db.cursor()
        
        if active_only:
            cursor.execute(
                "SELECT * FROM insurance_verification WHERE patient_id = ? AND active = 1",
                (patient_id,)
            )
        else:
            cursor.execute(
                "SELECT * FROM insurance_verification WHERE patient_id = ?",
                (patient_id,)
            )
        return cursor.fetchall()
    
    @staticmethod
    def verify_coverage(patient_id, hospital_id):
        """Check if patient has insurance covering hospital"""
        db = get_db()
        cursor = db.cursor()
        
        # Get patient's active insurance
        cursor.execute(
            """SELECT provider FROM insurance_verification 
               WHERE patient_id = ? AND active = 1""",
            (patient_id,)
        )
        insurances = cursor.fetchall()
        
        if not insurances:
            return None, []
        
        providers = [i[0] for i in insurances]
        
        # Check hospital's accepted insurance
        cursor.execute(
            "SELECT insurer_name FROM insurance WHERE hospital_id = ?",
            (hospital_id,)
        )
        accepted = cursor.fetchall()
        accepted_list = [a[0] for a in accepted]
        
        coverage = [p for p in providers if p in accepted_list]
        
        return bool(coverage), coverage


class Rating:
    """Ratings and reviews"""
    
    @staticmethod
    def add_rating(patient_id, rating, review_text=None, hospital_id=None, doctor_id=None, visit_date=None):
        """Add rating/review"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """INSERT INTO ratings_reviews 
               (patient_id, hospital_id, doctor_id, rating, review_text, visit_date)
               VALUES (?, ?, ?, ?, ?, ?)""",
            (patient_id, hospital_id, doctor_id, rating, review_text, visit_date)
        )
        db.commit()
        return cursor.lastrowid
    
    @staticmethod
    def get_hospital_ratings(hospital_id, limit=10):
        """Get all ratings for a hospital"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """SELECT * FROM ratings_reviews 
               WHERE hospital_id = ? AND rating IS NOT NULL
               ORDER BY created_at DESC 
               LIMIT ?""",
            (hospital_id, limit)
        )
        return cursor.fetchall()
    
    @staticmethod
    def get_doctor_ratings(doctor_id, limit=10):
        """Get all ratings for a doctor"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """SELECT * FROM ratings_reviews 
               WHERE doctor_id = ? AND rating IS NOT NULL
               ORDER BY created_at DESC 
               LIMIT ?""",
            (doctor_id, limit)
        )
        return cursor.fetchall()
    
    @staticmethod
    def get_average_rating(hospital_id=None, doctor_id=None):
        """Get average rating"""
        db = get_db()
        cursor = db.cursor()
        
        if hospital_id:
            cursor.execute(
                "SELECT AVG(rating) as avg FROM ratings_reviews WHERE hospital_id = ?",
                (hospital_id,)
            )
        elif doctor_id:
            cursor.execute(
                "SELECT AVG(rating) as avg FROM ratings_reviews WHERE doctor_id = ?",
                (doctor_id,)
            )
        
        result = cursor.fetchone()
        return result['avg'] if result and result['avg'] else 0.0


class AITrainingData:
    """AI model training data"""
    
    @staticmethod
    def record_interaction(user_message, ai_response, intent, entities, feedback=None, language='en'):
        """Record interaction for training"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """INSERT INTO ai_training_data 
               (user_message, ai_response, intent, entities_json, feedback, language)
               VALUES (?, ?, ?, ?, ?, ?)""",
            (user_message, ai_response, intent, 
             json.dumps(entities) if entities else None, 
             feedback, language)
        )
        db.commit()
        return cursor.lastrowid
    
    @staticmethod
    def get_training_data(intent=None, language='en', limit=1000):
        """Get training data for model"""
        db = get_db()
        cursor = db.cursor()
        
        if intent:
            cursor.execute(
                """SELECT user_message, ai_response, intent, entities_json 
                   FROM ai_training_data 
                   WHERE intent = ? AND language = ?
                   ORDER BY created_at DESC 
                   LIMIT ?""",
                (intent, language, limit)
            )
        else:
            cursor.execute(
                """SELECT user_message, ai_response, intent, entities_json 
                   FROM ai_training_data 
                   WHERE language = ?
                   ORDER BY created_at DESC 
                   LIMIT ?""",
                (language, limit)
            )
        
        return cursor.fetchall()
    
    @staticmethod
    def get_intent_examples(intent, count=10):
        """Get example messages for an intent"""
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """SELECT user_message, ai_response FROM ai_training_data 
               WHERE intent = ? 
               ORDER BY created_at DESC 
               LIMIT ?""",
            (intent, count)
        )
        return cursor.fetchall()
