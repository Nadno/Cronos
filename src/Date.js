const meses = (year) => {
    let february = 28;

    if (year % 4 === 0) february = 29;

    return [
        {
            name: 'Janeiro',
            totalDays: 31,
        },
        {
            name: 'Fevereiro',
            totalDays: february,
        },
        {
            name: 'Março',
            totalDays: 31,
        },
        {
            name: 'Abril',
            totalDays: 30,
        },
        {
            name: 'Maio',
            totalDays: 31,
        },
        {
            name: 'Junho',
            totalDays: 30,
        },
        {
            name: 'Julho',
            totalDays: 31,
        },
        {
            name: 'Agosto',
            totalDays: 31,
        },
        {
            name: 'Setembro',
            totalDays: 30,
        },
        {
            name: 'Outubro',
            totalDays: 31,
        },
        {
            name: 'Novembro',
            totalDays: 30,
        },
        {
            name: 'Dezembro',
            totalDays: 31,
        },
    ];
}

export const monthTotalDays = (month, year) => {
    const monthsTrinta = [0, 2, 5, 7, 9, 11];

    if (month === 1) {
        if (year % 4 === 0) return 29;

        return 28;
    } else if (monthsTrinta.indexOf(month) !== -1) {
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
        month: monthName,
        year,
    }

    return Date;
};

export default function calendarGenerator() {
    const date = new Date;

    const days = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabádo'];
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const calendar = monthDays(date, days, months);

    return calendar;
}

const thisMonth = calendar => {
    const { nMonth, year, days, day, nDay } = calendar;
    let first = nDay;

    if (day > 1) {
        for (let i = day; i > 1; i--) {
            if (first > 0) {
                first--;
            } else { first = 6 }
        };
    };

    return first;
};

const nextMonths = ({ nMonth, year, days }, firstDay) => {
    const todosmeses = meses(year);

    let first = firstDay;
    let fisrtDays = [];

    for (let m = 0; m <= 11; m++) {
        for (let i = 1; i < todosmeses[m].totalDays; i++) {
            if (i === 1) {
                fisrtDays.push(first);
                // console.log(days[first], months[m], todosmeses[m].totalDays);
            }

            if (i < todosmeses[m].totalDays) {
                if (first < 6) {
                    first++;
                } else { first = 0; };
            }
        };

        if (first < 6) {
            first++;
        } else { first = 0; };      
    }

    return fisrtDays;
}

const latestMonths = calendar => {
    const { nMonth, year, day, nDay } = calendar;
    const todosmeses = meses(year);

    let actualDay = day;
    let first = nDay;
    let fisrtDays = [];

    for (let m = nMonth; m >= 0; m--) {
        if (m < nMonth) {
            actualDay = todosmeses[m].totalDays;
        };

        for (let i = actualDay; i >= 1; i--) {
            if (i > 1) {
                if (first > 0) {
                    first--;
                } else { first = 6 };
            }
        };

        fisrtDays.push(first);

        if (first > 0) {
            first--;
        } else { first = 6 };
    }

    return fisrtDays;
};

export const localization = calendar => {
    const { nMonth } = calendar;

    if(nMonth === 0) {
        const firstDay = thisMonth(calendar);
        const firstDays = nextMonths(calendar, firstDay);

        return firstDays;
    } else {
        const firstDay = latestMonths(calendar).reverse();
        const firstDays = nextMonths(calendar, firstDay[0]);

        return firstDays;
    }

    // Quarta-Feira Janeiro
    // Sabádo Fevereiro
    // Domingo Março
    // Quarta-Feira Abril
    // Sexta-Feira Maio
    // Segunda-Feira Junho
    // Quarta-Feira Julho
    // Sabádo Agosto
    // Terça-Feira Setembro
    // Quinta-Feira Outubro
    // Domingo Novembro
    // Terça-Feira Dezembro

};