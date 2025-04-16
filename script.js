//  Display the tasks on page loaded
document.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToUi(task));
});

const addBtn = document.querySelector(".add-btn");

addBtn.addEventListener("click", () => {
  const input = document.querySelector(".task-input");
  const taskName = input.value.trim();

  console.log(taskName);

  if (taskName !== "") {
    // get the existing tasks list from the local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskId = Date.now();

    const newTask = {
      id: taskId.toString(),
      name: taskName,
      status: "pending",
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    addTaskToUi(newTask);
    input.value = "";
  }
});

function addTaskToUi(task) {
  const li = document.createElement("li");
  const checked = task.status == "completed" ? "checked" : "";
  li.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${checked}/>
              <span class="task-name">${task.name}</span>
              <span class="task-status">${task.status}</span>
              <button class="delete-btn">Delete</button>
      `;
  // if task status is completed add the class completed to the task name span
  const taskNameSpan = li.querySelector(".task-name");
  if (task.status === "completed") {
    taskNameSpan.classList.add("completed");
  } else {
    taskNameSpan.classList.remove("completed");
  }
  li.setAttribute("data-id", task.id);
  li.classList.add("todo-item");

  document.querySelector("ul").appendChild(li);
}

// Delete task
const tasksUl = document.querySelector(".todo-list");

tasksUl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    // get the parent li of the clicked delete button
    const li = e.target.closest("li");

    // get the data-id from li
    const taskId = li.dataset.id;
    // remove li from UI
    li.remove();

    // remove the task from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updateTask = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updateTask));
  }
});

// update the status of the task in UI and local storage
tasksUl.addEventListener("click", (e) => {
  if (e.target.type === "checkbox") {
    const li = e.target.closest("li");
    const taskId = li.dataset.id;
    console.log(taskId);
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTask = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: e.target.checked ? "completed" : "pending",
        };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTask));

    // get the span of the task name inside the li
    const taskNameSpan = li.querySelector(".task-name");
    // get the span of the task status inside the li
    const taskStatusSpan = li.querySelector(".task-status");

    if (e.target.checked) {
      taskNameSpan.classList.add("completed");
      taskStatusSpan.innerHTML = "completed";
    } else {
      taskNameSpan.classList.remove("completed");
      taskStatusSpan.innerHTML = "pending";
    }
  }
});
