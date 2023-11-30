import React, { useState } from 'react';

const TeacherRegistrationForm = () => {
  const [teacherName, setTeacherName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('');

  const calculateEndDate = (startDate, duration) => {
    let endDate = new Date(startDate);
    let daysAdded = 0;
    while (daysAdded < duration) {
      endDate.setDate(endDate.getDate() + 1);
      if (endDate.getDay() !== 0 && endDate.getDay() !== 6) {
        daysAdded++;
      }
    }
    return endDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const endDate = calculateEndDate(startDate, parseInt(duration));
    const endDateStr = endDate.toISOString().split('T')[0];

    // Save to localStorage
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    teachers.push({ teacherName, startDate, duration, endDate: endDateStr });
    localStorage.setItem('teachers', JSON.stringify(teachers));

    // Reset form
    setTeacherName('');
    setStartDate('');
    setDuration('');

    alert(`Teacher ${teacherName} registered!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="teacherName">Teacher's Name:</label>
        <input
          type="text"
          id="teacherName"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="duration">Duration (days):</label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default TeacherRegistrationForm;
