import { saveToDos } from './save';
import { monthTotalDays } from './Date';
import { eventConstructor } from './components/components';
import './components/ToDo';

export default function ItemsController() {
    const itemsController = {};

    const getIndexDay = () => {
        const day = document.querySelector('.menu').dataset.day;

        if (day === 'Daily') return day;

        const index = document.getElementById(day).dataset.indexday;

        return index;
    };

    const showToDos = ({ items, selectedMonth }) => {
        const listContainer = document.querySelector('.todo-list');
        const { Months, Daily } = items;
        const index = getIndexDay();

        listContainer.innerHTML = '';

        if (index !== undefined) {
            let tasks;

            if (index !== 'Daily') {
                tasks = Months[selectedMonth].Days[Number(index)].Tasks;
            } else {
                tasks = Daily;
            };

            if (tasks.length > 0) {
                for (let i = 0; i < tasks.length; i++) {
                    const toDo = document.createElement('to-do');
                    const li = document.createElement('li');
                    toDo.task = { tasks, i };

                    li.appendChild(toDo);
                    listContainer.appendChild(li);
                };
            }
        };
    };

    const ToDoCheck = data => {
        const { indexTask, checkItem, selectedMonth, items, calendar } = data;
        const Days = items.Months[selectedMonth].Days;
        const index = getIndexDay();

        if (index === 'Daily') {
            items.Daily[indexTask].checked = checkItem;
        } else {
            Days[index].Tasks[indexTask].checked = checkItem;
        }

        saveToDos(items, calendar);
    };

    const createToDo = data => {
        const { selectedDay, selectedMonth, items, calendar } = data;

        const text = document.querySelector('.todo-text').value;
        const index = getIndexDay();
        const task = {
            text,
            checked: false
        };

        if (index === 'Daily') {
            items.Daily.push(task);
            saveToDos(items, calendar);
        } else {
            const Days = items.Months[selectedMonth].Days;

            if ((selectedDay >= calendar.day || selectedMonth > calendar.nMonth) && text.length > 4) {
                if (index >= 0) {
                    Days[Number(index)].Tasks.push(task);

                    if (Days[Number(index)].Events.length > 0) {
                        saveToDos(items, calendar, true);
                    } else {
                        saveToDos(items, calendar);
                    };
                } else {
                    const day = { Day: selectedDay, Events: [], Tasks: [task] };

                    Days.push(day);
                    saveToDos(items, calendar, true);
                };
            };
        };

        showToDos(data);
    };

    const deleteTodo = data => {
        const { selectedMonth, items, calendar, indexTask } = data;
        const index = getIndexDay();

        if (index === 'Daily') {
            const dailyList = items.Daily;

            dailyList.splice(indexTask, 1);
            saveToDos(items, calendar);
        } else {
            const Days = items.Months[selectedMonth].Days;

            if (Days[index].Tasks.length === 1) {
                Days.splice(index, 1);

                saveToDos(items, calendar, true);
            } else {
                Days[index].Tasks.splice(indexTask, 1);

                saveToDos(items, calendar);
            };
        }

        showToDos(data);
    };

    const createEvent = (data, name, alert, description) => {
        const { selectedMonth, selectedDay, items, calendar } = data;

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

        Events.push(event);
        if (monthVerify < 0) EventsOnMonths.push(selectedMonth);

        saveToDos(items, calendar, true);
    };

    const showEvents = ({ items, weekDay, calendar, selectedMonth, selectedDay }) => {
        const index = getIndexDay();
        const month = calendar.month[selectedMonth];
        const eventList = document.querySelector('.event-list');

        eventList.innerHTML = '';

        if(selectedDay === 'Daily') {
            items.Months[selectedMonth].Events.map(item => {
                const newWeekDay = document.getElementById(item.day).dataset.weekday;
                const eventLi = eventConstructor(item.name, item.day, item.description, newWeekDay);

                document.getElementById('event-menu-title').innerText = month;

                eventList.appendChild(eventLi);
            });
        } else {
            items.Months[selectedMonth].Events.map(item => {
                if(item.day === Number(selectedDay)) {
                    const eventLi = eventConstructor(item.name, item.day, item.description, weekDay);

                    document.getElementById('event-menu-title').innerText = `Dia ${item.day} de ${month}`;
                    eventLi.querySelector('h4').innerText = `${weekDay}`;

                    eventList.appendChild(eventLi);
                };
            });
        };
    };

    const dailyReset = ({ items, calendar, selectedMonth }) => {
        const { nMonth, day } = calendar;

        if (day > items.Day || nMonth > items.Month) {
            items.Month = nMonth;
            items.Day = day;

            for (let key in items.Daily) {
                items.Daily[key].checked = false;
            };

            saveToDos(items, calendar);
        }

        showToDos({ items, selectedMonth });
    }

    itemsController.showEvents = data => showEvents(data);
    itemsController.showToDos = data => showToDos(data);
    itemsController.ToDoCheck = data => ToDoCheck(data);
    itemsController.createToDo = data => createToDo(data);
    itemsController.deleteTodo = data => deleteTodo(data);
    itemsController.createEvent = (data, name, alert, description) => createEvent(data, name, alert, description);
    itemsController.dailyReset = data => dailyReset(data);

    return itemsController;
};