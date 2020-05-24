import { showItems, createTask, checkboxController } from './itemsController';

function formTask(day, data) {
    const { calendar, items } = data;

    const create = document.getElementById('create');
    const task = document.getElementById('tasks');

    create.onsubmit = e => {
        e.preventDefault();

        createTask(calendar.day, day, items);
    }

    task.onchange = e => {
        e.preventDefault();

        checkboxController(e.target.checked, e.target.getAttribute('id'), day, items);
    }
}

function menuRender(day, calendar) {
    const checkbox = document.getElementById('check-menu');
    const name = checkbox.getAttribute('name');

    checkbox.setAttribute('name', `${day}-${calendar.month}`);
    document.getElementById('task-title').innerHTML = `${day} de ${calendar.month}`;
    
    
    if(checkbox.checked === false) {
        checkbox.checked = true;
    } else if(name === `${day}-${calendar.month}`) {
        checkbox.checked = false;
    } 
}

export function menu(day, data) {
    menuRender(day, data.calendar);
    showItems(day, data.items);
    
    formTask(day, data);
}