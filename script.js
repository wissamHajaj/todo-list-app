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
