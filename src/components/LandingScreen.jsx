import React from 'react';
import { useNavigate } from 'react-router-dom';
import mainImage from '../data/main.jpg'; 
import './LandingScreen.css';

const LandingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-split-wrapper">
      <div className="landing-left">
        <div className="image-overlay-gradient"></div>
        <img src={mainImage} alt="Family Heritage" className="hero-split-img" />
      </div>

      <div className="landing-right" style={{ alignItems: 'center', textAlign: 'center' }}>
        <div className="landing-right-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="brand-badge">Welcome to</div>
          <h1 className="landing-main-title">Pineda</h1>
          <h2 className="landing-sub-title">Family</h2>
          
          <p className="landing-intro-text">
            Welcome to the digital home of the Pineda Family. 
            A curated space dedicated to our families
            and the memories that bring us together.
          </p>

          <button className="get-started-btn" onClick={() => navigate('/members')}>
            Get Started
            <span className="arrow-icon">→</span>
          </button>
        </div>

        <footer className="split-footer" style={{ left: '50%', transform: 'translateX(-50%)' }}>
          <span>123 • Jorbap • Jojo</span>
        </footer>
      </div>
    </div>
  );
};

export default LandingScreen;