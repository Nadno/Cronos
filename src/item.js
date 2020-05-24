const parseJson = data => {
    try {
        return JSON.parse(data);
    } catch (err) {
        return null;
    }
}

export const itemData = (day, month, year) => {
    const itemData = {
        Year: year,
        Months: month,
        Days: [],
    }

    return itemData;
}

export const newItem = (day, task) => {
    const tasksDay = {
        Day: day,

        Tasks: [task],
    }


    return tasksDay;
}

export const newData = (items, calendar) => {
    const data = {
        items,
        calendar,
    }

    return data;
}