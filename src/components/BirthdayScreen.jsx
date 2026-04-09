import React from 'react';
import { useNavigate } from 'react-router-dom';
import membersData from '../data/members.js';
import './BirthdayScreen.css';

const BirthdayScreen = () => {
  const navigate = useNavigate();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const getNearestBirthday = () => {
    const today = new Date();
    const upcoming = membersData.map(m => {
      const bday = new Date(m.birthday);
      let nextBday = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
      if (nextBday < today) {
        nextBday.setFullYear(today.getFullYear() + 1);
      }
      return { ...m, nextBday };
    }).sort((a, b) => a.nextBday - b.nextBday);

    return upcoming[0];
  };

  const nearest = getNearestBirthday();

  const getBirthdaysForMonth = (monthIndex) => {
    return membersData.filter(m => {
      const date = new Date(m.birthday);
      return date.getMonth() === monthIndex;
    }).sort((a, b) => new Date(a.birthday).getDate() - new Date(b.birthday).getDate());
  };

  const renderCalendarDays = (monthIndex) => {
    const year = new Date().getFullYear();
    const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    
    const calendarSlots = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarSlots.push(<div key={`empty-${i}`} className="day-dot empty"></div>);
    }

    const birthdays = getBirthdaysForMonth(monthIndex);
    for (let day = 1; day <= daysInMonth; day++) {
      const hasBirthday = birthdays.some(b => new Date(b.birthday).getDate() === day);
      calendarSlots.push(
        <div key={day} className={`day-dot ${hasBirthday ? 'active-day' : ''}`}>
          {day}
        </div>
      );
    }
    return calendarSlots;
  };

  return (
    <div className="birthday-wrapper animate-in">
      {/* Back to directory */}
      <button className="back-home-btn" onClick={() => navigate('/members')}>
        <span className="back-icon">←</span>
        <span className="back-text">Back</span>
      </button>

      <header className="birthday-header">
        <div className="birthday-glow"></div>
        <div className="header-content">
          <h1 className="giant-title">Celebrations</h1>
          <p className="wide-subtitle">Annual Family Birthdays</p>
          
          {nearest && (
            <p className="nearing-text" style={{ color: 'var(--light-blue)', fontWeight: '800', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>
              Next Celebration: <span style={{ color: '#fff' }}>@{nearest.nickname || nearest.name}</span> is nearing!
            </p>
          )}
        </div>
      </header>

      <main className="calendar-grid-container">
        {months.map((month, index) => {
          const birthdays = getBirthdaysForMonth(index);

          return (
            <div key={month} className="month-card">
              <div className="month-header">
                <h3>{month}</h3>
                <span className="count-tag">{birthdays.length}</span>
              </div>

              <div className="mini-calendar">
                {daysOfWeek.map(d => (
                  <div key={d} className="weekday-label">{d}</div>
                ))}
                {renderCalendarDays(index)}
              </div>

              <div className="birthday-list">
                {birthdays.length > 0 ? (
                  birthdays.map(m => (
                    <div key={m.id || m._id} className="birthday-row">
                      <div className="b-day-box">
                        <span className="b-day">{new Date(m.birthday).getDate()}</span>
                      </div>
                      <div className="b-info">
                        <h4 className="b-name">@{m.nickname || m.name}</h4>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-birthdays">No celebrations</p>
                )}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default BirthdayScreen;