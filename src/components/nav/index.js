import "./styles.css";
import { tasks } from "../..";

export class Navigation {
    constructor() {
        return this.#render();
    }

    #title() {
        let h1 = document.createElement("h1");
        h1.className = "nav__title";
        h1.textContent = "Toodoo.";

        return h1;
    }

    #completionFilter() {
        let button = document.createElement("button");
        button.className = "nav__completion-filter";
        button.textContent = "Show complete";

        button.addEventListener("click", (event) => {

            let target = event.target; 

            if (tasks.filterComplete == true) {
                tasks.filterComplete = false;
            } else {
                tasks.filterComplete = true;
                target.className += " active";
            }
        })

        return button;
    }

    #render() {
        let nav = document.createElement("nav");
        nav.className = "nav";

        nav.append(
            this.#title(),
            this.#completionFilter()
        )

        return nav;
    }

}