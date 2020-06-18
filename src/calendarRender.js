import { dayConstructor } from './components';
import { monthTotalDays } from './Date';

const beforeThisMonth = (first, totalDays) => {
    for (let beforeFirst = (totalDays - first); beforeFirst < totalDays; beforeFirst++) {
        let data = {
            weekDay: 0,
            monthDay: beforeFirst + 1,
        };

        const li = dayConstructor(data, 'before');

        li.id = '';

        document.querySelector('ul.month-days').appendChild(li);
    };
};

export default function calendarRender(calendar, saveDay, saveIndex, first) {
    const selectedMonth = Number(document.getElementById('select-month').value);

    const { day, days, month, year } = calendar;
    const monthDays = document.querySelector('.month-days');

    let totalDays;
    let lastMonth;
    let indexWeekDay = first;

    if (monthDays.childElementCount > 0) monthDays.innerHTML = '';

    totalDays = monthTotalDays(selectedMonth, year);
    lastMonth = monthTotalDays(selectedMonth - 1, year);
    document.querySelector('h1').textContent = month[selectedMonth];

    beforeThisMonth(first, totalDays);

    for (let i = 1; i <= totalDays; i++) {
        let indexDay = null;

        if (saveDay !== null) {
            let index = saveDay.indexOf(i);

            if (index !== -1) indexDay = saveIndex[index];
        };

        let data = {
            weekDay: days[indexWeekDay],
            monthDay: i,
            indexDay,
        };

        const li = dayConstructor(data, 'month');

        if (i === day && selectedMonth === calendar.nMonth) {
            li.classList.add('today');
            li.title = 'Hoje';
        }

        document.querySelector('ul.month-days').appendChild(li);

        indexDay++;
        indexWeekDay++;
        if (indexDay === 7) indexDay = 0;
        if (indexWeekDay === 7) indexWeekDay = 0;
    }

    return calendar;
}