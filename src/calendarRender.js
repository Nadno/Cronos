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

    if (liDay === day && selectedMonth === calendar.nMonth) {
        li.classList.add('today');
        li.title = 'Hoje';
    };

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

export default function calendarRender({ calendar, items }, itemsIndex) {
    const { days, month, year } = calendar;

    const selectedMonth = Number(document.getElementById('select-month').value);
    const selectedDay = Number(document.querySelector('.menu').dataset.day);

    const monthDays = document.querySelector('.month-days');
    let indexWeekDay = items.Location.firstDays[selectedMonth];
    let totalDays;
    let lastMonth;

    if (monthDays.childElementCount > 0) monthDays.innerHTML = '';

    totalDays = monthTotalDays(selectedMonth, year);
    lastMonth = monthTotalDays(selectedMonth - 1, year);
    document.querySelector('h1').textContent = month[selectedMonth];

    beforeThisMonth(indexWeekDay, lastMonth);

    for (let liDay = 1; liDay <= totalDays; liDay++) {
        let li = dayConstructor(liDay, 'month');

        li = setClass(itemsIndex, liDay, li, calendar, selectedDay, selectedMonth);
        li.dataset.weekday = days[indexWeekDay];
        document.querySelector('ul.month-days').appendChild(li);

        // indexDay++;
        indexWeekDay++;
        // if (indexDay === 7) indexDay = 0;
        if (indexWeekDay === 7) indexWeekDay = 0;
    }

    return calendar;
}