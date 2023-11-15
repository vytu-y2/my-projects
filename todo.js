document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("tasks");
    const newTaskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");

    // Initialize the task list from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render the task list
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `<span>${task}</span><button data-index="${index}">Delete</button>`;
            taskList.appendChild(taskItem);
        });
    }

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    renderTasks();

    // Add a new task
    addTaskButton.addEventListener("click", function () {
        const newTaskText = newTaskInput.value.trim();
        if (newTaskText !== "") {
            tasks.push(newTaskText);
            saveTasks();
            newTaskInput.value = "";
            renderTasks();
        }
    });

    // Delete a task
    taskList.addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
            const index = event.target.getAttribute("data-index");
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });
});
