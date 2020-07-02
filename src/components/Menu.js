import ItemsController from '../itemsController';
import EventMenu from './EventMenu';

import MenuRender from '../menuRender';
import Alerts from './alerts';

export default function Menu() {
    const render = MenuRender();

    const itemsController = ItemsController();
    const eventMenu = EventMenu();
    const alerts = Alerts();

    const menuElement = document.querySelector('.menu');

    const getIndexDay = () => {
        const day = document.querySelector('.menu').dataset.day;

        if (day === 'Daily') return day;

        const index = document.getElementById(day).dataset.indexday;
        return index;
    };

    const handleShowToDos = ({ items, selectedMonth }, daily) => {
        const { Daily, Months } = items;
        let ToDos;

        if (daily) {
            ToDos = Daily;
        } else {
            const index = getIndexDay();

            ToDos = Months[selectedMonth].Days[Number(index)]?.Tasks;
        };

        document.querySelector('.todo-list').innerHTML = '';
        if (ToDos) itemsController.showToDos(ToDos);
    };

    const handleCreateToDo = (data) => {
        const { selectedDay, selectedYear, selectedMonth } = data;
        const { actualDay, actualMonth, actualYear } = data.calendar;

        const text = document.querySelector('.todo-text').value;

        if (text.length > 0 && text.length < 120) {
            const createToDo = itemsController.createToDo(data, text);
            const ToDo = {
                text,
                checked: false
            };

            let index = getIndexDay();

            if (index === 'Daily') {
                createToDo[index](ToDo);
                handleShowToDos(data, true);
            } else if (selectedDay >= actualDay || selectedMonth > actualMonth || selectedYear > actualYear) {

                if (index >= 0) {
                    createToDo['addToDo'](ToDo, index);
                } else {
                    createToDo['NewDay'](ToDo);

                    index = getIndexDay();
                };

                handleShowToDos(data);
            } else {
                alerts.activeAlert('ToDo', 'dayError');
            };

        } else {
            alerts.activeAlert('ToDo', 'lengthError');
        }
    };

    const handleDeleteToDo = data => {
        const { items, calendar, selectedMonth } = data;

        const deleteToDo = itemsController.deleteToDo(items, calendar, selectedMonth);
        const index = getIndexDay();

        if (index >= 0) {
            deleteToDo.selected(index);
            handleShowToDos({ items, selectedMonth });
        } else {
            deleteToDo[index](data?.indexTask);
            handleShowToDos({ items, selectedMonth }, true);
        };
    }

    const handleCheckToDo = data => {
        const index = getIndexDay();

        itemsController.ToDoCheck(data, index);
    };

    const handleBackMenu = () => render.setMenuDaily();

    const navigation = ({ selectedDay, weekDay, items, calendar, selectedMonth }) => {
        const { monthName } = calendar;
        const id = menuElement.getAttribute('id');
        const newId = `${selectedDay}-${monthName[selectedMonth]}`;

        if (id === newId) {
            handleBackMenu();
            handleShowToDos({ items, selectedMonth }, true);
        } else {
            const options = {
                newId,
                title: `${weekDay} - ${selectedDay} de ${monthName[selectedMonth]}`,
                legend: 'Suas tarefas:',
                weekDay,
                selectedDay,
            };

            if (id !== 'Daily') document.querySelector('.selected-day')
                .classList.remove('selected-day');

            render.setSelectedDay(options);
            handleShowToDos({ items, selectedMonth });
        };

    };

    const returnToDaily = () => {
        const returnButton = document.querySelector('.return-to-daily');
        const returnButtonImg = document.querySelector('.button-img');

        const back = () => {
            const returnDiv = document.querySelector('.return-to-daily');

            eventMenu.handleCloseEventMenu();
            returnDiv.classList.remove('back');

            if (returnDiv.classList.length === 1) {
                returnButton.style.display = 'none';
                returnButton.classList.remove('todo');
            } else {
                returnButtonImg.src = 'assets/home.svg';
            }
        };

        const daily = data => {
            handleBackMenu();
            handleShowToDos(data, true);
        };

        const close = data => {
            handleBackMenu();
            menuElement.classList.remove('on');
            document.body.style.overflow = 'initial';

            handleShowToDos(data, true);
        };

        return {
            back,
            daily,
            close,
        };
    };

    return {
        handleCreateToDo,
        handleDeleteToDo,
        handleCheckToDo,
        handleBackMenu,
        returnToDaily,
        navigation,
    };
};