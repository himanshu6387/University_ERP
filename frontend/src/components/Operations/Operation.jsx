// src/components/Operations/Operations.js
import React, { useEffect, useRef, useState } from 'react';
import './Operations.css';
import { Link } from 'react-router-dom';

const Operations = () => {
  const operationsRef = useRef();
  const [activeTab, setActiveTab] = useState(0);

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

    const elements = operationsRef.current.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const operations = [
    {
      id: 'academics',
      title: 'Academics',
      icon: '📚',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Learning from Class 3rd to 12th Students',
      features: [
        '3rd Standard to 12th Standard',
        'Interactive discussions and debates in every class',
        'Outcome-based learning methodology',
        'Interdisciplinary approach to education',
        'Regular assessments and personalized feedback',
        'Digital learning resources and smart classrooms'
      ],
      highlights: [
        { label: 'Student-Teacher Ratio', value: '20:1' },
        { label: 'Languages Offered', value: '4+' },
        // { label: 'Success Rate', value: '95%' }
      ]
    },
    {
      id: 'residential',
      title: 'Residential Programme',
      icon: '🏠',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      // description: 'At Umeed Global School, we believe holistic development thrives in an immersive environment.',
      features: [
        'Safe and secure residential facilities',
        '10-hour comprehensive academic and activity system',
        'Mentorship and character development programs',
        'Life skills training and personality development',
        'Recreational activities and sports programs',
        'Healthy meals and nutrition programs'
      ],
      highlights: [
        { label: 'Complete Hostel Capacity', value: '400+' },
        { label: 'Hostel Staff Supervision', value: '24/7' },
        // { label: 'Activity Hours', value: '12/day' }
      ]
    },
    {
      id: 'innovation',
      title: 'Innovation & Technology',
      icon: '🔬',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      // description: 'We believe that innovation and scientific curiosity are the cornerstones of a progressive education system.',
      features: [
        'State-of-the-art science and computer laboratories',
        'STEM-focused curriculum and projects',
        'Robotics and AI learning programs',
        'Innovation labs and maker spaces',
        'Technology integration in all subjects',
        'Entrepreneurship development programs'
      ],
      highlights: [
        { label: 'Tech Labs', value: '8+' },
        { label: 'STEM Projects', value: '50+/year' },
        { label: 'Innovation Awards', value: '10+' }
      ]
    }
  ];

  return (
    <section id="operations" className="operations section" ref={operationsRef}>
      <div className="container">
        <div className="operations-header fade-in">
          <h2 className="section-title">What We Do</h2>
          <p className="section-subtitle">
            {/* At All Around School, we strive to nurture all our students into individuals 
            with a strong civic sense and a solid moral compass. */}
          </p>
        </div>

        <div className="operations-tabs">
          <div className="tab-buttons fade-in">
            {operations.map((operation, index) => (
              <button
                key={operation.id}
                className={`tab-button ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                <span className="tab-icon">{operation.icon}</span>
                <span className="tab-text">{operation.title}</span>
              </button>
            ))}
          </div>

          <div className="tab-content">
            {operations.map((operation, index) => (
              <div
                key={operation.id}
                className={`tab-panel ${activeTab === index ? 'active' : ''}`}
              >
                <div className="operation-content">
                  <div className="operation-image slide-in-left">
                    <img src={operation.image} alt={operation.title} />
                    <div className="image-overlay">
                      <div className="operation-icon">{operation.icon}</div>
                    </div>
                  </div>
                  
                  <div className="operation-details slide-in-right">
                    <h3 className="operation-title">{operation.title}</h3>
                    <p className="operation-description">{operation.description}</p>
                    
                    <div className="operation-features">
                      <h4>Key Features:</h4>
                      <ul>
                        {operation.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="operation-highlights">
                      {operation.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="highlight-item">
                          <span className="highlight-value">{highlight.value}</span>
                          <span className="highlight-label">{highlight.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="operations-cta fade-in">
          <div className="cta-content">
            <h3>Ready to Join Our Mission?</h3>
            <p>Be part of creating educational opportunities for <b>Economical Poor</b> children.</p>
            <div className="cta-buttons">
              <Link to={'/donation'}><button className="btn btn-primary" onClick={'form1'}>Donate Now</button></Link>
              {/* <button className="btn btn-outline">Become a Partner</button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Operations;