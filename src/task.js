class NewTask extends HTMLElement {
    checkTask(check, index) {
        this.input = document.createElement('input');

        this.input.type = 'checkbox';
        this.input.id = index;
        if (check) this.input.checked = true;

        return this.input;
    }

    set task({tasks, i}) {
        const linkEl = document.createElement('link');

        linkEl.setAttribute('rel', 'stylesheet');
        linkEl.setAttribute('href', 'checkbox.css');

        this.checkbox = this.checkTask(tasks[i].checked, i);
        this.label = document.createElement('label');
        this.span = document.createElement('span');
        this.deleteTask = document.createElement('button');

        this.checkbox.classList.add('task-checkbox');

        this.label.setAttribute('for', `${i}`);
        this.label.classList.add('task');

        this.deleteTask.classList.add('delete');
        this.deleteTask.type = 'button';
        this.deleteTask.dataset.index = i;

        this.span.appendChild(document.createTextNode(tasks[i].text));
        this.deleteTask.appendChild(document.createTextNode('X'));
        this.label.appendChild(this.span);
        this.label.appendChild(this.deleteTask);
        this.appendChild(this.checkbox);
        this.appendChild(this.label);
    }
};

customElements.define('to-do', NewTask);