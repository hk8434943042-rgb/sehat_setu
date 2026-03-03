// Patient Registration Form Handler

const form = document.getElementById('patientForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

function t(key, fallback = key) {
  return window.i18n?.get ? window.i18n.get(key, fallback) : fallback;
}

/**
 * Initialize form
 */
function init() {
  if (!form) return;
  
  form.addEventListener('submit', handleSubmit);
  
  // Add real-time validation
  setupValidation();
}

/**
 * Handle form submission
 */
async function handleSubmit(e) {
  e.preventDefault();
  
  // Clear previous messages
  hideMessage(successMessage);
  hideMessage(errorMessage);
  
  // Get form data
  const formData = new FormData(form);
  const patientData = {
    full_name: formData.get('fullName'),
    date_of_birth: formData.get('dob'),
    gender: formData.get('gender'),
    blood_group: formData.get('bloodGroup') || null,
    phone: formData.get('phone'),
    email: formData.get('email') || null,
    address: formData.get('address') || null,
    city: formData.get('city') || null,
    pincode: formData.get('pincode') || null,
    emergency_contact_name: formData.get('emergencyName') || null,
    emergency_contact_phone: formData.get('emergencyPhone') || null,
    medical_history: formData.get('medicalHistory') || null,
    allergies: formData.get('allergies') || null,
    current_medications: formData.get('currentMedications') || null,
    insurance_provider: formData.get('insuranceProvider') || null,
    insurance_number: formData.get('insuranceNumber') || null,
  };
  
  // Validate required fields
  if (!patientData.full_name || !patientData.phone) {
    showError(t('register.requiredFields', 'Please fill in all required fields'));
    return;
  }
  
  // Disable submit button
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = t('register.registering', 'Registering...');
  
  try {
    // Call API
    const response = await fetch(`${API_BASE_URL}/api/patients/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || t('register.registrationFailed', 'Registration failed'));
    }
    
    // Success
    showSuccess(`${t('register.registrationSuccessWithId', 'Registration successful! Your Patient ID is:')} ${result.patient_id}`);
    
    // Store patient ID in localStorage for future use
    localStorage.setItem('sehat_setu_patient_id', result.patient_id);
    
    // Reset form
    form.reset();
    
    // Redirect after 3 seconds
    setTimeout(() => {
      window.location.href = 'patient-dashboard.html?id=' + result.patient_id;
    }, 3000);
    
  } catch (error) {
    showError(error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

/**
 * Setup form validation
 */
function setupValidation() {
  // Phone validation
  const phoneInput = form.querySelector('#phone');
  if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
      const phone = this.value.trim();
      if (phone && !/^[6-9]\d{9}$/.test(phone)) {
        showFieldError(this, t('form.invalidPhone', 'Please enter a valid 10-digit mobile number'));
      } else {
        clearFieldError(this);
      }
    });
  }
  
  // Email validation
  const emailInput = form.querySelector('#email');
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      const email = this.value.trim();
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFieldError(this, t('form.invalidEmail', 'Please enter a valid email address'));
      } else {
        clearFieldError(this);
      }
    });
  }
  
  // Emergency phone validation
  const emergencyPhoneInput = form.querySelector('#emergencyPhone');
  if (emergencyPhoneInput) {
    emergencyPhoneInput.addEventListener('blur', function() {
      const phone = this.value.trim();
      if (phone && !/^[6-9]\d{9}$/.test(phone)) {
        showFieldError(this, t('form.invalidPhone', 'Please enter a valid 10-digit mobile number'));
      } else {
        clearFieldError(this);
      }
    });
  }
  
  // Pincode validation
  const pincodeInput = form.querySelector('#pincode');
  if (pincodeInput) {
    pincodeInput.addEventListener('blur', function() {
      const pincode = this.value.trim();
      if (pincode && !/^\d{6}$/.test(pincode)) {
        showFieldError(this, t('register.invalidPincode', 'Please enter a valid 6-digit pincode'));
      } else {
        clearFieldError(this);
      }
    });
  }
  
  // Date of birth validation
  const dobInput = form.querySelector('#dob');
  if (dobInput) {
    dobInput.addEventListener('blur', function() {
      const dob = new Date(this.value);
      const today = new Date();
      const age = (today - dob) / (1000 * 60 * 60 * 24 * 365.25);
      
      if (age < 0) {
        showFieldError(this, t('register.futureDob', 'Date of birth cannot be in the future'));
      } else if (age > 150) {
        showFieldError(this, t('register.invalidDob', 'Please enter a valid date of birth'));
      } else {
        clearFieldError(this);
      }
    });
  }
}

/**
 * Show field-level error
 */
function showFieldError(input, message) {
  clearFieldError(input);
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;
  errorDiv.style.color = 'var(--danger, #e74c3c)';
  errorDiv.style.fontSize = '0.85rem';
  errorDiv.style.marginTop = '0.25rem';
  
  input.style.borderColor = 'var(--danger, #e74c3c)';
  input.parentElement.appendChild(errorDiv);
}

/**
 * Clear field-level error
 */
function clearFieldError(input) {
  const errorDiv = input.parentElement.querySelector('.field-error');
  if (errorDiv) {
    errorDiv.remove();
  }
  input.style.borderColor = '';
}

/**
 * Show success message
 */
function showSuccess(message) {
  if (successMessage) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/**
 * Show error message
 */
function showError(message) {
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/**
 * Hide message
 */
function hideMessage(element) {
  if (element) {
    element.style.display = 'none';
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
