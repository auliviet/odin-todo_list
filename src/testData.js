import { DateOnly } from "./scripts/tasks";

export let data = [
    {
        title: "Hello! I am a todo task",
        dueDate: DateOnly.newTaskOverdue,
        priority: 1
    },
    {
        title: "I can be edited. Just click on me!",
        dueDate: DateOnly.newTaskToday,
        priority: 0
    },
    {
        title: "I can also have a description",
        description: "You can add more information if you need.",
        dueDate: DateOnly.newTaskThisWeek,
        priority: 3
    },
    {
        title: "I am automatically sorted based on my due date.",
        priority: 2,
        dueDate: DateOnly.newTaskLater
    }
]