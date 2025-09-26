// src/App.js
import React from 'react';
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
import {Toaster} from 'react-hot-toast'
import Gallery from './components/Gallery/Gallery';
import About from './components/About/About';
// import ScrollToTop from './components/common/ScrollToTop';

function App() {
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
          </Routes>
        </main>
        <Footer />
        {/* <ScrollToTop/> */}
        <Toaster/>
      </div>
    </Router>
  );
}

export default App;