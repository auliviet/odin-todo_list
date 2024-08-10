import { Card, NewCard } from "./card";

import "./styles.css";

export class Column {
    constructor(title, data, newTaskDate) {
        this.title = title;
        this.class = title.toLowerCase().replace(" ", "-");
        this.tasks = data;
        this.newTaskDate = newTaskDate;


        return this.#render();
    }

    #title() {
        let title = document.createElement("h2");
        title.className = "column__title";
        title.textContent = `${this.title}.`;

        return title;
    }

    #cards() {
        let list = document.createElement("ul");
        list.className = "column__list";

        for (let task in this.tasks) {
            let currentTask = this.tasks[task];
            let card = new Card(currentTask);
            list.append(card);
        }

        list.append(new NewCard(this.newTaskDate));

        return list;
    }

    #render() {
        let column = document.createElement("section");
        column.className = `column ${this.class}`;

        column.append(this.#title());
        column.append(this.#cards());

        return column;
    }
}