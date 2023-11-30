import React, { useState } from 'react';

const SubjectRegistrationForm = () => {
  const [subjectName, setSubjectName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to localStorage
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    subjects.push({ subjectName });
    localStorage.setItem('subjects', JSON.stringify(subjects));

    // Reset form
    setSubjectName('');

    alert(`Subject ${subjectName} registered!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="subjectName">Subject Name:</label>
        <input
          type="text"
          id="subjectName"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default SubjectRegistrationForm;
