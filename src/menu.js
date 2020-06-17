import {
    showTasks,
    createTask,
    deleteTask,
    ToDoCheck
} from './itemsController';

export const handleCreateTask = (selectedDay, data) => {
    createTask(selectedDay, data);
};

export const handleDeleteTask = (data, indexTask) => {
    deleteTask(data, indexTask);
}

export const handleCheckTask = (data, indexTask, checkItem) => {
    ToDoCheck(data, indexTask, checkItem);
};

export default function menuNavigation(selectedDay, weekday, data) {
    const menu = document.querySelector('.menu');
    const { calendar, items } = data;
    const id = menu.getAttribute('id');

    menu.querySelector('#menu-title').innerText = `${weekday} - ${selectedDay} de ${calendar.month}`;
    menu.id = `${selectedDay}-${calendar.month}`;
    menu.dataset.day = selectedDay;

    if(id === `${selectedDay}-${calendar.month}`) {
        menu.querySelector('#menu-title').innerText = 'Tarefas diárias';
        menu.dataset.day = 'Daily';
        menu.id = 'Daily';

        showTasks(calendar, items);
    } else {
        showTasks(calendar, items);
    };
};

// export function menu(selectedDay, weekDay, data) {
//     const { calendar, items } = data;

//     const { nMonth, year, month, day } = calendar;
//     const { Months } = items;

//     const { Days } = Months[nMonth];


//     if (index !== undefined) {
//         menuRender(selectedDay, weekDay, month, data, index);
//     } else {
//         menuRender(selectedDay, weekDay, month, data, undefined);
//     }
// }
