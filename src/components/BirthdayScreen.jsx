import React from 'react';
import membersData from '../data/members.js';
import './BirthdayScreen.css';

const BirthdayScreen = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["S", "M", "T", "W", "TH", "F", "S"];

  // --- HELPER: GET ORDINAL SUFFIX (st, nd, rd, th) ---
  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  // --- LOGIC: TODAY'S BIRTHDAYS (Supports Multiple + Different Ages) ---
  const getTodaysBirthdays = () => {
    const today = new Date();
    return membersData.filter(m => {
      const bday = new Date(m.birthday);
      return bday.getDate() === today.getDate() && 
             bday.getMonth() === today.getMonth();
    }).map(m => {
      const birthYear = new Date(m.birthday).getFullYear();
      const ageTurning = today.getFullYear() - birthYear;
      return { ...m, ageTurning };
    });
  };

  const todaysBirthdays = getTodaysBirthdays();

  // --- LOGIC: NEAREST UPCOMING (Supports Multiple + Different Ages) ---
  const getNearestBirthdays = () => {
    const today = new Date();
    const upcoming = membersData
      .filter(m => {
        const bday = new Date(m.birthday);
        return !(bday.getDate() === today.getDate() && bday.getMonth() === today.getMonth());
      })
      .map(m => {
        const bday = new Date(m.birthday);
        let nextBday = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
        if (nextBday < today) {
          nextBday.setFullYear(today.getFullYear() + 1);
        }
        const ageTurning = nextBday.getFullYear() - bday.getFullYear();
        return { ...m, nextBday, ageTurning };
      })
      .sort((a, b) => a.nextBday - b.nextBday);

    if (upcoming.length === 0) return [];

    const firstNearestDate = upcoming[0].nextBday.getTime();
    return upcoming.filter(m => m.nextBday.getTime() === firstNearestDate);
  };

  const nearestGroup = getNearestBirthdays();

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
    <div className="birthday-wrapper ultra-wide-wrapper">
      <div className="smooth-entrance">
        <header className="birthday-header">
          <div className="birthday-glow"></div>
          <div className="header-content">
            <h1 className="giant-title">Celebrations</h1>
            <p className="wide-subtitle">Annual Family Birthdays</p>
            
            {/* --- ANNOUNCEMENT SECTION --- */}
            {todaysBirthdays.length > 0 ? (
              <div className="today-announcement">
                <p className="today-text pulsate">
                  🎉 Today is <span className="highlight-blue">
                    {todaysBirthdays.map(m => `@${m.nickname || m.name}'s ${getOrdinal(m.ageTurning)}`).join(' & ')}
                  </span> birthday! Wish them a happy birthday! 🎂
                </p>
              </div>
            ) : (
              nearestGroup.length > 0 && (
                <p className="nearing-text">
                  Next Celebration: <span className="highlight-white">
                    {nearestGroup.map(m => `@${m.nickname || m.name}'s ${getOrdinal(m.ageTurning)}`).join(' & ')} birthday
                  </span> {nearestGroup.length > 1 ? 'are' : 'is'} nearing!
                </p>
              )
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
                  {daysOfWeek.map((d, i) => (
                    <div key={i} className="weekday-label">{d}</div>
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
    </div>
  );
};

export default BirthdayScreen;