// Hospital Detail Page - Load and display detailed hospital information

let currentHospital = null;
const hospitalId = new URLSearchParams(window.location.search).get('id');

// DOM Elements
const loadingSpinner = document.getElementById('loading');
const errorContainer = document.getElementById('error');
const hospitalContent = document.getElementById('hospitalContent');

function t(key, fallback = key) {
  return window.i18n?.get ? window.i18n.get(key, fallback) : fallback;
}

/**
 * Initialize page
 */
async function init() {
  if (!hospitalId) {
    showError(t('msg.noData', 'No hospital ID provided'));
    return;
  }

  showLoading(true);
  await loadHospitalDetails();
  showLoading(false);
}

/**
 * Load hospital details from API
 */
async function loadHospitalDetails() {
  try {
    currentHospital = await API.getHospitalDetail(hospitalId);
    renderHospitalDetails();
  } catch (error) {
    showError(`${t('msg.error', 'Error')}: ${error.message}`);
  }
}

/**
 * Render hospital details to the page
 */
function renderHospitalDetails() {
  if (!currentHospital || !hospitalContent) return;

  const h = currentHospital;
  
  // Parse facilities
  let facilitiesHTML = `<p>${t('msg.noData', 'No facilities information available')}</p>`;
  if (h.facilities_json) {
    try {
      const facilities = JSON.parse(h.facilities_json);
      const facilityList = Object.entries(facilities)
        .filter(([_, value]) => value)
        .map(([key]) => `<li>${escapeHtml(key)}</li>`)
        .join('');
      
      if (facilityList) {
        facilitiesHTML = `<ul class="facilities-list">${facilityList}</ul>`;
      }
    } catch (e) {
      console.error('Error parsing facilities:', e);
    }
  }

  // Doctors section
  let doctorsHTML = `<p>${t('msg.noData', 'No doctors information available')}</p>`;
  if (h.doctors && h.doctors.length > 0) {
    doctorsHTML = `
      <div class="doctors-grid">
        ${h.doctors.map(doctor => `
          <div class="doctor-card">
            <h4>${escapeHtml(doctor.name)}</h4>
            <p class="specialization">${escapeHtml(doctor.specialization || t('hospitals.allTypes', 'General'))}</p>
            ${doctor.experience_years ? `<p>${t('doctor.experience', 'Experience')}: ${doctor.experience_years} ${t('detail.years', 'years')}</p>` : ''}
            ${doctor.qualifications ? `<p>${t('detail.qualifications', 'Qualifications')}: ${escapeHtml(doctor.qualifications)}</p>` : ''}
            ${doctor.op_timings ? `<p>${t('detail.opdTimings', 'OPD Timings')}: ${escapeHtml(doctor.op_timings)}</p>` : ''}
            ${doctor.days_available ? `<p>${t('status.available', 'Available')}: ${escapeHtml(doctor.days_available)}</p>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Treatments section
  let treatmentsHTML = `<p>${t('msg.noData', 'No treatments information available')}</p>`;
  if (h.treatments && h.treatments.length > 0) {
    treatmentsHTML = `
      <div class="treatments-list">
        ${h.treatments.map(treatment => `
          <div class="treatment-item">
            <div class="treatment-header">
              <h4>${escapeHtml(treatment.treatment_name)}</h4>
              <span class="cost-range">₹${formatCurrency(treatment.cost_min)} - ₹${formatCurrency(treatment.cost_max)}</span>
            </div>
            ${treatment.notes ? `<p class="treatment-notes">${escapeHtml(treatment.notes)}</p>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Insurance section
  let insuranceHTML = `<p>${t('msg.noData', 'No insurance information available')}</p>`;
  if (h.insurance && h.insurance.length > 0) {
    insuranceHTML = `
      <div class="insurance-list">
        ${h.insurance.map(ins => `
          <div class="insurance-item">
            <h4>${escapeHtml(ins.insurer_name)}</h4>
            <p>${t('compare.cashless', 'Cashless')}: ${ins.cashless_available === 'Y' ? `✅ ${t('status.available', 'Available')}` : `❌ ${t('status.unavailable', 'Not Available')}`}</p>
            ${ins.tpa_details ? `<p>TPA: ${escapeHtml(ins.tpa_details)}</p>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Main content
  hospitalContent.innerHTML = `
    <div class="hospital-header">
      <div>
        <h1 class="hospital-name">${escapeHtml(h.name)}</h1>
        <p class="hospital-type">${escapeHtml(h.type || t('hospitals.title', 'General Hospital'))}</p>
        ${h.rating_avg ? generateStarRating(h.rating_avg) : ''}
        ${generateHospitalBadges(h)}
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" onclick="handleBookAppointment()">
          📅 ${t('btn.bookAppointment', 'Book Appointment')}
        </button>
        <button class="btn btn-ghost" onclick="handleCallHospital()">
          📞 ${t('hospital.call', 'Call')}
        </button>
        <button class="btn btn-ghost" onclick="handleAddToFavorites(${h.id})">
          ❤️ ${t('hospital.save', 'Save')}
        </button>
      </div>
    </div>
    
    ${generateHospitalStats(h)}
    ${generateQuickActions(h)}

    <div class="hospital-details-grid">
      <!-- Contact Information -->
      <section class="detail-section">
        <h2>${t('detail.contact', 'Contact Information')}</h2>
        <div class="info-list">
          ${h.address ? `<p><strong>${t('detail.address', 'Address')}:</strong> ${escapeHtml(h.address)}</p>` : ''}
          ${h.area ? `<p><strong>${t('detail.area', 'Area')}:</strong> ${escapeHtml(h.area)}</p>` : ''}
          ${h.city ? `<p><strong>${t('detail.city', 'City')}:</strong> ${escapeHtml(h.city)}</p>` : ''}
          ${h.pincode ? `<p><strong>${t('detail.pincode', 'Pincode')}:</strong> ${escapeHtml(h.pincode)}</p>` : ''}
          ${h.contact_phone ? `<p><strong>${t('detail.phone', 'Phone')}:</strong> <a href="tel:${h.contact_phone}">${escapeHtml(h.contact_phone)}</a></p>` : ''}
          ${h.contact_email ? `<p><strong>${t('detail.email', 'Email')}:</strong> <a href="mailto:${h.contact_email}">${escapeHtml(h.contact_email)}</a></p>` : ''}
          ${h.website ? `<p><strong>${t('detail.website', 'Website')}:</strong> <a href="${h.website}" target="_blank" rel="noopener">${escapeHtml(h.website)}</a></p>` : ''}
        </div>
      </section>

      <!-- Map & Directions -->
      <section class="detail-section">
        <h2>📍 ${t('detail.location', 'Location & Directions')}</h2>
        ${generateMap(h)}
        ${generateWorkingHours()}
      </section>
      
      <!-- Departments -->
      ${h.doctors && h.doctors.length > 0 ? `
      <section class="detail-section">
        <h2>🏥 ${t('detail.departments', 'Departments & Specialties')}</h2>
        ${generateDepartments(h.doctors)}
      </section>
      ` : ''}

      <!-- Facilities -->
      <section class="detail-section">
        <h2>${t('detail.facilities', 'Facilities')}</h2>
        ${facilitiesHTML}
      </section>

      <!-- Doctors -->
      <section class="detail-section">
        <h2>${t('detail.doctors', 'Doctors')}</h2>
        ${doctorsHTML}
      </section>

      <!-- Treatments & Costs -->
      <section class="detail-section">
        <h2>${t('detail.treatments', 'Treatments & Estimated Costs')}</h2>
        ${treatmentsHTML}
      </section>

      <!-- Insurance -->
      <section class="detail-section">
        <h2>${t('detail.insurance', 'Insurance Accepted')}</h2>
        ${insuranceHTML}
      </section>
    </div>

    ${h.last_verified_on ? `<p class="verified-info">${t('detail.lastVerifiedOn', 'Last verified on')} ${formatDate(h.last_verified_on)}</p>` : ''}
  `;
}

/**
 * Handle appointment booking
 */
function handleBookAppointment() {
  if (currentHospital) {
    window.location.href = `patient-register.html?hospital_id=${currentHospital.id}`;
  }
}

/**
 * Handle call hospital
 */
function handleCallHospital() {
  if (currentHospital && currentHospital.contact_phone) {
    window.location.href = `tel:${currentHospital.contact_phone}`;
  } else {
    alert(t('status.unavailable', 'Phone number not available'));
  }
}

/**
 * Show/hide loading spinner
 */
function showLoading(isLoading) {
  if (loadingSpinner) {
    loadingSpinner.style.display = isLoading ? 'flex' : 'none';
  }
}

/**
 * Show error message
 */
function showError(message) {
  if (errorContainer) {
    errorContainer.innerHTML = `
      <div class="error-message">
        <h2>⚠️ ${t('msg.error', 'Error')}</h2>
        <p>${escapeHtml(message)}</p>
        <button class="btn btn-primary" onclick="window.location.href='hospital-list.html'">
          ${t('nav.hospitals', 'Hospital List')}
        </button>
      </div>
    `;
    errorContainer.style.display = 'block';
  }
  if (hospitalContent) {
    hospitalContent.style.display = 'none';
  }
}

/**
 * Utility: Format currency
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN').format(amount);
}

/**
 * Utility: Format date
 */
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    const locale = window.i18n?.getCurrentLanguage?.() === 'hi' ? 'hi-IN' : 'en-IN';
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (e) {
    return dateString;
  }
}

/**
 * Utility: Escape HTML
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
