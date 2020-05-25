import { newDay, newData, itemData } from './item';
import { indexDay } from './Date';

export const saveItems = (items, year) => {   
    const save = JSON.stringify(items);
    
    localStorage.setItem(`cronos-${year}`, save); 
}

export const deleteItems = (items, day, indexTask, calendar) => {
    const { Months } = items;

    Months[calendar.nMonth].Days[day].Tasks.splice(indexTask, 1);

    if(Months[calendar.nMonth].Days[day].Tasks.length === 0) {
        Months[calendar.nMonth].Days.splice(day, 1);
        showItems(undefined);
    } else {
        showItems(Months[calendar.nMonth].Days[day].Tasks);
    }

    saveItems(items, calendar.year);
}

export const getItems = calendar => {
    const { nMonth, year } = calendar;
    const Items = searchItems(year);
    
    if(Items !== null) {
        const save = parseJson(Items);
        console.log('Item econtrado');
        const data = {
            items: save,
            calendar,
        }

        return data;
    } else {
        const data = newData(itemData(year), calendar);
        console.log('Item não encontrado');
        return data;
    }
}

const searchItems = year => {
    try {
        return localStorage.getItem(`cronos-${year}`);
    } catch {
        return null;
    }
}

const parseJson = save => {
    try {
        return JSON.parse(save);
    } catch {
        return null;
    }
}


const checkBox = (check, i) => {
    const input = document.createElement('input');

    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', `${i}`);
    if (check) input.checked = 'true';

    return input;
}

export const checkboxController = (check, id, day, items) => {
    const index = indexDay(items.Days, day);

    items.Days[index].Tasks[id].checked = check;
}

export const showItems = (tasks) => {
    const form = document.getElementById('tasks');
    
    if (form.childElementCount > 0) form.removeChild(document.getElementById('render'));

    if(tasks !== undefined) {
        const divRender = document.createElement('div');

        divRender.setAttribute('id', 'render');
        form.appendChild(divRender);

        const render = document.getElementById('render');

        for (let i = 0; i < tasks.length; i++) {
            const label = document.createElement('label');
            const span = document.createElement('span');
            const excluir = document.createElement('button');
            const checkbox = checkBox(tasks[i].checked, i);

            label.setAttribute('for', `${i}`);

            excluir.setAttribute('class', 'excluir');
            excluir.setAttribute('type', 'button');
            excluir.setAttribute('value', `${i}`);
            excluir.appendChild(document.createTextNode('X'));

            span.appendChild(document.createTextNode(tasks[i].text));
            label.appendChild(span);
            label.appendChild(excluir);

            render.appendChild(checkbox);
            render.appendChild(label);
        }
    } 
}

export const createTask = (now, day, days) => {
    const text = document.getElementById('textarea').value;

    const task = {
        text,
        checked: false
    };
    
    let index = indexDay(days, day);

    if (day >= now && text.length > 0) {
        if (index !== undefined) {
            days[index].Tasks.push(task);
        } else {
            const item = newDay(day, task);

            days.push(item);
            index = indexDay(days, day);
        }

        showItems(days[index].Tasks);
    } else {
        console.log('Erro no dia atual ou selecionado, ou na tarefa');
    }
}