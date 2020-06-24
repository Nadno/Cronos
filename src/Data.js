export const Data = (Year, Day, Month) => {
    return {
        Location: {
            Year,
            EventsOnMonths: [],
            Month,
            Day,
        },
        Daily: [],
        Months: [
            { Name: 'January', Days: [], Events: [] },
            { Name: 'February', Days: [], Events: [] },
            { Name: 'March', Days: [], Events: [] },
            { Name: 'April', Days: [], Events: [] },
            { Name: 'May', Days: [], Events: [] },
            { Name: 'June', Days: [], Events: [] },
            { Name: 'July', Days: [], Events: [] },
            { Name: 'August', Days: [], Events: [] },
            { Name: 'September', Days: [], Events: [] },
            { Name: 'October', Days: [], Events: [] },
            { Name: 'November', Days: [], Events: [] },
            { Name: 'December', Days: [], Events: [] },
        ],
    };
};