import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingScreen from './components/LandingScreen';
import MemberScreen from './components/MemberScreen';
import BirthdayScreen from './components/BirthdayScreen';
import AlbumScreen from './components/AlbumScreen';
import Header from './components/Header'; // Make sure this path matches your folder structure

function App() {
  return (
    <Router>
      <div className="App">
        {/* The Header is globally placed here */}
        <Header />
        
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/members" element={<MemberScreen />} />
          <Route path="/birthdays" element={<BirthdayScreen />} />
          <Route path="/albums" element={<AlbumScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;