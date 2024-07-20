export class Task {
    constructor(obj) {
            this.title = obj.title != null ? obj.title : null;
            this.dueDate = obj.dueDate != null ? obj.dueDate : new Date();
            this.description = obj.description != null ? obj.description : null;
            this.priority = obj.priority != null ? obj.priority : null;
            this.project = obj.project != null ? obj.project : null;
            this.isComplete = obj.isComplete != null ? obj.isComplete : false;
    }

    complete() {
        let completion = this.isComplete == false ? true : false;
        this.isComplete = completion;
    }
}

