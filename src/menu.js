import {
    showTasks,
    createTask,
    deleteTask,
    ToDoCheck
} from './itemsController';

import { arrowLeftButton } from './components';

export const handleCreateTask = (selectedDay, data) => {
    createTask(selectedDay, data);
};

export const handleDeleteTask = (data, indexTask) => {
    deleteTask(data, indexTask);
}

export const handleCheckTask = (data, indexTask, checkItem) => {
    ToDoCheck(data, indexTask, checkItem);
};

const handleBackMenu = (calendar, items, returnContainer) => {
    const menu = document.querySelector('.menu');

    menu.querySelector('#menu-title').innerText = 'Tarefas diárias';
    menu.dataset.day = 'Daily';
    menu.id = 'Daily';
    returnContainer.innerHTML = '';

    showTasks(items);
};

export default function menuNavigation(selectedDay, weekday, { calendar, items }) {
    const selectedMonth = Number(document.getElementById('select-month').value);
    const returnContainer = document.querySelector('.return-container');
    const menu = document.querySelector('.menu');
    const id = menu.getAttribute('id');
    const { month } = calendar;

    menu.querySelector('#menu-title').innerText = `${weekday} - ${selectedDay} de ${month[selectedMonth]}`;
    menu.id = `${selectedDay}-${month[selectedMonth]}`;
    menu.dataset.day = selectedDay;
    returnContainer.innerHTML = '';
    
    if(id === `${selectedDay}-${month[selectedMonth]}`) {
        handleBackMenu(calendar, items, returnContainer);
    } else {
        showTasks(items);

        returnContainer.appendChild(arrowLeftButton());

        document.querySelector('.return')
        .addEventListener('click', () => handleBackMenu(calendar, items, returnContainer));
    };
};