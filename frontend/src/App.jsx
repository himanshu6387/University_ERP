// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Infrastructure from './pages/Infrastructure';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Footer from './components/Footer/Footer';
import './App.css';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { Toaster } from 'react-hot-toast';
import Gallery from './components/Gallery/Gallery';
import About from './components/About/About';
import DonationSection from './components/Donation/DonationSection';
import EducationModel from './pages/EducationModel';
import NewMission from './pages/NewMission';
import NewSection from './pages/NewSection';
import Popup from './pages/Popup'; // Import Popup component
import Mentor from './pages/Mentor';
// import ScrollToTop from './components/common/ScrollToTop';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Open popup after 2 seconds when app loads
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 2000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/donation" element={<DonationSection />} />
            <Route path="/model-education" element={<EducationModel />} />
            <Route path="/new-mission" element={<NewMission />} />
            <Route path="/new-section" element={<NewSection />} />
            <Route path="/mentor" element={<Mentor />} />
          </Routes>
        </main>
        <Footer />
        {/* <ScrollToTop/> */}
        <Toaster />
        
        {/* Popup Component */}
        <Popup isOpen={isPopupOpen} onClose={closePopup} />
      </div>
    </Router>
  );
}

export default App;