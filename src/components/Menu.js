import ItemsController from '../itemsController';

export default function Menu() {
    const returnButton = document.querySelector('.return');
    const menuElement = document.querySelector('.menu');

    const title = menuElement.querySelector('#menu-title');
    const legend = menuElement.querySelector('.todo-legend');
    const textarea = document.querySelector('.todo-text');

    const menu = {};

    const itemsController = ItemsController();

    const handleCreateToDo = data => {
        itemsController.createToDo(data);
    };

    const handleDeleteToDo = data => {
        itemsController.deleteToDo(data);
    }

    const handleCheckToDo = data => {
        itemsController.ToDoCheck(data);
    };

    const handleBackMenu = data => {
        document.getElementById(menuElement.dataset.day).classList.remove('selected-day');
        menuElement.dataset.day = 'Daily';
        menuElement.dataset.weekday = 'Daily';
        menuElement.id = 'Daily';

        legend.innerText = 'Tarefas diárias:';
        returnButton.style.display = 'none';
        title.innerText = '';
        textarea.value = '';

        itemsController.showToDos(data);
    };

    const navigation = data => {
        const { selectedDay, weekDay, calendar, selectedMonth } = data;
        const { month } = calendar;

        const newId = `${selectedDay}-${month[selectedMonth]}`;
        const id = menuElement.getAttribute('id');

        title.innerText = `${weekDay} - ${selectedDay} de ${month[selectedMonth]}`;
        legend.innerText = 'Suas tarefas:';
        textarea.value = '';

        menuElement.id = newId;
        menuElement.dataset.day = selectedDay;
        menuElement.dataset.weekday = weekDay;

        if (id === newId) {
            handleBackMenu(data);
        } else {
            if (id !== 'Daily') {
                document.querySelector('.selected-day').classList.remove('selected-day');
            };
            document.getElementById(selectedDay).classList.add('selected-day');

            itemsController.showToDos(data);
            returnButton.style.display = 'initial';
            returnButton.addEventListener('click', () => handleBackMenu(data));
        };

    };

    menu.handleCreateToDo = data => handleCreateToDo(data);
    menu.handleDeleteToDo = data => handleDeleteToDo(data);
    menu.handleCheckToDo = data => handleCheckToDo(data);
    menu.handleBackMenu = data => handleBackMenu(data);
    menu.navigation = data => navigation(data);

    return menu;
};