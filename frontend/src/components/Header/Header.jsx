// src/components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdmissionBanner, setShowAdmissionBanner] = useState(true);
  const navigate = useNavigate()

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const closeBanner = () => setShowAdmissionBanner(false);

  const donateBtn=()=>{
    navigate('/donation')
  }

  return (
    <>
      {/* Admission Banner */}
      {showAdmissionBanner && (
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
      )}

      <header
        className={`header ${isScrolled ? "scrolled" : ""} ${!showAdmissionBanner ? "no-banner" : ""
          }`}
      >
        <div className="container">
          <div className="nav-wrapper">
            {/* Logo */}
            <Link to="/" className="logo" onClick={closeMenu}>
              <img
                src="https://static.vecteezy.com/system/resources/previews/018/902/537/original/university-college-school-badge-logo-design-image-education-badge-logo-design-university-high-school-emblem-free-vector.jpg"
                alt="School Logo"
              />
            </Link>

            {/* Navigation */}
            <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={closeMenu}>
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle">About ▾</span>
                  <div className="dropdown-menu">
                    <Link to="/about">About Us</Link>
                    <Link to="/mission">Our Mission</Link>
                    <Link to="/founder">Founder</Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle">People ▾</span>
                  <div className="dropdown-menu">
                    <Link to="/faculty">Faculty</Link>
                    <Link to="/staff">Staff</Link>
                    <Link to="/students">Students</Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle">What We Do ▾</span>
                  <div className="dropdown-menu">
                    <Link to="/operations">Operations</Link>
                    <Link to="/academics">Academics</Link>
                    <Link to="/residential">Residential</Link>
                    <Link to="/innovation">Innovation</Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle">Admission ▾</span>
                  <div className="dropdown-menu">
                    <Link to="/admission">Apply Now</Link>
                    <Link to="/admission-process">Process</Link>
                    <Link to="/fees">Fee Structure</Link>
                    <Link to="/scholarships">Scholarships</Link>
                  </div>
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
                  <span className="follow-text">Follow Us :</span>
                  <div className="social-links">
                    <a href="#" className="social-link facebook">
                      F
                    </a>
                    <a href="#" className="social-link instagram">
                      I
                    </a>
                    <a href="#" className="social-link linkedin">
                      L
                    </a>
                    <a href="#" className="social-link twitter">
                      T
                    </a>
                  </div>
                </div>
                <button className="donate-btn-nav" onClick={donateBtn}>DONATE NOW</button>
              </div>
            </nav>

            {/* Hamburger */}

            {/* Hamburger / Close button */}
<button
  className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
  onClick={toggleMenu}
  aria-label="Toggle menu"
>
  {isMenuOpen ? (
    <span className="close-icon">&times;</span>  // X symbol
  ) : (
    <>
      <span></span>
      <span></span>
      <span></span>
    </>
  )}
</button>


          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
