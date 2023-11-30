// components/CalendarView.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext'; // Make sure to import AppContext correctly

const CalendarView = () => {
    const { dailySchedule } = useContext(AppContext);
    const [currentMonthSchedule, setCurrentMonthSchedule] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()+1);

    useEffect(() => {
        const currentMonthIndex = new Date().getMonth(); // getMonth() returns a zero-based index
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"];
        const currentMonthName = monthNames[currentMonthIndex];
      
        const filteredSchedule = dailySchedule.filter(day =>
          day.Month === currentMonthName
        );
      
        setCurrentMonthSchedule(filteredSchedule);
      }, [dailySchedule]);

      
    // Function to format the date as a string (may not be needed if Month and Day are strings)
    const formatDate = (day, month) => {
        return `${month} ${day}`;
    };

    return (
        <div className="calendar-container">
            {/* Calendar Header */}
            <div className="calendar-header">
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((dayName, index) => (
                    <div key={index} className="header-cell">{dayName}</div>
                ))}
            </div>
            {/* Calendar Grid */}
            <div className="calendar-grid">
                {currentMonthSchedule.map((day, index) => (
                    <div key={index} className="calendar-day">
                        <div className="date-label">{formatDate(day.Day, day.Month)}</div>
                        {day.Classes.map((className, idx) => (
                            <div key={idx} className="class-slot">
                                {className}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarView;
