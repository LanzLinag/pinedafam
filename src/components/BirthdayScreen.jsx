import React from 'react';
import membersData from '../data/members.js';
import './BirthdayScreen.css';

const BirthdayScreen = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  // --- NEW LOGIC: CHECK FOR TODAY'S BIRTHDAYS ---
  const getTodaysBirthdays = () => {
    const today = new Date();
    return membersData.filter(m => {
      const bday = new Date(m.birthday);
      return bday.getDate() === today.getDate() && 
             bday.getMonth() === today.getMonth();
    });
  };

  const todaysBirthdays = getTodaysBirthdays();

  const getNearestBirthday = () => {
    const today = new Date();
    // We filter out people who have a birthday today so they don't show in "Upcoming"
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
        return { ...m, nextBday };
      })
      .sort((a, b) => a.nextBday - b.nextBday);

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
    <div className="birthday-wrapper ultra-wide-wrapper">
      <div className="smooth-entrance">
        <header className="birthday-header">
          <div className="birthday-glow"></div>
          <div className="header-content">
            <h1 className="giant-title">Celebrations</h1>
            <p className="wide-subtitle">Annual Family Birthdays</p>
            
            {/* --- NEW MESSAGE: TODAY'S CELEBRATION --- */}
            {todaysBirthdays.length > 0 ? (
              <div className="today-announcement">
                <p className="today-text pulsate">
                  🎉 Today is <span className="highlight-blue">
                    {todaysBirthdays.map(m => `@${m.nickname || m.name}`).join(' & ')}
                  </span>'s birthday! Wish them a happy birthday! 🎂
                </p>
              </div>
            ) : (
              nearest && (
                <p className="nearing-text">
                  Next Celebration: <span className="highlight-white">@{nearest.nickname || nearest.name}</span> is nearing!
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