import { getItems } from './save';
import menuNavigation, { handleCreateTask, handleDeleteTask, handleCheckTask } from './menu';

const menuElement = document.querySelector('div.menu');
const data = getItems();

document.querySelector('ul.month-days').addEventListener('click', function (e) {
    if (e.target.value !== undefined) {
        const { selectedday, weekday } = e.target.dataset;
        menuNavigation(Number(selectedday), weekday, data);
    }
});

document.querySelector('#create-task').addEventListener('submit', e => {
    e.preventDefault();

    const selectedDay = menuElement.dataset.day;

    handleCreateTask(selectedDay, data);
});

document.querySelector('#render-todo').onchange = e => {
     e.preventDefault();

    const className = e.target.getAttribute('class');

    if (className === 'task' || className === 'task-checkbox') {
        const indexTask = Number(e.target.getAttribute('id'));
        const checkItem = e.target.checked;

        handleCheckTask(data, indexTask, checkItem);
    }
};

document.querySelector('#render-todo').addEventListener('click', e => {
    const className = e.target.getAttribute('class');

    if (className === 'delete') {
        const indexTask = Number(e.target.dataset.index);
        
        handleDeleteTask(data, indexTask);
    }
});