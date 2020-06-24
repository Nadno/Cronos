import { dayConstructor } from './components/components';
import { monthTotalDays } from './Date';

const beforeThisMonth = (first, totalDays) => {
    for (let beforeFirst = (totalDays - first); beforeFirst < totalDays; beforeFirst++) {
        const li = dayConstructor((beforeFirst + 1), 'before');

        li.id = '';
        document.querySelector('ul.month-days').appendChild(li);
    };
};

const setClass = ({ saveDay, saveEvent }, liDay, li, calendar, selectedDay, selectedMonth) => {
    const { day } = calendar;
    let indexDay;

    if (saveDay !== undefined && saveDay.length >= 0) indexDay = saveDay.indexOf(liDay);

    if (liDay === selectedDay) li.classList.add('selected-day');

    if (indexDay >= 0) {
        li.dataset.indexday = indexDay;

        if (saveEvent !== undefined && saveEvent.indexOf(liDay) >= 0) {
            li.title = 'há tarefas e eventos para este dia';
            li.classList.add('has-todo-and-event');
        } else {
            li.title = 'há tarefas para este dia';
            li.classList.add('has-todo');
        };
    } else if (saveEvent !== undefined && saveEvent.indexOf(liDay) >= 0) {
        li.title = 'há tarefas e eventos para este dia';
        li.classList.add('has-event');
    };

    return li;
};

export const nextYears = actualYear => {
    const selectYear = document.getElementById('select-year');

    for(let year = actualYear; year <= (actualYear + 5); year++) {
        const option = document.createElement('option');

        option.value = year;
        option.innerText = year;

        selectYear.appendChild(option);
    };
};

export default function calendarRender(calendar, itemsIndex) {
    const { days, monthName, actualDay, actualMonth, actualYear } = calendar;

    const selectedMonth = Number(document.getElementById('select-month').value);
    const selectedDay = Number(document.querySelector('.menu').dataset.day);
    const selectedYear = Number(document.getElementById('select-year').value);

    const monthDays = document.querySelector('.month-days');
    let indexWeekDay = calendar.firstDay;
    let totalDays;
    let lastMonth;

    if (monthDays.childElementCount > 0) monthDays.innerHTML = '';

    totalDays = monthTotalDays(selectedMonth, selectedYear);
    lastMonth = monthTotalDays(selectedMonth - 1, selectedYear);

    document.getElementById('calendar-title').textContent = monthName[selectedMonth];

    beforeThisMonth(indexWeekDay, lastMonth);

    for (let liDay = 1; liDay <= totalDays; liDay++) {
        let li = dayConstructor(liDay, 'month');

        if (liDay === actualDay && selectedMonth === actualMonth && actualYear === selectedYear) {
            li.classList.add('today');
            li.title = 'Hoje';
        };

        li = setClass(itemsIndex, liDay, li, calendar, selectedDay, selectedMonth);
        li.dataset.weekday = days[indexWeekDay];
        document.querySelector('ul.month-days').appendChild(li);

        indexWeekDay++;
        if (indexWeekDay === 7) indexWeekDay = 0;
    }

    return calendar;
}