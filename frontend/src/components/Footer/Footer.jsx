// / src/components/Footer/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/logo.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src={logo} alt="Umeed Global School" className="footer-logo-img" />
              <h3>SRSV ED&W TRUST</h3>
            </div>
            <p className="footer-description">
              {/* Empowering the next generation of community and global leaders through
              world-class education for underprivileged children. */}
              This noble and compassionate initiative by SRSV Educational & Welfare Trust is dedicated to 400 meritorious and economically underprivileged students — irrespective of their caste or religion. Through this mission, they will be provided with free food, accommodation, and world-class education every year, empowering them to fulfill their dreams and spread new light and inspiration throughout society
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=61581879570840" className="social-link" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@srsvedwtrust" className="social-link" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a2.994 2.994 0 00-2.11-2.12C19.691 3.5 12 3.5 12 3.5s-7.691 0-9.388.566A2.994 2.994 0 00.502 6.186 31.03 31.03 0 000 12a31.03 31.03 0 00.502 5.814 2.994 2.994 0 002.11 2.12C4.309 20.5 12 20.5 12 20.5s7.691 0 9.388-.566a2.994 2.994 0 002.11-2.12A31.03 31.03 0 0024 12a31.03 31.03 0 00-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>

              </a>


              <a href="#" className="social-link" aria-label="Twitter">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 
      1.014-.611 1.794-1.574 2.163-2.724-.951.564-2.005.974-3.127 
      1.195-.897-.959-2.178-1.559-3.594-1.559-2.717 
      0-4.924 2.207-4.924 4.924 0 .39.045.765.127 
      1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.729-.666 
      1.577-.666 2.475 0 1.708.87 3.216 2.188 
      4.099-.807-.026-1.566-.248-2.228-.616v.061c0 
      2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 
      0-.626-.03-.928-.086.627 1.956 2.444 3.379 
      4.6 3.419-1.68 1.318-3.809 2.105-6.115 
      2.105-.398 0-.79-.023-1.175-.068 2.179 1.397 
      4.768 2.213 7.557 2.213 9.054 
      0 14.004-7.496 14.004-13.986 0-.21 
      0-.423-.015-.634.962-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                </svg>
              </a>


              <a href="#" className="social-link" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
              <li><button onClick={() => scrollToSection('about')}>About Us</button></li>
              <li><button onClick={() => scrollToSection('operations')}>Operations</button></li>
              <li><Link to="/infrastructure" onClick={scrollToTop}>Infrastructure</Link></li>
              <li><button onClick={() => scrollToSection('news')}>News</button></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Get Involved</h4>
            <ul className="footer-links">
              <li><button onClick={() => scrollToSection('donate')}>Donate Now</button></li>
              <li><Link to="/contact" onClick={scrollToTop}>Contact Us</Link></li>
              {/* <li><a href="#">Volunteer</a></li>
              <li><a href="#">Partner with Us</a></li>
              <li><a href="#">Apply for Admission</a></li> */}
              <li><Link to={'/adminLogin'}>Login</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Near Tinhari Mafi,Bigra Awwal, Block Semriyawan SantKabir Nagar 272126 ,Uttar Pradesh, India</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>srsv2600@gmail.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>Mobile :+91 7081 8226 00  </span>
              </div>
            </div>

            {/* <div className="newsletter">
              <h5>Subscribe to Updates</h5>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email" />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div> */}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} SRSV ED&W Trust. All rights reserved.</p>
            <p>Developed By <a href="https://allaroundaid.com">AllAroundAid</a></p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
