import { format } from 'date-fns';
import { tasks } from '/src';

import "./styles.css";

export class Card {
    constructor (data) {
        this.id = data.id;
        this.title = data.title;
        this.dueDate = data.dueDate; 
        this.description = data.description;
        this.priority = data.priority;
        this.isComplete = data.isComplete;

        return this.#render();
    }

    #form() {
        let form = document.createElement("form");
        form.name = `task-${this.id}`;
        form.id = `task-${this.id}`;

        let formHeader = this.#formHeader();
        let title = this.#title();
        let description = this.#description();
        let buttons = this.#buttons();

        form.append(
            formHeader,
            title,
            description,
            buttons
        );

        form.addEventListener("click", () => {
            this.#displayButtonsEvent(buttons);
            this.#displayDescriptionEvent(description)
        })

        return form;
    }

    #formHeader() {
        let header = document.createElement("fieldset");
        header.className = "card__header";

        header.append(
            this.#status(), 
            this.#dueDate(), 
            this.#priority());

        return header;
    }

    #status() {
        let status = new Input(
            "checkbox",
            "isComplete",
            "true"
        )

        switch (this.priority) {
            case 0:
                status.className += " red";
                break;

            case 1:
                status.className += " yellow";
                break;

            case 2:
                status.className += " green";
                break;
        
            default:
                break;
        }

        return status;
    }

    #dueDate() {
        let dueDate = new Input(
            "date", 
            "dueDate", 
            format(this.dueDate, "yyyy-MM-dd") 
        ) 

        return dueDate;
    }

    #priority() {
        let select = document.createElement("select");
        select.className = "card__priority";
        select.name = "priority";
        select.id = "priority";

        let priorities = [
            "high priority",
            "medium priority",
            "low priority",
            "no priority"
        ]

        for (let index in priorities) {
            let priority = priorities[index];

            let option = document.createElement("option");
            option.value = index;
            option.textContent = priority;

            if (index == this.priority) {
                option.selected = true;
            }

            select.append(option);
        }

        return select;
    }

    #title() {
        let title = new TextArea(
            "title",
            this.title
        )
        
        return title;
    }

    #description() {
        let description = new TextArea(
            "description", 
            this.description
        );

        if (this.description == null || this.description == "") {
            description.style.display = "none";
        }
        
        return description;
    }

    #buttons() {
        let buttonsRow = document.createElement("div");
        buttonsRow.className = "card__buttons";

        buttonsRow.append(
            new CancelButton(this.id),
            new SaveButton(this.id)
        )

        return buttonsRow;
    }

    #render() {
        let card = document.createElement("li");
        card.className = "card";

        
        card.append(this.#form());

        /* section.append(this.#header());
        section.append(this.#title());
        if (this.description != null) {
            section.append(this.#description());
        } */

        return card;
    }

    #displayButtonsEvent(buttons) {
        buttons.style.display = "flex";
    }

    #displayDescriptionEvent(description) {
        description.style.display = "grid";
    }
}

class Input {
    constructor(type, name, value = "") {
        let input = document.createElement("input");
        input.type = type;
        input.className = `card__${name}`;
        input.id = name;
        input.name = name;
        input.value = value;

        return input;
    }
}

class TextArea {
    constructor(name, value = "") {
        let textareaWrapper = document.createElement("div");
        textareaWrapper.className = `card__textarea-wrapper card__textarea-wrapper-${name}`;

        let textarea = document.createElement("textarea");
        textarea.className = `card__${name}`;
        textarea.id = name;
        textarea.name = name;
        textarea.placeholder = name;
        textarea.value = value;
        textarea.rows = 1;
        textareaWrapper.append(textarea);

        textareaWrapper.dataset.replicatedValue = textarea.value;

        // Autogrow textarea
        textarea.addEventListener("input", () => {
            textareaWrapper.dataset.replicatedValue = textarea.value;
          });

        return textareaWrapper;
    }
}

class Button {
    constructor(name = "", type = "submit") {
        let button = document.createElement("button");
        button.type = type;
        button.className = `card__button-${name}`;
        button.textContent = name;

        return button;
    }
}

class SaveButton extends Button {
    constructor(id) {
        let button = super("save", "submit");
        
        this.id = id;
        button.addEventListener("click", (event) => this.#saveEvent(event));

        return button;
    }

    #saveEvent(event) {
        event.preventDefault();
        
        let task = this.#getFormData();
        console.log(task);
        tasks.updateTask(task, this.id);
    }

    #getFormData() {
        let form = document.querySelector(`#task-${this.id}`);
        let title = form.title.value;
        let dueDate = form.dueDate.value;
        let description = form.description.value;
        let priority = form.priority.value;
        let isComplete = form.isComplete.value;

        return {
            title,
            dueDate,
            description,
            priority,
            isComplete
        }
    }
}

class CancelButton extends Button {
    constructor(id) {
        let button = super("cancel", "reset");
        
        this.id = id;
        button.addEventListener("click", (event) => this.#cancelEvent(event));

        return button;
    }

    #cancelEvent(event) {
        event.preventDefault();
        
        tasks.cancelTask();
    }
}

