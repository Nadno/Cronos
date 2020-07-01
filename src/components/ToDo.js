class NewTask extends HTMLElement {
    checkTask(check, index) {
        this.input = document.createElement('input');

        this.input.type = 'checkbox';
        this.input.id = index;
        if (check) this.input.checked = true;

        return this.input;
    }

    set task({ item, index }) {
        const linkEl = document.createElement('link');

        linkEl.setAttribute('rel', 'stylesheet');
        linkEl.setAttribute('href', 'checkbox.css');

        this.checkbox = this.checkTask(item.checked, index);
        this.label = document.createElement('label');
        this.span = document.createElement('span');
        this.deleteTask = document.createElement('button');

        this.checkbox.classList.add('task-checkbox');

        this.label.setAttribute('for', `${index}`);
        this.label.classList.add('task');

        this.deleteTask.classList.add('todo-delete');
        this.deleteTask.type = 'button';
        this.deleteTask.dataset.index = index;

        this.span.appendChild(document.createTextNode(item.text));
        this.deleteTask.appendChild(document.createTextNode('X'));
        this.label.appendChild(this.span);
        this.label.appendChild(this.deleteTask);
        this.appendChild(this.checkbox);
        this.appendChild(this.label);
    }
};

customElements.define('to-do', NewTask);