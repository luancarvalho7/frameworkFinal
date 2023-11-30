


// In your App.js or App.jsx
import React from 'react';
import { AppProvider } from './AppContext';
import TeacherRegistrationForm from './components/TeacherRegistrationForm';
import SubjectRegistrationForm from './components/SubjectRegistrationForm';
import ClassRegistrationForm from './components/ClassRegistrationForm';
import ScheduleRegistrationForm from './components/ScheduleRegistrationForm';
import CalendarView from './components/CalendarView';

import './App.css';
import { Calendar } from './components/CalendarFixed';
import { useState } from 'react';

const App = () => {

  const [newSchedule, addNewSchedule] = useState(0)
  //const { teachers, schedules } = useContext(AppContext);

  return (
    <AppProvider>
      <div className="App">
        <TeacherRegistrationForm />
        <SubjectRegistrationForm />
        <ClassRegistrationForm />
        <ScheduleRegistrationForm addNewSchedule={addNewSchedule} />
        <Calendar newSchedule={newSchedule}/>
      </div>
    </AppProvider>
  );
};

export default App;
