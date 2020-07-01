import ItemsController from '../itemsController';
import EventMenu from './EventMenu';

export default function Menu() {
    const itemsController = ItemsController();
    const eventMenu = EventMenu();

    const returnButton = document.querySelector('.return-to-daily');
    const returnButtonImg = document.querySelector('.button-img');
    const menuElement = document.querySelector('.menu');

    const title = menuElement.querySelector('#menu-title');
    const legend = menuElement.querySelector('.todo-legend');
    const textarea = document.querySelector('.todo-text');

    let alertsIsActive;

    const destroyAlert = () => (
        setTimeout(() => {
            alerts.classList.remove('on');
            alerts.querySelector('h4').innerText = '';
            alerts.querySelector('span').innerText = '';

            alertsIsActive = !alertsIsActive;
        }, 6000));

    const activeAlert = (type) => {
        const err = {
            dayError: "Uma tarefa só pode ser criada a partir do mês atual e do dia atual, demarcado com a cor vermelha!",
            lengthError: "Uma tarefa precisa de no mínimo um caractere e pode ter no máximo 120 caracteres!",
        };

        alerts.querySelector('h4').innerText = 'Erro ao criar a Tarefa';
        alerts.querySelector('span').innerText = err[type];
        alerts.classList.add('on');
        alertsIsActive = !alertsIsActive;

        destroyAlert()
    };

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
            } else if (!alertsIsActive) {
                activeAlert('dayError');
            };

        } else if (!alertsIsActive) {
            activeAlert('lengthError');
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

    const handleBackMenu = data => {
        document.getElementById(menuElement.dataset.day).classList.remove('selected-day');

        menuElement.dataset.day = 'Daily';
        menuElement.dataset.weekday = 'Daily';
        menuElement.id = 'Daily';

        returnButton.style.display = 'none';
        returnButton.classList.remove('daily');

        legend.innerText = 'Tarefas diárias:';
        title.innerText = '';
        textarea.value = '';

        handleShowToDos(data, true);
    };

    const navigation = data => {
        const { selectedDay, weekDay, items, calendar, selectedMonth } = data;
        const { monthName } = calendar;

        const newId = `${selectedDay}-${monthName[selectedMonth]}`;
        const id = menuElement.getAttribute('id');

        title.innerText = `${weekDay} - ${selectedDay} de ${monthName[selectedMonth]}`;
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

            handleShowToDos({ items, selectedMonth });
            returnButton.style.display = 'initial';
        };

    };

    const returnToDaily = () => {
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
            handleBackMenu(data);
        };

        const close = data => {
            handleBackMenu(data);
            menuElement.classList.remove('on');
            document.body.style.overflow = 'initial';
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