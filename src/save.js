export class Save {
    constructor(tasks) {
        if (this.#storageAvailable("localStorage")) {
            localStorage.setItem("tasks", tasks);
        } else {
            console.log("No local storage available");
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