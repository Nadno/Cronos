import calendarRender from './calendarRender';
import ItemsController from './itemsController';
import { Data } from './Data';
import calendarGenerator, { localization } from './Date';

export const saveItems = (items, calendar, deleteOrCreateDay = false) => {
    const save = JSON.stringify(items);

    localStorage.setItem(`cronos-${calendar.year}`, save);

    if (deleteOrCreateDay) {
        const selectedMonth = Number(document.getElementById('select-month').value);
        const Days = items.Months[selectedMonth].Days;

        let saveDay;

        const  index = items.Location.EventsOnMonths.indexOf(selectedMonth);

        let saveEvent = null;

        if (Days.length > 0) saveDay = Days.map(item => item.Day);


        console.log(index);
        if(index >= 0) {
            const events = items.Months[selectedMonth].Events.map(item => item.day);
            saveEvent = [ ... new Set(events) ];
            
            calendarRender({ calendar, items }, { saveDay, saveEvent })
        } else {
            calendarRender({ calendar, items }, { saveDay, saveEvent: undefined });
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
    const calendar = calendarGenerator();
    
    const { nMonth, year, day } = calendar;
    const Save = searchSave(year);

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
        
        let saveDay;
        let saveEvent;
 
        if (items.Daily.length > 0) itemsController.dailyReset({items, calendar, selectedMonth});

        if (Days.length > 0) saveDay = Days.map(item => item.Day);

        const  index = items.Location.EventsOnMonths.indexOf(selectedMonth);
        const data = {
            items,
            calendar,
            selectedMonth,
        };

        if(index >= 0) {
            const events = items.Months[selectedMonth].Events.map(item => item.day);
            saveEvent = [ ...new Set(events) ];
    
            calendarRender({ calendar, items }, { saveDay, saveEvent })
        } else {
            console.log('else');
            calendarRender({ calendar, items }, { saveDay, saveEvent });
        };

        return data;
    } else {
        const firstDays = localization(calendar);
        const newItems = Data(year, firstDays, day, nMonth);

        const data = { items: newItems, calendar, selectedMonth };
    
        calendarRender(data, { saveDay: undefined, saveEvent: undefined });

        return data;
    }
};

const searchSave = year => {
    try {
        return localStorage.getItem(`cronos-${year}`);
    } catch {
        return null;
    }
};