// src/components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from '../../assets/logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdmissionBanner, setShowAdmissionBanner] = useState(true);
  const navigate = useNavigate()

  const handleScroll = () => {
    navigate('/about', { state: { scrollTo: 'founder' } })
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.paddingTop = showAdmissionBanner ? "100px" : "60px";
    return () => {
      document.body.style.paddingTop = "0";
    };
  }, [showAdmissionBanner]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const closeBanner = () => setShowAdmissionBanner(false);

  const donateBtn = () => {
    navigate('/donation')
  }

  return (
    <>
      {/* Admission Banner */}
      {/* {showAdmissionBanner && (
        <div className="admission-banner">
          <div className="banner-content">
            <span className="banner-text">
              Admissions now open for the Session 2025-2026
            </span>
            <button className="enroll-btn">Enroll Now!!</button>
            <button
              className="close-banner"
              onClick={closeBanner}
              aria-label="Close banner"
            >
              ×
            </button>
          </div>
        </div>
      )} */}

      <header
        className={`header ${isScrolled ? "scrolled" : ""} ${!showAdmissionBanner ? "no-banner" : ""
          }`}
      >
        <div className="container">
          <div className="nav-wrapper">
            {/* Logo */}
            <Link to="/" className="logo" onClick={closeMenu}>
              <img
                src={logo}
                alt="School Logo"
              />
            </Link>

            {/* Navigation */}
            <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
              {/* Close button inside nav for mobile */}
              <button
                className="nav-close-btn"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                ×
              </button>

              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={closeMenu}>
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle">About ▾</span>
                  <div className="dropdown-menu">
                    <Link to="/about" onClick={closeMenu}>About Us</Link>
                    <button style={{ width: '100%', textAlign: 'left' }} onClick={() => { handleScroll(); closeMenu(); }}>
                      <Link>Founder</Link>
                    </button>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle">People ▾</span>
                  <div className="dropdown-menu">
                    <Link to="/faculty" onClick={closeMenu}>Faculty</Link>
                    <Link to="/staff" onClick={closeMenu}>Staff</Link>
                    <Link to="/students" onClick={closeMenu}>Students</Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a href="#mission-part" onClick={closeMenu}><span className="nav-link dropdown-toggle">Our Mission</span></a>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link" onClick={closeMenu}>
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/gallery" className="nav-link" onClick={closeMenu}>
                    Gallery
                  </Link>
                </li>
              </ul>

              {/* Social + Donate */}
              <div className="nav-actions">
                <div className="social-follow">
                  <span className="follow-text">Follow Us:</span>
                  <div className="social-links">
                    {/* Facebook */}
                    <a href="https://www.facebook.com/profile.php?id=61581879570840" className="social-link facebook" aria-label="Facebook">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.92.001c-1.504 0-1.794.715-1.794 1.763v2.314h3.587l-.467 3.696h-3.12V24h6.116C23.406 24 24 23.407 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a href="#" className="social-link instagram" aria-label="Instagram">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.246 2.428.415a4.92 4.92 0 0 1 1.78 1.152 4.92 4.92 0 0 1 1.152 1.78c.169.458.359 1.258.415 2.428.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.246 1.97-.415 2.428a4.92 4.92 0 0 1-1.152 1.78 4.92 4.92 0 0 1-1.78 1.152c-.458.169-1.258.359-2.428.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.246-2.428-.415a4.92 4.92 0 0 1-1.78-1.152 4.92 4.92 0 0 1-1.152-1.78c-.169-.458-.359-1.258-.415-2.428C2.175 15.784 2.163 15.404 2.163 12s.012-3.584.07-4.85c.056-1.17.246-1.97.415-2.428a4.92 4.92 0 0 1 1.152-1.78 4.92 4.92 0 0 1 1.78-1.152c.458-.169 1.258-.359 2.428-.415C8.416 2.175 8.796 2.163 12 2.163zM12 5.838A6.162 6.162 0 1 0 18.162 12 6.169 6.169 0 0 0 12 5.838zm0 10.162A3.998 3.998 0 1 1 16 12a4.005 4.005 0 0 1-4 4zm6.406-11.845a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
                      </svg>
                    </a>

                    {/* YouTube */}
                    <a href="https://www.youtube.com/@srsvedwtrust" className="social-link" aria-label="YouTube">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a2.994 2.994 0 00-2.11-2.12C19.691 3.5 12 3.5 12 3.5s-7.691 0-9.388.566A2.994 2.994 0 00.502 6.186 31.03 31.03 0 000 12a31.03 31.03 0 00.502 5.814 2.994 2.994 0 002.11 2.12C4.309 20.5 12 20.5 12 20.5s7.691 0 9.388-.566a2.994 2.994 0 002.11-2.12A31.03 31.03 0 0024 12a31.03 31.03 0 00-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                      </svg>
                    </a>

                    {/* Twitter */}
                    <a href="#" className="social-link twitter" aria-label="Twitter">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.954 4.569a10 10 0 0 1-2.825.775A4.932 4.932 0 0 0 23.337 3.1a9.864 9.864 0 0 1-3.127 1.195A4.918 4.918 0 0 0 16.616 3c-2.737 0-4.957 2.208-4.957 4.936 0 .39.045.765.127 1.124C7.728 8.864 4.1 6.918 1.67 3.897a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.215 2.188 4.099a4.903 4.903 0 0 1-2.244-.616v.06c0 2.385 1.703 4.374 3.946 4.827a4.996 4.996 0 0 1-2.237.084c.63 1.953 2.445 3.376 4.6 3.418A9.868 9.868 0 0 1 0 19.54a13.924 13.924 0 0 0 7.548 2.212c9.056 0 14.01-7.496 14.01-13.986 0-.21-.005-.423-.014-.634A10.012 10.012 0 0 0 24 4.59z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <button className="donate-btn-nav" onClick={() => { donateBtn(); closeMenu(); }}>DONATE NOW</button>
              </div>
            </nav>

            {/* Hamburger button */}
            <button
              className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;