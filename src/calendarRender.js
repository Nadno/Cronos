import { dayConstructor, daysMonth } from './components';

const firstDay = (day, nDay, totDays) => {
    if (day > 1) {
        let first = 0;

        for (let i = day; i > 1; i--) {
            if (nDay > 0) {
                nDay--;
            } else { nDay = 6 }

            first = nDay;
        }

        for (let i = (totDays - first); i < totDays; i++) {
            let data = {
                weekDay: 0,
                monthDay: i,
            };

            const li = dayConstructor(data, 'before');

            li.id = '';

            document.querySelector('ul.month-days').appendChild(li);
        }

        return first;
    }
}

export default function calendarRender(calendar, saveDay, saveIndex) {
    const { day, days, month, totDays, nDay } = calendar;
    const monthDays = document.querySelector('.month-days');

    if(monthDays.childElementCount > 0) {
        monthDays.innerHTML = '';
    };

    let indexWeekDay = firstDay(day, nDay, totDays);

    document.querySelector('h1').textContent = month;

    for (let i = 1; i <= totDays; i++) {
        let indexDay = null;

        if(saveDay !== null) {
            let index = saveDay.indexOf(i);

            if(index !== -1) indexDay = saveIndex[index];
        };

        let data = {
            weekDay: days[indexWeekDay],
            monthDay: i,
            indexDay,
        };

        const li = dayConstructor(data, 'month');

        if (i === day) li.setAttribute('style', 'box-shadow: 1px 1px 5px red; background: red; color: #f5f5f5');

        document.querySelector('ul.month-days').appendChild(li);

        indexDay++;
        if (indexDay === 7) indexDay = 0;
    }
    
    return calendar;
}