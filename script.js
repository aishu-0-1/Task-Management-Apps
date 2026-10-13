
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");

        if (task.status === "Completed") {
            li.classList.add("completed");
        }

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.title;

        const status = document.createElement("select");
        status.className = "task-status";

        ["To Do", "In Progress", "Completed"].forEach((value) => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = value;
            option.selected = task.status === value;
            status.appendChild(option);
        });

        status.addEventListener("change", () => {
            task.status = status.value;
            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter((item) => item.id !== task.id);
            saveTasks();
            renderTasks();
        });

        li.append(taskText, status, deleteButton);
        taskList.appendChild(li);
    });

    totalCount.textContent = tasks.length;
    completedCount.textContent =
        tasks.filter((task) => task.status === "Completed").length;
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = taskInput.value.trim();

    if (!title) return;

    tasks.push({
        id: Date.now(),
        title: title,
        status: "To Do"
    });

    saveTasks();
    renderTasks();
    taskInput.value = "";
    taskInput.focus();
});

renderTasks();

