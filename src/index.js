import { getItems } from './itemsController';
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

        return first;
    }
}

const render = () => {
    const calendar = calendarGenerator();
    const { day, days, month, totDays, nDay } = calendar;

    const div = document.getElementById('list');
    const h1 = document.querySelector('h1');

    const text = document.createTextNode(month);
    h1.appendChild(text);
   

    let first = firstDay(day, nDay, totDays);

    console.log(first);

    for(let i = 1; i <= totDays; i++) {
        const li = liConstructor(i, 'month');

        li.setAttribute('value', `${i}`);
        li.setAttribute('name', `${days[first]}`)

        if(i === day) li.setAttribute('style', 'box-shadow: 1px 1px 5px red; background: red; color: #f5f5f5');
        
        div.appendChild(li);
        first++;
        if(first === 7) first = 0;
    }

    return calendar;
}


const calendar = render();

document.querySelector('ul').addEventListener('click', function (e) {
    if(e.target.value !== undefined) {
        menu(e.target.value, e.target.getAttribute('name'), getItems(calendar));
    }
});