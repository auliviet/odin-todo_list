export class Task {
    constructor(
        title = "", 
        dueDate = "", 
        description = "",
        priority = "",
        project= "",
        isComplete = false) {
            this.title = title;
            this.dueDate = dueDate;
            this.description = description;
            this.priority = priority;
            this.project = project;
            this.isComplete = isComplete;
    }

    complete() {
        let completion = this.isComplete = false ? true : false;
        this.isComplete = completion;
    }
}
