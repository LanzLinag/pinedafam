import React from 'react';
import albumsData from '../data/albums.js';
import './AlbumScreen.css';

const AlbumScreen = () => {
  return (
    <div className="album-wrapper ultra-wide-wrapper">
      <div className="smooth-entrance">
        <header className="album-header">
          <div className="album-glow"></div>
          <div className="header-content">
            <h1 className="giant-title">Memories</h1>
            <p className="wide-subtitle">The Pineda Visual Album</p>
          </div>
        </header>

        <main className="album-grid">
          {albumsData.map((album) => {
            const hasLink = album.driveLink && album.driveLink.trim() !== "";

            return (
              <div key={album.id} className="album-card">
                <div className="album-info">
                  <span className="album-date">{album.date}</span>
                  <h3 className="album-title">{album.title}</h3>
                  <p className="album-desc">{album.description}</p>
                  
                  {hasLink ? (
                    <a 
                      href={album.driveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="drive-button"
                    >
                      View Album ↗
                    </a>
                  ) : (
                    <button className="drive-button disabled" disabled>
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default AlbumScreen;