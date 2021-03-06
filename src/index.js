"use strict"

import calendarRender from './Date';
import { getData } from './save';


import Menu from './components/Menu';
import EventMenu from './components/EventMenu';
import NotificationsController from './notificationsController';

let data = getData(true);

const menu = Menu(data);
const eventMenu = EventMenu(data);
const NotificationController = NotificationsController();

const menuElement = document.querySelector('div.menu');
const returnButtonImg = document.querySelector('.button-img');
const notifications = document.getElementById('notifications');
const notificationAlert = document.querySelector('.notification-alert');

let notificationsActive = false;

console.log(data);
NotificationController.lastLogin(data);

// HEADER

notificationAlert.addEventListener('click', () => {
    NotificationController.openNotifications();

    if (data.items?.Notifications?.length >= 1) {
        NotificationController.showNotifications(data);
    }
    if (notificationsActive) {
        notificationAlert.classList.remove('on');
        notifications.classList.remove('on');
        notifications.innerHTML = '';
    }

    notificationsActive = !notificationsActive;
});

notifications.addEventListener('click', e => {
    if (e.target.className === 'notification-delete') {
        const id = Number(e.target.id);

        NotificationController.handleDeleteNotification({ data, id });
    };
});

// CALENDAR


document.querySelector('main').addEventListener('click', () => {
    if (notificationsActive) {
        notificationAlert.classList.remove('on');
        notifications.classList.remove('on');
        notifications.innerHTML = '';
        notificationsActive = false;
    };
});

document.querySelector('.select-month').onchange = e => {
    eventMenu.handleCloseEventMenu();
    menu.handleBackMenu(data);

    data.selectedMonth = Number(document.querySelector('.select-month').value);
    data = getData();
};

document.querySelector('ul.month-days').addEventListener('click', (e) => {
    if (e.target.id !== '') {
        if (document.body.clientWidth <= 760) {
            menuElement.classList.toggle('on');
            menu.handleBackMenu(data);
            document.querySelector('.return-to-daily').classList.add('close');
            window.scrollTo(0, 0);
            document.body.style.overflow = 'hidden';
        } else {
            document.querySelector('.return-to-daily').classList.add('daily');
        }
        eventMenu.handleCloseEventMenu();

        returnButtonImg.src = 'assets/home.svg';

        const { weekday } = e.target.dataset;
        const selectedday = e.target.id;

        data.selectedMonth = Number(document.getElementById('select-month').value);
        data.selectedDay = Number(selectedday);
        data.weekDay = weekday;

        menu.navigation(data);
    };
});

// HEADER MENU

document.querySelector('.to-create-events').onclick = () => {
    if (Number(menuElement.dataset.day) > 0) {
        const day = menuElement.dataset.day;
        const weekDay = menuElement.dataset.weekday;

        document.querySelector('.create-event-blur').classList.toggle('on');
        document.getElementById('create-event-title').innerText = `Dia ${day} - ${weekDay}`;
    };
};

document.querySelector('.to-event').onclick = () => {
    const classNames = document.getElementById(menuElement.dataset.day).className;
    const className = classNames.split(" ", 4);
    let eventClass;

    if (className.indexOf('has-event') >= 0) {
        eventClass = className[className.indexOf('has-event')];
    } else if (className.indexOf('has-todo-and-event') >= 0) {
        eventClass = className[className.indexOf('has-todo-and-event')];
    };

    if (eventClass === 'has-event' || eventClass === 'has-todo-and-event' || menuElement.id === 'Daily') {
        document.querySelector('.return-to-daily').classList.add('back');
        document.querySelector('.event-container').classList.add('on');

        returnButtonImg.src = 'assets/arrow-left.svg';

        data.selectedMonth = Number(document.getElementById('select-month').value);
        data.selectedDay = menuElement.dataset.day;
        data.selectedYear = Number(document.getElementById('select-year').value);
        data.weekDay = menuElement.dataset.weekday;

        eventMenu.handleShowEvents(data);
    };
};

document.querySelector('.return-to-daily').addEventListener('click', () => {
    const className = document.querySelector('.return-to-daily').className.split(" ", 3);
    const header = menu.returnToDaily();

    let back;

    if (className.length > 2) {
        back = header[className[2]];
    } else {
        back = header[className[1]];
    };

    if (back) back(data);
});

// ToDos INPUTS

document.getElementById('create-todo').addEventListener('submit', e => {
    e.preventDefault();

    data.selectedDay = Number(menuElement.dataset.day);

    menu.handleCreateToDo(data);
});

document.getElementById('todo-container').onchange = e => {
    const className = e.target.getAttribute('class');

    if (className === 'task' || className === 'task-checkbox') {
        data.indexTask = Number(e.target.getAttribute('id'));
        data.checkItem = e.target.checked;

        menu.handleCheckToDo(data);
    }
};

document.getElementById('todo-container').addEventListener('click', e => {
    const className = e.target.getAttribute('class');

    if (className === 'todo-delete') {
        data.indexTask = Number(e.target.dataset.index);

        menu.handleDeleteToDo(data);
    }
});

// EVENT MENU

// Create event menu return
document.querySelector('.create-event-return').addEventListener('click', () => (
    document.querySelector('.create-event-blur').classList.remove('on')
));

document.getElementById('create-event').onsubmit = e => {
    e.preventDefault();

    data.selectedDay = Number(menuElement.dataset.day);
    data.weekDay = menuElement.dataset.weekday;

    eventMenu.handleCreateEvent(data);
};

document.querySelector('.event-list').addEventListener('click', e => {
    if (e.target.className === 'event-delete') {
        const id = Number(e.target.id);

        eventMenu.handleDeleteEvent(data, id);
    }
});