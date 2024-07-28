// Data
import data from "./testData.json";

// Scripts
import { Tasks } from "./tasks.js";

let tasks = new Tasks(data);
console.log(tasks);

console.log("Overdue: ", tasks.overdue);
console.log("Today: ", tasks.today);
console.log("This week: ", tasks.thisWeek);
console.log("This month: ", tasks.thisMonth);
console.log("Later: ", tasks.later);