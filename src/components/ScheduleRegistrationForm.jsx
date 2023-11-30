import React, { useState, useEffect } from 'react';

const ScheduleRegistrationForm = ({addNewSchedule}) => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    setTeachers(JSON.parse(localStorage.getItem('teachers')) || []);
    setSubjects(JSON.parse(localStorage.getItem('subjects')) || []);
    setClasses(JSON.parse(localStorage.getItem('classes')) || []);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct schedule object
    const newSchedule = {
      teacherName: selectedTeacher,
      subjectName: selectedSubject,
      className: selectedClass,
      duration
    }

    addNewSchedule(newSchedule)

    ;

    // Save to localStorage
    const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    schedules.push(newSchedule);
    localStorage.setItem('schedules', JSON.stringify(schedules));

    // Reset form fields
    setSelectedTeacher('');
    setSelectedSubject('');
    setSelectedClass('');
    setDuration('');

    alert(`Schedule created for class ${selectedClass}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="selectedTeacher">Select Teacher:</label>
        <select
          id="selectedTeacher"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          required
        >
          <option value="">Select a teacher</option>
          {teachers.map((teacher, index) => (
            <option key={index} value={teacher.teacherName}>
              {teacher.teacherName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="selectedSubject">Select Subject:</label>
        <select
          id="selectedSubject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          required
        >
          <option value="">Select a subject</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject.subjectName}>
              {subject.subjectName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="selectedClass">Select Class:</label>
        <select
          id="selectedClass"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          required
        >
          <option value="">Select a class</option>
          {classes.map((classItem, index) => (
            <option key={index} value={classItem.className}>
              {classItem.className}
            </option>
          ))}
        </select>
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
      <button type="submit">Create Schedule</button>
    </form>
  );
};

export default ScheduleRegistrationForm;
