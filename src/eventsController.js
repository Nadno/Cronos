import { saveItems } from './save';
import { monthTotalDays } from './Date';

export default function EventsController() {
    const eventsController = {};

    const showNotifications = data => {
        const { items, calendar, selectedMonth } = data;
        const { actualDay, monthName } = calendar;

        const totalDays = monthTotalDays(selectedMonth, calendar.year);

        document.getElementById('notifications').innerHTML = '';

        items.Notifications.map((item, index) => {
            const li = document.createElement('li');
            const h4 = document.createElement('h4');
            const span = document.createElement('span');
            const button = document.createElement('button');

            h4.innerText = item.name;

            if (item.day === actualDay) {
                span.innerHTML = `Olá! Só passando aqui para te lembrar que você marcou um evento para hoje. </br> Descrição do evento: ${item.description}`;
            } else {
                span.innerHTML = `Olá! Só passando aqui para te lembrar que você marcou um evento para ${monthName[item.month]}, dia ${item.day}. </br> Descrição do evento: ${item.description}`;
            };

            button.classList.add('notification-delete');
            button.id = index;
            button.innerText = 'x';
            li.classList.add('notification');
            li.appendChild(button);
            li.appendChild(h4);
            li.appendChild(span);

            document.getElementById('notifications').appendChild(li);

            if (item.day !== actualDay) {
                if (items.Months[selectedMonth].Events.indexOf(item) >= 0) {
                    if (totalDays === actualDay) {
                        items.Months[selectedMonth].Events[items.Months[selectedMonth].Events.indexOf(item)].alertDay = 1;
                    } else {
                        items.Months[selectedMonth].Events[items.Months[selectedMonth].Events.indexOf(item)].alertDay = actualDay + 1;
                    };
                };

                if (items.Months[selectedMonth + 1].Events.indexOf(item) >= 0) {
                    if (totalDays === actualDay) {
                        items.Months[selectedMonth + 1].Events[items.Months[selectedMonth + 1].Events.indexOf(item)].alertDay = 1;
                    } else {
                        items.Months[selectedMonth + 1].Events[items.Months[selectedMonth + 1].Events.indexOf(item)].alertDay = actualDay + 1;
                    };
                };
            };
        });

        // saveItems(items, calendar);
    };

    const alertDaysVerify = (selectedMonth, nextMonth, items, day) => {
        const EventsOnMonths = items.Location.EventsOnMonths;
        let Notifications1 = [];
        let Notifications2 = [];

        if (EventsOnMonths.indexOf(nextMonth) >= 0) {
            Notifications1 = items.Months[nextMonth].Events.filter(item => {
                return item.lastMonth >= 0 && day >= item.alertDay;
            });
        };

        if (EventsOnMonths.indexOf(selectedMonth) >= 0) {
            Notifications2 = items.Months[selectedMonth].Events.filter(item => {
                return day >= item.alertDay && day <= item.day;
            });
        };

        if (Notifications1.length >= 1 && Notifications2.length >= 1) {
            return [...Notifications1, ...Notifications2];
        } else if (Notifications1.length >= 1) {
            return Notifications1;
        } else {
            return Notifications2;
        };
    };

    const lastLogin = data => {
        const { calendar, items, selectedMonth } = data;
        const { Day, Month } = items.Location;
        const { month, actualDay, actualMonth, monthName } = calendar;

        if (actualMonth > Month) {
            items.Location.Month = month;
        };

        if (actualDay > Day || actualMonth > Month) {
            console.log('ok');
            items.Notifications = alertDaysVerify(selectedMonth, (selectedMonth + 1), items, actualDay);
            
            if (items.Notifications.length >= 1) {
                document.querySelector('.new-notification').classList.add('on');         
            };

            items.Location.Day = actualDay;
        };
    };

    const handleDeleteNotification = ({ data, id }) => {
        const { calendar, items, selectedMonth } = data;

        items.Notifications.splice(id, 1);

        saveItems(items, calendar);
        showNotifications(data);
    };

    eventsController.lastLogin = data => lastLogin(data);
    eventsController.showNotifications = data => showNotifications(data);
    eventsController.handleDeleteNotification = data => handleDeleteNotification(data);

    return eventsController;
};