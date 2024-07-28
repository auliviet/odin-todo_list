import data from "./test.json";

export class Storage {
    #testData = data;

    constructor() {
        if (!localStorage.getItem("tasks")) {
            this.#populateTestData();
        } 

        return JSON.parse(localStorage.getItem("tasks"));
    }

    #populateTestData() {
        if (this.#storageAvailable("localStorage")) {
            localStorage.setItem("tasks", JSON.stringify(this.#testData));
        } else {
            console.log("Local Storage not available");
        }
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