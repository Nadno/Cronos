const monthTotalDays = (month, year) => {
    if(month === 1) {
        if(year%4 === 0) return 29;

        return 28;
    } else if(month === (0 || 2 || 4 || 6 || 7 || 9 || 11)) {
        return 30;
    } else {
        return 31;
    }
}

const monthDays = (date, days, monthName) => {
    const year = date.getFullYear();
    const nMonth = date.getMonth();
    const nDay = date.getDay();


    const Date = {
        days,
        nDay,
        nMonth,
        weekDay: days[nDay],
        day: date.getDate(),
        month: monthName[nMonth],
        year,
        totDays: monthTotalDays(nMonth, year),
    }

    return Date;
};

export const indexDay = (days, day) => {
    for(let i = 0; i < days.length; i++) {
        if(days[i].Day === day) return i;
    }   

    return undefined;
}

export const calendarGenerator = () => {
    const date = new Date;

    const days = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabádo'];
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const calendar = monthDays(date, days, months);
    
    return calendar;
}