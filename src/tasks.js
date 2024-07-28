import { 
    add,
    endOfMonth, 
    endOfToday, 
    endOfWeek, 
    endOfYesterday, 
    startOfMonth, 
    startOfToday, 
    startOfTomorrow,
    startOfWeek } from 'date-fns';


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

export class Tasks {
    constructor(data) {
        this.tasks = [];
        let id = 0;

        for (let task in data) {
            let currentTask = data[task];
            this.tasks.push(new Task(currentTask, id));

            id++;
        }
    }

    get overdue() {
        let startDate = new DateOnly(0);
        let endDate = endOfYesterday();
        let overdueTasks = this.#filterByDate(startDate, endDate);

        return this.#sortByPriority(overdueTasks);
    }
    
    get today() {
        let startDate = startOfToday();
        let endDate = endOfToday();
        let todayTasks = this.#filterByDate(startDate, endDate);

        return this.#sortByPriority(todayTasks);
    }

    get thisWeek() {
        let startDate = startOfTomorrow();
        let endDate = endOfWeek(startOfToday(), { weekStartsOn: 1 }); 
        let thisWeekTasks = this.#filterByDate(startDate, endDate);

        return this.#sortByPriority(thisWeekTasks);
    }

    get thisMonth() {
        let thisWeek = startOfWeek(startOfToday(), { weekStartsOn: 1});
        let nextWeek = add(thisWeek, {weeks: 1});

        let startDate = nextWeek; 
        let endDate = endOfMonth(startOfToday());
        let thisMonthTasks = this.#filterByDate(startDate, endDate);

        return this.#sortByPriority(thisMonthTasks);
    }

    get later() {
        let thisMonth = startOfMonth(startOfToday());
        let nextMonth = add(thisMonth, {months: 1});
        let endOfTime = new DateOnly(8640000000000000);

        let startDate = nextMonth;
        let endDate = endOfTime;
        let laterTasks = this.#filterByDate(startDate, endDate);

        return this.#sortByPriority(laterTasks);
    }

    #sortByPriority(tasks = this.tasks) {
        let tasksSorted = tasks.toSorted((a, b) => a.priority.index - b.priority.index);

        return tasksSorted;
    }

    #filterByDate(startDate, endDate) {
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

