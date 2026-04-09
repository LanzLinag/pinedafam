import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  // THE FIX: Hide footer if the current path is the landing screen ("/")
  if (location.pathname === '/') {
    return null;
  }

  return (
    <footer className="pineda-footer">
      <div className="footer-container">
        <div className="footer-copyright">
          © {currentYear} Pineda Family. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;