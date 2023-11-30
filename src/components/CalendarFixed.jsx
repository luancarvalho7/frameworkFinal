import { useEffect, useState } from "react";

export function Calendar({ newSchedule }) {


    const [calendario, setCalendario] = useState(JSON.parse(localStorage.getItem('currentSchedule')) || ['vazio']);
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    const schedules = JSON.parse(localStorage.getItem('schedules')) || [];

    console.log(calendario)

    let firstCalendar = calendario[0] === "vazio" ? true : false;

    function run(schedule) {



        const teacher = teachers.findIndex((t) => t.teacherName === schedules[schedule].teacherName);


        const currentDate = new Date();
        const numDays = 30;
        let classesNeeded = teachers[teacher].duration;
        let classesPerDay = teachers[teacher].duration / schedules[schedule].duration;
        let lowerClassesCheck = classesPerDay;
        let cumulativeClassFill = 0;

        console.log(`${teachers[teacher].duration}/${schedules[schedule].duration} = ${teachers[teacher].duration / schedules[schedule].duration}`);

        const daysArray = Array.from({ length: numDays }, (_, index) => {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + index);

            const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

            let classes = [];
            classes = firstCalendar ? [null, null, null, null, null] : [...calendario[index].Classes]; // Use spread operator to clone the array

            if (dayOfWeek === 'Sunday' || dayOfWeek === 'Saturday') {
                classes = [];
            } else {
                if (classesPerDay < 1) {
                    lowerClassesCheck += classesPerDay;
                    if (lowerClassesCheck >= 1) {
                        lowerClassesCheck = 0;
                        if (classes.indexOf(null) !== -1) {
                            classes[classes.indexOf(null)] = schedules[schedule].teacherName;
                        } else {
                            cumulativeClassFill++;
                        }
                    }
                } else {
                    for (let i = 0; i < classesPerDay; i++) {
                        if (classes.indexOf(null) !== -1) {
                            classes[classes.indexOf(null)] = schedules[schedule].teacherName;
                        } else {
                            cumulativeClassFill++;
                        }
                    }
                }
            }

            return { DayofWeek: dayOfWeek, Date: formattedDate, Classes: classes };
        });

        localStorage.setItem('currentSchedule', JSON.stringify(daysArray));
        setCalendario(daysArray); // Update state with the new schedule
    }

    useEffect(() => {
        if (newSchedule != 0) {
            run(schedules.length - 1)
        }
        else {
            console.log('Not today')
        }
    }, [newSchedule]);

    return (
        <div className="calendario">
            <button onClick={run}>Atualizar Calendário</button>
            <div className="semana">
                { firstCalendar ? ' ': calendario.map((dia) => (
                    <div className="dia">
                        <div className="data">{dia.DayofWeek}, {dia.Date}</div>
                        <div className="aulas">
                            {dia.Classes.map((aula, index) =>
                                <div key={index} className="aula">{aula ? aula : 'Livre'}</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );
}
