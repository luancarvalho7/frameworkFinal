import React, { useState } from 'react';

const ClassRegistrationForm = () => {
  const [className, setClassName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to localStorage
    const classes = JSON.parse(localStorage.getItem('classes')) || [];
    classes.push({ className });
    localStorage.setItem('classes', JSON.stringify(classes));

    // Reset form
    setClassName('');

    alert(`Class ${className} registered!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="className">Class Name:</label>
        <input
          type="text"
          id="className"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default ClassRegistrationForm;
