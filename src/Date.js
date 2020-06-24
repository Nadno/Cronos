export const monthTotalDays = (month, year) => {
    const thirtyDays = [3, 5, 8, 10];

    if (month === 1) {
        if (year % 4 === 0) return 29;

        return 28;
    } else if (thirtyDays.indexOf(month) !== -1) {
        return 30;
    } else {
        return 31;
    }
};

export default function calendarGenerator(year = 0, month = 0) {
    const days = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabádo'];
    const monthName = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    let date;

    if(year > 0 && month > 0) {
        date = new Date(year, month, 1);
    } else {
        date = new Date;     
    };
    
    const firstDayData = new Date(date.getFullYear(), date.getMonth(), 1);
    const actualDate = new Date;

    return {
        firstDay: firstDayData.getDay(),
        days,
        weekDay: date.getDay(),
        actualDay: actualDate.getDate(),
        actualMonth: actualDate.getMonth(),
        actualYear: actualDate.getFullYear(),
        month: date.getMonth(),
        year: date.getFullYear(),
        monthName,
    };
};