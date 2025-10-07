import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Building Future Leaders",
      subtitle: "Creating World-Class Education for Underprivileged Children",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80"
    },
    {
      title: "Hope for a Better Tomorrow",
      subtitle: "Empowering the Next Generation of Community and Global Leaders",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Innovation & Excellence",
      subtitle: "Promoting STEM Learning and 21st Century Skills",
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }

  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay"></div>
            <div className="container">
              <div className="hero-content">
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>
                <div className="hero-buttons">
                  <button className="btn btn-primary" onClick={scrollToAbout}>
                    Learn More
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      const donateSection = document.getElementById('donate');
                      if (donateSection) {
                        donateSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;