export const dayConstructor = (day, className) => {
    const li = document.createElement('li');

    li.classList.add(className);
    li.id = day;

    li.appendChild(document.createTextNode(day));

    return li;
};

export const eventConstructor = (name, day, description, weekDay, index) => {
    const li = document.createElement('li');
    const h4 = document.createElement('h4');
    const h5 = document.createElement('h5');
    const bt = document.createElement('button');
    const nameSp = document.createElement('span');
    const descriptionSp = document.createElement('span');
    const h5Clone = h5.cloneNode();

    li.classList.add('event');
    h4.innerText = `${weekDay} - Dia ${day}`;
    h5.innerText = 'Nome: ';
    nameSp.innerText = name;
    h5Clone.innerText = 'Descrição: ';
    descriptionSp.innerText = description;
    bt.classList.add('event-delete');
    bt.type = 'button';
    bt.innerText = 'X';
    bt.id = index;

    li.appendChild(h4);
    li.appendChild(h5);
    li.appendChild(bt);
    li.appendChild(nameSp);
    li.appendChild(h5Clone);
    li.appendChild(descriptionSp);

    return li;
};

export const notificationElement = (item, index, actualDay, monthName) => {
    const li = document.createElement('li');
    const h4 = document.createElement('h4');
    const span = document.createElement('span');
    const button = document.createElement('button');

    h4.innerText = item.name;

    if (item.day === actualDay) {
        span.innerHTML = `Olá! Só passando aqui para te lembrar que você marcou um evento para hoje. </br> Descrição do evento: ${item.description}`;
    } else {
        span.innerHTML = `Olá! Só passando aqui para te lembrar que você marcou um evento para ${monthName[item.month]}, dia ${item.day}. </br> Descrição do evento: ${item.description}`;
    };

    li.classList.add('event-notification');

    button.classList.add('notification-delete');
    button.id = index;
    button.innerText = 'x';

    li.appendChild(button);
    li.appendChild(h4);
    li.appendChild(span);

    return li;
};