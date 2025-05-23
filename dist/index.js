"use strict";
let tasks = loadTasks();
function loadTasks() {
    try {
        const data = localStorage.getItem("tasks");
        return data ? JSON.parse(data) : [];
    }
    catch (error) {
        console.error("Error loading tasks:", error);
        return [];
    }
}
function saveTasks(tasks) {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    catch (error) {
        console.error("Error saving tasks:", error);
    }
}
function addTask(description) {
    if (!description.trim())
        return;
    const task = {
        id: Date.now(),
        description,
        completed: false,
        createdAt: new Date().toLocaleString(),
    };
    tasks.push(task);
    saveTasks(tasks);
    listTasks();
}
function editTask(id, newDescription) {
    if (!newDescription.trim())
        return;
    tasks = tasks.map(task => task.id === id ? Object.assign(Object.assign({}, task), { description: newDescription }) : task);
    saveTasks(tasks);
    listTasks();
}
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    listTasks();
}
function completeTask(id) {
    tasks = tasks.map(task => task.id === id ? Object.assign(Object.assign({}, task), { completed: !task.completed }) : task);
    saveTasks(tasks);
    listTasks();
}
function listTasks() {
    const taskList = document.querySelector("#task-list");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} data-id="${task.id}">
      <span class="description">${task.description}</span>
      <span class="date">${task.createdAt}</span>
      <input type="text" class="edit-input" value="${task.description}" style="display: none;">
      <button class="edit" data-id="${task.id}">Edit</button>
      <button class="save" data-id="${task.id}" style="display: none;">Save</button>
      <button class="delete" data-id="${task.id}">Delete</button>
    `;
        taskList.appendChild(li);
    });
    // Checkbox event listeners
    document.querySelectorAll(".task-item input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            const id = Number(e.target.dataset.id);
            completeTask(id);
        });
    });
    // Edit button event listeners
    document.querySelectorAll(".task-item button.edit").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = Number(e.target.dataset.id);
            const li = e.target.closest(".task-item");
            const descriptionSpan = li.querySelector(".description");
            const editInput = li.querySelector(".edit-input");
            const editButton = li.querySelector(".edit");
            const saveButton = li.querySelector(".save");
            descriptionSpan.style.display = "none";
            editInput.style.display = "inline-block";
            editButton.style.display = "none";
            saveButton.style.display = "inline-block";
            editInput.focus();
        });
    });
    // Save button event listeners
    document.querySelectorAll(".task-item button.save").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = Number(e.target.dataset.id);
            const li = e.target.closest(".task-item");
            const editInput = li.querySelector(".edit-input");
            editTask(id, editInput.value);
        });
    });
    // Delete button event listeners
    document.querySelectorAll(".task-item button.delete").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = Number(e.target.dataset.id);
            deleteTask(id);
        });
    });
}
// Initialize app
document.addEventListener("DOMContentLoaded", () => {
    listTasks();
    const form = document.querySelector("#task-form");
    const input = document.querySelector("#task-input");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addTask(input.value);
        input.value = "";
    });
});
