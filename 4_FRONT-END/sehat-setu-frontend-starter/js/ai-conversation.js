/**
 * AI Conversation Engine for Sehat Setu Chatbot
 * Enables natural language understanding and conversational AI responses
 * Features: Intent detection, entity extraction, context awareness, memory
 */

class AIConversationEngine {
  constructor() {
    this.conversationHistory = [];
    this.userProfile = {};
    this.intents = this.defineIntents();
    this.entities = this.defineEntities();
    this.context = {};
  }

  // ==================== INTENT DEFINITIONS ====================
  defineIntents() {
    return {
      greeting: {
        patterns: ['hello', 'hi', 'hey', 'namaste', 'नमस्ते', 'हेलो', 'हाय'],
        responses: [
          'Hello! How can I help you with your healthcare today?',
          'Hi there! What brings you to Sehat Setu?',
          'Namaste! How can I assist you?'
        ]
      },
      farewell: {
        patterns: ['bye', 'goodbye', 'see you', 'take care', 'बाय', 'अलविदा'],
        responses: [
          'Goodbye! Take care of your health!',
          'See you soon! Stay healthy!',
          'Bye! Don\'t forget to take your medicines on time!'
        ]
      },
      appointment: {
        patterns: ['appointment', 'book', 'schedule', 'doctor', 'नियुक्ति', 'डॉक्टर', 'बुक'],
        responses: [
          'I can help you book an appointment. Which doctor or specialization are you looking for?',
          'Let\'s schedule your appointment. What time works best for you?',
          'मैं आपको नियुक्ति बुक करने में मदद कर सकता हूँ। कौन सा विशेषज्ञ चाहिए?'
        ]
      },
      hospital_search: {
        patterns: ['hospital', 'clinic', 'healthcare', 'medical', 'अस्पताल', 'क्लिनिक'],
        responses: [
          'Looking for a hospital? Tell me your city and preferred specialization.',
          'Which city are you in? I\'ll find the best hospitals for you.',
          'कौन से शहर में अस्पताल ढूंढना है? मैं आपके लिए खोजूंगा।'
        ]
      },
      symptom_check: {
        patterns: ['symptom', 'pain', 'sick', 'illness', 'fever', 'ache', 'लक्षण', 'दर्द', 'बीमार'],
        responses: [
          'I can help you find the right doctor. Can you describe your symptoms in detail?',
          'Tell me about your symptoms and I\'ll recommend specialists.',
          'आपके लक्षण क्या हैं? मैं सही डॉक्टर खोजने में मदद करूंगा।'
        ]
      },
      insurance: {
        patterns: ['insurance', 'policy', 'coverage', 'claim', 'बीमा', 'पॉलिसी'],
        responses: [
          'Which insurance provider do you have? I can check hospital coverage.',
          'Tell me your insurance provider and I\'ll verify coverage.',
          'आपका बीमा कौन सा है? मैं कवरेज चेक कर सकता हूँ।'
        ]
      },
      emergency: {
        patterns: ['emergency', 'urgent', 'critical', 'accident', 'आपातकालीन', 'तुरंत'],
        responses: [
          '🚨 Please call 108 or visit the nearest emergency hospital immediately!',
          'This requires immediate medical attention. Call 108 now!',
          'यह आपातकालीन स्थिति है। तुरंत 108 को कॉल करें!'
        ]
      },
      health_advice: {
        patterns: ['health', 'diet', 'exercise', 'wellness', 'fit', 'स्वास्थ्य', 'व्यायाम'],
        responses: [
          'Great! I\'d love to help with your health. What specific advice do you need?',
          'Health is important. Are you interested in fitness, diet, or general wellness?',
          'स्वास्थ्य के बारे में पूछें। व्यायाम, आहार, या सामान्य स्वास्थ्य?'
        ]
      },
      prescription: {
        patterns: ['prescription', 'medicine', 'drug', 'medication', 'नुस्खे', 'दवा', 'दवाइयाँ'],
        responses: [
          'I can help you with prescriptions. Do you want to view past prescriptions or refill medicines?',
          'Let me help with your medications. What do you need?',
          'मैं नुस्खे देख सकता हूँ। क्या आप पुरानी दवाएं देखना चाहते हैं?'
        ]
      },
      thanks: {
        patterns: ['thank', 'thanks', 'appreciate', 'grateful', 'धन्यवाद', 'शुक्रिया'],
        responses: [
          'You\'re welcome! Happy to help with your healthcare needs.',
          'My pleasure! Is there anything else I can help with?',
          'स्वागत है! क्या कोई और मदद चाहिए?'
        ]
      },
      how_are_you: {
        patterns: ['how are you', 'how\'s it going', 'हैलो कैसे हो'],
        responses: [
          'I\'m doing great! More importantly, how are you feeling today?',
          'I\'m here and ready to help! How can I assist you?',
          'मैं ठीक हूँ! आप कैसे हो?'
        ]
      }
    };
  }

  // ==================== ENTITY DEFINITIONS ====================
  defineEntities() {
    return {
      cities: ['delhi', 'mumbai', 'bangalore', 'hyderabad', 'pune', 'delhi', 'चेन्नई', 'कोलकाता'],
      specialties: ['cardiology', 'neurology', 'pediatrics', 'gynecology', 'orthopedic', 'surgery', 'कार्डियोलॉजी'],
      symptoms: ['fever', 'cough', 'pain', 'headache', 'fatigue', 'बुखार', 'खांसी', 'दर्द'],
      insurance_providers: ['icici', 'hdfc', 'aetna', 'bajaj', 'aig', 'government']
    };
  }

  // ==================== INTENT DETECTION ====================
  detectIntent(userMessage) {
    const message = userMessage.toLowerCase();
    
    for (const [intentName, intentData] of Object.entries(this.intents)) {
      for (const pattern of intentData.patterns) {
        if (message.includes(pattern.toLowerCase())) {
          return {
            intent: intentName,
            confidence: 0.9,
            data: intentData
          };
        }
      }
    }

    return {
      intent: 'general_conversation',
      confidence: 0.5,
      data: null
    };
  }

  // ==================== ENTITY EXTRACTION ====================
  extractEntities(userMessage) {
    const entities = {
      city: null,
      specialty: null,
      symptoms: [],
      insurance: null
    };

    const message = userMessage.toLowerCase();

    // Extract city
    for (const city of this.entities.cities) {
      if (message.includes(city)) {
        entities.city = city;
        break;
      }
    }

    // Extract specialty
    for (const specialty of this.entities.specialties) {
      if (message.includes(specialty)) {
        entities.specialty = specialty;
        break;
      }
    }

    // Extract symptoms
    for (const symptom of this.entities.symptoms) {
      if (message.includes(symptom)) {
        entities.symptoms.push(symptom);
      }
    }

    // Extract insurance
    for (const provider of this.entities.insurance_providers) {
      if (message.includes(provider)) {
        entities.insurance = provider;
        break;
      }
    }

    return entities;
  }

  // ==================== CONTEXT MANAGEMENT ====================
  updateContext(userMessage, intent, entities) {
    this.context = {
      lastMessage: userMessage,
      lastIntent: intent,
      lastEntities: entities,
      timestamp: new Date(),
      userCity: entities.city || this.context.userCity,
      userSpecialty: entities.specialty || this.context.userSpecialty,
      userSymptoms: entities.symptoms.length > 0 ? entities.symptoms : this.context.userSymptoms
    };
  }

  // ==================== RESPONSE GENERATION ====================
  generateResponse(userMessage) {
    // Detect intent
    const intentResult = this.detectIntent(userMessage);
    
    // Extract entities
    const entities = this.extractEntities(userMessage);
    
    // Update context
    this.updateContext(userMessage, intentResult.intent, entities);
    
    // Generate response based on intent
    let response = '';

    if (intentResult.intent === 'emergency') {
      response = intentResult.data.responses[0];
    } else if (intentResult.intent === 'greeting') {
      response = this.getRandomResponse(intentResult.data.responses);
    } else if (intentResult.intent === 'symptom_check') {
      response = this.handleSymptomCheck(userMessage, entities);
    } else if (intentResult.intent === 'appointment') {
      response = this.handleAppointmentRequest(entities);
    } else if (intentResult.intent === 'hospital_search') {
      response = this.handleHospitalSearch(entities);
    } else if (intentResult.intent === 'insurance') {
      response = this.handleInsuranceQuery(entities);
    } else {
      response = this.generateContextualResponse(userMessage, intentResult);
    }

    // Add to conversation history
    this.conversationHistory.push({
      user: userMessage,
      ai: response,
      timestamp: new Date(),
      intent: intentResult.intent
    });

    return response;
  }

  // ==================== SPECIALIZED HANDLERS ====================
  handleSymptomCheck(message, entities) {
    if (entities.symptoms.length > 0) {
      const symptomList = entities.symptoms.join(', ');
      return `Based on your symptoms (${symptomList}), I recommend consulting with a specialist. Would you like me to:\n1. Find a specialist for your condition\n2. Book an appointment\n3. Get more information about these symptoms`;
    }
    return 'Can you tell me more about your symptoms? For example: chest pain, headache, fever, etc.';
  }

  handleAppointmentRequest(entities) {
    let response = 'Great! Let me help you book an appointment.\n\n';
    
    if (entities.specialty) {
      response += `Looking for: ${entities.specialty}\n`;
    }
    
    response += 'Please tell me:\n1. Your preferred date\n2. Your preferred time\n3. City (if not ' + (entities.city || 'mentioned') + ')';
    
    return response;
  }

  handleHospitalSearch(entities) {
    const city = entities.city || 'your area';
    const specialty = entities.specialty ? ` for ${entities.specialty}` : '';
    
    return `Looking for hospitals in ${city}${specialty}. Here are top options:\n\n1. Apollo Hospital\n2. Max Healthcare\n3. Fortis Hospital\n\nWould you like more details or to check availability?`;
  }

  handleInsuranceQuery(entities) {
    let response = 'Insurance Verification:\n\n';
    
    if (entities.insurance) {
      response += `Your insurance: ${entities.insurance.toUpperCase()}\n\n`;
      response += 'Accepted at these hospitals:\n• Apollo Hospital\n• Max Healthcare\n• Lilavati Hospital\n\n';
      response += 'Would you like to book an appointment at any of these?';
    } else {
      response += 'Please tell me your insurance provider (ICICI, HDFC, Aetna, Bajaj, etc.)';
    }
    
    return response;
  }

  generateContextualResponse(userMessage, intentResult) {
    // If no specific intent matched, generate a conversational response
    const responses = {
      'general_conversation': [
        'That\'s interesting! Can you tell me more? Are you looking for medical assistance?',
        'I understand. How can I help with your healthcare today?',
        'Tell me more. Are you interested in: hospitals, doctors, appointments, or health advice?',
        'Got it! Would you like to find a doctor, book an appointment, or get health information?'
      ]
    };

    return this.getRandomResponse(responses['general_conversation']);
  }

  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ==================== CONVERSATION MEMORY ====================
  getConversationSummary() {
    const recentMessages = this.conversationHistory.slice(-5);
    return recentMessages.map(msg => `User: ${msg.user}\nAI: ${msg.ai}`).join('\n\n');
  }

  clearHistory() {
    this.conversationHistory = [];
    this.context = {};
  }
}

// Export for use in chatbot
if (typeof window !== 'undefined') {
  window.AIConversationEngine = AIConversationEngine;
}
