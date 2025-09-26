import React, { useState } from 'react';
import './Infrastructure.css';

const Infrastructure = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const infrastructureData = [
    {
      id: 1,
      title: "Modern Classrooms",
      category: "academic",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2032&q=80",
      description: "Smart classrooms equipped with digital boards, projectors, and modern furniture designed for interactive learning.",
      features: ["Digital Smart Boards", "Air Conditioning", "Modern Furniture", "Natural Lighting"]
    },
    {
      id: 2,
      title: "Science Laboratories",
      category: "academic",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "State-of-the-art physics, chemistry, and biology labs with modern equipment for hands-on learning.",
      features: ["Modern Equipment", "Safety Systems", "Digital Microscopes", "Chemical Storage"]
    },
    {
      id: 3,
      title: "Computer Labs",
      category: "technology",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Advanced computer labs with latest hardware and software for programming and digital literacy.",
      features: ["Latest Computers", "High-Speed Internet", "Programming Software", "Robotics Kits"]
    },
    {
      id: 4,
      title: "Library & Reading Hall",
      category: "academic",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2028&q=80",
      description: "Extensive library with thousands of books, digital resources, and quiet study areas.",
      features: ["10,000+ Books", "Digital Resources", "Study Areas", "Reading Rooms"]
    },
    {
      id: 5,
      title: "Sports Complex",
      category: "sports",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Multi-purpose sports facilities including indoor and outdoor courts for various sports activities.",
      features: ["Basketball Court", "Football Ground", "Indoor Games", "Gym Equipment"]
    },
    {
      id: 6,
      title: "Residential Halls",
      category: "residential",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      description: "Comfortable and secure residential facilities with modern amenities for boarding students.",
      features: ["Comfortable Beds", "Study Areas", "Common Rooms", "24/7 Security"]
    },
    {
      id: 7,
      title: "Dining Hall",
      category: "residential",
      image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      description: "Spacious dining hall serving nutritious and hygienic meals prepared by professional chefs.",
      features: ["Nutritious Meals", "Hygienic Kitchen", "Spacious Seating", "Special Diets"]
    },
    {
      id: 8,
      title: "Innovation Labs",
      category: "technology",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2031&q=80",
      description: "Dedicated spaces for innovation, creativity, and hands-on projects with modern tools and equipment.",
      features: ["3D Printers", "Arduino Kits", "Design Software", "Project Spaces"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Facilities' },
    { id: 'academic', name: 'Academic' },
    { id: 'technology', name: 'Technology' },
    { id: 'sports', name: 'Sports' },
    { id: 'residential', name: 'Residential' }
  ];

  const filteredData = selectedCategory === 'all' 
    ? infrastructureData 
    : infrastructureData.filter(item => item.category === selectedCategory);

  return (
    <div className="infrastructure-page">
      <div className="infrastructure-hero">
        <div className="container">
          <h1>World-Class Infrastructure</h1>
          <p>Modern facilities designed to provide the best learning environment for our students</p>
        </div>
      </div>

      <div className="infrastructure-content section">
        <div className="container">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="infrastructure-grid">
            {filteredData.map(item => (
              <div key={item.id} className="infrastructure-card">
                <div className="card-image">
                  <img src={item.image} alt={item.title} />
                  <div className="card-overlay">
                    <span className="category-badge">{item.category}</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="features-list">
                    {item.features.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="infrastructure-stats">
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Modern Classrooms</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">Science Labs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Computer Labs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Hostel Capacity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;