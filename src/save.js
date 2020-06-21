import calendarRender from './calendarRender';
import ItemsController from './itemsController';
import { Data } from './Data';
import calendarGenerator, { localization } from './Date';

export const saveToDos = (items, calendar, deleteOrCreateDay = false) => {
    const save = JSON.stringify(items);

    localStorage.setItem(`cronos-${calendar.year}`, save);

    if (deleteOrCreateDay) {
        const selectedMonth = Number(document.getElementById('select-month').value);
        const saveIndex = items.Months[selectedMonth].Days.map((item, index) => index);
        const saveDay = items.Months[selectedMonth].Days.map(item => item.Day);

        const  index = items.Location.EventsOnMonths.indexOf(selectedMonth);
        let saveEvent = null;

        if(index >= 0) {
            const events = items.Months[selectedMonth].Events.map(item => item.day);
            saveEvent = [ ... new Set(events) ];
    
            calendarRender({ calendar, items }, { saveDay, saveIndex, saveEvent })
        } else {
            console.log('else');
            calendarRender({ calendar, items }, { saveDay, saveIndex });
        };
    };
};

const parseJson = save => {
    try {
        return JSON.parse(save);
    } catch {
        return null;
    }
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
        
        let saveDay = null;
        let saveIndex = null;
        let saveEvent = null
 
        if (items.Daily.length > 0) itemsController.dailyReset({items, calendar, selectedMonth});

        if (Days.length > 0) {
            saveDay = Days.map(item => item.Day);
            saveIndex = Days.map((item, index) => index);
        }

        const  index = items.Location.EventsOnMonths.indexOf(selectedMonth);
        const data = {
            items,
            calendar,
            selectedMonth,
        };

        if(index >= 0) {
            const events = items.Months[selectedMonth].Events.map(item => item.day);
            saveEvent = [ ...new Set(events) ];
    
            calendarRender({ calendar, items }, { saveDay, saveIndex, saveEvent })
        } else {
            console.log('else');
            calendarRender({ calendar, items }, { saveDay, saveIndex });
        };

        return data;
    } else {
        const firstDays = localization(calendar);
        const newItems = Data(year, firstDays, day, nMonth);

        const data = { items: newItems, calendar };
    
        calendarRender(data, null, null);

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