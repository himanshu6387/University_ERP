// src/pages/Home.js
import React from 'react';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import News from '../components/News/News';
import DonationSection from '../components/Donation/DonationSection';
import Operations from './../components/Operations/Operation';
import NewSection from './NewSection';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <About />
      <NewSection/>
      <Operations/>
      <News />
      <DonationSection />
    </div>
  );
};

export default Home;