import React, { useState, useEffect } from 'react';

const CalendarDisplay = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    setSchedules(JSON.parse(localStorage.getItem('schedules')) || []);
  }, []);

  return (
    <div>
      <h2>Class Schedules</h2>
      {schedules.length > 0 ? (
        <ul>
          {schedules.map((schedule, index) => (
            <li key={index}>
              Teacher: {schedule.teacherName}, Subject: {schedule.subjectName}, Class: {schedule.className}, Duration: {schedule.duration} days
            </li>
          ))}
        </ul>
      ) : (
        <p>No schedules available</p>
      )}
    </div>
  );
};

export default CalendarDisplay;
