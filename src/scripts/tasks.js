import { 
    add,
    endOfYesterday, 
    startOfMonth, 
    startOfToday, 
    startOfTomorrow,
    startOfWeek } from 'date-fns';

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

    static get newTaskOverdue () {
        return endOfYesterday();
    }

    static get newTaskToday() {
        return startOfToday();
    }

    static get newTaskThisWeek () {
        return startOfTomorrow();
    }

    static get newTaskThisMonth() {
        let thisWeek = startOfWeek(startOfToday(), { weekStartsOn: 1});
        let nextWeek = add(thisWeek, {weeks: 1});

        return nextWeek;
    }

    static get newTaskLater() {
        let thisMonth = startOfMonth(startOfToday());
        let nextMonth = add(thisMonth, {months: 1});

        return nextMonth
    }
}




