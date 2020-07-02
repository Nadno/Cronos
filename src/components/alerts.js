export default function Alerts() {
    let alertsIsActive;

    const destroyAlert = () => (
        setTimeout(() => {
            alerts.classList.remove('on');
            alerts.querySelector('h4').innerText = '';
            alerts.querySelector('span').innerText = '';

            alertsIsActive = !alertsIsActive;
        }, 6000));

    const activeAlert = (type, error) => {
        console.log(alertsIsActive);
        if (!alertsIsActive) {
            const Types = {
                ToDo: "Erro ao criar a Tarefa!",
                EventError: "Erro ao criar a Evento!",
                EventCreated: "Evento criado!"
            };

            const Erros = {
                dayError: "Uma tarefa só pode ser criada a partir do mês atual e do dia atual, demarcado com a cor vermelha!",
                lengthError: "Uma tarefa precisa de no mínimo um caractere e pode ter no máximo 120 caracteres!",
                eventDescriptionError: "Dê uma descrição ao evento!",
                eventNameError: "Dê um nome ao evento!",
                eventAlertError: "Selecione quando você quer ser avisado!",
                created: 'Seu evento foi criado com sucesso!'
            };

            alerts.querySelector('h4').innerText = Types[type];
            alerts.querySelector('span').innerText = Erros[error];
            alerts.classList.add('on');
            alertsIsActive = !alertsIsActive;

            destroyAlert()
        };
    };

    return {
        activeAlert
    };
};