import { DateOnly } from "./scripts/tasks";

export let data = [
    {
        title: "This task has already been completed!",
        dueDate: DateOnly.newTaskOverdue,
        priority: 3,
        isComplete: true
    },
    {
        title: "Hello! This is a toodoo task",
        dueDate: DateOnly.newTaskOverdue,
        priority: 1
    },
    {
        title: "To create a new task, just click on \"Add new\"",
        dueDate: DateOnly.newTaskToday,
        priority: 0
    },
    {
        title: "To edit an existing task, click on it.",
        dueDate: DateOnly.newTaskToday,
        priority: 2
    },
    {
        title: "If needed, tasks can have a description too.",
        description: "It is helpful if you need to add more informations",
        dueDate: DateOnly.newTaskThisWeek,
        priority: 3
    },
    {
        title: "Tasks are automatically sorted based on their due date and priority.",
        description: "Try changing the due date of this task to see it in action.",
        priority: 2,
        dueDate: DateOnly.newTaskThisMonth
    },
    {
        title: "You can click \"Show complete\" to see the tasks that have been completed already.",
        priority: 2,
        dueDate: DateOnly.newTaskLater
    }
]