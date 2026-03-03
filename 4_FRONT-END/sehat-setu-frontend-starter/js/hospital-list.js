// Hospital List Page - Dynamic Data Loading
let hospitalsData = [];
let filteredData = [];
let selectedForComparison = [];

// DOM Elements
const searchInput = document.getElementById('q');
const typeSelect = document.getElementById('type');
const emerSelect = document.getElementById('emer');
const clearBtn = document.getElementById('clearFilters');
const hospitalGrid = document.getElementById('hospitalGrid');
const loadingSpinner = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const resultsCount = document.getElementById('resultsCount');

function t(key, fallback) {
  return (typeof i18n !== 'undefined' && i18n) ? i18n.get(key, fallback) : fallback;
}

/**
 * Initialize page
 */
async function init() {
  showLoading(true);
  await loadHospitals();
  setupEventListeners();
  showLoading(false);
}

/**
 * Load hospitals from backend API
 */
async function loadHospitals() {
  try {
    hospitalsData = await API.getHospitals();
    filteredData = [...hospitalsData];
    renderHospitals();
    updateResultsCount();
  } catch (error) {
    showError(`Failed to load hospitals: ${error.message}`);
  }
}

/**
 * Setup event listeners for filters
 */
function setupEventListeners() {
  searchInput?.addEventListener('input', debounce(applyFilters, 300));
  typeSelect?.addEventListener('change', applyFilters);
  emerSelect?.addEventListener('change', applyFilters);
  clearBtn?.addEventListener('click', clearFilters);
}

/**
 * Apply all filters
 */
function applyFilters() {
  const searchQuery = searchInput?.value.toLowerCase().trim() || '';
  const typeFilter = typeSelect?.value || '';
  const emerFilter = emerSelect?.value || '';

  filteredData = hospitalsData.filter(hospital => {
    // Search filter
    const matchesSearch = !searchQuery || 
      hospital.name?.toLowerCase().includes(searchQuery) ||
      hospital.area?.toLowerCase().includes(searchQuery) ||
      hospital.city?.toLowerCase().includes(searchQuery);

    // Type filter
    const matchesType = !typeFilter || hospital.type === typeFilter;

    // Emergency filter (based on facilities_json if available)
    let matchesEmergency = true;
    if (emerFilter) {
      try {
        const facilities = hospital.facilities_json ? JSON.parse(hospital.facilities_json) : {};
        const hasEmergency = facilities.Emergency || facilities.emergency || false;
        matchesEmergency = (emerFilter === 'yes' && hasEmergency) || 
                          (emerFilter === 'no' && !hasEmergency);
      } catch (e) {
        matchesEmergency = emerFilter === '';
      }
    }

    return matchesSearch && matchesType && matchesEmergency;
  });

  renderHospitals();
  updateResultsCount();
}

/**
 * Clear all filters
 */
function clearFilters() {
  if (searchInput) searchInput.value = '';
  if (typeSelect) typeSelect.value = '';
  if (emerSelect) emerSelect.value = '';
  filteredData = [...hospitalsData];
  renderHospitals();
  updateResultsCount();
}

/**
 * Render hospitals to the grid
 */
function renderHospitals() {
  if (!hospitalGrid) return;

  if (filteredData.length === 0) {
    hospitalGrid.innerHTML = `
      <div class="no-results">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <h3>${t('hospital.noResults', 'No hospitals found')}</h3>
        <p>${t('hospital.tryAdjusting', 'Try adjusting your filters or search terms')}</p>
      </div>
    `;
    return;
  }

  hospitalGrid.innerHTML = filteredData.map(hospital => createHospitalCard(hospital)).join('');
}

/**
 * Create hospital card HTML
 */
function createHospitalCard(hospital) {
  const phone = hospital.contact_phone || 'N/A';
  const type = hospital.type || 'General';
  const area = hospital.area || hospital.city || '';
  const verified = hospital.last_verified_on ? formatDate(hospital.last_verified_on) : '';
  
  // Parse facilities
  let facilitiesHTML = '';
  if (hospital.facilities_json) {
    try {
      const facilities = JSON.parse(hospital.facilities_json);
      const facilityList = Object.entries(facilities)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .slice(0, 3);
      
      if (facilityList.length > 0) {
        facilitiesHTML = facilityList.map(f => `<span class="facility-tag">${f}</span>`).join('');
      }
    } catch (e) {
      console.error('Error parsing facilities:', e);
    }
  }

  return `
    <article class="hospital-card">
      <div class="card-header-checkbox">
        <input type="checkbox" 
               class="compare-checkbox" 
               id="compare-${hospital.id}" 
               onchange="toggleCompare(${hospital.id})" 
               ${selectedForComparison.includes(hospital.id) ? 'checked' : ''}>
         <label for="compare-${hospital.id}">${t('hospital.compare', 'Compare')}</label>
      </div>
      <div class="hospital-card-header">
        <div>
          <h3 class="hospital-name">${escapeHtml(hospital.name)}</h3>
          <p class="hospital-type">${escapeHtml(type)}</p>
        </div>
        ${hospital.rating_avg ? `<div class="rating">${hospital.rating_avg.toFixed(1)} ⭐</div>` : ''}
      </div>
      
      <div class="hospital-info">
        ${area ? `<p class="info-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          ${escapeHtml(area)}
        </p>` : ''}
        
        <p class="info-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          ${escapeHtml(phone)}
        </p>

        ${verified ? `<p class="verified-date">${t('hospital.verified', 'Verified')}: ${verified}</p>` : ''}
      </div>

      ${facilitiesHTML ? `<div class="facilities">${facilitiesHTML}</div>` : ''}

      <div class="card-actions">
        <a href="hospital-detail.html?id=${hospital.id}" class="btn btn-primary btn-sm">${t('hospital.viewDetails', 'View Details')}</a>
        <button class="btn btn-ghost btn-sm" onclick="handleBookAppointment(${hospital.id})">${t('btn.bookAppointment', 'Book Appointment')}</button>
      </div>
    </article>
  `;
}

/**
 * Handle appointment booking
 */
function handleBookAppointment(hospitalId) {
  alert(`${t('appointment.book', 'Book an Appointment')} - ${t('msg.pleaseWait', 'Please wait')}`);
  // TODO: Implement appointment booking modal or redirect
}

/**
 * Update results count display
 */
function updateResultsCount() {
  if (resultsCount) {
    const suffix = filteredData.length !== 1 ? 's' : '';
    resultsCount.textContent = `${filteredData.length} hospital${suffix} ${t('hospitals.loaded', 'loaded')}`;
  }
}

/**
 * Show/hide loading spinner
 */
function showLoading(isLoading) {
  if (loadingSpinner) {
    loadingSpinner.style.display = isLoading ? 'flex' : 'none';
  }
  if (hospitalGrid) {
    hospitalGrid.style.opacity = isLoading ? '0.5' : '1';
  }
}

/**
 * Show error message
 */
function showError(message) {
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  }
  if (hospitalGrid) {
    hospitalGrid.innerHTML = `
      <div class="error-state">
        <h3>⚠️ Error Loading Hospitals</h3>
        <p>${escapeHtml(message)}</p>
        <button class="btn btn-primary" onclick="location.reload()">Retry</button>
      </div>
    `;
  }
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Utility: Format date
 */
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (e) {
    return dateString;
  }
}

/**
 * Utility: Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Toggle hospital for comparison
 */
function toggleCompare(hospitalId) {
  const index = selectedForComparison.indexOf(hospitalId);
  
  if (index > -1) {
    selectedForComparison.splice(index, 1);
  } else {
    if (selectedForComparison.length >= 3) {
      alert('You can compare up to 3 hospitals at a time');
      document.getElementById(`compare-${hospitalId}`).checked = false;
      return;
    }
    selectedForComparison.push(hospitalId);
  }
  
  updateCompareButton();
}

/**
 * Update compare button visibility and text
 */
function updateCompareButton() {
  let compareBtn = document.getElementById('compareBtn');
  
  if (!compareBtn) {
    // Create compare button if it doesn't exist
    compareBtn = document.createElement('button');
    compareBtn.id = 'compareBtn';
    compareBtn.className = 'fab pulse';
    compareBtn.innerHTML = '🔍';
    compareBtn.style.bottom = '8rem';
    compareBtn.title = 'Compare Selected Hospitals';
    compareBtn.onclick = goToComparison;
    document.body.appendChild(compareBtn);
  }
  
  if (selectedForComparison.length > 0) {
    compareBtn.style.display = 'flex';
    compareBtn.innerHTML = `🔍 (${selectedForComparison.length})`;
  } else {
    compareBtn.style.display = 'none';
  }
}

/**
 * Navigate to comparison page
 */
function goToComparison() {
  if (selectedForComparison.length < 2) {
    alert('Please select at least 2 hospitals to compare');
    return;
  }
  
  window.location.href = `hospital-compare.html?ids=${selectedForComparison.join(',')}`;
}


// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
