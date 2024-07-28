import { Column } from "./column";

export class Board {
    constructor() {
        this.column = new Column();
        console.log("Board");
    }
}