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

import './styles.css';

export class Todo {
    constructor(data) {
        this.tasks = [];
        this.filterByCompletionStatus = false;

        for (let id in data) {
            let currentTask = data[id];
            this.tasks.push(new Task(currentTask, id));
        }

        new DOM(this);
    }

    updateTask(obj, id) {
        this.tasks[id] = new Task(obj, id);
        Storage.populateStorage(this.tasks);
        
        new DOM(this); 
    }
    
    cancelTask() {
        new DOM(this);  
    }

    createTask(obj) {
        let id = this.tasks.length;
        this.tasks.push(new Task(obj, id));
        Storage.populateStorage(this.tasks);
        
        new DOM(this); 
    }

    set filterComplete(bool) {
        this.filterByCompletionStatus = bool;

        new DOM(this);
    }

    get filterComplete() {
        return this.filterByCompletionStatus;
    }

    get length() {
        return this.tasks.length;
    }

    get overdue() {
        let startDate = new DateOnly(1);
        let endDate = endOfYesterday();
        let overdueTasks = this.#sortByDate(startDate, endDate);

        return this.#sortByPriority(overdueTasks);
    }
    
    get today() {
        let startDate = startOfToday();
        let endDate = endOfToday();
        let todayTasks = this.#sortByDate(startDate, endDate);

        return this.#sortByPriority(todayTasks);
    }

    get thisWeek() {
        let startDate = startOfTomorrow();
        let endDate = endOfWeek(startOfToday(), { weekStartsOn: 1 }); 
        let thisWeekTasks = this.#sortByDate(startDate, endDate);

        return this.#sortByPriority(thisWeekTasks);
    }

    get thisMonth() {
        let thisWeek = startOfWeek(startOfToday(), { weekStartsOn: 1});
        let nextWeek = add(thisWeek, {weeks: 1});

        let startDate = nextWeek; 
        let endDate = endOfMonth(startOfToday());
        let thisMonthTasks = this.#sortByDate(startDate, endDate);

        return this.#sortByPriority(thisMonthTasks);
    }

    get later() {
        let thisMonth = startOfMonth(startOfToday());
        let nextMonth = add(thisMonth, {months: 1});
        let endOfTime = new DateOnly(8640000000000000);

        let startDate = nextMonth;
        let endDate = endOfTime;
        let laterTasks = this.#sortByDate(startDate, endDate);

        return this.#sortByPriority(laterTasks);
    }

    #filterByCompletionStatus() {
        let tasksFiltered = [];

        if (this.filterByCompletionStatus == false) {
            for (let task in this.tasks) {
                let currentTask = this.tasks[task];
    
                if (currentTask.isComplete == false) {
                    tasksFiltered.push(currentTask);
                }
            }
        } else {
            tasksFiltered = this.tasks;
        }  

        return tasksFiltered;
    }

    #sortByPriority(tasks = this.tasks) {
        let tasksSorted = tasks.toSorted((a, b) => a.priority - b.priority);
        let tasksCompleted = tasksSorted.toSorted((a, b) => a.isComplete - b.isComplete)

        return tasksCompleted;
    }

    #sortByDate(startDate, endDate) {
        startDate = new DateOnly(startDate);
        endDate = new DateOnly(endDate);

        let tasksFiltered = this.#filterByCompletionStatus();
        let tasksSorted = []; 

        for (let task in tasksFiltered) {
            let currentTask = tasksFiltered[task];
            let dueDate = new DateOnly(currentTask.dueDate);

            if (dueDate >= startDate &&
                dueDate <= endDate) {
                    tasksSorted.push(currentTask);
                }
        }

        return tasksSorted;
    }
}

let data = new Storage(); 
export const tasks = new Todo(data);