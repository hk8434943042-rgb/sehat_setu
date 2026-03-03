// Enhanced Hospital Features - Additional Functionality

/**
 * Generate star rating HTML
 */
function generateStarRating(rating, showNumber = true) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let html = '<div class="rating-stars">';
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    html += '<span class="star">⭐</span>';
  }
  
  // Half star
  if (hasHalfStar) {
    html += '<span class="star">⭐</span>';
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    html += '<span class="star empty">☆</span>';
  }
  
  if (showNumber) {
    html += `<span class="rating-value">${rating.toFixed(1)}</span>`;
  }
  
  html += '</div>';
  return html;
}

/**
 * Generate hospital badges
 */
function generateHospitalBadges(hospital) {
  const badges = [];
  
  if (hospital.last_verified_on) {
    badges.push('<span class="badge badge-verified">✓ Verified</span>');
  }
  
  try {
    const facilities = hospital.facilities_json ? JSON.parse(hospital.facilities_json) : {};
    
    if (facilities.Emergency || facilities.emergency) {
      badges.push('<span class="badge badge-emergency">🚨 24/7 Emergency</span>');
    }
    
    if (facilities['Operation Theatre'] || facilities.OT) {
      badges.push('<span class="badge badge-accredited">⚕️ Surgery</span>');
    }
  } catch (e) {
    console.error('Error parsing facilities:', e);
  }
  
  return badges.join('');
}

/**
 * Generate hospital stats
 */
function generateHospitalStats(hospital) {
  return `
    <div class="hospital-stats">
      <div class="stat-item">
        <div class="stat-value">${hospital.doctors?.length || 0}+</div>
        <div class="stat-label">Expert Doctors</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${hospital.treatments?.length || 0}+</div>
        <div class="stat-label">Treatments</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${hospital.insurance?.length || 0}+</div>
        <div class="stat-label">Insurance Partners</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${hospital.rating_avg?.toFixed(1) || 'N/A'}</div>
        <div class="stat-label">Rating</div>
      </div>
    </div>
  `;
}

/**
 * Generate quick actions
 */
function generateQuickActions(hospital) {
  return `
    <div class="quick-actions">
      <button class="quick-action-btn" onclick="handleCallHospital()">
        <span class="quick-action-icon">📞</span>
        <span class="quick-action-label">Call Now</span>
      </button>
      
      <button class="quick-action-btn" onclick="handleGetDirections('${hospital.address}')">
        <span class="quick-action-icon">🗺️</span>
        <span class="quick-action-label">Directions</span>
      </button>
      
      <button class="quick-action-btn" onclick="handleBookAppointment()">
        <span class="quick-action-icon">📅</span>
        <span class="quick-action-label">Book</span>
      </button>
      
      <button class="quick-action-btn" onclick="handleShareHospital()">
        <span class="quick-action-icon">📤</span>
        <span class="quick-action-label">Share</span>
      </button>
      
      <button class="quick-action-btn" onclick="handleAddToFavorites(${hospital.id})">
        <span class="quick-action-icon">❤️</span>
        <span class="quick-action-label">Favorite</span>
      </button>
      
      <button class="quick-action-btn" onclick="handleEmergency('${hospital.contact_phone}')">
        <span class="quick-action-icon">🚨</span>
        <span class="quick-action-label">Emergency</span>
      </button>
    </div>
  `;
}

/**
 * Generate working hours
 */
function generateWorkingHours() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = ['9:00 AM - 8:00 PM', '9:00 AM - 8:00 PM', '9:00 AM - 8:00 PM', 
                 '9:00 AM - 8:00 PM', '9:00 AM - 8:00 PM', '9:00 AM - 5:00 PM', 'Closed'];
  
  let html = '<div class="working-hours">';
  days.forEach((day, index) => {
    const isClosed = hours[index] === 'Closed';
    const isToday = new Date().getDay() === (index + 1) % 7;
    
    html += `
      <div class="hours-row ${isToday ? 'hours-today' : ''}">
        <span class="hours-day">${day}</span>
        <span class="hours-time ${isClosed ? 'hours-closed' : 'hours-open'}">${hours[index]}</span>
      </div>
    `;
  });
  html += '</div>';
  
  return html;
}

/**
 * Generate map placeholder or embed
 */
function generateMap(hospital) {
  const address = encodeURIComponent(`${hospital.address}, ${hospital.city}, ${hospital.pincode}`);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
  
  return `
    <div class="map-container">
      <div class="map-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <p>${hospital.address}, ${hospital.city}</p>
        <a href="${mapUrl}" target="_blank" class="btn btn-primary" style="margin-top: 1rem;">
          Open in Google Maps
        </a>
      </div>
    </div>
  `;
}

/**
 * Generate departments grid
 */
function generateDepartments(doctors) {
  if (!doctors || doctors.length === 0) return '';
  
  // Group doctors by specialization
  const departments = {};
  doctors.forEach(doctor => {
    const spec = doctor.specialization || 'General';
    if (!departments[spec]) {
      departments[spec] = [];
    }
    departments[spec].push(doctor);
  });
  
  let html = '<div class="departments-grid">';
  Object.entries(departments).forEach(([dept, docs]) => {
    const icon = getDepartmentIcon(dept);
    html += `
      <div class="department-card" onclick="showDepartmentDoctors('${dept}')">
        <div class="department-icon">${icon}</div>
        <div class="department-name">${dept}</div>
        <div class="department-info">${docs.length} Doctor${docs.length > 1 ? 's' : ''}</div>
      </div>
    `;
  });
  html += '</div>';
  
  return html;
}

/**
 * Get department icon
 */
function getDepartmentIcon(department) {
  const icons = {
    'Cardiology': '❤️',
    'Neurology': '🧠',
    'Orthopedics': '🦴',
    'Pediatrics': '👶',
    'General Medicine': '🩺',
    'Surgery': '⚕️',
    'Gynecology': '👩',
    'Dermatology': '✨',
    'ENT': '👂',
    'Oncology': '🎗️',
    'Nephrology': '🫀',
    'Neurosurgery': '🧠'
  };
  
  return icons[department] || '🏥';
}

/**
 * Handle get directions
 */
function handleGetDirections(address) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  window.open(url, '_blank');
}

/**
 * Handle share hospital
 */
function handleShareHospital() {
  const url = window.location.href;
  
  if (navigator.share) {
    navigator.share({
      title: currentHospital.name,
      text: `Check out ${currentHospital.name} on Sehat Setu`,
      url: url
    }).catch(err => console.log('Error sharing:', err));
  } else {
    // Fallback - copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      showToast('Link copied to clipboard!');
    });
  }
}

/**
 * Handle add to favorites
 */
function handleAddToFavorites(hospitalId) {
  let favorites = JSON.parse(localStorage.getItem('favorite_hospitals') || '[]');
  
  if (favorites.includes(hospitalId)) {
    favorites = favorites.filter(id => id !== hospitalId);
    showToast('Removed from favorites');
  } else {
    favorites.push(hospitalId);
    showToast('Added to favorites ❤️');
  }
  
  localStorage.setItem('favorite_hospitals', JSON.stringify(favorites));
}

/**
 * Handle emergency call
 */
function handleEmergency(phone) {
  if (confirm('This will call the hospital emergency line. Continue?')) {
    window.location.href = `tel:${phone}`;
  }
}

/**
 * Show department doctors
 */
function showDepartmentDoctors(department) {
  const doctors = currentHospital.doctors.filter(d => d.specialization === department);
  
  let html = `
    <div class="modal-overlay" onclick="closeModal()">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2>${department} Department</h2>
          <button onclick="closeModal()" class="btn btn-ghost">✕</button>
        </div>
        <div class="modal-body">
          ${doctors.map(doctor => `
            <div class="doctor-card" style="margin-bottom: 1rem;">
              <h4>${doctor.name}</h4>
              <p class="specialization">${doctor.specialization}</p>
              ${doctor.experience_years ? `<p>Experience: ${doctor.experience_years} years</p>` : ''}
              ${doctor.qualifications ? `<p>Qualifications: ${doctor.qualifications}</p>` : ''}
              ${doctor.op_timings ? `<p>OPD Timings: ${doctor.op_timings}</p>` : ''}
              ${doctor.days_available ? `<p>Available: ${doctor.days_available}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', html);
}

/**
 * Close modal
 */
function closeModal() {
  const modal = document.querySelector('.modal-overlay');
  if (modal) modal.remove();
}

/**
 * Show toast notification
 */
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Compare hospitals
 */
function compareHospitals(hospitalIds) {
  window.location.href = `hospital-compare.html?ids=${hospitalIds.join(',')}`;
}

/**
 * Generate reviews section
 */
function generateReviews(hospitalId) {
  // Mock reviews for demonstration
  const reviews = [
    {
      name: 'Rajesh Kumar',
      rating: 5,
      date: '2026-02-28',
      text: 'Excellent hospital with great facilities. The doctors are very professional and caring. Highly recommended!',
      helpful: 15
    },
    {
      name: 'Priya Singh',
      rating: 4,
      date: '2026-02-25',
      text: 'Good experience overall. Wait time was a bit long but the treatment was excellent.',
      helpful: 8
    },
    {
      name: 'Amit Sharma',
      rating: 5,
      date: '2026-02-20',
      text: 'Best hospital in the area. Clean, well-maintained, and staff is very helpful.',
      helpful: 22
    }
  ];
  
  let html = '<div class="reviews-section">';
  reviews.forEach(review => {
    html += `
      <div class="review-card slide-in">
        <div class="review-header">
          <div class="reviewer-info">
            <div class="reviewer-avatar">${review.name.charAt(0)}</div>
            <div>
              <div class="reviewer-name">${review.name}</div>
              <div class="review-date">${formatDate(review.date)}</div>
            </div>
          </div>
          <div class="review-rating">${generateStarRating(review.rating, false)}</div>
        </div>
        <div class="review-text">${review.text}</div>
        <div class="review-helpful">
          👍 ${review.helpful} people found this helpful
        </div>
      </div>
    `;
  });
  html += '</div>';
  
  return html;
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateStarRating,
    generateHospitalBadges,
    generateHospitalStats,
    generateQuickActions,
    generateWorkingHours,
    generateMap,
    generateDepartments,
    generateReviews
  };
}
