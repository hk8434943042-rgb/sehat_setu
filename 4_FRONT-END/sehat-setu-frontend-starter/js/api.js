// API Configuration and Helper Functions for Sehat Setu
// Priority:
// 1) localStorage.SEHAT_API_BASE_URL
// 2) window.SEHAT_API_BASE_URL
// 3) localhost default
// 4) production backend (Render)
const DEFAULT_LOCAL_API_BASE_URL = 'http://127.0.0.1:5000';
const DEFAULT_PROD_API_BASE_URL = 'https://sehat-setu-api.onrender.com';

const API_BASE_URL = (
  localStorage.getItem('SEHAT_API_BASE_URL') ||
  window.SEHAT_API_BASE_URL ||
  (['localhost', '127.0.0.1'].includes(window.location.hostname)
    ? DEFAULT_LOCAL_API_BASE_URL
    : DEFAULT_PROD_API_BASE_URL)
).replace(/\/$/, '');

if (
  window.location.hostname !== 'localhost' &&
  window.location.hostname !== '127.0.0.1' &&
  API_BASE_URL.includes('your-backend-domain.com')
) {
  console.warn(
    '[Sehat Setu] Configure production API URL in js/api.js (DEFAULT_PROD_API_BASE_URL) or set localStorage.SEHAT_API_BASE_URL'
  );
}

/**
 * Generic API request handler with error handling
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.description || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
}

/**
 * Public API Methods
 */
const API = {
  // Get list of hospitals with optional filters
  async getHospitals(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/hospitals?${queryString}` : '/hospitals';
    return apiRequest(endpoint);
  },

  // Get detailed hospital information by ID
  async getHospitalDetail(hospitalId) {
    return apiRequest(`/hospital/${hospitalId}`);
  },

  // Search hospitals and treatments
  async search(query) {
    return apiRequest(`/search?q=${encodeURIComponent(query)}`);
  },

  // Admin: Create a new hospital
  async createHospital(hospitalData) {
    return apiRequest('/admin/hospital', {
      method: 'POST',
      body: JSON.stringify(hospitalData),
    });
  },

  // Admin: Update hospital information
  async updateHospital(hospitalId, hospitalData) {
    return apiRequest(`/admin/hospital/${hospitalId}`, {
      method: 'PUT',
      body: JSON.stringify(hospitalData),
    });
  },

  // Admin: Delete a hospital
  async deleteHospital(hospitalId) {
    return apiRequest(`/admin/hospital/${hospitalId}`, {
      method: 'DELETE',
    });
  },

  // Health check
  async healthCheck() {
    return apiRequest('/');
  },
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API, API_BASE_URL };
}
