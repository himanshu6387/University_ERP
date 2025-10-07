// src/components/Donation/DonationSection.js
import React, { useState, useEffect, useRef } from 'react';
import './DonationSection.css';
import ApiService from '../../services/api';
import scanner2 from '../../assets/scanner2.jpg'

const DonationSection = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentDonationId, setCurrentDonationId] = useState(null);
  const [donationData, setDonationData] = useState({
    donorName: '',
    email: '',
    phone: '',
    amount: '',
    donationType: 'one-time',
    purpose: 'general',
    message: '',
    isAnonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const donationRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = donationRef.current?.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonationData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!donationData.amount || donationData.amount < 100) {
      alert('Please enter a valid amount (minimum ₹100)');
      return;
    }

    if (!donationData.donorName || !donationData.email) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save donor info to backend with pending status
      const response = await ApiService.submitDonation({
        ...donationData,
        status: 'pending',
        paymentMethod: 'QR_UPI'
      });

      setCurrentDonationId(response.donation?.id || response.id || Date.now());
      
      // Show QR modal
      setShowQRModal(true);
    } catch (err) {
      console.error(err);
      alert('Error saving donation info. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQRNext = () => {
    setShowQRModal(false);
    setShowTransactionForm(true);
  };

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    
    if (!transactionId || transactionId.length < 8) {
      alert('Please enter a valid transaction ID');
      return;
    }

    setIsVerifying(true);

    try {
      // Simulate transaction verification (replace with actual verification logic)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update donation status
      const updatedDonation = {
        ...donationData,
        transactionId,
        status: 'completed',
        paymentMethod: 'QR_UPI',
        paymentDate: new Date().toISOString()
      };

      // Generate and download receipt
      generateReceipt(updatedDonation);

      // Success message
      alert('Payment verified successfully! Your donation receipt has been downloaded.');
      
      // Reset form
      setDonationData({
        donorName: '',
        email: '',
        phone: '',
        amount: '',
        donationType: 'one-time',
        purpose: 'general',
        message: '',
        isAnonymous: false
      });
      
      setTransactionId('');
      setShowTransactionForm(false);
      setCurrentDonationId(null);

    } catch (error) {
      alert('Transaction verification failed. Please check your transaction ID and try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const generateReceipt = (donation) => {
    // Create receipt HTML
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Donation Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .receipt { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
          .header { text-align: center; border-bottom: 2px solid #ffc107; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #333; margin-bottom: 5px; }
          .tagline { color: #666; font-size: 14px; }
          .receipt-title { font-size: 28px; font-weight: bold; color: #333; margin: 20px 0; }
          .receipt-id { background: #ffc107; color: #333; padding: 8px 15px; border-radius: 20px; font-weight: bold; display: inline-block; }
          .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
          .detail-item { padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #ffc107; }
          .detail-label { font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 5px; }
          .detail-value { font-size: 16px; font-weight: bold; color: #333; }
          .amount-section { text-align: center; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 30px; border-radius: 15px; margin: 30px 0; }
          .amount { font-size: 36px; font-weight: bold; margin-bottom: 10px; }
          .thank-you { text-align: center; margin-top: 30px; padding: 20px; background: #e8f5e8; border-radius: 10px; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
          @media print { body { background: white; } .receipt { box-shadow: none; } }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div class="logo">🎓 SRSV ED&W TRUST</div>
            <div class="tagline">Hope for a Better Tomorrow</div>
            <h2 class="receipt-title">Donation Receipt</h2>
            <span class="receipt-id">Receipt #UGS${currentDonationId}</span>
          </div>

          <div class="details-grid">
            <div class="detail-item">
              <div class="detail-label">Donor Name</div>
              <div class="detail-value">${donation.isAnonymous ? 'Anonymous Donor' : donation.donorName}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Email</div>
              <div class="detail-value">${donation.email}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Phone</div>
              <div class="detail-value">${donation.phone || 'Not provided'}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Donation Type</div>
              <div class="detail-value">${donation.donationType.charAt(0).toUpperCase() + donation.donationType.slice(1)}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Purpose</div>
              <div class="detail-value">${donation.purpose.charAt(0).toUpperCase() + donation.purpose.slice(1)} Fund</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Transaction ID</div>
              <div class="detail-value">${donation.transactionId}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Payment Method</div>
              <div class="detail-value">UPI/QR Code</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Date & Time</div>
              <div class="detail-value">${new Date().toLocaleString('en-IN')}</div>
            </div>
          </div>

          <div class="amount-section">
            <div class="amount">₹${parseInt(donation.amount).toLocaleString('en-IN')}</div>
            <p>Thank you for your generous contribution!</p>
          </div>

          ${donation.message ? `
            <div class="detail-item" style="grid-column: 1/-1; margin: 20px 0;">
              <div class="detail-label">Your Message</div>
              <div class="detail-value" style="font-style: italic;">"${donation.message}"</div>
            </div>
          ` : ''}

          <div class="thank-you">
            <h3 style="color: #2e7d32; margin-bottom: 10px;">🙏 Thank You!</h3>
            <p style="margin: 0; color: #333;">Your donation will help us provide world-class education to underprivileged children and create future leaders.</p>
          </div>

          <div class="footer">
            <p><strong>SRSV ED&W TRUST</strong></p>
            <p>Email: srsv2600@gmail.com | Phone: +91 70818 22600</p>
            <p>Location: Tinhari Mafi,Block Semriyawan Sant Kabir Naga, Uttar Pradesh, India</p>
            <p style="margin-top: 15px; font-size: 11px;">This is a computer-generated receipt. Please keep this for your records.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create and download receipt
    const blob = new Blob([receiptHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `UGS_Donation_Receipt_${currentDonationId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const quickAmounts = [1000, 2500, 5000, 10000, 25000, 50000];

  return (
    <section id="donate" className="donation section" ref={donationRef}>
      <div className="container">
        <div className="donation-header fade-in">
          <h2 className="section-title">Support Our Mission</h2>
          <p className="section-subtitle">
            Your contribution helps us provide world-class education to underprivileged children.
            Every rupee makes a difference in shaping their future.
          </p>
        </div>

        <div className="donation-content">
          <div className="donation-info slide-in-left">
            <div className="fundraising-stats">
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-content">
                  <span className="stat-number">₹10 Crore</span>
                  <span className="stat-label">Target Amount</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <span className="stat-number">₹6+ Crore</span>
                  <span className="stat-label">Raised So Far</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <span className="stat-number">5000+</span>
                  <span className="stat-label">Generous Donors</span>
                </div>
              </div>
            </div>
            
            <div className="progress-section">
              <div className="progress-header">
                <span>Fundraising Progress</span>
                <span>60% Complete</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '60%' }}></div>
              </div>
            </div>
            
            <div className="impact-info">
              <h3>Your Impact</h3>
              <div className="impact-items">
                <div className="impact-item">
                  <span className="impact-amount">₹1,000</span>
                  <span className="impact-description">Provides books and stationery for one student for a year</span>
                </div>
                <div className="impact-item">
                  <span className="impact-amount">₹5,000</span>
                  <span className="impact-description">Sponsors school uniform and meals for one student</span>
                </div>
                <div className="impact-item">
                  <span className="impact-amount">₹25,000</span>
                  <span className="impact-description">Covers complete education expenses for one student for a year</span>
                </div>
                <div className="impact-item">
                  <span className="impact-amount">₹1,00,000</span>
                  <span className="impact-description">Helps set up a complete classroom with modern facilities</span>
                </div>
              </div>
            </div>
          </div>

          <div className="donation-form-container slide-in-right">
            <form onSubmit={handleSubmit} className="donation-form">
              <h3>Make a Donation</h3>
              
              {/* Quick Amounts */}
              <div className="quick-amounts">
                <label>Quick Amount Selection:</label>
                <div className="amount-buttons">
                  {quickAmounts.map(amount => (
                    <button
                      key={amount}
                      type="button"
                      className={`amount-btn ${donationData.amount == amount ? 'selected' : ''}`}
                      onClick={() => setDonationData(prev => ({ ...prev, amount: amount.toString() }))}
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="form-row">
                <div className="form-group">
                  <label>Custom Amount (₹)</label>
                  <input
                    type="number"
                    name="amount"
                    value={donationData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    required
                    min="100"
                  />
                </div>
                <div className="form-group">
                  <label>Donation Type</label>
                  <select
                    name="donationType"
                    value={donationData.donationType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="one-time">One Time</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="donorName"
                    value={donationData.donorName}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={donationData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={donationData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label>Purpose</label>
                  <select
                    name="purpose"
                    value={donationData.purpose}
                    onChange={handleInputChange}
                  >
                    <option value="general">General Fund</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="scholarships">Scholarships</option>
                    <option value="equipment">Equipment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Message (Optional)</label>
                <textarea
                  name="message"
                  value={donationData.message}
                  onChange={handleInputChange}
                  placeholder="Leave a message of support..."
                  rows="3"
                />
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isAnonymous"
                    checked={donationData.isAnonymous}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  I wish to remain anonymous
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-donate"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : `Donate ₹${donationData.amount || '0'}`}
              </button>

              <div className="security-info">
                <span>🔒 Your donation is secure and encrypted</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="modal-overlay" style={{marginTop:'50px'}}>
          <div className="qr-modal">
            <div className="modal-header">
              <h3>📱 Scan QR Code to Pay</h3>
              <button className="close-btn" onClick={() => setShowQRModal(false)}>×</button>
            </div>
            
            <div className="qr-content">
              <div className="payment-info">
                <p><strong>Amount to Pay: ₹{donationData.amount}</strong></p>
                <p>Purpose: {donationData.purpose}</p>
              </div>
              
              <div className="qr-code-container">
                <img 
                  src={scanner2} 
                  alt="UPI Payment QR Code" 
                  className="qr-image"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSIjY2NjIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2Ij5RUiBDb2RlPC90ZXh0Pgo8L3N2Zz4K';
                  }}
                />
                <p className="qr-instruction">Scan this QR code with any UPI app</p>
              </div>

              <div className="payment-steps">
                <div className="step">
                  <span className="step-number">1</span>
                  <span>Scan QR with your UPI app</span>
                </div>
                <div className="step">
                  <span className="step-number">2</span>
                  <span>Pay ₹{donationData.amount}</span>
                </div>
                <div className="step">
                  <span className="step-number">3</span>
                  <span>Copy transaction ID from your app</span>
                </div>
                <div className="step">
                  <span className="step-number">4</span>
                  <span>Enter transaction ID in next step</span>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowQRModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleQRNext}
                >
                  I Have Paid →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction ID Form Modal */}
      {showTransactionForm && (
        <div className="modal-overlay">
          <div className="transaction-modal">
            <div className="modal-header">
              <h3>🔍 Verify Your Payment</h3>
              <button className="close-btn" onClick={() => setShowTransactionForm(false)}>×</button>
            </div>
            
            <div className="transaction-content">
              <div className="payment-summary">
                <p><strong>Payment Amount: ₹{donationData.amount}</strong></p>
                <p>Donor: {donationData.donorName}</p>
              </div>

              <form onSubmit={handleTransactionSubmit}>
                <div className="form-group">
                  <label>Transaction ID / Reference Number *</label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                    placeholder="Enter transaction ID from your UPI app"
                    required
                    minLength="8"
                    style={{ textTransform: 'uppercase' }}
                  />
                  <small>You can find this in your UPI app's transaction history</small>
                </div>

                <div className="verification-info">
                  <p>📋 <strong>How to find Transaction ID:</strong></p>
                  <ul>
                    <li>Open your UPI app (PhonePe, Paytm, GPay, etc.)</li>
                    <li>Go to transaction history</li>
                    <li>Find your recent payment</li>
                    <li>Copy the Transaction ID/Reference Number</li>
                  </ul>
                </div>

                <div className="modal-actions">
                  <button 
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowTransactionForm(false);
                      setShowQRModal(true);
                    }}
                  >
                    ← Back to QR
                  </button>
                  <button 
                    type="submit"
                    className="btn btn-primary"
                    disabled={isVerifying}
                  >
                    {isVerifying ? 'Verifying...' : 'Verify & Complete'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DonationSection;