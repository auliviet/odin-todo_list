export class Task {
    constructor(obj, id= 0) {
            this.id = id;
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

export class DateOnly {
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

export class Priority {
    constructor(priority = 3) {
        this.index = priority;
        return this.index;
    }

    static values = [
        "high priority",
        "medium priority",
        "low priority",
        "no priority"
    ]

    get value() {
        return Priority.values[this.index];
    }
}

class Project {

}



