import ItemsController from '../itemsController';

export default function EventMenu() {
    const itemsController = ItemsController();
    const eventMenu = {};

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
    };

    eventMenu.handleShowEvents = data => handleShowEvents(data);
    eventMenu.handleCreateEvent = data => handleCreateEvent(data);

    return eventMenu;
};