"""
AI Conversation Service
Handles AI conversation logic, database integration, and specialized handlers
"""

from ..models import (
    Conversation, Message, UserIntent, Prescription,
    InsuranceVerification, Rating, AITrainingData
)
from flask import current_app
import json
import re


class AIConversationService:
    """Service for managing AI conversations with database persistence"""
    
    def __init__(self, conversation_id=None, patient_id=None, patient_name=None, language='en'):
        self.conversation_id = conversation_id
        self.patient_id = patient_id
        self.patient_name = patient_name or "User"
        self.language = language
        self.context = {}
        
        if conversation_id:
            self.conversation = Conversation.get_by_id(conversation_id)
        else:
            self.conversation = None
    
    def create_conversation(self):
        """Create new conversation in database"""
        self.conversation_id = Conversation.create(
            self.patient_id, self.patient_name, self.language
        )
        return self.conversation_id
    
    def process_message(self, user_message):
        """Process user message and generate response"""
        # Detect intent
        intent = self._detect_intent(user_message)
        
        # Extract entities
        entities = self._extract_entities(user_message)
        
        # Store user message
        Message.add_message(
            self.conversation_id, 'user', user_message, intent, entities
        )
        
        # Record user intent
        if self.patient_id:
            UserIntent.record_intent(self.patient_id, intent)
        
        # Generate response
        response = self._generate_response(user_message, intent, entities)
        
        # Store AI response
        Message.add_message(
            self.conversation_id, 'assistant', response, intent
        )
        
        # Record training data
        AITrainingData.record_interaction(
            user_message, response, intent, entities, language=self.language
        )
        
        return response, intent, entities
    
    def _detect_intent(self, user_message):
        """Detect intent from user message"""
        message_lower = user_message.lower()
        
        intent_patterns = {
            'greeting': [r'hello', r'hi\b', r'hey', r'greetings', r'namaste'],
            'appointment_booking': [r'book.*appointment', r'schedule', r'appointment', r'consultation'],
            'hospital_search': [r'find.*hospital', r'hospital', r'clinic', r'medical center', r'healthcare'],
            'doctor_search': [r'find.*doctor', r'specialist', r'doctor', r'physician'],
            'symptom_check': [r'symptom', r'pain', r'ache', r'fever', r'cough', r'feeling\b'],
            'prescription': [r'medicine', r'prescription', r'drug', r'tablet'],
            'insurance_query': [r'insurance', r'coverage', r'policy', r'claim'],
            'emergency': [r'emergency', r'urgent', r'critical', r'severe'],
            'rating_review': [r'rate', r'review', r'feedback'],
            'farewell': [r'goodbye', r'bye', r'thank you', r'thanks', r'farewell'],
        }
        
        for intent, patterns in intent_patterns.items():
            for pattern in patterns:
                if re.search(pattern, message_lower):
                    return intent
        
        return 'general_inquiry'
    
    def _extract_entities(self, user_message):
        """Extract entities from message"""
        entities = {
            'symptoms': [],
            'city': None,
            'specialty': None,
            'insurance': None
        }
        
        # Symptom extraction
        symptoms_list = ['fever', 'cough', 'headache', 'chest pain', 'back pain', 
                        'throat pain', 'fatigue', 'nausea', 'dizziness']
        message_lower = user_message.lower()
        for symptom in symptoms_list:
            if symptom in message_lower:
                entities['symptoms'].append(symptom)
        
        # City extraction
        cities = ['delhi', 'mumbai', 'bangalore', 'hyderabad', 'pune', 'patna', 'noida', 'kolkata', 'chennai']
        for city in cities:
            if city in message_lower:
                entities['city'] = city
                break
        
        # Specialty extraction
        specialties = ['cardiology', 'neurology', 'orthopedic', 'pediatrics', 
                      'gynecology', 'dermatology', 'urology']
        for specialty in specialties:
            if specialty in message_lower:
                entities['specialty'] = specialty
                break
        
        # Insurance extraction
        insurances = ['icici', 'hdfc', 'aetna', 'bajaj', 'aig']
        for insurance in insurances:
            if insurance in message_lower:
                entities['insurance'] = insurance
                break
        
        return entities
    
    def _generate_response(self, user_message, intent, entities):
        """Generate contextual response based on intent"""
        
        if intent == 'greeting':
            return f"Hello {self.patient_name}! 👋 How can I assist you with your healthcare needs today?"
        
        elif intent == 'appointment_booking':
            return self._handle_appointment_booking(entities)
        
        elif intent == 'hospital_search':
            return self._handle_hospital_search(entities)
        
        elif intent == 'doctor_search':
            return self._handle_doctor_search(entities)
        
        elif intent == 'symptom_check':
            return self._handle_symptom_check(entities)
        
        elif intent == 'prescription':
            return self._handle_prescription_request()
        
        elif intent == 'insurance_query':
            return self._handle_insurance_query(entities)
        
        elif intent == 'emergency':
            return self._handle_emergency()
        
        elif intent == 'rating_review':
            return "I'd love to hear your feedback! Please share your experience with the doctor or hospital."
        
        elif intent == 'farewell':
            return f"Thank you for using Sehat Setu! Take care and stay healthy! 💪"
        
        else:
            return "I'm here to help with appointments, hospital search, symptoms, and more. What would you like to know?"
    
    def _handle_appointment_booking(self, entities):
        """Handle appointment booking request"""
        response = "I can help you book an appointment! 📅\n\n"
        response += "Please provide:\n"
        response += "1. Doctor specialty or name\n"
        response += "2. Preferred date and time\n"
        response += "3. Hospital location (city)\n\n"
        response += "Would you like to proceed?"
        return response
    
    def _handle_hospital_search(self, entities):
        """Handle hospital search"""
        city = entities.get('city', 'your city')
        specialty = entities.get('specialty', 'general')
        
        response = f"🏥 Searching for hospitals in {city}...\n\n"
        
        if specialty != 'general':
            response += f"Specialties: {specialty.capitalize()}\n"
        
        response += "Here are the top-rated hospitals near you:\n"
        response += "1. Apollo Hospital - 4.5⭐\n"
        response += "2. Max Healthcare - 4.4⭐\n"
        response += "3. Fortis Hospital - 4.3⭐\n\n"
        response += "Would you like more details about any hospital?"
        
        return response
    
    def _handle_doctor_search(self, entities):
        """Handle doctor search"""
        specialty = entities.get('specialty', 'general practice')
        city = entities.get('city', 'your city')
        
        response = f"👨‍⚕️ Searching for {specialty} specialists in {city}...\n\n"
        response += "Top specialists:\n"
        response += "1. Dr. Rajesh Kumar (Cardiology) - 4.8⭐ - ₹500/consultation\n"
        response += "2. Dr. Priya Sharma (Cardiology) - 4.7⭐ - ₹600/consultation\n"
        response += "3. Dr. Amit Patel (Cardiology) - 4.6⭐ - ₹450/consultation\n\n"
        response += "Would you like to book an appointment with any doctor?"
        
        return response
    
    def _handle_symptom_check(self, entities):
        """Handle symptom checking"""
        symptoms = entities.get('symptoms', [])
        
        if not symptoms:
            return "Please describe your symptoms so I can help recommend appropriate medical specialists."
        
        response = f"Based on your symptoms ({', '.join(symptoms)}), I recommend:\n\n"
        
        # Simple symptom-to-specialty mapping
        symptom_specialist = {
            'chest pain': 'Cardiologist',
            'headache': 'Neurologist',
            'back pain': 'Orthopedic Specialist',
            'cough': 'Pulmonologist',
            'fever': 'General Practitioner',
        }
        
        specialists = set()
        for symptom in symptoms:
            if symptom in symptom_specialist:
                specialists.add(symptom_specialist[symptom])
        
        if specialists:
            for specialist in specialists:
                response += f"• {specialist}\n"
        else:
            response += "• General Practitioner (for initial consultation)\n"
        
        response += "\nWould you like me to find specialists near you?"
        return response
    
    def _handle_prescription_request(self):
        """Handle prescription request"""
        if not self.patient_id:
            return "Please log in to view your prescriptions."
        
        prescriptions = Prescription.get_patient_prescriptions(self.patient_id, active_only=True)
        
        if not prescriptions:
            return "You have no active prescriptions. Would you like to consult a doctor?"
        
        response = "📋 Your Active Prescriptions:\n\n"
        for i, rx in enumerate(prescriptions, 1):
            medicines = json.loads(rx['medicines_json']) if isinstance(rx['medicines_json'], str) else rx['medicines_json']
            response += f"{i}. Issued: {rx['date_issued']}\n"
            response += f"   Medicines: {len(medicines)} items\n"
        
        response += "\nWould you like details about any prescription?"
        return response
    
    def _handle_insurance_query(self, entities):
        """Handle insurance verification"""
        if not self.patient_id:
            return "Please log in to check your insurance coverage."
        
        insurance = InsuranceVerification.get_patient_insurance(self.patient_id)
        
        if not insurance:
            return "No insurance found in your profile. Would you like to add insurance details?"
        
        response = "✅ Your Active Insurance:\n\n"
        for ins in insurance:
            response += f"Provider: {ins['provider']}\n"
            response += f"Policy: {ins['policy_number']}\n"
            response += f"Coverage Limit: ₹{ins['coverage_limit']}\n\n"
        
        return response
    
    def _handle_emergency(self):
        """Handle emergency request"""
        return """🚨 EMERGENCY ALERT! 

If this is a life-threatening emergency, please:
1. Call 911 or your local emergency number immediately
2. Go to the nearest hospital

Emergency Hospitals near you:
• Apollo Emergency - +91-11-1234-5678
• Max Emergency Care - +91-11-9876-5432
• Fortis 24/7 - +91-11-5555-5555

Stay safe!"""
    
    def get_conversation_history(self, limit=10):
        """Get conversation history"""
        if not self.conversation_id:
            return []
        
        return Message.get_conversation_history(self.conversation_id, limit)
    
    def get_summary(self):
        """Get conversation summary"""
        if not self.conversation_id:
            return None
        
        history = self.get_conversation_history(limit=100)
        intents = list(set([msg[3] for msg in history if msg[3]]))
        
        summary = f"Conversation with {self.patient_name}. Topics discussed: {', '.join(intents)}"
        
        Conversation.update_summary(self.conversation_id, summary, intents)
        
        return summary
