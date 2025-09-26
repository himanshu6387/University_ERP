// src/components/About/About.js
import React, { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const aboutRef = useRef();

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

    const elements = aboutRef.current.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const missions = [
    {
      icon: "🎓",
      title: "World Class School & Center of Excellence",
      description: "Creating an educational institution that rivals the best in the world, providing exceptional learning experiences."
    },
    {
      icon: "👥",
      title: "Community & Global Leaders",
      description: "Nurturing students to become influential leaders who can make positive impacts in their communities and beyond."
    },
    {
      icon: "🔬",
      title: "STEM Learning & Innovation",
      description: "Promoting Science, Technology, Engineering, and Mathematics education alongside innovation and entrepreneurship."
    },
    // {
    //   icon: "🧠",
    //   title: "21st Century Skills",
    //   description: "Inculcating critical thinking, creativity, collaboration, and communication skills essential for the modern world."
    // },
    {
      icon: "⭐",
      title: "Upright Character",
      description: "Nurturing strong moral compass and character development through Islamic values and Tarbiyah."
    }
  ];

  return (
    <section id="about" className="about section" ref={aboutRef}>
      <div className="container">
        <div className="about-header fade-in">
          <h2 className="section-title">About Us</h2>
          <p className="section-subtitle">
            We are dedicated to transforming the lives of underprivileged children by providing them with 
            world-class education and opportunities that were once reserved for the privileged.
          </p>
        </div>

        <div className="about-content">
          <div className="about-intro slide-in-left">
            <div className="intro-content">
              <h3>We are on the Mission to:</h3>
              <p>
                At Umeed Global School, we believe that every child deserves access to quality education, 
                regardless of their socioeconomic background. Our mission is to bridge the educational gap 
                and create opportunities for underprivileged children to excel and become future leaders.
              </p>
              <div className="stats">
                <div className="stat-item">
                  <span className="stat-number">₹6+ Crore</span>
                  <span className="stat-label">Raised in 6 Days</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Future Students</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Expert Teachers</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mission-grid slide-in-right">
            {missions.map((mission, index) => (
              <div key={index} className="mission-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mission-icon">{mission.icon}</div>
                <h4 className="mission-title">{mission.title}</h4>
                <p className="mission-description">{mission.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="founder-section fade-in">
          <div className="founder-content">
            <div className="founder-image">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Wali Rahmani - Founder"
                className="founder-img"
              />
            </div>
            <div className="founder-info">
              <h3>Meet Our Founder</h3>
              <h4>Wali Rahmani</h4>
              <p className="founder-title">Social Activist & Lawyer</p>
              <p className="founder-description">
                At just 25 years old, Wali Rahmani from West Bengal has successfully crowdfunded 
                ₹6 crore in just 6 days for his vision of creating a "school of rich for poor". 
                His dedication to providing quality English-medium education to underprivileged 
                children has captured hearts across the nation.
              </p>
              <div className="founder-achievements">
                <div className="achievement">
                  <span className="achievement-number">₹6 Crore</span>
                  <span className="achievement-text">Raised in 6 Days</span>
                </div>
                <div className="achievement">
                  <span className="achievement-number">25 Years</span>
                  <span className="achievement-text">Young Visionary</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;