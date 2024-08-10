import { Column } from "./column";
import { DateOnly } from "../../scripts/tasks";

import "./styles.css";

export class Board {
    constructor(data) {
        this.overdue = data.overdue;
        this.today = data.today;
        this.thisWeek = data.thisWeek;
        this.thisMonth = data.thisMonth;
        this.later = data.later;

        return this.#render();
    }

    #render() {
        let section = document.createElement("section");
        section.className = "board";

        section.append(new Column(
            "Overdue", 
            this.overdue, 
            DateOnly.newTaskOverdue));
        section.append(new Column(
            "Tooday", 
            this.today,
            DateOnly.newTaskToday));
        section.append(new Column(
            "This week", 
            this.thisWeek, 
            DateOnly.newTaskThisWeek));
        section.append(new Column(
            "This month", 
            this.thisMonth,
            DateOnly.newTaskThisMonth));
        section.append(new Column(
            "Later", 
            this.later,
            DateOnly.newTaskLater));

        return section;
    }
}
