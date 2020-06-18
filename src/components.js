export const dayConstructor = ({ weekDay, monthDay, indexDay }, className) => {
    const li = document.createElement('li');

    li.classList.add(className);
    li.id = monthDay;
    li.dataset.selectedday = monthDay;
    li.dataset.weekday = weekDay;

    if(indexDay !== null && indexDay !== undefined) {
        li.title = 'há tarefas para este dia';
        li.dataset.indexday = indexDay;
        li.classList.add('has-todo');
    };

    li.appendChild(document.createTextNode(monthDay));

    return li;
}
export const arrowLeftButton = () => {
    const button = document.createElement('button');
    const buttonSvg = document.createElement('img');

    button.type = 'button';
    button.classList.add('return');

    buttonSvg.alt = 'retornar';
    buttonSvg.src = 'assets/arrow-left.svg';

    button.appendChild(buttonSvg);

    return button;
}