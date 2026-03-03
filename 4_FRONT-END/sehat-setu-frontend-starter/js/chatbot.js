// AI Healthcare Chatbot
// Integrated with language system

class HealthcareChatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.currentLanguage = 'en';
    this.init();
  }

  init() {
    // Listen for language changes
    if (window.i18n) {
      document.addEventListener('languageChanged', (e) => {
        this.currentLanguage = e.detail.language || 'en';
      });
    }
    this.createChatbotUI();
    this.setupEventListeners();
  }

  createChatbotUI() {
    const chatbotHTML = `
      <div id="chatbot-widget" class="chatbot-widget">
        <!-- Chat Toggle Button -->
        <button id="chatbot-toggle" class="chatbot-toggle" title="Chat with Health Assistant">
          <span class="chatbot-icon">💬</span>
          <span class="chatbot-label" data-translate="chatbot.title">Health Assistant</span>
        </button>

        <!-- Chat Window -->
        <div id="chatbot-window" class="chatbot-window" style="display: none;">
          <!-- Header -->
          <div class="chatbot-header">
            <div class="chatbot-header-content">
              <h3 data-translate="chatbot.title">Health Assistant</h3>
              <p class="chatbot-status" data-translate="chatbot.online">Online</p>
            </div>
            <button id="chatbot-close" class="chatbot-close" aria-label="Close chat">×</button>
          </div>

          <!-- Messages Container -->
          <div id="chatbot-messages" class="chatbot-messages">
            <div class="chatbot-message bot-message">
              <div class="message-content" data-translate="chatbot.greeting">
                Hello! 👋 I'm your Health Assistant. How can I help you today?
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="chatbot-input-area">
            <input 
              type="text" 
              id="chatbot-input" 
              class="chatbot-input" 
              placeholder="Type your question..."
              data-translate-placeholder="chatbot.placeholder"
            />
            <button id="chatbot-send" class="chatbot-send" title="Send message">
              <span>→</span>
            </button>
          </div>

          <!-- Quick Suggestions -->
          <div class="chatbot-suggestions">
            <button class="suggestion-btn" data-question="Find nearby hospitals">
              <span data-translate="chatbot.findHospitals">Find Hospitals</span>
            </button>
            <button class="suggestion-btn" data-question="Book appointment">
              <span data-translate="chatbot.bookAppointment">Book Appointment</span>
            </button>
            <button class="suggestion-btn" data-question="Emergency services">
              <span data-translate="chatbot.emergency">Emergency</span>
            </button>
            <button class="suggestion-btn" data-question="Health tips">
              <span data-translate="chatbot.healthTips">Health Tips</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Insert chatbot into body
    if (!document.getElementById('chatbot-widget')) {
      document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }
  }

  setupEventListeners() {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const suggestionsContainer = document.querySelector('.chatbot-suggestions');

    // Toggle chat window
    toggleBtn.addEventListener('click', () => this.toggleChat());
    closeBtn.addEventListener('click', () => this.toggleChat());

    // Send message
    sendBtn.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    // Suggestion buttons
    if (suggestionsContainer) {
      suggestionsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.suggestion-btn');
        if (btn) {
          const question = btn.getAttribute('data-question');
          input.value = question;
          this.sendMessage();
        }
      });
    }
  }

  toggleChat() {
    const chatWindow = document.getElementById('chatbot-window');
    const toggleBtn = document.getElementById('chatbot-toggle');
    
    this.isOpen = !this.isOpen;
    chatWindow.style.display = this.isOpen ? 'flex' : 'none';
    toggleBtn.classList.toggle('active', this.isOpen);

    if (this.isOpen) {
      document.getElementById('chatbot-input').focus();
    }
  }

  sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    this.addMessage(message, 'user');
    input.value = '';

    // Simulate bot response after short delay
    setTimeout(() => {
      const response = this.generateResponse(message);
      this.addMessage(response, 'bot');
    }, 500);
  }

  addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;

    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    this.messages.push({ text, sender, timestamp: new Date() });
  }

  generateResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    const responses = {
      en: {
        hospital: "I can help you find nearby hospitals! 🏥 Would you like to search by location or type of facility?",
        appointment: "To book an appointment, please visit our Hospitals page and select your preferred hospital and doctor. 📅",
        emergency: "For emergencies, please call your nearest hospital's emergency number or dial 112. Stay safe! 🚑",
        doctor: "We have expert doctors available across various specialties. Visit our Hospitals page to find specialists near you. 👨‍⚕️",
        symptom: "I can provide general health information, but please consult a qualified doctor for medical advice. 👩‍⚕️",
        insurance: "Most of our partner hospitals accept major insurance providers. Please check with the hospital directly for details. 💳",
        payment: "We support multiple payment methods including credit cards, debit cards, and digital wallets. 💰",
        pharmacy: "Many hospitals have in-house pharmacies. Check the hospital details page for pharmacy information. 💊",
        health: "Great! Staying healthy is important. Would you like tips on fitness, nutrition, or preventive care? 💪",
        default: "I can help you with hospital information, appointments, emergency contacts, and health tips. What would you like to know? 😊"
      },
      hi: {
        hospital: "मैं आपको पास के अस्पताल खोजने में मदद कर सकता हूँ! 🏥 क्या आप स्थान या सुविधा के प्रकार से खोज करना चाहते हैं?",
        appointment: "नियुक्ति बुक करने के लिए, कृपया हमारे अस्पताल पृष्ठ पर जाएं और अपने पसंदीदा अस्पताल और डॉक्टर को चुनें। 📅",
        emergency: "आपातकाल के लिए, कृपया अपने निकटतम अस्पताल के आपातकालीन नंबर पर कॉल करें या 112 डायल करें। सुरक्षित रहें! 🚑",
        doctor: "हमारे पास विभिन्न विशेषताओं में विशेषज्ञ डॉक्टर उपलब्ध हैं। अपने पास विशेषज्ञ खोजने के लिए हमारे अस्पताल पृष्ठ पर जाएं। 👨‍⚕️",
        symptom: "मैं सामान्य स्वास्थ्य जानकारी प्रदान कर सकता हूँ, लेकिन चिकित्सा सलाह के लिए कृपया एक योग्य डॉक्टर से परामर्श लें। 👩‍⚕️",
        insurance: "हमारे अधिकांश भागीदार अस्पताल प्रमुख बीमा प्रदाताओं को स्वीकार करते हैं। विवरण के लिए कृपया अस्पताल से सीधे संपर्क करें। 💳",
        payment: "हम क्रेडिट कार्ड, डेबिट कार्ड और डिजिटल वॉलेट सहित कई भुगतान विधियों का समर्थन करते हैं। 💰",
        pharmacy: "कई अस्पतालों में इन-हाउस फार्मेसी हैं। फार्मेसी की जानकारी के लिए अस्पताल के विवरण पृष्ठ को देखें। 💊",
        health: "बहुत अच्छा! स्वस्थ रहना महत्वपूर्ण है। क्या आप फिटनेस, पोषण या रोगनिरोधक देखभाल पर सुझाव चाहते हैं? 💪",
        default: "मैं आपको अस्पताल की जानकारी, नियुक्तियों, आपातकालीन संपर्कों और स्वास्थ्य सुझावों के साथ मदद कर सकता हूँ। आप क्या जानना चाहते हैं? 😊"
      }
    };

    const responseList = responses[this.currentLanguage] || responses.en;

    // Match keywords
    if (msg.includes('hospital') || msg.includes('अस्पताल')) return responseList.hospital;
    if (msg.includes('appointment') || msg.includes('नियुक्ति')) return responseList.appointment;
    if (msg.includes('emergency') || msg.includes('आपातकालीन')) return responseList.emergency;
    if (msg.includes('doctor') || msg.includes('डॉक्टर')) return responseList.doctor;
    if (msg.includes('symptom') || msg.includes('लक्षण')) return responseList.symptom;
    if (msg.includes('insurance') || msg.includes('बीमा')) return responseList.insurance;
    if (msg.includes('payment') || msg.includes('भुगतान')) return responseList.payment;
    if (msg.includes('pharmacy') || msg.includes('फार्मेसी')) return responseList.pharmacy;
    if (msg.includes('health') || msg.includes('स्वास्थ्य')) return responseList.health;

    return responseList.default;
  }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new HealthcareChatbot();
  });
} else {
  window.chatbot = new HealthcareChatbot();
}
