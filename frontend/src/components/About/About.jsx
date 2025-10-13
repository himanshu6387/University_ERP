// src/components/About/About.js
import React, { useEffect, useRef } from 'react';
import './About.css';
import logo from '../../assets/logo.png'

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
    // {
    //   icon: "🎓",
    //   title: "World Class School & Center of Excellence",
    //   description: "Creating an educational institution that rivals the best in the world, providing exceptional learning experiences."
    // },
    {
      icon: "🎓",
      title: "Mission: मिशन",
      description: "देशभर में “Education for All, Free for All” अभियान के माध्यम से एक ऐसी फीस-फ्री शिक्षा प्रणाली स्थापित करना, जिससे हर ज़रूरतमंद बच्चा निःशुल्क और गुणवत्तापूर्ण शिक्षा प्राप्त कर सके"
    },
    // {
    //   icon: "👥",
    //   title: "Community & Global Leaders",
    //   description: "Nurturing students to become influential leaders who can make positive impacts in their communities and beyond."
    // },
    // {
    //   icon: "🔬",
    //   title: "STEM Learning & Innovation",
    //   description: "Promoting Science, Technology, Engineering, and Mathematics education alongside innovation and entrepreneurship."
    // },
    // {
    //   icon: "🧠",
    //   title: "21st Century Skills",
    //   description: "Inculcating critical thinking, creativity, collaboration, and communication skills essential for the modern world."
    // },
    {
      icon: "⭐",
      title: "Vision: दृष्टिकोण",
      description: "हर बच्चे को गुणवत्तापूर्ण और समान शिक्षा का अधिकार मिले, जहाँ आर्थिक स्थिति कभी भी शिक्षा के रास्ते की रुकावट न बने। हम ऐसा भारत बनाना चाहते हैं जहाँ हर बच्चा अपनी प्रतिभा और सपनों को खुलकर जी सके।"
    }
  ];

  return (
    <section id="about" className="about section" ref={aboutRef}>
      <div className="container">
        <div className="about-header fade-in">
          <h2 className="section-title">About Us</h2>
          <p className="section-subtitle">
           We are dedicated to transforming the lives of underprivileged children by providing them with world-class education and opportunities that were once reserved for the privileged.
          </p>
        </div>

        <div className="about-content">
          <div className="about-intro slide-in-left">
            <div className="intro-content">
              <h3>We are on the Mission to:</h3>
              <p>
                देशभर में “Education for All, Free for All” अभियान के माध्यम से एक ऐसी फीस-फ्री शिक्षा प्रणाली स्थापित करना, जिससे हर ज़रूरतमंद बच्चा निःशुल्क और गुणवत्तापूर्ण शिक्षा प्राप्त कर सके।

              </p>
              <div className="stats">
                <div className="stat-item">
                  <span className="stat-number">&#8377; 1cr+</span>
                  <span className="stat-label">Donate By Founder</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1200+</span>
                  <span className="stat-label">Every Year Future Students</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">45+</span>
                  <span className="stat-label">Expert Teachers in Future</span>
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
                src={logo}
                alt="Wali Rahmani - Founder"
                className="founder-img"
              />
              {/* <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Wali Rahmani - Founder"
                className="founder-img"
              /> */}
            </div>
            <div className="founder-info">
              {/* <h3>Meet Our Founder</h3> */}
              <h3>Meet Our Mission</h3>
              {/* <h4>Wali Rahmani</h4> */}
              <h4>SRSV ED&W TRUST</h4>
              {/* <p className="founder-title">Social Activist & Lawyer</p> */}
              <p className="founder-title">TRUST Registration No . 377V/2023</p>
              <p className="founder-description">
                {/* At just 25 years old, Wali Rahmani from West Bengal has successfully crowdfunded 
                ₹6 crore in just 6 days for his vision of creating a "school of rich for poor". 
                His dedication to providing quality English-medium education to underprivileged 
                children has captured hearts across the nation. */}


                हमारा ट्रस्ट मानता है कि हर बच्चे को गुणवत्तापूर्ण और समान शिक्षा पाने का अधिकार है, चाहे उसकी आर्थिक स्थिति कैसी भी हो। शिक्षा सभी का मूल अधिकार होनी चाहिए। दुर्भाग्य से, भारत में कई बच्चे इसलिए पढ़ाई नहीं कर पाते क्योंकि उनके परिवार स्कूल की फीस वहन नहीं कर सकते। हम एक ऐसी शिक्षा प्रणाली बनाकर इसे बदलना चाहते हैं जिसमें कोई भी बच्चा पैसे की वजह से पढ़ाई से वंचित न रहे। हमारा उद्देश्य एक ऐसे भविष्य का निर्माण करना है जहाँ हर बच्चे को सीखने, आगे बढ़ने और अपनी असली प्रतिभा को खोजने का मौका मिले। अपने प्रयासों से, हम एक ऐसे भारत का निर्माण करना चाहते हैं जहाँ शिक्षा हर बच्चे के लिए अवसरों के द्वार खोले, उन्हें अपने सपने पूरे करने और समाज में सकारात्मक योगदान देने में मदद करे
              </p>
              {/* <div className="founder-achievements">
                <div className="achievement">
                  <span className="achievement-number">₹2 Crore</span>
                  <span className="achievement-text">Raised in 6 Days</span>
                </div>
                <div className="achievement">
                  <span className="achievement-number">25 Years</span>
                  <span className="achievement-text">Young Visionary</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;