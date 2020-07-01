import { saveItems } from './save';
import { monthTotalDays } from './Date';

import { notificationElement } from './components/components';

export default function NotificationsController() {
    const notifications = document.getElementById('notifications');
    const notificationsAlert = document.querySelector('.notification-alert');

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
    
    const showNotifications = (data) => {
        const { items, calendar, selectedMonth, selectedYear } = data;
        const { actualDay, monthName } = calendar;
    
        const totalDays = monthTotalDays(selectedMonth, selectedYear);
    
        notifications.innerHTML = '';
    
        items.Notifications.map((item, index) => {
            const li = notificationElement(item, index, actualDay, monthName);
            notifications.appendChild(li);
    
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
    
        saveItems(items, calendar);
    };

    const openNotifications = () => {
        notifications.classList.add('on');
        notificationsAlert.classList.add('on');
        document.querySelector('.new-notification').classList.remove('on');
    }

    const lastLogin = (data) => {
        const { calendar, items, selectedMonth } = data;
        const { Day, Month } = items.Location;
        const { month, actualDay, actualMonth, monthName } = calendar;

        if (actualMonth > Month) {
            items.Location.Month = month;
        };

        if (actualDay > Day || actualMonth > Month) {
            items.Notifications = alertDaysVerify(selectedMonth, (selectedMonth + 1), items, actualDay);
      
            if (items.Notifications.length >= 1) {
                document.querySelector('.new-notification').classList.add('on');
            };

            items.Location.Day = actualDay;
        };
    }

    const handleDeleteNotification = ({ data, id }) => {
        const { calendar, items } = data;

        items.Notifications.splice(id, 1);

        saveItems(items, calendar);
        showNotifications(data);
    }

    return {
        showNotifications,
        openNotifications,
        lastLogin,
        handleDeleteNotification
    };
};