import data from "../test.json";
import { Todo } from "..";

export class Storage {

    constructor() {
        if (this.#storageAvailable("localStorage")) {
            return this.#getStoredData();
        } else {
            alert("Local Storage is not available on your browser. All changes will be lost when you close this window.")
            return new Todo(data).tasks;
        }
    }

    static populateStorage(data) {
        localStorage.setItem("tasks", JSON.stringify(data));
    }

    #getStoredData() {
        // If no existing data stored, populate with test data.
        if (!localStorage.getItem("tasks")) {
            let testData = new Todo(data).tasks;
            Storage.populateStorage(testData);
        }

        return JSON.parse(localStorage.getItem("tasks"));
    }

    #storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
          return true;
        } catch (e) {
          return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage &&
                storage.length !== 0
          );
        }
    }
}