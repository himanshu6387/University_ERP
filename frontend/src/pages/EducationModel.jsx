import React from 'react';
import { GraduationCap, Users, Home, BookOpen, Calendar, RefreshCw, Book, Scale, Sparkles, DollarSign } from 'lucide-react';
import './EducationModel.css';

const EducationModel = () => {
  const highlights = [
    {
      icon: <Calendar className="highlight-icon" />,
      title: "Structured Academic Schedule",
      subtitle: "(9:00 AM – 4:00 PM)",
      color: "blue-cyan"
    },
    {
      icon: <Users className="highlight-icon" />,
      title: "7-Layer Teacher Recruitment System",
      subtitle: "(सफलता मानको के आधार पर अनुभवी शिक्षकों का चयन किया जायेगा)",
      color: "purple-pink"
    },
    {
      icon: <Home className="highlight-icon" />,
      title: "Lodging & Fooding Facility",
      subtitle: "Free for All Students",
      color: "green-emerald"
    },
    {
      icon: <BookOpen className="highlight-icon" />,
      title: "Small Class Size, Better Learning",
      subtitle: "",
      color: "orange-red"
    },
    {
      icon: <GraduationCap className="highlight-icon" />,
      title: "Admission Session 2028–29",
      subtitle: "(संस्था का पहला शैक्षिक सत्र 2028–29 में प्रारंभ होगा।)",
      color: "indigo-purple"
    },
    {
      icon: <RefreshCw className="highlight-icon" />,
      title: "Team Updation & Mentor Panel",
      subtitle: "",
      color: "teal-cyan"
    },
    {
      icon: <Book className="highlight-icon" />,
      title: "Curriculum – CBSE Pattern",
      subtitle: "(NCERT-Based)",
      color: "yellow-orange"
    },
    {
      icon: <Scale className="highlight-icon" />,
      title: "Balanced Learning Approach",
      subtitle: "(40% Practical – 60% Theory)",
      color: "rose-pink"
    },
    {
      icon: <Sparkles className="highlight-icon" />,
      title: "Student-Centric Development Model",
      subtitle: "",
      color: "violet-fuchsia"
    },
    {
      icon: <DollarSign className="highlight-icon" />,
      title: "Transparent Budget Structure",
      subtitle: "",
      color: "emerald-green"
    }
  ];

  return (
    <div className="education-model-container">
      <div className="education-model-wrapper">
        {/* Header Section */}
        <div className="header-section">
          <div className="header-glow"></div>
          
          <div className="header-title-wrapper">
            <div className="logo-circle">
              <GraduationCap className="logo-icon" />
            </div>
            <h1 className="main-title">
              शिक्षा का मॉडल
            </h1>
          </div>
          
          <p className="subtitle">
            (Model of Education)
          </p>
          
          <div className="description-box">
            <p className="description-text">
              <span className="highlight-text">SRSV Educational & Welfare Trust</span> एक ऐसी शैक्षणिक पहल है जो केवल 
              पढ़ाई तक सीमित नहीं, बल्कि विद्यार्थियों के समग्र विकास (Holistic Development) का सपना साकार करती है।
            </p>
          </div>
        </div>

        {/* Key Highlights Title */}
        <div className="section-title-wrapper">
          <h2 className="section-titles">
            मुख्य विशेषताएँ
          </h2>
          <p className="section-subtitles">(Key Highlights)</p>
          <div className="title-underline"></div>
        </div>

        {/* Highlights Grid */}
        <div className="highlights-grid">
          {highlights.map((item, index) => (
            <div
              key={index}
              className={`highlight-card ${item.color}`}
            >
              <div className="card-gradient-overlay"></div>
              
              <div className="card-number-badge">
                {index + 1}
              </div>
              
              <div className={`card-icon-wrapper ${item.color}`}>
                {item.icon}
              </div>
              
              <h3 className="card-title">
                {item.title}
              </h3>
              
              {item.subtitle && (
                <p className="card-subtitle">
                  {item.subtitle}
                </p>
              )}
              
              <div className="card-decorative"></div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="footer-sections">
          <div className="footer-box">
            <div className="footer-title-wrapper">
              <div className="pulse-dot"></div>
              <p className="footer-title">
                Empowering Students, Building Future
              </p>
              <div className="pulse-dot"></div>
            </div>
            <p className="footer-text">
              A holistic approach to education for comprehensive development
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationModel;