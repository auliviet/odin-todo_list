import { Navigation } from "../components/nav";
import { Board } from "../components/board";

export class DOM {
    constructor(data) {
        this.tasks = data;

        this.#render();   
    }

    #render() {
        let body = document.querySelector("body");
        body.textContent = ""

        body.append(new Board(this.tasks));
    }
}