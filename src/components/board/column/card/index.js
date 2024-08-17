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

        for (let field of form) {
            if (field.className != "card__header" && 
                field.name != "isComplete") {
                field.addEventListener("focusin", () => {
                    this.#displayButtonsEvent(buttons);
                    this.#displayDescriptionEvent(description);
                });
            }
        }
        
        return form;
    }

    #formHeader() {
        let header = document.createElement("fieldset");
        header.className = "card__header";

        header.append(
            new StatusCheckbox(this), 
            new Input(
                "date", 
                "dueDate", 
                format(this.dueDate, "yyyy-MM-dd") 
            ) , 
            new Priority(this.priority)
        );

        return header;
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
            new SaveButton(this.id),
            new DeleteButton(this.id)
        )

        return buttonsRow;
    }

    #render() {
        let card = document.createElement("li");
        card.className = "card";

        
        card.append(this.#form());

        return card;
    }

    #displayButtonsEvent(buttons) {
        buttons.style.display = "flex";
    }

    #displayDescriptionEvent(description) {
        description.style.display = "grid";
    }
}

export class NewCard {
    constructor(dueDate = new Date()) {
        this.dueDate = dueDate;

        return this.#render(); 
    }

    #ctaCard() {
        let card = document.createElement("li");
        card.className = "card card--new";

        let icon = document.createElement("div");
        icon.className = "card__add-symbol";
        icon.textContent = "+";
        card.append(icon);

        let cta = document.createElement("h3");
        cta.className = "card__add-cta";
        cta.textContent = "Add new";
        card.append(cta);

        return card;
    }

    #editableCard() {
        let id = tasks.length;

        let card = new Card({
            id: id,
            dueDate: this.dueDate
        })

        return card;
    }

    #render() {
        let card = document.createElement("div");

        let callToAction = this.#ctaCard();
        card.append(callToAction)

        callToAction.addEventListener("click", (event) => {
            callToAction.style.display = "none";
            let newForm = this.#editableCard();
            card.append(newForm);

            newForm.querySelector("#title").focus();
        })

        return card;
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

class StatusCheckbox extends Input {
    constructor(task) {
        let checkbox = super(
            "checkbox",
            "isComplete",
            "true");

        this.id = task.id;
        this.priority = task.priority;
        this.isComplete = task.isComplete;

        checkbox.className += this.#color();
        checkbox.checked = this.#checked();

        checkbox.addEventListener("click", (event) => {
            new saveEvent(event, this.id);
        });

        return checkbox;
    }

    #color() {
        switch (this.priority) {
            case 0:
                return " red";
    
            case 1:
                return " yellow";
    
            case 2:
                return " green";
        
            default:
                return "";
        }
    }

    #checked() {
        if (this.isComplete == true) {
            return true;
        } else {
            return false;
        }
    }
}

class Priority {
    constructor(priority) {
        this.priority = priority;

        let select = this.#addOptions();
        select.className = "card__priority";
        select.name = "priority";
        select.id = "priority";

        return select;

    }

    #addOptions() {
        let select = document.createElement("select");
        const priorities = [
            "high priority",
            "medium priority",
            "low priority",
            "no priority"
        ];

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
        button.addEventListener("click", (event) => {
            new saveEvent(event, this.id);
        });

        return button;
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

class DeleteButton extends Button {
    constructor(id) {
        let button = super("delete", "submit");
        
        this.id = id;
        button.addEventListener("click", (event) => this.#deleteEvent(event, this.id));

        return button;
    }

    #deleteEvent(event, id) {
        event.preventDefault();
        
        tasks.deleteTask(id);
    }
}

function saveEvent(event, id) {
    event.preventDefault();
        
    let task = getFormData(id);
    tasks.updateTask(task, id); 
}

function getFormData(id) {
    let form = document.querySelector(`#task-${id}`);
    let title = String(form.title.value);
    let dueDate = new Date(form.dueDate.value);
    let description = String(form.description.value);
    let priority = Number(form.priority.value);
    let isComplete = Boolean(form.isComplete.checked);

    return {
        title,
        dueDate,
        description,
        priority,
        isComplete
    }
}
