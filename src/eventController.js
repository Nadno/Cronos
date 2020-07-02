import { saveItems } from './save';

import { monthTotalDays } from './Date';
import { eventConstructor } from './components/components';

const EventController = () => {
    const menuElement = document.querySelector('div.menu');

    const showEvents = data => {
        const { items, calendar, selectedMonth } = data;
        const month = calendar.monthName[selectedMonth];
        const eventList = document.querySelector('.event-list');

        const selectedDay = menuElement.dataset.day;
        const weekDay = menuElement.dataset.weekday;

        eventList.innerHTML = '';

        if (selectedDay === 'Daily') {
            document.getElementById('event-menu-title').innerText = month;

            items.Months[selectedMonth].Events.map((item, index) => {
                const newWeekDay = document.getElementById(item.day).dataset.weekday;
                const eventLi = eventConstructor(item.name, item.day, item.description, newWeekDay, index);

                eventList.appendChild(eventLi);
            });
        } else {
            items.Months[selectedMonth].Events.map((item, index) => {
                if (item.day === Number(selectedDay)) {
                    const eventLi = eventConstructor(item.name, item.day, item.description, weekDay, index);

                    document.getElementById('event-menu-title').innerText = `Dia ${item.day} de ${month}`;
                    eventLi.querySelector('h4').innerText = `${weekDay}`;

                    eventList.appendChild(eventLi);
                };
            });
        };
    };

    const createEvent = (data, name, alert, description) => {
        const { selectedMonth, selectedDay, selectedYear, items, calendar } = data;
        const { actualDay, actualMonth, actualYear } = calendar;

        const EventsOnMonths = items.Location.EventsOnMonths;
        const monthVerify = EventsOnMonths.indexOf(selectedMonth);
        const Events = items.Months[selectedMonth].Events;

        const event = {
            name,
            description,
            month: selectedMonth,
            lastMonth: -1,
            day: selectedDay,
        };

        let distanceDay = (selectedDay - actualDay);

        if (distanceDay >= alert && (selectedDay > actualDay || selectedMonth >= actualMonth || selectedYear > actualYear)) {
            if (selectedDay < alert) {
                const totalDays = monthTotalDays((selectedMonth - 1), calendar.year);
                const lastMonthDays = alert - selectedDay;

                event.lastMonth = selectedMonth - 1;
                event.alertDay = totalDays - lastMonthDays;
            } else if (selectedDay > alert) {
                const alertDay = selectedDay - alert;

                event.alertDay = alertDay;

            } else {
                event.alertDay = 1;
            };

            if (monthVerify < 0) EventsOnMonths.push(selectedMonth);

            Events.push(event);
            saveItems(items, calendar, true);

            return true;
        };
    }

    const deleteEvent = (data, id) => {
        const { items, calendar, selectedMonth } = data;
        console.log(data);
        const Month = items.Months[selectedMonth];

        Month.Events.splice(id, 1);

        saveItems(items, calendar, true);
        showEvents(data);
    }

    return {
        showEvents,
        createEvent,
        deleteEvent,
    };
};

export default EventController;