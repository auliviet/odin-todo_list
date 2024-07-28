// Data
import data from "./testData.json";

// Scripts
import { Tasks } from "./tasks.js";

let tasks = new Tasks(data);
console.log(tasks);
console.log("Overdue:", tasks.overdue);