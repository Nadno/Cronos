export const itemData = (Year) => {
    return {
        Year,
        Daily: [],
        Months: [
            { Name: 'January', Days: [] },
            { Name: 'February', Days: [] },
            { Name: 'March', Days: [] },
            { Name: 'April', Days: [] },
            { Name: 'May', Days: [] },
            { Name: 'June', Days: [] },
            { Name: 'July', Days: [] },
            { Name: 'August', Days: [] },
            { Name: 'September', Days: [] },
            { Name: 'October', Days: [] },
            { Name: 'November', Days: [] },
            { Name: 'December', Days: [] },
        ],
    };
};

export const newDay = (Day, task) => (
    {
        Day,
        Tasks: [task],
    }
);

export const newData = (items, calendar) => (
    {
        items,
        calendar,
    }
);