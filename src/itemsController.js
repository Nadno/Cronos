import { saveItems } from './save';
import { monthTotalDays } from './Date';

import { eventConstructor } from './components/components';
import './components/ToDo';

const getIndexDay = () => {
    const day = document.querySelector('.menu').dataset.day;

    if (day === 'Daily') return day;

    const index = document.getElementById(day).dataset.indexday;
    return index;
};

export const showToDos = ({ items, selectedMonth }) => {
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


export const showEvents = ({ items, weekDay, calendar, selectedMonth, selectedDay }) => {
    const month = calendar.monthName[selectedMonth];
    const eventList = document.querySelector('.event-list');

    eventList.innerHTML = '';

    if (selectedDay === 'Daily') {
        items.Months[selectedMonth].Events.map((item, index) => {
            const newWeekDay = document.getElementById(item.day).dataset.weekday;
            const eventLi = eventConstructor(item.name, item.day, item.description, newWeekDay, index);

            document.getElementById('event-menu-title').innerText = month;

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

export default function ItemsController() {
    const alerts = document.getElementById('alerts');
    let alertsIsActive = false;

    const destroyAlert = () => (
        setTimeout(() => {
            alerts.classList.remove('on');
            alerts.querySelector('h4').innerText = '';
            alerts.querySelector('span').innerText = '';

            alertsIsActive = !alertsIsActive;
        }, 6000));

    return {
        ToDoCheck(data) {
            const { indexTask, checkItem, selectedMonth, items, calendar } = data;
            const Days = items.Months[selectedMonth].Days;
            const index = getIndexDay();

            if (index === 'Daily') {
                items.Daily[indexTask].checked = checkItem;
            } else {
                Days[Number(index)].Tasks[indexTask].checked = checkItem;
            }

            saveItems(items, calendar);
        },

        createToDo(data) {
            const { selectedDay, selectedMonth, items, calendar } = data;
            const { actualDay, actualMonth, actualYear } = calendar;

            const selectedYear = Number(document.getElementById('select-year').value);

            const text = document.querySelector('.todo-text').value;
            let index = getIndexDay();

            const task = {
                text,
                checked: false
            };

            if (text.length > 0 && text.length <= 120) {
                if (index === 'Daily') {
                    items.Daily.push(task);
                    saveItems(items, calendar);
                } else {
                    const Days = items.Months[selectedMonth].Days;

                    if (selectedDay >= actualDay || selectedMonth > actualMonth || selectedYear > actualYear) {

                        index = getIndexDay();

                        if (index >= 0) {
                            Days[Number(index)].Tasks.push(task);

                            saveItems(items, calendar);
                        } else {
                            const day = { Day: selectedDay, Tasks: [task] };

                            Days.push(day);
                            saveItems(items, calendar, true);

                        };
                    } else if (!alertsIsActive) {
                        alerts.querySelector('h4').innerText = 'Erro ao criar a Tarefa';
                        alerts.querySelector('span').innerText = 'Uma tarefa só pode ser criada a partir do mês atual e do dia atual, demarcado com a cor vermelha!';
                        alerts.classList.add('on');
                        alertsIsActive = !alertsIsActive;

                        destroyAlert();
                    };
                };
            } else if (!alertsIsActive) {
                alerts.querySelector('h4').innerText = 'Erro ao criar a Tarefa';
                alerts.querySelector('span').innerText = 'Uma tarefa precisa ter no mínimo um caractere e no máximo 120!';
                alerts.classList.add('on');
                alertsIsActive = !alertsIsActive;

                destroyAlert();
            };

            showToDos(data);
        },

        deleteToDo(data) {
            const { selectedMonth, items, calendar, indexTask } = data;
            const index = getIndexDay();

            if (index === 'Daily') {
                const dailyList = items.Daily;

                dailyList.splice(indexTask, 1);
                saveItems(items, calendar);
            } else {
                const Days = items.Months[selectedMonth].Days;

                if (Days[index].Tasks.length === 1) {
                    Days.splice(index, 1);

                    saveItems(items, calendar, true);
                } else {
                    Days[index].Tasks.splice(indexTask, 1);

                    saveItems(items, calendar);
                };
            }

            showToDos(data);
        },

        createEvent(data, name, alert, description) {
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
                console.log('ok');
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
            };
        },

        deleteEvent({ data, id }) {
            const Month = data.items.Months[data.selectedMonth];
            Month.Events.splice(id, 1);

            saveItems(data.items, data.calendar, true);
            showEvents(data);
        },

        dailyReset({ items, calendar, selectedMonth }) {
            const { actualDay, actualMonth } = calendar;

            if (items.Daily.length >= 1) {
                if (actualDay > items.Location.Day || actualMonth > items.Location.Month) {
                    for (let key in items.Daily) {
                        items.Daily[key].checked = false;
                    };

                    saveItems(items, calendar);
                };
            };

            showToDos({ items, selectedMonth });
        }

    };
};