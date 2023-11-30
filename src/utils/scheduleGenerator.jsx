// utils/scheduleGenerator.js
export const generate90DaySchedule = (teachers, schedules) => {
    const scheduleArray = [];
    const currentDate = new Date();
    const totalDays = 90;
    const totalDailyClasses = 10; // 5 in the morning and 5 in the afternoon
  
    for (let i = 0; i < totalDays; i++) {
      let daySchedule = Array(totalDailyClasses).fill('Vazio');
      const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
      const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
      const month = date.toLocaleString('en-US', { month: 'long' });
      const day = date.getDate();
  
      schedules.forEach((sched) => {
        const startDate = new Date(sched.startDate);
        const classDuration = parseInt(sched.duration);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + classDuration);
  
        if (date >= startDate && date < endDate) {
          for (let j = 0; j < classDuration && j < totalDailyClasses; j++) {
            if (daySchedule[j] === 'Vazio') {
              daySchedule[j] = `${sched.teacherName} - ${sched.subjectName} - ${sched.className}`;
              break; // Assign the teacher to the first available slot and break out of the loop
            }
          }
        }
      });
  
      scheduleArray.push({
        Day: day,
        DayOfWeek: dayOfWeek,
        Month: month,
        Classes: daySchedule
      });
    }
  
    localStorage.setItem('90DaySchedule', JSON.stringify(scheduleArray));
    return scheduleArray;
  };
  