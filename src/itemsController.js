import { newItem } from './item';
import { indexDay } from './Date';


export const saveItems = () => {

}

const checkBox = (check, i) => {
    const input = document.createElement('input');

    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', `${i}`);
    if(check) input.checked = 'true';

    return input;
}

export const checkboxController = (check, id, day, items) => {
    const index = indexDay(items.Days, day);
    
    items.Days[index[1]].Tasks[id].checked = check;
}

export const showItems = (day, items, data) => {
    const div = document.getElementById('tasks');
    const { Days } = items;
    
    if(div.childElementCount > 0) div.removeChild(document.getElementById('render'));

    const selectedDay = Days.filter(item => item.Day === day);

    if(selectedDay.length > 0) {
        const divRender = document.createElement('div');

        divRender.setAttribute('id', 'render');
        div.appendChild(divRender);
        
        const render = document.getElementById('render');
        
        if(selectedDay !== undefined) {
            const { Day, Tasks } = selectedDay[0];
           
            for(let i = 0; i < Tasks.length; i++) {
                const label = document.createElement('label');
                const span = document.createElement('span');
                const checkbox = checkBox(Tasks[i].checked, i);
                
                label.setAttribute('for', `${i}`);
    
                span.appendChild(document.createTextNode(Tasks[i].text));
                label.appendChild(span);
    
                render.appendChild(checkbox);
                render.appendChild(label);
            }
        }
    } 
}

export const createTask = (now, day, items) => {
    const text = document.getElementById('textarea').value;
    const { Days } = items;
    
    const task = { text, checked: false };
    const index = indexDay(Days, day);
    
    if(day >= now && text.length >= 4){
        if(index.length === 0) {
            const item = newItem(day, task);

            Days.push(item);
            
            showItems(day, items);              
        } else {
            Days[index[1]].Tasks.push(task);
           
            showItems(day, items);
        }
    }

    return 0;
}