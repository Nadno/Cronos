import { getData } from './save';
import Menu from './components/Menu';
import EventMenu from './components/EventMenu';
import EventsController from './eventsController';

const menu = Menu();
let data = getData(true);
const eventMenu = EventMenu();
const eventsController = EventsController();

const menuElement = document.querySelector('div.menu');
const returnButtonImg = document.querySelector('.button-img');
const notifications = document.getElementById('notifications');
const notificationsAlert = document.querySelector('.notification-alert');

let notificationsActive = false;

console.log(data);

eventsController.lastLogin(data);

// HEADER

document.querySelector('.notification-alert').addEventListener('click', () => {
    notifications.classList.toggle('on');
    notificationsAlert.classList.toggle('on');
    document.querySelector('.new-notification').classList.remove('on');

    if (data.items?.Notifications?.length >= 1) {
        eventsController.showNotifications(data);
    }
    if(notificationsActive) {
        notifications.innerHTML = '';
    }

    notificationsActive = !notificationsActive;
});

notifications.addEventListener('click', e => {
    if(e.target.className === 'notification-delete') {
        const id = Number(e.target.id);
        
        eventsController.handleDeleteNotification({ data, id });
    };
});

// CALENDAR


document.querySelector('main').addEventListener('click', (e) => {
    if (notificationsActive) {
        notifications.classList.remove('on');
        notifications.innerHTML = '';
        notificationsActive = false;
    };
});

document.querySelector('.select-month').onchange = e => {
    e.preventDefault();

    eventMenu.handleCloseEventMenu();
    data = getData();
    menu.handleBackMenu(data);
};

document.querySelector('ul.month-days').addEventListener('click', (e) => {
    if (e.target.id !== '') {
        eventMenu.handleCloseEventMenu();

        document.querySelector('.return-to-daily').classList.add('on-todo');
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
        document.querySelector('.return-to-daily').classList.add('on-event');
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

    if (className.indexOf('on-event') >= 0 && className.indexOf('on-todo') >= 0) {
        eventMenu.handleCloseEventMenu();
        returnButtonImg.src = 'assets/home.svg';
    } else if (className[1] === 'on-event') {
        eventMenu.handleCloseEventMenu(true);
    } else if (className[1] === 'on-todo') {
        menu.handleBackMenu(data);
    };
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

    data.selectedMonth = Number(document.getElementById('select-month').value);
    data.selectedDay = menuElement.dataset.day;
    data.weekDay = menuElement.dataset.weekday;

    eventMenu.handleShowEvents(data);
};

document.querySelector('.event-list').addEventListener('click', e => {
    if (e.target.className === 'event-delete') {
        const id = Number(e.target.id);

        eventMenu.handleDeleteEvent({ data, id });
    }
});