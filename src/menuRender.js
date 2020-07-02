export default function MenuRender(options) {
    const returnButton = document.querySelector('.return-to-daily');
    const menuElement = document.querySelector('.menu');
    
    const titleElement = menuElement.querySelector('#menu-title');
    const legendElement = menuElement.querySelector('.todo-legend');
    const textareaElement = document.querySelector('.todo-text');

    const setMenuDaily = () => {
        document.getElementById(menuElement.dataset.day).classList.remove('selected-day');

        menuElement.dataset.day = 'Daily';
        menuElement.dataset.weekday = 'Daily';
        menuElement.id = 'Daily';

        returnButton.style.display = 'none';
        returnButton.classList.remove('daily');

        legendElement.innerText = 'Tarefas diárias:';
        titleElement.innerText = '';
        textareaElement.value = '';
    };

    const setSelectedDay = (options) => {
        const {
            newId,
            title,
            legend,
            weekDay,
            selectedDay,
        } = options;
    
        titleElement.innerText = title;
        legendElement.innerText = legend;
        textareaElement.value = '';

        menuElement.id = newId;
        menuElement.dataset.day = selectedDay;
        menuElement.dataset.weekday = weekDay;
        returnButton.style.display = 'initial';

        document.getElementById(selectedDay).classList.add('selected-day');
    };

    

    return {
        setMenuDaily,
        setSelectedDay,
    };
};