import { newItem, itemData, newData } from './item';
import { calendarGenerator } from './Date';
import { menu } from './menu';

const liConstructor = (content, name) => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const text = document.createTextNode(content);

    li.setAttribute('class', name);
    li.appendChild(text);

    return li;
}

const firstDay = (day, nDay, totDays) => {
    if(day > 1) {
        let first = 0;

        for(let i = day; i > 1; i--) {
            if(nDay>0) {
                nDay--;
            } else { nDay = 6  }

            first = nDay;
        }

        for(let i = (totDays - first); i < totDays ; i++) {
            const li = liConstructor(i, 'before');
            const div = document.getElementById('list');

            div.appendChild(li);
        }
    } 
}

const render = () => {
    const calendar = calendarGenerator();
    const { day, month, year, weekDay, totDays, nDay, nMonth } = calendar;

    const div = document.getElementById('list');
    const h1 = document.querySelector('h1');

    const text = document.createTextNode(month);
    h1.appendChild(text);
   

    firstDay(day, nDay, totDays);

    for(let i = 1; i <= totDays; i++) {
        const li = liConstructor(i, 'month');

        li.setAttribute('value', `${i}`);

        if(i === day) li.setAttribute('style', 'box-shadow: 1px 1px 5px red; background: red; color: #f5f5f5');
        
        div.appendChild(li);
    }

    return calendar;
}


const calendar = render();

const test = newItem(calendar.day, { text: 'Comer o cu de quem tá lendo', checked: false } );
    const test2 = newItem(26, { text: 'Comer o cu de quem tá lendo', checked: true });
    const test3 = newItem(25, { text: 'Comer o cu de quem tá lendo', checked: false });
    const test4 = newItem(27, { text: 'Comer o cu de quem tá lendo', checked: true });
    const items = itemData(calendar.day, calendar.month, calendar.year);

    items.Days.push(test);
    items.Days.push(test2);
    items.Days.push(test3);
    items.Days.push(test4);

    const data = newData(items, calendar);
    console.log(data);

document.querySelector('ul').addEventListener('click', function (e) {
    if(e.target.value !== undefined) {
        menu(e.target.value, data);
    }
});