import calendarRender, { nextYears } from './calendarRender';
import ItemsController from './itemsController';
import { Data } from './Data';
import calendarGenerator from './Date';

export const saveItems = (items, calendar, deleteOrCreateDay = false) => {
    const save = JSON.stringify(items);

    localStorage.setItem(`cronos-${calendar.year}`, save);

    if (deleteOrCreateDay) {
        const selectedMonth = Number(document.getElementById('select-month').value);
        const Days = items.Months[selectedMonth].Days;

        let saveDay;

        const index = items.Location.EventsOnMonths.indexOf(selectedMonth);

        let saveEvent = null;

        if (Days.length > 0) saveDay = Days.map(item => item.Day);

        if (index >= 0) {
            const events = items.Months[selectedMonth].Events.map(item => item.day);

            saveEvent = [... new Set(events)];

            calendarRender(calendar, { saveDay, saveEvent })
        } else {
            calendarRender(calendar, { saveDay, saveEvent: undefined });
        };
    };
};

const parseJson = save => {
    try {
        return JSON.parse(save);
    } catch {
        return null;
    };
};

export const getData = (firstCall = false) => {
    const itemsController = ItemsController();
    let calendar = calendarGenerator();

    const { month, year, actualDay } = calendar;

    let selectedMonth;
    let selectedYear;
    
    if (firstCall) {
        nextYears(calendar.actualYear);
        
        document.getElementById('select-month').value = month;
        document.getElementById('select-year').value = year;

        selectedMonth = month;
        selectedYear = year;
    } else {
        selectedMonth = Number(document.getElementById('select-month').value);
        selectedYear = Number(document.getElementById('select-year').value);

        calendar = calendarGenerator(selectedYear, selectedMonth);
    };

    const Save = searchSave(selectedYear);
   
    if (Save) {
        const items = parseJson(Save);
        const Days = items.Months[selectedMonth].Days;

        let saveDay;
        let saveEvent;

        itemsController.dailyReset({ items, calendar, selectedMonth });

        if (Days.length > 0) saveDay = Days.map(item => item.Day);

        const index = items.Location.EventsOnMonths.indexOf(selectedMonth);
        const data = {
            items,
            calendar,
            selectedMonth,
            selectedYear,
        };

        if (index >= 0) {
            const events = items.Months[selectedMonth].Events.map(item => item.day);

            saveEvent = [...new Set(events)];

            calendarRender(calendar, { saveDay, saveEvent })
        } else {
            calendarRender(calendar, { saveDay, saveEvent });
        };

        return data;
    } else {
        const newItems = Data(year, actualDay, month);

        const data = { items: newItems, calendar, selectedMonth, selectedYear };

        calendarRender(calendar, { saveDay: undefined, saveEvent: undefined });

        return data;
    };
};

const searchSave = year => {
    try {
        return localStorage.getItem(`cronos-${year}`);
    } catch {
        return null;
    }
};