// / src/pages/Contact.js
import React, { useState } from 'react';
import './Contact.css';
import ApiService from '../services/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      // Submit to actual API
      await ApiService.submitContact(formData);
      toast.success('Thank you for your message! We will get back to you soon.');

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with us. We'd love to hear from you.</p>
        </div>
      </div>

      <div className="contact-content section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon">📍</div>
                <h3>Location</h3>
                <p>Tinhari Mafi, Block  Semriyawan sant Kabir Nagar,Uttar Pradesh, India</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">📧</div>
                <h3>Email</h3>
                <p>srsv2600@gmail.com</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">📞</div>
                <h3>Phone</h3>
                <p>Number:+91 70818 22600</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">🕒</div>
                <h3>Office Hours</h3>
                <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <h2>Send us a Message</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
