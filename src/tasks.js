export class Task {
    constructor(obj) {
            this.title = obj.title != null ? obj.title : null;
            this.dueDate = this.#setDate(obj.dueDate); 
            this.description = obj.description != null ? obj.description : null;
            this.priority = obj.priority != null ? obj.priority : 3;
            this.project = obj.project != null ? obj.project : null;
            this.isComplete = obj.isComplete != null ? obj.isComplete : false;
    }

    #setDate(date = null) {
        if (date == null) {
            date = new Date();
        }
        else {
            date = new Date(date);
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

    #removeTimeFromDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date .getDate();

        return new Date(`${year}-${month}-${day}`); 
    }

    sortByPriority(tasks = this.tasks) {
        let tasksSorted = tasks.toSorted((a, b) => a.priority - b.priority);

        return tasksSorted;
    }

    filterByDate(startDate, endDate) {
        startDate = this.#removeTimeFromDate(startDate);
        endDate = this.#removeTimeFromDate(endDate);

        let tasksFiltered = [];

        for (let task in this.tasks) {
            let currentTask = this.tasks[task];
            let dueDate = this.#removeTimeFromDate(currentTask.dueDate);

            if (dueDate >= startDate &&
                dueDate <= endDate) {
                    tasksFiltered.push(currentTask);
                }
        }

        return tasksFiltered;
    }
}
