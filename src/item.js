export const itemData = (year) => {
    const items = {
        Year: year,
        Months: [
            { Name: 'January', Days: new Array() },
            { Name: 'February', Days: new Array() },
            { Name: 'March', Days: new Array() },
            { Name: 'April', Days: new Array() },
            { Name: 'May', Days: new Array() },
            { Name: 'June', Days: new Array() },
            { Name: 'July', Days: new Array() },
            { Name: 'August', Days: new Array() },
            { Name: 'September', Days: new Array() },
            { Name: 'October', Days: new Array() },
            { Name: 'November', Days: new Array() },
            { Name: 'December', Days: new Array() },
        ],
    };

    return items;
}

export const newDay = (day = 26, task) => {
    const tasksDay = {
        Day: day,

        Tasks: [task],
    };


    return tasksDay;
}

export const newData = (items, calendar) => {
    const data = {
        items,
        calendar,
    };

    return data;
}