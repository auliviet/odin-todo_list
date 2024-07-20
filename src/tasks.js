export class Task {
    constructor(obj) {
            this.title = obj.title != null ? obj.title : null;
            this.dueDate = new DateOnly(obj.dueDate); 
            this.description = obj.description != null ? obj.description : null;
            this.priority = new Priority(obj.priority);
            this.project = obj.project != null ? obj.project : null;
            this.isComplete = obj.isComplete != null ? obj.isComplete : false;
    }

    complete() {
        let completion = this.isComplete == false ? true : false;
        this.isComplete = completion;
    }
}

class DateOnly {
    constructor(date = null) {
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
}

class Priority {
    constructor(priority = 3) {
        this.index = priority;
        return this.index;
    }

    get value() {
        switch (this.index) {
            case 0:
                return "high priority";
                break;

            case 1:
                return "medium priority";
                break;

            case 2:
                return "low priority";
                break;

            default:
                return "no priority";
                break;
        }
    }
}

class Project {

}

export class Tasks {
    constructor(data) {
        this.tasks = [];

        for (let task in data) {
            let currentTask = data[task];
            this.tasks.push(new Task(currentTask));
        }
    }

    sortByPriority(tasks = this.tasks) {
        let tasksSorted = tasks.toSorted((a, b) => a.priority.index - b.priority.index);

        return tasksSorted;
    }

    filterByDate(startDate, endDate) {
        startDate = new DateOnly(startDate);
        endDate = new DateOnly(endDate);

        let tasksFiltered = [];

        for (let task in this.tasks) {
            let currentTask = this.tasks[task];
            let dueDate = new DateOnly(currentTask.dueDate);

            if (dueDate >= startDate &&
                dueDate <= endDate) {
                    tasksFiltered.push(currentTask);
                }
        }

        return tasksFiltered;
    }
}

