export const dayConstructor = ({ weekDay, monthDay, indexDay }, className) => {
    const li = document.createElement('li');

    li.classList.add(className);
    li.id = monthDay;
    li.dataset.selectedday = monthDay;
    li.dataset.weekday = weekDay;

    if(indexDay !== null && indexDay !== undefined) {
        li.dataset.indexday = indexDay;
        li.style.color = 'cyan';
    }

    li.appendChild(document.createTextNode(monthDay));

    return li;
}