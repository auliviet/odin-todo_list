# odin-todo_list
Exercise for the Odin Project - Full-stack JavaScript on organising JavaScript

## Preview link
https://auliviet.github.io/odin-todo_list/

## Instructions
- Your ‘todos’ are going to be objects that you’ll want to dynamically create.
- Brainstorm what kind of properties your todo-items are going to have. At a minimum they should have a title, description, dueDate and priority. 
-- You might also want to include notes or even a checklist.
- Your todo list should have projects or separate lists of todos. 
-- When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. 
-- Users should be able to create new projects and choose which project their todos go into.
- You should separate your application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff.
- The look of the User Interface is up to you, but it should be able to do the following:
-- View all projects.
-- View all todos in each project (probably just the title and duedate… perhaps changing color for different priorities).
-- Expand a single todo to see/edit its details.
-- Delete a todo.
- You might want to consider using the following useful library in your code:
-- date-fns gives you a bunch of handy functions for formatting and manipulating dates and times.
- You should add some persistence to this todo app using the Web Storage API.
-- localStorage allows you to save data on the user’s computer.
-- Set up a function that saves the projects (and todos) to localStorage every time a new project (or todo) is created, and another function that looks for that data in localStorage when your app is first loaded. 
-- Make sure your app doesn’t crash if the data you may want to retrieve from localStorage isn’t there!
-- You can inspect data you saved in localStorage using DevTools. 