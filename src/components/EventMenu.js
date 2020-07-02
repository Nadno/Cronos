import EventController from '../eventController';

import Alerts from './alerts';

export default function EventMenu() {
    const event = EventController();
    const alerts = Alerts();

    const returnButton = document.querySelector('.return-to-daily');

    const handleCreateEvent = data => {
        const name = document.getElementById('name').value;
        const alert = Number(document.getElementById('alert').value);
        const description = document.getElementById('description').value;
        
        if(alert > 0) {
            if(name.length > 0) {
                if(description.length > 0) {
                    const created = event.createEvent(data, name, alert, description);

                    if(created) alerts.activeAlert('EventCreated', 'created');
                } else {
                    alerts.activeAlert('EventError', 'eventDescriptionError');
                };
            } else {
                alerts.activeAlert('EventError', 'eventNameError');
            };
        } else {
            alerts.activeAlert('EventError', 'eventAlertError');
        };
    };

    const handleShowEvents = data => {
        event.showEvents(data);
        returnButton.style.display = 'initial';
    };

    const handleCloseEventMenu = (onlyEvent = false) => {
        document.querySelector('.event-container').classList.remove('on');

        if(onlyEvent) returnButton.style.display = 'none';
        returnButton.classList.remove('on-event');
    };

    const handleDeleteEvent = ({ items, calendar, selectedMonth }, id) => {
        event.deleteEvent({ items, calendar, selectedMonth }, id);
    };

    return {
        handleCreateEvent,
        handleShowEvents,
        handleDeleteEvent,
        handleCloseEventMenu,
    };
};