import { Column } from "./column";

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

        section.append(new Column("Overdue", this.overdue));
        section.append(new Column("Tooday", this.today));
        section.append(new Column("This week", this.thisWeek));
        section.append(new Column("This month", this.thisMonth));
        section.append(new Column("Later", this.later));

        return section;
    }
}
