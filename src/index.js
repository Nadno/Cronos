import { getData } from './save';
import Menu from './components/Menu';
import EventMenu from './components/EventMenu';

const menuElement = document.querySelector('div.menu');
const data = getData(true);
const menu = Menu();
const eventMenu = EventMenu();
const eventMenuCheck = document.getElementById('event-menu');

document.querySelector('.select-month').onchange = e => {
    e.preventDefault();

    menu.handleBackMenu(data);
    getData();
};

document.querySelector('ul.month-days').addEventListener('click', function (e) {
    if (e.target.id !== '') {
        eventMenuCheck.checked = false;

        const { weekday } = e.target.dataset;
        const selectedday = e.target.id;

        data.selectedMonth = Number(document.getElementById('select-month').value);
        data.selectedDay = Number(selectedday);
        data.weekDay = weekday;

        menu.navigation(data);
    };
});

document.querySelector('.events').onclick = () => {
    if (Number(menuElement.dataset.day) > 0) {
        document.getElementById('create-event-check').checked = true
    };
};

document.getElementById('create-todo').addEventListener('submit', e => {
    e.preventDefault();

    data.selectedDay = Number(menuElement.dataset.day);

    menu.handleCreateToDo(data);
});

document.getElementById('todo-container').onchange = e => {
    e.preventDefault();

    const className = e.target.getAttribute('class');

    if (className === 'task' || className === 'task-checkbox') {
        data.indexTask = Number(e.target.getAttribute('id'));
        data.checkItem = e.target.checked;

        menu.handleCheckToDo(data);
    }
};

document.getElementById('todo-container').addEventListener('click', e => {
    const className = e.target.getAttribute('class');

    if (className === 'delete') {
        data.indexTask = Number(e.target.dataset.index);

        menu.handleDeleteToDo(data);
    }
});

document.getElementById('create-event').onsubmit = e => {
    e.preventDefault();

    data.selectedDay = Number(menuElement.dataset.day);
    data.weekDay = menuElement.dataset.weekday;

    eventMenu.handleCreateEvent(data);

    if(eventMenuCheck.checked === true) {
        data.selectedMonth = Number(document.getElementById('select-month').value);
        data.selectedDay = menuElement.dataset.day;
        data.weekDay = menuElement.dataset.weekday;

        eventMenu.handleShowEvents(data);
    };
};

document.querySelector('.bell').onclick = () => {
    const classNames = document.getElementById(menuElement.dataset.day).className;
    const className = classNames.split(" ", 2);

    if (className[1] === 'has-event' || className[1] === 'has-todo-and-event' || menuElement.id === 'Daily') {
        eventMenuCheck.checked = true;

        data.selectedMonth = Number(document.getElementById('select-month').value);
        data.selectedDay = menuElement.dataset.day;
        data.weekDay = menuElement.dataset.weekday;

        eventMenu.handleShowEvents(data);
    };
};