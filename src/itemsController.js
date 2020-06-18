import { saveTasks } from './save';
import { newDay } from './item';
import './task';

const getIndexDay = () => {
    const day = document.querySelector('.menu').dataset.day;

    if (day === 'Daily') return day;

    const index = document.getElementById(day).dataset.indexday;

    return index;
};

export const showTasks = (items) => {
    const selectedMonth = Number(document.getElementById('select-month').value);
    const { Months, Daily } = items;

    let index;

    index = getIndexDay();


    document.querySelector('.tasks-container').innerHTML = '';
   
    if (index !== undefined) {
        let tasks;

        if (index !== 'Daily') {
            tasks = Months[selectedMonth].Days[Number(index)].Tasks;
        } else {
            tasks = Daily;
        };

        if (tasks.length > 0) {
            for (let i = 0; i < tasks.length; i++) {
                const toDo = document.createElement('to-do');
                const li = document.createElement('li');
                toDo.task = { tasks, i };

                li.appendChild(toDo);
                document.querySelector('.tasks-container').appendChild(li);
            };
        }
    };
};

export const ToDoCheck = ({ calendar, items }, indexTask, checkItem) => {
    const selectedMonth = Number(document.getElementById('select-month').value);
    const Days = items.Months[selectedMonth].Days;
    const index = getIndexDay();
    console.log(Days, index);
    if (index === 'Daily') {
        items.Daily[indexTask].checked = checkItem;
    } else {
        Days[index].Tasks[indexTask].checked = checkItem;
    }

    saveTasks(items, calendar);
};

export const createTask = (selectedDay, { calendar, items }) => {
    const selectedMonth = Number(document.getElementById('select-month').value);
    const text = document.querySelector('.textarea').value;
    const task = {
        text,
        checked: false
    };

    const index = getIndexDay();

    let createDay = false; 

    if (index === 'Daily') {
        items.Daily.push(task);
    } else {
        const Days = items.Months[selectedMonth].Days;
        
        if ((Number(selectedDay) >= calendar.day || selectedMonth > calendar.nMonth) && text.length > 4) {
            if (index !== undefined) {
                Days[Number(index)].Tasks.push(task);     
            } else {
                const day = newDay(Number(selectedDay), task);

                Days.push(day);
                createDay = true;
            };
        };
    };

    saveTasks(items, calendar, createDay)
    showTasks(items);
};

export const deleteTask = ({ calendar, items }, indexTask) => {
    const selectedMonth = Number(document.getElementById('select-month').value);
    const index = getIndexDay();
    let deleteDay = false;

    if (index === 'Daily') {
        const dailyList = items.Daily;

        dailyList.splice(indexTask, 1);
    } else {
        const Days = items.Months[selectedMonth].Days;
        console.log(Days);

        if (Days[index].Tasks.length === 1) {
            Days.splice(index, 1);
            deleteDay = true;
        } else {
            Days[index].Tasks.splice(indexTask, 1);
        };
    }

    saveTasks(items, calendar, deleteDay);
    showTasks(items);
};