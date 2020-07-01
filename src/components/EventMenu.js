import EventController from '../eventController';

export default function EventMenu() {
    const event = EventController();

    const returnButton = document.querySelector('.return-to-daily');
    const alerts = document.getElementById('alerts');

    let alertsIsActive;

    const destroyAlert = () => (
        setTimeout(() => {
            alerts.classList.remove('on');
            alerts.querySelector('h4').innerText = '';
            alerts.querySelector('span').innerText = '';

            alertsIsActive = !alertsIsActive;
        }, 6000));

    const activeAlert = type => {
        if(!alertsIsActive) {
            const err = {
                eventDescriptionError: "Dê uma descrição ao evento!",
                eventNameError: "Dê um nome ao evento!",
                eventAlertError: "Selecione quando você quer ser avisado!",
             };
     
             alerts.querySelector('h4').innerText = 'Erro ao criar a Tarefa';
             alerts.querySelector('span').innerText = err[type];
             alerts.classList.add('on');
             alertsIsActive = !alertsIsActive;
     
             destroyAlert()
        }
    };

    const handleCreateEvent = data => {
        const name = document.getElementById('name').value;
        const alert = Number(document.getElementById('alert').value);
        const description = document.getElementById('description').value;
        
        if(alert > 0) {
            if(name.length > 0) {
                if(description.length > 0) {
                    event.createEvent(data, name, alert, description);
                } else {
                    activeAlert(eventDescriptionError);
                };
            } else {
                activeAlert(eventNameError);
            };
        } else {
            activeAlert(eventAlertError);
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

    const handleDeleteEvent = (data, id) => {
        event.deleteEvent(data, id);
    };

    return {
        handleCreateEvent,
        handleShowEvents,
        handleDeleteEvent,
        handleCloseEventMenu,
    };
};