import ItemsController from '../itemsController';

export default function EventMenu() {
    const itemsController = ItemsController();
    const eventMenu = {};

    const returnButton = document.querySelector('.return-to-daily');

    const handleCreateEvent = data => {
        const name = document.getElementById('name').value;
        const alert = Number(document.getElementById('alert').value);
        const description = document.getElementById('description').value;
        
        if(alert > 0) {
            if(name.length > 0) {
                if(description.length > 0) {
                    itemsController.createEvent(data, name, alert, description);
                };
            };
        };
    };

    const handleShowEvents = data => {
        itemsController.showEvents(data);
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