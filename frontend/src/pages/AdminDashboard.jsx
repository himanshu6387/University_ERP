import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/api';
import './AdminDashboard.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {

  // add images to the Gallery

  const [image, setImage] = useState(null)

  const handleImageChange=(e)=>{
    setImage(e.target.files[0])
    console.log(e.target.files[0])
  }

  const handleImageSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('imageUrl', image)


    try {
      const res = await axios.post('http://localhost:5000/api/images/upload', formData)
      toast.success('File Uploaded Successfully...')
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }

  }

  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalAmount: 0,
    totalContacts: 0,
    totalNews: 0,
    todayDonations: 0,
    pendingPayments: 0
  });
  const [donations, setDonations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(null);
  const navigate = useNavigate();

  // News Management State
  const [showAddNews, setShowAddNews] = useState(false);
  const [newsForm, setNewsForm] = useState({
    title: '',
    description: '',
    source: '',
    url: '',
    imageUrl: '',
    category: 'news'
  });

  // Filter States
  const [donationFilter, setDonationFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser');
    if (!adminUser) {
      navigate('/admin/login');
      return;
    }

    fetchDashboardData();

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    setRefreshInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(activeTab === 'dashboard');

      // Fetch all data
      const [donationsResponse, newsResponse, contactsResponse] = await Promise.all([
        ApiService.getDonations().catch(err => ({ donations: [], totalRaised: 0 })),
        ApiService.getNews().catch(err => []),
        ApiService.getContacts().catch(err => [])
      ]);

      const allDonations = donationsResponse.donations || [];
      const allContacts = contactsResponse || [];
      const allNews = newsResponse || [];

      // Calculate stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayDonations = allDonations.filter(d =>
        new Date(d.createdAt) >= today
      ).length;

      const pendingPayments = allDonations.filter(d =>
        d.status === 'pending'
      ).length;

      setStats({
        totalDonations: allDonations.length,
        totalAmount: donationsResponse.totalRaised || 0,
        totalContacts: allContacts.length,
        totalNews: allNews.length,
        todayDonations,
        pendingPayments
      });

      setDonations(allDonations);
      setContacts(allContacts);
      setNews(allNews);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (refreshInterval) clearInterval(refreshInterval);
    localStorage.removeItem('adminUser');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      await ApiService.addNews(newsForm);
      setNewsForm({
        title: '',
        description: '',
        source: '',
        url: '',
        imageUrl: '',
        category: 'news'
      });
      setShowAddNews(false);
      await fetchDashboardData();
      alert('News added successfully!');
    } catch (error) {
      alert('Error adding news: ' + error.message);
    }
  };

  const updateDonationStatus = async (donationId, newStatus) => {
    try {
      // This would be an API call in a real app
      const updatedDonations = donations.map(d =>
        d._id === donationId ? { ...d, status: newStatus } : d
      );
      setDonations(updatedDonations);
      alert(`Donation status updated to ${newStatus}`);
    } catch (error) {
      alert('Error updating donation status');
    }
  };

  const markContactAsRead = (contactId) => {
    const updatedContacts = contacts.map(c =>
      c._id === contactId ? { ...c, status: 'read' } : c
    );
    setContacts(updatedContacts);
  };

  const getFilteredDonations = () => {
    let filtered = donations;

    // Status filter
    if (donationFilter !== 'all') {
      filtered = filtered.filter(d => d.status === donationFilter);
    }

    // Date filter
    const now = new Date();
    if (dateFilter === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      filtered = filtered.filter(d => new Date(d.createdAt) >= today);
    } else if (dateFilter === 'week') {
      const week = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(d => new Date(d.createdAt) >= week);
    } else if (dateFilter === 'month') {
      const month = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(d => new Date(d.createdAt) >= month);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.purpose.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  if (loading && activeTab === 'dashboard') {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading dashboard...</p>
        </div>
      </div>
    );
  }




  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-info">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <div className="header-status">
              <span className="last-updated">
                Last updated: {new Date().toLocaleTimeString('en-IN')}
              </span>
              <span className="live-indicator">
                <span className="live-dot"></span>
                Live
              </span>
            </div>
          </div>
          <div className="header-actions">
            <button onClick={fetchDashboardData} className="btn btn-refresh">
              <span className="btn-icon">🔄</span>
              Refresh
            </button>
            <button onClick={handleLogout} className="btn btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <div className="nav-content">
          <div className="nav-tabs">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'donations', label: `Donations (${stats.totalDonations})`, icon: '💰' },
              { id: 'contacts', label: `Messages (${stats.totalContacts})`, icon: '📧' },
              { id: 'news', label: 'News Management', icon: '📰' },
              { id: 'analytics', label: 'Analytics', icon: '📈' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-tab ${activeTab === tab.id ? 'nav-tab-active' : ''}`}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="dashboard-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-overview">
            {/* Alert for new donations */}
            {stats.todayDonations > 0 && (
              <div className="alert alert-success">
                <div className="alert-content">
                  <span className="alert-icon">🎉</span>
                  <div className="alert-text">
                    <h4 className="alert-title">New Donations Today!</h4>
                    <p>You have received {stats.todayDonations} new donation{stats.todayDonations > 1 ? 's' : ''} today.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card stat-card-green">
                <div className="stat-content">
                  <div className="stat-info">
                    <p className="stat-label">Total Raised</p>
                    <h3 className="stat-value">{formatCurrency(stats.totalAmount)}</h3>
                    <p className="stat-meta">From {stats.totalDonations} donors</p>
                  </div>
                  <div className="stat-icon">💰</div>
                </div>
              </div>

              <div className="stat-card stat-card-blue">
                <div className="stat-content">
                  <div className="stat-info">
                    <p className="stat-label">Today's Donations</p>
                    <h3 className="stat-value">{stats.todayDonations}</h3>
                    <p className="stat-meta">New donations</p>
                  </div>
                  <div className="stat-icon">🎯</div>
                </div>
              </div>

              <div className="stat-card stat-card-purple">
                <div className="stat-content">
                  <div className="stat-info">
                    <p className="stat-label">Contact Messages</p>
                    <h3 className="stat-value">{stats.totalContacts}</h3>
                    <p className="stat-meta">Total inquiries</p>
                  </div>
                  <div className="stat-icon">📧</div>
                </div>
              </div>

              <div className="stat-card stat-card-orange">
                <div className="stat-content">
                  <div className="stat-info">
                    <p className="stat-label">Pending Payments</p>
                    <h3 className="stat-value">{stats.pendingPayments}</h3>
                    <p className="stat-meta">Need attention</p>
                  </div>
                  <div className="stat-icon">⏳</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="activity-grid">
              {/* Latest Donations */}
              <div className="activity-card">
                <div className="card-header">
                  <h3 className="card-title">Latest Donations</h3>
                  <button onClick={() => setActiveTab('donations')} className="btn btn-link">
                    View All →
                  </button>
                </div>
                <div className="activity-list">
                  {donations.slice(0, 5).map((donation) => (
                    <div key={donation._id} className="activity-item">
                      <div className="activity-info">
                        <h4 className="activity-title">
                          {donation.isAnonymous ? '🕶️ Anonymous' : donation.donorName}
                        </h4>
                        <p className="activity-subtitle">{donation.purpose} • {formatDate(donation.createdAt)}</p>
                        <div className="activity-tags">
                          <span className={`status-badge status-${donation.status}`}>
                            {donation.status}
                          </span>
                          <span className="activity-id">ID: {donation._id?.slice(-6)}</span>
                        </div>
                      </div>
                      <div className="activity-amount">
                        <div className="amount-value">
                          {formatCurrency(donation.amount)}
                        </div>
                        <div className="amount-type">
                          {donation.donationType}
                        </div>
                      </div>
                    </div>
                  ))}
                  {donations.length === 0 && (
                    <div className="empty-state">
                      <div className="empty-icon">💝</div>
                      <p>No donations yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Messages */}
              <div className="activity-card">
                <div className="card-header">
                  <h3 className="card-title">Recent Messages</h3>
                  <button onClick={() => setActiveTab('contacts')} className="btn btn-link">
                    View All →
                  </button>
                </div>
                <div className="activity-list">
                  {contacts.slice(0, 5).map((contact) => (
                    <div
                      key={contact._id}
                      className={`message-item ${contact.status === 'new' ? 'message-new' : contact.status === 'read' ? 'message-read' : 'message-replied'}`}
                      onClick={() => markContactAsRead(contact._id)}
                    >
                      <div className="message-header">
                        <h4 className="message-name">{contact.name}</h4>
                        <span className="message-date">{formatDate(contact.createdAt)}</span>
                      </div>
                      <p className="message-subject">{contact.subject}</p>
                      <p className="message-preview">{contact.message}</p>
                      {contact.status === 'new' && (
                        <span className="new-badge">New</span>
                      )}
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <div className="empty-state">
                      <div className="empty-icon">📬</div>
                      <p>No messages yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="donations-section">
            {/* Filters */}
            <div className="filters-card">
              <h3 className="filters-title">Filter Donations</h3>
              <div className="filters-grid">
                <div className="filter-group">
                  <label className="filter-label">Status</label>
                  <select
                    value={donationFilter}
                    onChange={(e) => setDonationFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label className="filter-label">Date Range</label>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label className="filter-label">Search</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Name, email, or purpose..."
                    className="filter-input"
                  />
                </div>
                <div className="filter-group filter-actions">
                  <button
                    onClick={() => {
                      setDonationFilter('all');
                      setDateFilter('all');
                      setSearchTerm('');
                    }}
                    className="btn btn-secondary"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Donations List */}
            <div className="donations-container">
              <div className="donations-card">
                <div className="donations-header">
                  <h3 className="donations-title">
                    All Donations ({getFilteredDonations().length})
                  </h3>
                </div>

                <div className="donations-list">
                  {getFilteredDonations().map((donation) => (
                    <div key={donation._id} className="donation-item">
                      <div className="donation-info">
                        <div className="donor-header">
                          <h4 className="donor-name">
                            {donation.isAnonymous ? '🕶️ Anonymous Donor' : donation.donorName}
                          </h4>
                          <span className={`status-badge status-${donation.status}`}>
                            {donation.status}
                          </span>
                        </div>

                        <div className="donor-details">
                          <div className="detail-item">📧 {donation.email}</div>
                          <div className="detail-item">📞 {donation.phone || 'Not provided'}</div>
                          <div className="detail-item">🗓️ {formatDate(donation.createdAt)}</div>
                        </div>

                        <div className="donation-tags">
                          <span className="tag tag-purpose">{donation.purpose}</span>
                          <span className="tag tag-type">{donation.donationType}</span>
                          {donation.paymentId && (
                            <span className="tag tag-id">ID: {donation.paymentId}</span>
                          )}
                        </div>

                        {donation.message && (
                          <div className="donation-message">
                            "{donation.message}"
                          </div>
                        )}

                        {donation.status === 'pending' && (
                          <div className="donation-actions">
                            <button
                              onClick={() => updateDonationStatus(donation._id, 'completed')}
                              className="btn btn-success btn-sm"
                            >
                              Mark Completed
                            </button>
                            <button
                              onClick={() => updateDonationStatus(donation._id, 'failed')}
                              className="btn btn-danger btn-sm"
                            >
                              Mark Failed
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="donation-amount">
                        <div className="amount-display">
                          {formatCurrency(donation.amount)}
                        </div>
                        <div className="amount-currency">{donation.currency || 'INR'}</div>
                      </div>
                    </div>
                  ))}

                  {getFilteredDonations().length === 0 && (
                    <div className="empty-state-large">
                      <div className="empty-icon-large">🔍</div>
                      <h3 className="empty-title">No donations found</h3>
                      <p className="empty-message">Try adjusting your filters or search terms.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="contacts-section">
            <div className="contacts-card">
              <div className="contacts-header">
                <h3 className="contacts-title">Contact Messages ({contacts.length})</h3>
              </div>
              <div className="contacts-list">
                {contacts.map((contact) => (
                  <div
                    key={contact._id}
                    className={`contact-item ${contact.status === 'new' ? 'contact-new' : ''}`}
                  >
                    <div className="contact-header">
                      <div className="contact-info">
                        <h4 className="contact-name">{contact.name}</h4>
                        <p className="contact-email">{contact.email}</p>
                        {contact.phone && <p className="contact-phone">{contact.phone}</p>}
                      </div>
                      <div className="contact-meta">
                        <div className="contact-date">{formatDate(contact.createdAt)}</div>
                        <span className={`status-badge status-${contact.status || 'new'}`}>
                          {contact.status || 'new'}
                        </span>
                      </div>
                    </div>

                    <h5 className="contact-subject">Subject: {contact.subject}</h5>
                    <p className="contact-message">{contact.message}</p>

                    <div className="contact-actions">
                      <button
                        onClick={() => markContactAsRead(contact._id)}
                        className="btn btn-primary btn-sm"
                      >
                        Mark as Read
                      </button>
                      <button
                        onClick={() => window.open(`mailto:${contact.email}?subject=Re: ${contact.subject}`)}
                        className="btn btn-success btn-sm"
                      >
                        Reply via Email
                      </button>
                    </div>
                  </div>
                ))}

                {contacts.length === 0 && (
                  <div className="empty-state-large">
                    <div className="empty-icon-large">📭</div>
                    <h3 className="empty-title">No messages yet</h3>
                    <p className="empty-message">Contact messages will appear here when submitted.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="news-section">
            {/* Add News Button */}
            <div className="news-header">
              <h2 className="section-title">News Management</h2>
              <button
                onClick={() => setShowAddNews(true)}
                className="btn btn-primary btn-add"
              >
                ➕ Add News
              </button>
            </div>

            {/* Add News Modal */}
            {showAddNews && (
              <div className="modal-overlay">
                <div className="modal">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title">Add New Article</h3>
                      <button
                        onClick={() => setShowAddNews(false)}
                        className="modal-close"
                      >
                        ×
                      </button>
                    </div>

                    <form onSubmit={handleAddNews} className="news-form">
                      <div className="form-group">
                        <label className="form-label">Title *</label>
                        <input
                          type="text"
                          value={newsForm.title}
                          onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                          required
                          placeholder="Enter news headline"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Description *</label>
                        <textarea
                          value={newsForm.description}
                          onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
                          required
                          rows="3"
                          placeholder="Brief description of the news"
                          className="form-textarea"
                        />
                      </div>

                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">Source *</label>
                          <input
                            type="text"
                            value={newsForm.source}
                            onChange={(e) => setNewsForm({ ...newsForm, source: e.target.value })}
                            required
                            placeholder="e.g., Times of India"
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Category</label>
                          <select
                            value={newsForm.category}
                            onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                            className="form-select"
                          >
                            <option value="news">News</option>
                            <option value="achievement">Achievement</option>
                            <option value="event">Event</option>
                            <option value="announcement">Announcement</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Article URL</label>
                        <input
                          type="url"
                          value={newsForm.url}
                          onChange={(e) => setNewsForm({ ...newsForm, url: e.target.value })}
                          placeholder="https://example.com/article"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Image URL</label>
                        <input
                          type="url"
                          value={newsForm.imageUrl}
                          onChange={(e) => setNewsForm({ ...newsForm, imageUrl: e.target.value })}
                          placeholder="https://example.com/image.jpg"
                          className="form-input"
                        />
                      </div>

                      <div className="form-actions">
                        <button
                          type="button"
                          onClick={() => setShowAddNews(false)}
                          className="btn btn-secondary"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Add Article
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* News List */}
            <div className="news-list">
              {news.map((article) => (
                <div key={article._id} className="news-item">
                  <div className="news-content">
                    <div className="news-meta">
                      <span className={`category-badge category-${article.category}`}>
                        {article.category}
                      </span>
                      <span className="news-source">{article.source}</span>
                      <span className="news-date">
                        {formatDate(article.createdAt || article.publishDate)}
                      </span>
                    </div>
                    <h4 className="news-title">{article.title}</h4>
                    <p className="news-description">{article.description}</p>

                    <div className="news-actions">
                      {article.url && (
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-link btn-sm"
                        >
                          📖 Read Full Article →
                        </a>
                      )}
                      <button className="btn btn-danger btn-sm">
                        🗑️ Delete
                      </button>
                      <button className="btn btn-secondary btn-sm">
                        ✏️ Edit
                      </button>
                    </div>
                  </div>
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="news-image"
                    />
                  )}
                </div>
              ))}

              {news.length === 0 && (
                <div className="empty-state-large">
                  <div className="empty-icon-large">📰</div>
                  <h3 className="empty-title">No news articles yet</h3>
                  <p className="empty-message">Add your first news article to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-section">
            {/* Quick Analytics */}
            <div className="analytics-card">
              <h3 className="analytics-title">Quick Analytics</h3>

              <div className="analytics-grid">
                <div className="analytics-item analytics-blue">
                  <div className="analytics-icon">📊</div>
                  <h4 className="analytics-label">Conversion Rate</h4>
                  <p className="analytics-value">12.5%</p>
                  <p className="analytics-meta">Visitors to donors</p>
                </div>

                <div className="analytics-item analytics-green">
                  <div className="analytics-icon">💰</div>
                  <h4 className="analytics-label">Avg. Donation</h4>
                  <p className="analytics-value">
                    {formatCurrency(stats.totalDonations > 0 ? stats.totalAmount / stats.totalDonations : 0)}
                  </p>
                  <p className="analytics-meta">Per donation</p>
                </div>

                <div className="analytics-item analytics-purple">
                  <div className="analytics-icon">🎯</div>
                  <h4 className="analytics-label">Goal Progress</h4>
                  <p className="analytics-value">
                    {((stats.totalAmount / 10000000) * 100).toFixed(1)}%
                  </p>
                  <p className="analytics-meta">Of ₹1 crore goal</p>
                </div>
              </div>
            </div>

            {/* Donation Methods Chart */}
            <div className="analytics-card">
              <h3 className="analytics-title">Payment Methods Used</h3>
              <div class="analytics-content">
                <div class="methods-stats">
                  <div class="method-item">
                    <div class="method-header">
                      <span class="method-name">Razorpay (UPI/Cards)</span>
                      <span class="method-percentage">75%</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill progress-blue" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <div class="method-item">
                    <div class="method-header">
                      <span class="method-name">Stripe (International)</span>
                      <span class="method-percentage">20%</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill progress-purple" style={{ width: '20%' }}></div>
                    </div>
                  </div>

                  <div class="method-item">
                    <div class="method-header">
                      <span class="method-name">Bank Transfer</span>
                      <span class="method-percentage">5%</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill progress-green" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>

                <div class="insights-panel">
                  <h4 class="insights-title">Donation Insights</h4>
                  <ul class="insights-list">
                    <li>• Most popular amount: ₹5,000</li>
                    <li>• Peak donation time: 7-9 PM</li>
                    <li>• Mobile donations: 68%</li>
                    <li>• Return donors: 23%</li>
                    <li>• Anonymous donations: 15%</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Recent Activity Timeline */}
            <div class="analytics-card">
              <h3 class="analytics-title">Recent Activity</h3>
              <div class="activity-timeline">
                {[
                  { time: '2 minutes ago', action: 'New donation received', details: '₹10,000 from Rajesh Kumar', type: 'donation' },
                  { time: '15 minutes ago', action: 'Contact message', details: 'Inquiry about admission process', type: 'contact' },
                  { time: '1 hour ago', action: 'Payment completed', details: '₹5,000 donation processed', type: 'payment' },
                  { time: '3 hours ago', action: 'News article added', details: 'Times of India coverage added', type: 'news' },
                  { time: '5 hours ago', action: 'New donation received', details: '₹25,000 anonymous donation', type: 'donation' }
                ].map((activity, index) => (
                  <div key={index} class="timeline-item">
                    <div class={`timeline-dot timeline-${activity.type}`}></div>
                    <div class="timeline-content">
                      <h4 class="timeline-action">{activity.action}</h4>
                      <p class="timeline-details">{activity.details}</p>
                      <p class="timeline-time">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <div class="image-form">
        <form onSubmit={handleImageSubmit}>
          <input type="file" onChange={handleImageChange} name="" id="" />
          <button>Upload Image</button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;