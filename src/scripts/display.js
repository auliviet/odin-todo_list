import { Navigation } from "../components/nav";
import { Board } from "../components/board";

export class DOM {
    constructor() {
        this.board = new Board();
        console.log("DOM");
    }
}