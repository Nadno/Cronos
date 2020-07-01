import { saveItems } from './save';

import './components/ToDo';


export default function ItemsController() {
    const showToDos = (ToDos) => {
        ToDos.map((item, index) => {
            const ToDo = document.createElement('to-do');
            const li = document.createElement('li');

            ToDo.task = { item, index };

            li.appendChild(ToDo);
            document.querySelector('.todo-list').appendChild(li);
        });
    };

    const ToDoCheck = (data, index) => {
        const {
            items,
            calendar,
            checkItem,
            indexTask,
            selectedMonth
        } = data;

        const Days = items.Months[selectedMonth].Days;

        if (index === 'Daily') {
            items.Daily[indexTask].checked = checkItem;
        } else if (index) {
            Days[Number(index)].Tasks[indexTask].checked = checkItem;
        }

        saveItems(items, calendar);
    }

    const createToDo = ({ selectedDay, selectedMonth, items, calendar } ) => {
        const Days = items.Months[selectedMonth].Days;

        const Daily = ToDo => {
            items.Daily.push(ToDo);
            saveItems(items, calendar);
        };

        const NewDay = ToDo => {
            const day = { Day: selectedDay, Tasks: [ToDo] };

            Days.push(day);
            saveItems(items, calendar, true);
        };

        const addToDo = (ToDo, index) => {
            Days[Number(index)].Tasks.push(ToDo);

            saveItems(items, calendar);
        }

        return {
            Daily,
            NewDay,
            addToDo
        };
    };

    const deleteToDo = (items, calendar, selectedMonth) => {
        const Daily = indexTask => {
            const dailyList = items.Daily;

            dailyList.splice(indexTask, 1);
            saveItems(items, calendar);
        };

        const selected = index => {
            const Days = items.Months[selectedMonth].Days;

            if (Days[index].Tasks.length === 1) {
                Days.splice(index, 1);

                saveItems(items, calendar, true);
            } else {
                Days[index].Tasks.splice(index, 1);

                saveItems(items, calendar);
            };
        };

        return {
            Daily,
            selected,
        };
    };

    const dailyReset = ({ items, calendar, selectedMonth }) => {
        const { actualDay, actualMonth } = calendar;

        if (items.Daily.length >= 1) {
            if (actualDay > items.Location.Day || actualMonth > items.Location.Month) {
                for (let key in items.Daily) {
                    items.Daily[key].checked = false;
                };

                saveItems(items, calendar);
            };
        };

        showToDos(items.Daily);
    };

    return {
        showToDos,
        ToDoCheck,
        createToDo,
        deleteToDo,
        dailyReset,
    };
};