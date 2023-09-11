const themeSweitch = document.querySelector("#theme-toogle");
const task_value = document.querySelector("#task-input");
const all_tasks = document.querySelector("#all-tasks");
const pending_tasks = document.querySelector("#pending-tasks");
const completed_tasks = document.querySelector("#completed-tasks");
const clear_tasks = document.querySelector("#clear-completed");
let active_state = document.querySelector(".active-state");
const tasks_container = document.querySelector("#tasks");
let pending_btn = document.querySelectorAll(".pending-btn");
const tasks_counter = document.querySelector("#not-completed");
clear_tasks.onclick = clearCompleted;

document.querySelectorAll(".state").forEach((el) => {
  el.addEventListener("click", function () {
    document.querySelectorAll(".state").forEach((el) => {
      el.classList.remove("active-state");
    });
    this.classList.add("active-state");
    active_state = this;
    showTasks();
  });
});
let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  showTasks();
}
class Task {
  constructor(name, state) {
    (this.name = name), (this.completed = state);
  }
}

document.forms[0].onsubmit = (e) => {
  e.preventDefault();
  task_value.value = task_value.value.trim();
  if (/\w+/.test(task_value.value)) {
    let task = new Task(task_value.value, false);
    tasks.push(task);
    saveTasks();
    showTasks();
    task_value.value = "";
  }
};

function showTasks() {
  tasks_container.innerHTML = "";
  if (active_state.getAttribute("data-show") == "all") {
    showAllTasks();
  } else if (active_state.getAttribute("data-show") == "done") {
    showComTasks();
  } else {
    showUncomTasks();
  }
  countUncomTasks();
}

function showAllTasks() {
  for (let task of tasks) {
    if (task.completed == false)
      tasks_container.innerHTML += `
      <li
      class="list-group-item p-3 d-flex justify-content-between align-items-center"
    >
      <div
        class="task-details d-flex align-items-center gap-3 pending-task"
      >
        <button class="pending-btn"  onclick='taskDone(${tasks.indexOf(
          task
        )})'></button>
        <span class="task-name">${task.name}</span>
      </div>
      <button class="rm-task" onclick='delTask(${tasks.indexOf(task)})'>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path
            fill="#494C6B"
            fill-rule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </button>
    </li>
        `;
    else {
      tasks_container.innerHTML += `
            <li
            class="list-group-item p-3 d-flex justify-content-between align-items-center"
            >
            <div
              class="task-details d-flex align-items-center gap-3 pending-task"
            >
              <button class="completed-btn" onclick='taskUndone(${tasks.indexOf(
                task
              )})'></button>
              <span class="task-name completed">${task.name}</span>
            </div>
            <button class="rm-task" onclick='delTask(${tasks.indexOf(task)})'>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                <path
                  fill="#494C6B"
                  fill-rule="evenodd"
                  d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                />
              </svg>
            </button>
            </li>
            `;
    }
  }
}

function showUncomTasks() {
  for (let task of tasks) {
    if (task.completed == false)
      tasks_container.innerHTML += `
        <li
        class="list-group-item p-3 d-flex justify-content-between align-items-center"
      >
        <div
          class="task-details d-flex align-items-center gap-3 pending-task"
        >
          <button class="pending-btn" onclick='taskDone(${tasks.indexOf(
            task
          )})'></button>
          <span class="task-name">${task.name}</span>
        </div>
        <button class="rm-task" onclick='delTask(${tasks.indexOf(task)})' >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path
              fill="#494C6B"
              fill-rule="evenodd"
              d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
            />
          </svg>
        </button>
      </li>
          `;
  }
}

function showComTasks() {
  for (let task of tasks) {
    if (task.completed == true) {
      tasks_container.innerHTML += `
              <li
              class="list-group-item p-3 d-flex justify-content-between align-items-center"
              >
              <div
                class="task-details d-flex align-items-center gap-3 pending-task"
              >
                <button class="completed-btn"  onclick='taskUndone(${tasks.indexOf(
                  task
                )})'></button>
                <span class="task-name completed">${task.name}</span>
              </div>
              <button class="rm-task" onclick='delTask(${tasks.indexOf(task)})'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path
                    fill="#494C6B"
                    fill-rule="evenodd"
                    d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                  />
                </svg>
              </button>
              </li>
              `;
    }
  }
}
function delTask(index) {
  saveTasks();
  tasks.splice(index, 1);
  showTasks();
}
function taskDone(index) {
  tasks[index].completed = true;
  saveTasks();
  showTasks();
}

function taskUndone(index) {
  tasks[index].completed = false;
  saveTasks();
  showTasks();
}

themeSweitch.addEventListener("click", () => {
  if (document.querySelector("body").getAttribute("data-bs-theme") == "dark") {
    document.querySelector("body").setAttribute("data-bs-theme", "light");
  } else {
    document.querySelector("body").setAttribute("data-bs-theme", "dark");
  }
  checkTheme();
});

function countUncomTasks() {
  let counter = 0;
  for (let task of tasks) {
    if (task.completed == false) {
      counter++;
    }
  }
  tasks_counter.textContent = `${counter} items left`;
}
function checkTheme() {
  if (document.querySelector("body").getAttribute("data-bs-theme") == "dark") {
    themeSweitch.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
    <path
      fill="#FFF"
      fill-rule="evenodd"
      d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
    />
  </svg>
    `;
  } else {
    themeSweitch.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
    <path
      fill="#FFF"
      fill-rule="evenodd"
      d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
    />
  </svg>`;
  }
}

function clearCompleted() {
  tasks = tasks.filter((el) => el.completed == false);
  saveTasks();
  showTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
countUncomTasks();

checkTheme();
