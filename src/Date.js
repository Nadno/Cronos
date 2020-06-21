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

const thisMonth = ({ day }) => {
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

const nextMonths = ({ year }, firstDay) => {
    let first = firstDay;
    let fisrtDays = [];

    for (let month = 0; month <= 11; month++) {
        const totalDays = monthTotalDays(month, year);

        for (let i = 1; i < totalDays; i++) {
            if (i === 1) {
                fisrtDays.push(first);
                // console.log(days[first], months[m], todosmeses[m].totalDays);
            }

            if (i < totalDays) {
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

    let totalDays = day;
    let first = nDay;
    let fisrtDays = [];

    for (let month = nMonth; month >= 0; month--) {
        if (month < nMonth) {
            totalDays = monthTotalDays(month, year);
        };

        for (let days = totalDays; days >= 1; days--) {
            if (days > 1) {
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

    if (nMonth === 0) {
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