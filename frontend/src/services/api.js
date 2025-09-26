const API_BASE_URL = 'https://university-erp-2.onrender.com/api';


class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('token');

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      let data;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.message || response.statusText || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Contact
  async submitContact(contactData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }
  async getContacts() {
    return this.request('/contact');
  }

  // Donations
  async submitDonation(donationData) {
    return this.request('/donation', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  }
  async getDonations() {
    return this.request('/donation');
  }

  // News
  async getNews() {
    return this.request('/news');
  }
  async addNews(newsData) {
    return this.request('/news', {
      method: 'POST',
      body: JSON.stringify(newsData),
    });
  }

  // Auth
  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.token) {
      localStorage.setItem('token', response.token);
    }

    return response;
  }
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
  async getProfile() {
    return this.request('/auth/profile');
  }
  logout() {
    localStorage.removeItem('token');
  }
}

export default new ApiService();
