import { Card } from "./card";

import "./styles.css";

export class Column {
    constructor(title, data) {
        this.title = title;
        this.tasks = data;

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

        return list;
    }

    #render() {
        let column = document.createElement("section");
        column.className = "column";

        column.append(this.#title());
        column.append(this.#cards());

        return column;
    }
}