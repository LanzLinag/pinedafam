import React from 'react';
import { useNavigate } from 'react-router-dom';
import albumsData from '../data/albums.js';
import './AlbumScreen.css';

const AlbumScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="album-wrapper animate-in">
      <button className="back-home-btn" onClick={() => navigate('/members')}>
        <span className="back-icon">←</span>
        <span className="back-text">Back</span>
      </button>

      <header className="album-header">
        <div className="album-glow"></div>
        <div className="header-content">
          <h1 className="giant-title">Memories</h1>
          <p className="wide-subtitle">The Pineda Visual Album</p>
        </div>
      </header>

      <main className="album-grid">
        {albumsData.map((album) => (
          <div key={album.id} className="album-card">
            <div className="album-info">
              <span className="album-date">{album.date}</span>
              <h3 className="album-title">{album.title}</h3>
              <p className="album-desc">{album.description}</p>
              
              <a 
                href={album.driveLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="drive-button"
              >
                View Album ↗
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default AlbumScreen;