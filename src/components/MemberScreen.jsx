import React, { useState, useEffect } from "react";
import membersData from "../data/members.js";
import './MemberScreen.css'; 

const MemberScreen = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);

  // Hardcoded hierarchy order as requested
  const customOrder = ["OG", "Linag", "Pineda", "Soliman", "Cahili", "Quito"];

  const getFamilyGroup = (m) => (m.familyGroup || "Other").trim();

  // Filter available groups based on your custom order
  const allGroups = customOrder.filter(group => 
    membersData.some(m => getFamilyGroup(m).toLowerCase() === group.toLowerCase())
  );

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setActivePhoto(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const formatBirthday = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const filteredMembers = selectedGroup
    ? membersData.filter((m) => getFamilyGroup(m).toLowerCase() === selectedGroup.toLowerCase())
    : membersData;

  const groupedMembers = filteredMembers.reduce((acc, member) => {
    const group = getFamilyGroup(member);
    if (!acc[group]) acc[group] = [];
    acc[group].push(member);
    return acc;
  }, {});

  const sectionOrder = customOrder.filter(group => groupedMembers[group]);

  return (
    <div className={`ultra-wide-wrapper ${activePhoto ? 'lock-scroll' : ''}`}>
      <header className="main-banner">
        <div className="glow-effect"></div>
        <div className="banner-content">
          <h1 className="giant-title">Pineda Family</h1>
          <p className="wide-subtitle">Love • Joy • Hope</p>

          {/* TWO-TIER FILTER SYSTEM */}
          <div className="filter-hierarchy">
            {/* Top Tier: Universal Filter */}
            <div className="universal-row">
              <button 
                onClick={() => setSelectedGroup(null)} 
                className={`pill universal-pill ${selectedGroup === null ? 'active' : ''}`}
              >
                All Members
              </button>
            </div>

            {/* Bottom Tier: Surname Specifics */}
            <div className="surname-row">
              {allGroups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`pill surname-pill ${selectedGroup === group ? 'active' : ''}`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="edge-to-edge-main">
        {sectionOrder.map((groupName) => (
          <section key={groupName} className="group-block">
            <div className="group-header">
              <h2 className="group-title-text">{groupName} Group</h2>
              <div className="full-line"></div>
            </div>

            <div className="full-width-grid">
              {groupedMembers[groupName]
                .sort((a, b) => new Date(a.birthday) - new Date(b.birthday))
                .map((member) => (
                  <div key={member._id || member.id} className="wide-card">
                    <div className="wide-card-media" onClick={() => setActivePhoto(member.image)}>
                      {member.image ? (
                        <>
                          <img src={member.image} alt={member.name} className="img-fit" />
                          <div className="img-overlay">
                            <span>Open Full Image</span>
                          </div>
                        </>
                      ) : (
                        <div className="no-media">No Photo</div>
                      )}
                    </div>
                    
                    <div className="wide-card-info">
                      <div className="name-wrap">
                        <h3 className="name-bold">{member.name}</h3>
                        <p className="handle">@{member.nickname || 'Member'}</p>
                      </div>
                      
                      <div className="data-footer">
                        <div className="data-row">
                          <span className="label">Birthdate</span>
                          <span className="value">{formatBirthday(member.birthday)}</span>
                        </div>
                        <div className="location-row">
                          <span className="pin">📍</span>
                          <span className="loc">{member.location || "Earth"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {activePhoto && (
        <div className="popup-overlay" onClick={() => setActivePhoto(null)}>
          <button className="popup-close-btn">&times;</button>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
             <img src={activePhoto} alt="Full view" className="popup-img-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberScreen;