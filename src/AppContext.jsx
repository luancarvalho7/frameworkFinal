import React, { createContext, useState, useEffect } from 'react';
import { generate90DaySchedule } from './utils/scheduleGenerator'; // Make sure this import path is correct

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [dailySchedule, setDailySchedule] = useState([]); // State for the 90-day schedule

  useEffect(() => {
    // Load initial data from localStorage
    const loadedTeachers = JSON.parse(localStorage.getItem('teachers')) || [];
    const loadedSchedules = JSON.parse(localStorage.getItem('schedules')) || [];

    // Load or generate the 90-day schedule
    const storedDailySchedule = localStorage.getItem('90DaySchedule');
    if (storedDailySchedule) {
      setDailySchedule(JSON.parse(storedDailySchedule));
    } else {
      // Generate a new schedule if not already stored
      const newSchedule = generate90DaySchedule(loadedTeachers, loadedSchedules);
      setDailySchedule(newSchedule);
    }
  }, []);

  // Save function for teachers that also regenerates the 90-day schedule
  const saveTeachers = (newTeachers) => {
    setTeachers(newTeachers);
    localStorage.setItem('teachers', JSON.stringify(newTeachers));
    // Regenerate the 90-day schedule based on the new teachers and existing schedules
    const newSchedule = generate90DaySchedule(newTeachers, schedules);
    localStorage.setItem('90DaySchedule', JSON.stringify(newSchedule));
    setDailySchedule(newSchedule);
  };


  const saveSubjects = (newSubjects) => {
    setSubjects(newSubjects);
    localStorage.setItem('subjects', JSON.stringify(newSubjects));
  };

  const saveClasses = (newClasses) => {
    setClasses(newClasses);
    localStorage.setItem('classes', JSON.stringify(newClasses));
  };

  const saveSchedules = (newSchedules) => {
    setSchedules(newSchedules);
    localStorage.setItem('schedules', JSON.stringify(newSchedules));
    // Regenerate the 90-day schedule based on the new schedules and existing teachers
    const newSchedule = generate90DaySchedule(teachers, newSchedules);
    localStorage.setItem('90DaySchedule', JSON.stringify(newSchedule));
    setDailySchedule(newSchedule);
  };

  return (
    <AppContext.Provider value={{
      teachers,
      subjects,
      classes,
      schedules,
      dailySchedule, // Provide the 90-day schedule to the context consumers
      saveTeachers,
      saveSubjects,
      saveClasses,
      saveSchedules
    }}>
      {children}
    </AppContext.Provider>
  );
};