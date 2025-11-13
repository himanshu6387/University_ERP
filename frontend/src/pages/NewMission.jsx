import React from 'react';
import './NewMission.css';

const NewMission = () => {
  return (
    <div className="mission-container">
      <div className="mission-wrapper">
        <div className="mission-header">
          <div className="header-decoration"></div>
          <h1 className="mission-titless">Our Noble Mission</h1>
          <h2 className="mission-subtitle-hindi">हमारा महान अभियान</h2>
          <div className="header-decoration"></div>
        </div>

        <div className="mission-content">
          <div className="content-card">
            <div className="card-glow"></div>
            <div className="mission-icons">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            
            <div className="mission-stats">
              <div className="stat-item">
                <span className="stat-number">400</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">Dreams</span>
              </div>
            </div>

            <p className="mission-text">
              This noble and compassionate initiative by <span className="highlight">SRSV Educational & Welfare Trust</span> is dedicated to <strong>400 meritorious and economically underprivileged students</strong> — irrespective of their caste or religion. Through this mission, they will be provided with free food, accommodation, and world-class education every year, empowering them to fulfill their dreams and spread new light and inspiration throughout society.
            </p>

            <div className="divider-line"></div>

            <p className="mission-text-hindi">
              यह महान और नेक पहल <span className="highlight">SRSV Educational & Welfare Trust</span> द्वारा <strong>400 मेधावी एवं आर्थिक रूप से कमजोर विद्यार्थियों</strong> को समर्पित है — चाहे वे किसी भी जाति या धर्म से संबंधित हों। इस अभियान के अंतर्गत प्रत्येक वर्ष उन्हें निःशुल्क भोजन, आवास एवं विश्वस्तरीय शिक्षा प्रदान की जाएगी, ताकि वे अपने सपनों को साकार कर समाज में नई रोशनी और प्रेरणा का संचार कर सकें।
            </p>

            <div className="mission-features">
              <div className="feature-item">
                <div className="feature-icon">🍽️</div>
                <span>Free Food</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🏠</div>
                <span>Accommodation</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📚</div>
                <span>World-Class Education</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mission-footer">
          <div className="footer-quote">
            <span className="quote-mark">"</span>
            <p>Empowering dreams, transforming lives, inspiring society</p>
            <span className="quote-mark">"</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMission;