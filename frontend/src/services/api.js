const BASE_URL = 'http://localhost:8085/api';

async function fetchJson(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    if (!res.ok) {
      let errData = {};
      try {
        errData = await res.json();
      } catch (e) {}
      throw new Error(errData.error || errData.message || `Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Destinations
  getDestinations: () => fetchJson('/destinations'),
  getDestinationBySlug: (slug) => fetchJson(`/destinations/${slug}`),
  getDestinationsByCategory: (cat) => fetchJson(`/destinations/category/${encodeURIComponent(cat)}`),

  // Packages
  getPackages: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.mood && filters.mood !== 'All') params.append('mood', filters.mood);
    if (filters.destination && filters.destination !== 'All') params.append('destination', filters.destination);
    if (filters.month && filters.month !== 'All') params.append('month', filters.month);
    if (filters.search) params.append('search', filters.search);
    const qs = params.toString();
    return fetchJson(`/packages${qs ? `?${qs}` : ''}`);
  },
  getSignaturePackages: () => fetchJson('/packages/signatures'),
  getPackageBySlug: (slug) => fetchJson(`/packages/${slug}`),
  getPackagesByDestination: (slug) => fetchJson(`/packages/destination/${slug}`),
  getPackagesByTravellerType: (type) => fetchJson(`/packages/traveller-type/${encodeURIComponent(type)}`),

  // Accommodations
  getAccommodations: () => fetchJson('/accommodations'),
  getAccommodationsByDestination: (slug) => fetchJson(`/accommodations/destination/${slug}`),

  // Testimonials & Journal
  getTestimonials: () => fetchJson('/testimonials'),
  getJournalPosts: () => fetchJson('/journal'),
  getJournalPostBySlug: (slug) => fetchJson(`/journal/${slug}`),

  // Enquiry & Newsletter
  submitEnquiry: (data) => fetchJson('/enquiries', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getEnquiryByRef: (ref) => fetchJson(`/enquiries/ref/${ref}`),
  getUserEnquiries: (email) => fetchJson(`/enquiries/user/${encodeURIComponent(email)}`),
  subscribeNewsletter: (data) => fetchJson('/newsletter', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Auth & User
  login: (credentials) => fetchJson('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  register: (userData) => fetchJson('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  getUserFavourites: (userId) => fetchJson(`/auth/favourites/${userId}`),
  toggleFavourite: (userId, packageId) => fetchJson(`/auth/favourites/${userId}/${packageId}`, {
    method: 'POST'
  }),

  // Admin
  getAdminStats: () => fetchJson('/admin/stats'),
  getAllEnquiriesAdmin: () => fetchJson('/admin/enquiries'),
  updateEnquiryStatus: (id, status) => fetchJson(`/admin/enquiries/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),
  getSubscribersAdmin: () => fetchJson('/admin/subscribers'),
  deletePackageAdmin: (id) => fetchJson(`/admin/packages/${id}`, { method: 'DELETE' }),
  createPackageAdmin: (pkg) => fetchJson('/admin/packages', {
    method: 'POST',
    body: JSON.stringify(pkg)
  })
};
