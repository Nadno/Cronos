import ItemsController, { showEvents } from '../itemsController';

export default function EventMenu() {
    const itemsController = ItemsController();
    const eventMenu = {};

    const returnButton = document.querySelector('.return-to-daily');
    const alerts = document.getElementById('alerts');
    let alertsIsActive = false;

    const destroyAlert = () => (
        setTimeout(() => {
            alerts.classList.remove('on');
            alerts.querySelector('h4').innerText = '';
            alerts.querySelector('span').innerText = '';

            alertsIsActive = !alertsIsActive;
        }, 6000));

    const handleCreateEvent = data => {
        const name = document.getElementById('name').value;
        const alert = Number(document.getElementById('alert').value);
        const description = document.getElementById('description').value;
        
        if(alert > 0) {
            if(name.length > 0) {
                if(description.length > 0) {
                    itemsController.createEvent(data, name, alert, description);
                } else if (!alertsIsActive) {
                    alerts.querySelector('h4').innerText = 'Erro ao criar Evento';
                    alerts.querySelector('span').innerText = 'Dê uma descrição ao evento!';
                    alerts.classList.add('on');
                    alertsIsActive = !alertsIsActive;

                    destroyAlert();
                };
            } else if (!alertsIsActive) {
                alerts.querySelector('h4').innerText = 'Erro ao criar Evento';
                alerts.querySelector('span').innerText = 'Dê um nome ao evento!';
                alerts.classList.add('on');
                alertsIsActive = !alertsIsActive;

                destroyAlert();
            };
        } else if (!alertsIsActive) {
            alerts.querySelector('h4').innerText = 'Erro ao criar Evento';
            alerts.querySelector('span').innerText = 'Selecione quando você quer ser avisado!';
            alerts.classList.add('on');
            alertsIsActive = !alertsIsActive;

            destroyAlert();
        };
    };

    const handleShowEvents = data => {
        showEvents(data);
        returnButton.style.display = 'initial';
    };

    const handleCloseEventMenu = (onlyEvent = false) => {
        document.querySelector('.event-container').classList.remove('on');

        if(onlyEvent) returnButton.style.display = 'none';
        returnButton.classList.remove('on-event');
    };

    const handleDeleteEvent = (DataAndId) => {
        itemsController.deleteEvent(DataAndId);
    };

    eventMenu.handleShowEvents = data => handleShowEvents(data);
    eventMenu.handleCreateEvent = data => handleCreateEvent(data);
    eventMenu.handleCloseEventMenu = onlyEvent => handleCloseEventMenu(onlyEvent);
    eventMenu.handleDeleteEvent = DataAndId => handleDeleteEvent(DataAndId);

    return eventMenu;
};