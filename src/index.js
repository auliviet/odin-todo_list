// Scripts
import { Tasks } from "./scripts/tasks.js";
import { Storage } from "./scripts/storage.js";

let data = new Storage();
let tasks = new Tasks(data);


console.log("Overdue: ", tasks.overdue);
console.log("Today: ", tasks.today);
console.log("This week: ", tasks.thisWeek);
console.log("This month: ", tasks.thisMonth);
console.log("Later: ", tasks.later);