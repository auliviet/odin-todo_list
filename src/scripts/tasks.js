export class Task {
    constructor(obj, id= 0) {
            this.id = Number(id);
            this.title = obj.title != null ? String(obj.title) : null;
            this.dueDate = new DateOnly(obj.dueDate); 
            this.description = obj.description != null ? 
                String(obj.description) : 
                null;
            this.priority = obj.priority != null ? Number(obj.priority) : 3;
            this.isComplete = obj.isComplete != null ? 
                Boolean(obj.isComplete) : 
                false;
    }

    complete() {
        let completion = this.isComplete == false ? true : false;
        this.isComplete = completion;
    }
}

export class DateOnly {
    constructor(date = null) {
        if (date == null || date == "") {
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




