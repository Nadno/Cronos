import calendarRender from './calendarRender';
import { showTasks } from './itemsController';
import { newData, itemData } from './item';
import calendarGenerator from './Date';

export const saveTasks = (items, calendar, deleteOrCreateDay) => {
    const save = JSON.stringify(items);

    localStorage.setItem(`cronos-${calendar.year}`, save);

    if(deleteOrCreateDay) {
        const saveIndex = items.Months[calendar.nMonth].Days.map((item, index) => index);
        const saveDay = items.Months[calendar.nMonth].Days.map(item => item.Day);

        calendarRender(calendar, saveDay, saveIndex);
    };
};

const parseJson = save => {
    try {
        return JSON.parse(save);
    } catch {
        return null;
    }
};

export const getItems = () => {
    const calendar = calendarGenerator();
    const { nMonth, year } = calendar;
    const Save = searchItems(year);
    
    if (Save !== null) {
        const items = parseJson(Save);

        if(items.Daily.length > 0) {
            showTasks(calendar, items);
        };

        const saveDay = items.Months[nMonth].Days.map(item => item.Day);
        const saveIndex = items.Months[nMonth].Days.map((item, index) => index);
    
        const data = {
            items,
            calendar,
        };

        calendarRender(calendar, saveDay, saveIndex);

        return data;
    } else {
        const data = newData(itemData(year), calendar);
        
        calendarRender(calendar, null, null);

        return data;
    }
};

const searchItems = year => {
    try {
        return localStorage.getItem(`cronos-${year}`);
    } catch {
        return null;
    }
};