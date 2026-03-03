/**
 * AI Healthcare Chatbot - Enhanced Version
 * Comprehensive healthcare platform with 10+ integrated features
 * Features: Appointments, Hospital Search, Doctor Search, Symptom Checker,
 * User Profiles, FAQ, Insurance Verification, Emergency Locator, Reviews, Prescriptions
 */

class HealthcareChatbotEnhanced {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.currentLanguage = 'en';
    this.currentMode = 'chat';
    this.currentUser = this.loadUserProfile();
    this.userAppointments = this.loadAppointments();
    this.userPrescriptions = this.loadPrescriptions();
    this.aiEngine = new AIConversationEngine(); // Initialize AI engine
    this.initChatbot();
  }

  // ==================== USER PROFILE MANAGEMENT ====================
  loadUserProfile() {
    const saved = localStorage.getItem('sehat_user_profile');
    return saved ? JSON.parse(saved) : null;
  }

  saveUserProfile(profile) {
    this.currentUser = profile;
    localStorage.setItem('sehat_user_profile', JSON.stringify(profile));
  }

  loadAppointments() {
    const saved = localStorage.getItem('sehat_appointments');
    return saved ? JSON.parse(saved) : [];
  }

  saveAppointments() {
    localStorage.setItem('sehat_appointments', JSON.stringify(this.userAppointments));
  }

  loadPrescriptions() {
    const saved = localStorage.getItem('sehat_prescriptions');
    return saved ? JSON.parse(saved) : [];
  }

  savePrescriptions() {
    localStorage.setItem('sehat_prescriptions', JSON.stringify(this.userPrescriptions));
  }

  // ==================== DATA SOURCES ====================
  getHospitals() {
    return [
      { id: 1, name: 'Apollo Hospital', city: 'Delhi', area: 'Safdarjung', specialty: ['Cardiology', 'Surgery', 'Emergency'], rating: 4.8, phone: '+91-11-4141-1111', insurance: ['Aetna', 'ICICI', 'HDFC'], reviews: 2450 },
      { id: 2, name: 'Max Healthcare', city: 'Mumbai', area: 'Bandra', specialty: ['Neurology', 'Oncology', 'Orthopedic'], rating: 4.7, phone: '+91-22-6686-6686', insurance: ['ICICI', 'Bajaj'] , reviews: 1890 },
      { id: 3, name: 'Fortis Hospital', city: 'Bangalore', area: 'Whitefield', specialty: ['Pediatrics', 'Gynecology', 'ENT'], rating: 4.6, phone: '+91-80-4166-6666', insurance: ['Aetna', 'AIG'], reviews: 1650 },
      { id: 4, name: 'AIIMS Delhi', city: 'Delhi', area: 'Central Delhi', specialty: ['All Specialties'], rating: 4.9, phone: '+91-11-2658-8500', insurance: ['Government'], reviews: 3200 },
      { id: 5, name: 'Lilavati Hospital', city: 'Mumbai', area: 'Bandra', specialty: ['Cardiology', 'Gastroenterology'], rating: 4.8, phone: '+91-22-2430-8050', insurance: ['ICICI', 'HDFC', 'Aetna'], reviews: 2100 }
    ];
  }

  getDoctors() {
    return [
      { id: 1, name: 'Dr. Rajesh Kumar', specialty: 'Cardiology', hospital: 'Apollo Hospital', rating: 4.9, experience: 15, fees: '₹500-800', reviews: 890 },
      { id: 2, name: 'Dr. Priya Singh', specialty: 'Neurology', hospital: 'Max Healthcare', rating: 4.8, experience: 12, fees: '₹400-600', reviews: 650 },
      { id: 3, name: 'Dr. Amit Patel', specialty: 'Orthopedic', hospital: 'Fortis Hospital', rating: 4.7, experience: 10, fees: '₹450-700', reviews: 720 },
      { id: 4, name: 'Dr. Neha Sharma', specialty: 'Pediatrics', hospital: 'Lilavati Hospital', rating: 4.9, experience: 8, fees: '₹300-500', reviews: 560 },
      { id: 5, name: 'Dr. Vikram Gupta', specialty: 'Surgery', hospital: 'AIIMS Delhi', rating: 4.8, experience: 20, fees: '₹600-900', reviews: 1200 }
    ];
  }

  getFAQs() {
    const lang = this.currentLanguage;
    if (lang === 'hi') {
      return [
        { q: 'मैं नियुक्ति कैसे बुक कर सकता हूँ?', a: 'आप "नियुक्ति बुक करें" विकल्प का उपयोग करके चैट में नियुक्ति बुक कर सकते हैं। डॉक्टर और समय चुनें।' },
        { q: 'कौन से बीमा स्वीकार किए जाते हैं?', a: 'हम ICICI, HDFC, Aetna, Bajaj, AIG और सरकारी बीमा स्वीकार करते हैं।' },
        { q: 'आपातकालीन सेवा क्या है?', a: 'हमारे पास 24/7 आपातकालीन सेवा उपलब्ध है। सीधे 108 या अस्पताल को कॉल करें।' },
        { q: 'क्या मैं अपनी नुस्खे देख सकता हूँ?', a: 'हाँ, "मेरी नुस्खे" विकल्प से आप सभी नुस्खे और दवाएं देख सकते हैं।' },
        { q: 'नियुक्ति को रद्द कैसे करें?', a: 'अपने अपॉइंटमेंट देखें और रद्द करने विकल्प पर क्लिक करें। 24 घंटे पहले रद्द करें।' }
      ];
    }
    return [
      { q: 'How do I book an appointment?', a: 'Use "Book Appointment" option in chat. Select doctor and preferred time slot.' },
      { q: 'What insurance is accepted?', a: 'We accept ICICI, HDFC, Aetna, Bajaj, AIG, and government insurance plans.' },
      { q: 'What is emergency service?', a: 'We provide 24/7 emergency service. Call 108 or hospital directly for urgent help.' },
      { q: 'Can I view my prescriptions?', a: 'Yes, use "My Prescriptions" to view all past prescriptions and medicines.' },
      { q: 'How to cancel appointment?', a: 'View your appointments and click cancel. Please cancel 24 hours before.' }
    ];
  }

  // ==================== SYMPTOM CHECKER ====================
  getRecommendedDoctors(symptoms) {
    const symptomMap = {
      'chest pain': 'Cardiology', 'heart': 'Cardiology', 'bp': 'Cardiology',
      'headache': 'Neurology', 'migraine': 'Neurology', 'brain': 'Neurology',
      'bone pain': 'Orthopedic', 'fracture': 'Orthopedic', 'joint': 'Orthopedic',
      'child': 'Pediatrics', 'baby': 'Pediatrics', 'infant': 'Pediatrics',
      'pregnancy': 'Gynecology', 'women': 'Gynecology', 'pregnancy': 'Gynecology',
      'stomach': 'Gastroenterology', 'digestion': 'Gastroenterology',
      'throat': 'ENT', 'ear': 'ENT', 'nose': 'ENT',
      'skin': 'Dermatology', 'rash': 'Dermatology', 'allergy': 'Dermatology',
      'sugar': 'Endocrinology', 'diabetes': 'Endocrinology',
      'cancer': 'Oncology', 'tumor': 'Oncology',
      छाती: 'Cardiology', 'दिल': 'Cardiology',
      सिरदर्द: 'Neurology', 'सिर': 'Neurology',
      हड्डी: 'Orthopedic', 'दर्द': 'Orthopedic',
      बच्चा: 'Pediatrics', 'शिशु': 'Pediatrics',
      गर्भावस्था: 'Gynecology', 'महिला': 'Gynecology',
      पेट: 'Gastroenterology', 'पाचन': 'Gastroenterology',
      गला: 'ENT', 'कान': 'ENT'
    };

    let matchedSpecialty = null;
    const lowerSymptoms = symptoms.toLowerCase();
    
    for (const [symptom, specialty] of Object.entries(symptomMap)) {
      if (lowerSymptoms.includes(symptom.toLowerCase())) {
        matchedSpecialty = specialty;
        break;
      }
    }

    if (matchedSpecialty) {
      return this.getDoctors().filter(d => d.specialty === matchedSpecialty);
    }
    return [];
  }

  // ==================== APPOINTMENT BOOKING ====================
  bookAppointment(doctorId, date, time) {
    const doctor = this.getDoctors().find(d => d.id === doctorId);
    if (!doctor) return false;

    const appointment = {
      id: Date.now(),
      doctorId,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      hospital: doctor.hospital,
      date,
      time,
      status: 'confirmed',
      bookedAt: new Date()
    };

    this.userAppointments.push(appointment);
    this.saveAppointments();
    return appointment;
  }

  getUpcomingAppointments() {
    return this.userAppointments.filter(a => a.status === 'confirmed').slice(-5);
  }

  cancelAppointment(appointmentId) {
    const index = this.userAppointments.findIndex(a => a.id === appointmentId);
    if (index !== -1) {
      this.userAppointments[index].status = 'cancelled';
      this.saveAppointments();
      return true;
    }
    return false;
  }

  // ==================== HOSPITAL SEARCH ====================
  searchHospitals(query) {
    const hospitals = this.getHospitals();
    const lowerQuery = query.toLowerCase();
    
    return hospitals.filter(h => 
      h.name.toLowerCase().includes(lowerQuery) ||
      h.city.toLowerCase().includes(lowerQuery) ||
      h.area.toLowerCase().includes(lowerQuery) ||
      h.specialty.some(s => s.toLowerCase().includes(lowerQuery))
    );
  }

  // ==================== DOCTOR SEARCH ====================
  searchDoctors(specialty) {
    return this.getDoctors().filter(d => 
      d.specialty.toLowerCase().includes(specialty.toLowerCase())
    );
  }

  // ==================== INSURANCE VERIFICATION ====================
  verifyInsurance(insuranceProvider) {
    const hospitals = this.getHospitals();
    const matchingHospitals = hospitals.filter(h => 
      h.insurance.includes(insuranceProvider)
    );
    return { accepted: matchingHospitals.length > 0, hospitals: matchingHospitals };
  }

  // ==================== EMERGENCY LOCATOR ====================
  findNearestEmergency() {
    const hospitals = this.getHospitals().filter(h => h.specialty.includes('Emergency'));
    return hospitals.sort((a, b) => b.rating - a.rating);
  }

  // ==================== RATINGS & REVIEWS ====================
  getHospitalReviews(hospitalId) {
    const hospital = this.getHospitals().find(h => h.id === hospitalId);
    if (!hospital) return [];
    return {
      name: hospital.name,
      rating: hospital.rating,
      reviewCount: hospital.reviews,
      topReviews: [
        { user: 'Patient A', rating: 5, comment: 'Excellent service and friendly staff' },
        { user: 'Patient B', rating: 4, comment: 'Good doctors but long waiting time' },
        { user: 'Patient C', rating: 5, comment: 'Very professional and clean facilities' }
      ]
    };
  }

  // ==================== PRESCRIPTION MANAGEMENT ====================
  addPrescription(doctorName, medicines, date) {
    const prescription = {
      id: Date.now(),
      doctorName,
      medicines,
      date,
      createdAt: new Date()
    };
    this.userPrescriptions.push(prescription);
    this.savePrescriptions();
    return prescription;
  }

  getPrescriptions() {
    return this.userPrescriptions.slice(-10);
  }

  // ==================== CHATBOT UI ====================
  initChatbot() {
    // Don't wait for LanguageManager - just create the UI
    this.createChatbotUI();
    this.setupEventListeners();
    this.addInitialGreeting();
  }

  createChatbotUI() {
    const chatbotHTML = `
      <div class="chatbot-widget">
        <button class="chatbot-toggle" id="chatbot-toggle">
          <span class="chatbot-icon">💬</span>
          <span class="chatbot-label">Health Assistant</span>
        </button>
        
        <div class="chatbot-window" id="chatbot-window" style="display: none;">
          <div class="chatbot-header">
            <div>
              <h3>Sehat Setu Assistant</h3>
              <p class="chatbot-status">🟢 Online & Ready</p>
            </div>
            <button class="chatbot-close" id="chatbot-close">✕</button>
          </div>
          
          <div class="chatbot-messages" id="chatbot-messages"></div>
          
          <div class="chatbot-features" id="chatbot-features">
            <button class="feature-btn" data-feature="appointment">📅 Book Appointment</button>
            <button class="feature-btn" data-feature="search-hospital">🏥 Find Hospital</button>
            <button class="feature-btn" data-feature="symptom">🩺 Symptom Check</button>
            <button class="feature-btn" data-feature="my-profile">👤 My Profile</button>
            <button class="feature-btn" data-feature="appointments">📋 My Appointments</button>
            <button class="feature-btn" data-feature="prescriptions">💊 My Prescriptions</button>
            <button class="feature-btn" data-feature="insurance">🛡️ Insurance Check</button>
            <button class="feature-btn" data-feature="emergency">🚨 Emergency</button>
            <button class="feature-btn" data-feature="faq">❓ FAQ</button>
            <button class="feature-btn" data-feature="reviews">⭐ Reviews</button>
          </div>
          
          <div class="chatbot-input-area">
            <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Ask or select above...">
            <button class="chatbot-send" id="chatbot-send">➤</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }

  setupEventListeners() {
    const toggle = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const featureButtons = document.querySelectorAll('.feature-btn');

    toggle?.addEventListener('click', () => this.toggleChatbot());
    closeBtn?.addEventListener('click', () => this.closeChatbot());
    sendBtn?.addEventListener('click', () => this.sendMessage());
    input?.addEventListener('keypress', (e) => e.key === 'Enter' && this.sendMessage());

    featureButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const feature = btn.getAttribute('data-feature');
        this.handleFeature(feature);
      });
    });
  }

  toggleChatbot() {
    const window = document.getElementById('chatbot-window');
    const toggle = document.getElementById('chatbot-toggle');
    const input = document.getElementById('chatbot-input');

    if (this.isOpen) {
      this.closeChatbot();
    } else {
      window.style.display = 'flex';
      toggle.classList.add('active');
      this.isOpen = true;
      setTimeout(() => input?.focus(), 100);
    }
  }

  closeChatbot() {
    const window = document.getElementById('chatbot-window');
    const toggle = document.getElementById('chatbot-toggle');
    window.style.display = 'none';
    toggle.classList.remove('active');
    this.isOpen = false;
  }

  handleFeature(feature) {
    const input = document.getElementById('chatbot-input');
    
    const featureMap = {
      'appointment': 'I want to book an appointment',
      'search-hospital': 'Find me a hospital',
      'symptom': 'I have symptoms',
      'my-profile': 'Show my profile',
      'appointments': 'Show my appointments',
      'prescriptions': 'Show my prescriptions',
      'insurance': 'Check my insurance',
      'emergency': 'Emergency help needed',
      'faq': 'Show FAQ',
      'reviews': 'Show reviews'
    };

    if (input && featureMap[feature]) {
      input.value = featureMap[feature];
      this.sendMessage();
    }
  }

  sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input?.value.trim() || '';

    if (!message) return;

    this.addMessage(message, 'user');
    input.value = '';

    const response = this.generateSmartResponse(message);
    setTimeout(() => this.addMessage(response, 'bot'), 300);
  }

  generateSmartResponse(userMessage) {
    // Use AI Conversation Engine for intelligent responses
    if (this.aiEngine) {
      const aiResponse = this.aiEngine.generateResponse(userMessage);
      return aiResponse;
    }

    // Fallback to old responses if AI engine not loaded
    const msg = userMessage.toLowerCase();
    const lang = this.currentLanguage;

    // Feature Detection
    if (msg.includes('appointment') || msg.includes('नियुक्ति') || msg.includes('बुक')) {
      return lang === 'hi' 
        ? 'आइए एक नियुक्ति बुक करते हैं। कौन सी विशेषता चाहिए? (Cardiology, Neurology, आदि)' 
        : 'Let\'s book an appointment. What specialty do you need? (Cardiology, Neurology, etc.)';
    }

    if (msg.includes('hospital') || msg.includes('अस्पताल')) {
      return lang === 'hi'
        ? 'कौन से शहर में अस्पताल ढूंढना है? (Delhi, Mumbai, Bangalore)' 
        : 'Which city? We have hospitals in Delhi, Mumbai, Bangalore, and more.';
    }

    if (msg.includes('symptom') || msg.includes('लक्षण') || msg.includes('pain') || msg.includes('दर्द')) {
      return lang === 'hi'
        ? 'आपके लक्षण क्या हैं? (उदाहरण: सिरदर्द, छाती का दर्द, पेट दर्द)' 
        : 'Describe your symptoms. Examples: headache, chest pain, stomach ache.';
    }

    if (msg.includes('profile') || msg.includes('प्रोफ़ाइल')) {
      if (this.currentUser) {
        return lang === 'hi'
          ? `👤 आपकी प्रोफ़ाइल:\nनाम: ${this.currentUser.name}\nईमेल: ${this.currentUser.email}\nफोन: ${this.currentUser.phone}`
          : `👤 Your Profile:\nName: ${this.currentUser.name}\nEmail: ${this.currentUser.email}\nPhone: ${this.currentUser.phone}`;
      }
      return lang === 'hi' ? 'कृपया अपनी प्रोफ़ाइल बनाएं।' : 'Please create your profile first.';
    }

    if (msg.includes('my appointment') || msg.includes('मेरी नियुक्ति')) {
      const appts = this.getUpcomingAppointments();
      if (appts.length === 0) {
        return lang === 'hi' ? 'कोई आसन्न नियुक्ति नहीं।' : 'No upcoming appointments.';
      }
      return appts.map(a => `📅 ${a.doctorName} - ${a.date} ${a.time}`).join('\n');
    }

    if (msg.includes('prescription') || msg.includes('नुस्खे')) {
      const presc = this.getPrescriptions();
      if (presc.length === 0) {
        return lang === 'hi' ? 'कोई नुस्खे नहीं।' : 'No prescriptions found.';
      }
      return presc.slice(-3).map(p => `💊 Dr. ${p.doctorName} (${p.date})`).join('\n');
    }

    if (msg.includes('insurance') || msg.includes('बीमा')) {
      return lang === 'hi'
        ? 'आपका बीमा प्रदाता कौन है? (ICICI, HDFC, Aetna, आदि)' 
        : 'What is your insurance provider? (ICICI, HDFC, Aetna, Bajaj)';
    }

    if (msg.includes('emergency') || msg.includes('आपातकालीन')) {
      const emergency = this.findNearestEmergency();
      return lang === 'hi'
        ? `🚨 आपातकालीन: ${emergency[0]?.name || 'Apollo'}\n📞 ${emergency[0]?.phone || '+91-11-4141-1111'}\n🏠 ${emergency[0]?.area || 'Nearest Area'}`
        : `🚨 Emergency: ${emergency[0]?.name || 'Apollo'}\n📞 ${emergency[0]?.phone || '+91-11-4141-1111'}\n📍 ${emergency[0]?.area || 'Call 108'}`;
    }

    if (msg.includes('faq') || msg.includes('सवाल')) {
      const faqs = this.getFAQs();
      return faqs.slice(0, 2).map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n');
    }

    if (msg.includes('review') || msg.includes('रेटिंग')) {
      return lang === 'hi'
        ? 'किस अस्पताल की समीक्षा देखना चाहते हैं? (Apollo, Max, Fortis, आदि)' 
        : 'Which hospital reviews would you like to see?';
    }

    // Default intelligent response
    return lang === 'hi'
      ? '😊 कृपया एक सुविधा चुनें या अपने स्वास्थ्य के बारे में बताएं। मैं आपकी मदद करने के लिए यहाँ हूँ!'
      : '😊 Please select a feature above or tell me about your health. I\'m here to help!';
  }

  addMessage(text, sender = 'user') {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = text.replace(/\n/g, '<br>');

    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    this.messages.push({ text, sender, timestamp: new Date() });

    setTimeout(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 0);
  }

  addInitialGreeting() {
    const lang = this.currentLanguage;
    const greeting = lang === 'hi'
      ? '👋 नमस्ते! मैं सेहत सेतु आपके स्वास्थ्य सहायक हूँ।\n\n10 शक्तिशाली सुविधाएं:\n📅 नियुक्तियाँ बुक करें\n🏥 अस्पताल खोजें\n🩺 लक्षण जांच\n💊 नुस्खे प्रबंधन\n🛡️ बीमा सत्यापन\n👤 प्रोफ़ाइल प्रबंधन\n🚨 आपातकालीन सेवा\n⭐ समीक्षाएं\nऔर बहुत कुछ!'
      : '👋 Hello! I\'m your Sehat Setu health assistant.\n\n10 Powerful Features:\n📅 Book Appointments\n🏥 Find Hospitals\n🩺 Symptom Checker\n💊 Prescription Management\n🛡️ Insurance Verification\n👤 Profile Management\n🚨 Emergency Services\n⭐ Reviews\nAnd More!';

    setTimeout(() => this.addMessage(greeting, 'bot'), 500);
  }
}

// Initialize Enhanced Chatbot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.sehatSetuChatbot = new HealthcareChatbotEnhanced();
  });
} else {
  window.sehatSetuChatbot = new HealthcareChatbotEnhanced();
}
