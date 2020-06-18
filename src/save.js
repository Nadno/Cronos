import calendarRender from './calendarRender';
import { showTasks } from './itemsController';
import { newData, itemData } from './item';
import calendarGenerator, { localization } from './Date';

export const saveTasks = (items, calendar, deleteOrCreateDay) => {
    const save = JSON.stringify(items);

    localStorage.setItem(`cronos-${calendar.year}`, save);

    if (deleteOrCreateDay) {
        const selectedMonth = Number(document.getElementById('select-month').value);

        const saveIndex = items.Months[selectedMonth].Days.map((item, index) => index);
        const saveDay = items.Months[selectedMonth].Days.map(item => item.Day);

        calendarRender(calendar, saveDay, saveIndex, items.Localization.firstDays[selectedMonth]);
    };
};

const parseJson = save => {
    try {
        return JSON.parse(save);
    } catch {
        return null;
    }
};

export const getItems = (firstCall = false) => {
    const calendar = calendarGenerator();
    const { nMonth, year } = calendar;
    const Save = searchItems(year);

    let selectedMonth;
    
    if (firstCall) {
        document.getElementById('select-month').value = nMonth;
        selectedMonth = nMonth; 
    } else {
        selectedMonth = Number(document.getElementById('select-month').value);
    };

    if (Save !== null) {
        const items = parseJson(Save);
        const Days = items.Months[selectedMonth].Days;
        
        let saveDay = null;
        let saveIndex = null;

        if (items.Daily.length > 0) showTasks(calendar, items);

        if (Days.length > 0) {
            saveDay = Days.map(item => item.Day);
            saveIndex = Days.map((item, index) => index);
        }

        const data = {
            items,
            calendar,
            selectedMonth,
        };

        calendarRender(calendar, saveDay, saveIndex, items.Localization.firstDays[selectedMonth]);

        return data;
    } else {
        const firstDays = localization(calendar);
        const data = newData(itemData(year, firstDays), calendar);

        calendarRender(calendar, null, null, data.items.Localization.firstDays[selectedMonth]);

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