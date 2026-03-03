"""
AI Conversation Routes
Handles chatbot API endpoints
"""

from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from ..services.ai_conversation_service import AIConversationService
from ..models import Conversation, Message, Prescription, InsuranceVerification

ai_bp = Blueprint('ai', __name__, url_prefix='/api/ai')


@ai_bp.route('/health', methods=['GET'])
@cross_origin()
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'AI Conversation Engine'})


@ai_bp.route('/conversation/start', methods=['POST'])
@cross_origin()
def start_conversation():
    """Start a new conversation"""
    try:
        data = request.json
        patient_id = data.get('patient_id')
        patient_name = data.get('patient_name', 'User')
        language = data.get('language', 'en')
        
        service = AIConversationService(
            patient_id=patient_id,
            patient_name=patient_name,
            language=language
        )
        conversation_id = service.create_conversation()
        
        return jsonify({
            'success': True,
            'conversation_id': conversation_id,
            'patient_name': patient_name,
            'language': language
        }), 201
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400


@ai_bp.route('/conversation/<int:conversation_id>/message', methods=['POST'])
@cross_origin()
def send_message(conversation_id):
    """Send message and get AI response"""
    try:
        data = request.json
        user_message = data.get('message')
        
        if not user_message:
            return jsonify({'success': False, 'error': 'Message required'}), 400
        
        # Load conversation
        conversation = Conversation.get_by_id(conversation_id)
        if not conversation:
            return jsonify({'success': False, 'error': 'Conversation not found'}), 404
        
        # Create service instance
        service = AIConversationService(
            conversation_id=conversation_id,
            patient_id=conversation['patient_id'],
            patient_name=conversation['user_name'],
            language=conversation['language']
        )
        
        # Process message
        response, intent, entities = service.process_message(user_message)
        
        return jsonify({
            'success': True,
            'response': response,
            'intent': intent,
            'entities': entities,
            'timestamp': Message.get_conversation_history(conversation_id, 1)[0][5]
        }), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400


@ai_bp.route('/conversation/<int:conversation_id>/history', methods=['GET'])
@cross_origin()
def get_history(conversation_id):
    """Get conversation history"""
    try:
        limit = request.args.get('limit', 50, type=int)
        
        conversation = Conversation.get_by_id(conversation_id)
        if not conversation:
            return jsonify({'success': False, 'error': 'Conversation not found'}), 404
        
        messages = Message.get_conversation_history(conversation_id, limit)
        
        formatted_messages = []
        for msg in messages:
            formatted_messages.append({
                'id': msg[0],
                'role': msg[1],
                'content': msg[2],
                'intent': msg[3],
                'entities': msg[4],
                'timestamp': msg[5]
            })
        
        return jsonify({
            'success': True,
            'conversation_id': conversation_id,
            'messages': formatted_messages
        }), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400


@ai_bp.route('/conversation/<int:conversation_id>/summary', methods=['GET'])
@cross_origin()
def get_summary(conversation_id):
    """Get conversation summary"""
    try:
        conversation = Conversation.get_by_id(conversation_id)
        if not conversation:
            return jsonify({'success': False, 'error': 'Conversation not found'}), 404
        
        service = AIConversationService(conversation_id=conversation_id)
        summary = service.get_summary()
        
        return jsonify({
            'success': True,
            'summary': summary,
            'conversation_id': conversation_id
        }), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400


@ai_bp.route('/patient/<int:patient_id>/conversations', methods=['GET'])
@cross_origin()
def get_patient_conversations(patient_id):
    """Get all conversations for a patient"""
    try:
        limit = request.args.get('limit', 10, type=int)
        conversations = Conversation.get_patient_conversations(patient_id, limit)
        
        formatted = []
        for conv in conversations:
            formatted.append({
                'id': conv['id'],
                'summary': conv['conversation_summary'],
                'created_at': conv['created_at'],
                'updated_at': conv['updated_at']
            })
        
        return jsonify({
            'success': True,
            'patient_id': patient_id,
            'conversations': formatted
        }), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400


@ai_bp.route('/patient/<int:patient_id>/prescriptions', methods=['GET'])
@cross_origin()
def get_patient_prescriptions(patient_id):
    """Get patient's prescriptions"""
    try:
        active_only = request.args.get('active', True, type=bool)
        prescriptions = Prescription.get_patient_prescriptions(patient_id, active_only)
        
        formatted = []
        for rx in prescriptions:
            medicines = rx['medicines_json']
            if isinstance(medicines, str):
                import json
                medicines = json.loads(medicines)
            
            formatted.append({
                'id': rx['id'],
                'doctor_id': rx['doctor_id'],
                'hospital_id': rx['hospital_id'],
                'medicines': medicines,
                'date_issued': rx['date_issued'],
                'expiry_date': rx['expiry_date'],
                'notes': rx['notes']
            })
        
        return jsonify({
            'success': True,
            'prescriptions': formatted
        }), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400


@ai_bp.route('/patient/<int:patient_id>/insurance', methods=['GET'])
@cross_origin()
def get_patient_insurance(patient_id):
    """Get patient's insurance information"""
    try:
        active_only = request.args.get('active', True, type=bool)
        insurances = InsuranceVerification.get_patient_insurance(patient_id, active_only)
        
        formatted = []
        for ins in insurances:
            formatted.append({
                'id': ins['id'],
                'provider': ins['provider'],
                'policy_number': ins['policy_number'],
                'coverage_limit': ins['coverage_limit'],
                'active': ins['active'],
                'created_at': ins['created_at']
            })
        
        return jsonify({
            'success': True,
            'insurance': formatted
        }), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400


@ai_bp.route('/patient/<int:patient_id>/insurance/verify', methods=['POST'])
@cross_origin()
def verify_insurance(patient_id):
    """Verify if patient has coverage at hospital"""
    try:
        data = request.json
        hospital_id = data.get('hospital_id')
        
        if not hospital_id:
            return jsonify({'success': False, 'error': 'hospital_id required'}), 400
        
        has_coverage, providers = InsuranceVerification.verify_coverage(patient_id, hospital_id)
        
        return jsonify({
            'success': True,
            'has_coverage': has_coverage,
            'providers': providers
        }), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400


@ai_bp.route('/conversation/<int:conversation_id>/end', methods=['POST'])
@cross_origin()
def end_conversation(conversation_id):
    """End conversation and get summary"""
    try:
        conversation = Conversation.get_by_id(conversation_id)
        if not conversation:
            return jsonify({'success': False, 'error': 'Conversation not found'}), 404
        
        service = AIConversationService(conversation_id=conversation_id)
        summary = service.get_summary()
        
        return jsonify({
            'success': True,
            'conversation_id': conversation_id,
            'summary': summary
        }), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400
