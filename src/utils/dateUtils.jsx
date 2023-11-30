// utils/dateUtils.js
export const addDaysExcludingWeekends = (startDate, numberOfDays) => {
    let date = new Date(startDate);
    while (numberOfDays > 0) {
      date = addDays(date, 1);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        numberOfDays--;
      }
    }
    return date;
  };
  
  export const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  
  export const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  