import {
    showItems,
    createTask,
    checkboxController,
    saveItems,
    deleteItems
} from './itemsController';

import {
    indexDay
} from './Date';

function formTask(day, data) {
    const {
        calendar,
        items
    } = data;

    const { Months, Year } = items;
    const thisMonth = Months[calendar.nMonth];

    const create = document.getElementById('create');
    const tasks = document.getElementById('tasks');
   

    create.onsubmit = e => {
        e.preventDefault();

        createTask(calendar.day, day, thisMonth.Days);
        saveItems(items, Year);
    }

    tasks.onchange = e => {
        e.preventDefault();
        
        checkboxController(e.target.checked, e.target.getAttribute('id'), day, thisMonth);
        saveItems(items, Year);
    }

    tasks.onclick = e => {
        const indexTask = parseInt(e.target.getAttribute('value'));
        const index = indexDay(Months[calendar.nMonth].Days, day);
        const excluir = e.target.getAttribute('class');

        if(excluir === 'excluir') deleteItems(items, index, indexTask, calendar);
    }
}

function menuRender(day, month, weekDay, tasks) {
    const checkbox = document.getElementById('check-menu');
    const name = checkbox.getAttribute('name');

    checkbox.setAttribute('name', `${day}-${month}`);
    document.getElementById('task-title').innerHTML = `${weekDay} - ${day} de ${month}`;

    if (checkbox.checked === false) {
        checkbox.checked = true;
        showItems(tasks);
    } else if(name === `${day}-${month}`) {
        checkbox.checked = false;
    } else {
        showItems(tasks);
    }
}

export function menu(day, weekDay, data) {
    const { items, calendar } = data;
    const { nMonth } = calendar;
    const { Months } = items;

    const index = indexDay(Months[nMonth].Days, day);

    if(index !== undefined) {
        const tasks = Months[nMonth].Days[index].Tasks;
        
        menuRender(day, calendar.month, weekDay, tasks);
    } else {
        menuRender(day, calendar.month, weekDay, undefined);
    }
    
    
    

    formTask(day, data);
}