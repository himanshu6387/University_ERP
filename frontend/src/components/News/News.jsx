// src/components/News/News.js
import React, { useEffect, useRef, useState } from 'react';
import './News.css';
import ApiService from '../../services/api'; // adjust path
import logo from '../../assets/logo.png'

const News = () => {
  const newsRef = useRef();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Static fallback
  const getStaticNews = () => [
    {
      id: 1,
      title: "Education for All Campaign Launched",
      description: "Our NGO has launched a new initiative to provide free learning kits to underprivileged children.",
      source: "Local Times",
      publishDate: "2025-09-15",
      category: "Education",
      url: "#",
      imageUrl: ''
    },
    // {
    //   id: 2,
    //   title: "Volunteers Making a Difference",
    //   description: "Meet the volunteers who are helping children achieve their dreams.",
    //   source: "Daily News",
    //   publishDate: "2025-09-10",
    //   category: "Community",
    //   url: "#",
    //   imageUrl: "https://via.placeholder.com/400x250"
    // }
  ];

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await ApiService.getNews();
      console.log("Fetched news:", response);

      if (response && Array.isArray(response) && response.length > 0) {
        setNewsData(response);
      } else {
        setNewsData(getStaticNews());
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to load news");
      setNewsData(getStaticNews());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

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

    if (newsRef.current) {
      const elements = newsRef.current.querySelectorAll(
        '.fade-in, .slide-in-left, .slide-in-right'
      );
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section id="news" className="news section" ref={newsRef}>
      <div className="container">
        <div className="news-header fade-in">
          <h2 className="section-title">Our Latest Features</h2>
          <p className="section-subtitle">
            See how our mission to transform education for underprivileged children 
            is making headlines across the nation.
          </p>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="news-grid">
  {newsData.map((article, index) => (
    <div 
      key={article._id || index}
      className={`news-card fade-in ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="news-image">
        <img 
          src={article.imageUrl ||logo} 
          alt={article.title} 
        />
        <div className="news-category">
          <span className={`category-tag ${article.category || "general"}`}>
            {article.category || "General"}
          </span>
        </div>
      </div>
      
      <div className="news-content">
        <div className="news-source">
          <span className="source-name">{article.source}</span>
          <span className="publish-date">
            {article.publishDate ? formatDate(article.publishDate) : "Recent"}
          </span>
        </div>
        
        <h3 className="news-title">{article.title}</h3>
        <p className="news-description">{article.description}</p>
        
        <div className="news-footer">
          <a 
            href={article.url || "#"} 
            className="read-more" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Read Full Article <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  ))}
</div>

        )}

        {/* ✅ CTA Section with Social Icons (restored as before) */}
<div className="news-cta fade-in">
  <h3 className="cta-title">Stay Updated with Our Journey</h3>
  <p className="cta-subtitle">
    Follow our progress and milestones as we build the future of education.
  </p>
  <div className="social-links">
    <a href="https://www.facebook.com/profile.php?id=61581879570840" className="social-link" aria-label="Facebook">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12"/>
      </svg>
    </a>
    <a href="https://www.youtube.com/@srsvedwtrust" className="social-link" aria-label="Twitter">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
  <path d="M23.498 6.186a2.994 2.994 0 00-2.11-2.12C19.691 3.5 12 3.5 12 3.5s-7.691 0-9.388.566A2.994 2.994 0 00.502 6.186 31.03 31.03 0 000 12a31.03 31.03 0 00.502 5.814 2.994 2.994 0 002.11 2.12C4.309 20.5 12 20.5 12 20.5s7.691 0 9.388-.566a2.994 2.994 0 002.11-2.12A31.03 31.03 0 0024 12a31.03 31.03 0 00-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
</svg>
    </a>
    <a href="#" className="social-link" aria-label="LinkedIn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M4.98 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4M3 8h4v12H3zm7 0h4v1.7a4.4 4.4 0 0 1 4-2.2c3 0 5 2 5 5.6V20h-4v-6.2c0-1.7-.6-2.8-2-2.8-1 0-1.7.6-2 1.2-.1.2-.1.6-.1.8V20h-4z"/>
      </svg>
    </a>
    <a href="#" className="social-link" aria-label="Instagram">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M7 2C4 2 2 4 2 7v10c0 3 2 5 5 5h10c3 0 5-2 5-5V7c0-3-2-5-5-5zM7 4h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3m10.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10m0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6"/>
      </svg>
    </a>
  </div>
</div>

      </div>
    </section>
  );
};

export default News;
