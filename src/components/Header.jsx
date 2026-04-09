import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide header on Landing Screen
  if (location.pathname === '/') return null;

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="back-home-btn-fixed" onClick={() => navigate('/')}>
          <span className="btn-icon">🏠</span>
          <span className="btn-text">Home</span>
        </button>
      </div>

      <div className="header-right">
        <button 
          className={`nav-pill-btn ${location.pathname === '/members' ? 'active' : ''}`} 
          onClick={() => navigate('/members')}
        >
          <span className="btn-icon">👥</span> 
          <span className="btn-text">Members</span>
        </button>
        
        <button 
          className={`nav-pill-btn ${location.pathname === '/birthdays' ? 'active' : ''}`} 
          onClick={() => navigate('/birthdays')}
        >
          <span className="btn-icon">🎂</span> 
          <span className="btn-text">Birthdays</span>
        </button>
        
        <button 
          className={`nav-pill-btn ${location.pathname === '/albums' ? 'active' : ''}`} 
          onClick={() => navigate('/albums')}
        >
          <span className="btn-icon">📸</span> 
          <span className="btn-text">Albums</span>
        </button>
      </div>
    </header>
  );
};

export default Header;