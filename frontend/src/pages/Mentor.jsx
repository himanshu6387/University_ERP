// src/components/Mentor/Mentor.jsx
import React from 'react';
import './Mentor.css';

const Mentor = () => {
  const mentors = [
    {
      id: 1,
      name: 'Maulana Mohammad Ibraheem',
      designation: 'Chief Mentor',
      specialization: 'Education & Leadership',
      image: '/images/mentor1.jpg', // Replace with actual image path
      experience: '15+ Years',
      // linkedIn: 'https://linkedin.com',
      // email: 'rajesh@mpct.org'
    }
  ];

  return (
    <section className="mentor-section">
      <div className="mentor-container">
        {/* Header */}
        <div className="mentor-header">
          <h2 className="mentor-title">Meet Our Mentors</h2>
          <p className="mentor-subtitle">
            Dedicated professionals guiding students towards a brighter future
          </p>
          <div className="title-underline"></div>
        </div>

        {/* Mentors Grid */}
        <div className="mentors-grid">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              <div className="mentor-image-wrapper">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="mentor-image"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${mentor.name}&size=400&background=667eea&color=fff&bold=true`;
                  }}
                />
                <div className="mentor-badge">{mentor.experience}</div>
              </div>
              
              <div className="mentor-content">
                <h3 className="mentor-name">{mentor.name}</h3>
                <p className="mentor-designation">{mentor.designation}</p>
                <p className="mentor-specialization">{mentor.specialization}</p>
                
                <div className="mentor-divider"></div>
                
                <div className="mentor-social">
                  <a href={mentor.linkedIn} target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href={`mailto:${mentor.email}`} className="social-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentor;