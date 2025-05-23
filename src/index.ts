interface Task {
  id: number;
  description: string;
  completed: boolean;
  createdAt: string;
}

let tasks: Task[] = loadTasks();

function loadTasks(): Task[] {
  try {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
}

function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
}

function addTask(description: string): void {
  if (!description.trim()) return;
  const task: Task = {
    id: Date.now(),
    description,
    completed: false,
    createdAt: new Date().toLocaleString(),
  };
  tasks.push(task);
  saveTasks(tasks);
  listTasks();
}

function editTask(id: number, newDescription: string): void {
  if (!newDescription.trim()) return;
  tasks = tasks.map(task =>
    task.id === id ? { ...task, description: newDescription } : task
  );
  saveTasks(tasks);
  listTasks();
}

function deleteTask(id: number): void {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks(tasks);
  listTasks();
}

function completeTask(id: number): void {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks(tasks);
  listTasks();
}

function listTasks(): void {
  const taskList = document.querySelector("#task-list") as HTMLUListElement;
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
      const id = Number((e.target as HTMLInputElement).dataset.id);
      completeTask(id);
    });
  });

  // Edit button event listeners
  document.querySelectorAll(".task-item button.edit").forEach(button => {
    button.addEventListener("click", (e) => {
      const id = Number((e.target as HTMLButtonElement).dataset.id);
      const li = (e.target as HTMLButtonElement).closest(".task-item") as HTMLLIElement;
      const descriptionSpan = li.querySelector(".description") as HTMLSpanElement;
      const editInput = li.querySelector(".edit-input") as HTMLInputElement;
      const editButton = li.querySelector(".edit") as HTMLButtonElement;
      const saveButton = li.querySelector(".save") as HTMLButtonElement;
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
      const id = Number((e.target as HTMLButtonElement).dataset.id);
      const li = (e.target as HTMLButtonElement).closest(".task-item") as HTMLLIElement;
      const editInput = li.querySelector(".edit-input") as HTMLInputElement;
      editTask(id, editInput.value);
    });
  });

  // Delete button event listeners
  document.querySelectorAll(".task-item button.delete").forEach(button => {
    button.addEventListener("click", (e) => {
      const id = Number((e.target as HTMLButtonElement).dataset.id);
      deleteTask(id);
    });
  });
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  listTasks();
  const form = document.querySelector("#task-form") as HTMLFormElement;
  const input = document.querySelector("#task-input") as HTMLInputElement;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask(input.value);
    input.value = "";
  });
});