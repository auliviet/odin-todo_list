export class Task {
    constructor(obj) {
            this.title = obj.title != null ? obj.title : null;
            this.dueDate = this.#setDate(obj.date); 
            this.description = obj.description != null ? obj.description : null;
            this.priority = obj.priority != null ? obj.priority : null;
            this.project = obj.project != null ? obj.project : null;
            this.isComplete = obj.isComplete != null ? obj.isComplete : false;

            // Remove the timestamp from dates
            console.log(this.dueDate.getTime());
    }

    #setDate(date = null) {
        if (date == null) {
            date = new Date();
        }

        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date .getDate();

        return new Date(year, month, day);
    }

    complete() {
        let completion = this.isComplete == false ? true : false;
        this.isComplete = completion;
    }
}

export class Tasks {
    constructor(data) {
        this.tasks = [];

        for (let task in data) {
            let currentTask = data[task];
            this.tasks.push(new Task(currentTask));
        }
    }

    sort() {
        // Sort tasks by priority

    }

    filterByDate(startDate, endDate) {
        // Filter tasks by date

    }
}
