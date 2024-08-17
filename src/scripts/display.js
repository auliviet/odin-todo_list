import { Navigation } from "../components/nav";
import { Board } from "../components/board";

export class DOM {
    constructor(data) {
        this.tasks = data;

        this.#render();   
    }

    #render() {
        let body = document.querySelector("body");
        body.textContent = "";

        let h1 = document.createElement("h1");
        h1.textContent = "Toodoo";
        
        body.append(new Navigation());
        body.append(new Board(this.tasks));
    }
}