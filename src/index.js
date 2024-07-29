// Scripts
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
import { Storage } from "./scripts/storage.js";
import { Task, DateOnly } from './scripts/tasks.js';
import { DOM } from './scripts/display.js';

class Todo {
    constructor() {
        this.tasks = [];
        let data = new Storage(); 

        for (let id in data) {
            let currentTask = data[id];
            this.tasks.push(new Task(currentTask, id));
        }

        let display = new DOM(this);
    }

    updateTask(obj, id) {
        this.tasks[id] = new Task(obj);
        Storage.populateStorage(this.tasks);
        let display = new DOM(this); 
    }

    createTask(obj) {
        this.tasks.push(new Task(obj, this.tasks.length));
        Storage.populateStorage(this.tasks);
        let display = new DOM(this); 
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

export const tasks = new Todo();