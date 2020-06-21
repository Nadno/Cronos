export const dayConstructor = (day, className) => {
    const li = document.createElement('li');

    li.classList.add(className);
    li.id = day;
 
    li.appendChild(document.createTextNode(day));

    return li;
};

export const eventConstructor = (name, day, description, weekDay, month) => {
    const li = document.createElement('li');
    const h4 = document.createElement('h4');
    const h5 = document.createElement('h5');
    const h5Clone = h5.cloneNode();
    const descriptionSp = document.createElement('span');
    const nameSp = document.createElement('span');

    li.classList.add('event');
    h4.innerText = `${weekDay} - Dia ${day}`;
    h5.innerText = 'Nome: ';
    nameSp.innerText = name;
    h5Clone.innerText = 'Descrição: ';
    descriptionSp.innerText = description;
 
    li.appendChild(h4);
    li.appendChild(h5);
    li.appendChild(nameSp);
    li.appendChild(h5Clone);
    li.appendChild(descriptionSp);

    return li;
};