const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const dateInput = document.getElementById("todo-date");
const list = document.getElementById("todo-list");
const filterButtons = document.querySelectorAll(".filter-btn");
const timeInput = document.getElementById("todo-time");


let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    if (
      (currentFilter === "completed" && !todo.completed) ||
      (currentFilter === "uncompleted" && todo.completed)
    ) return;

    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";
    
    li.innerHTML = `
      <div class="info" onclick="toggleTodo(${index})">
        <span>${todo.text}</span>
        <small>${todo.time} - ${todo.date}</small>
      </div>
      <button onclick="deleteTodo(${index})">🗑️</button>
    `;

    list.appendChild(li);
  });
}

function addTodo(text, time, date) {
  todos.push({ text, time, date, completed: false });
  saveAndRender();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveAndRender();
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  const time = timeInput.value;
  const date = dateInput.value;

  if (text && time && date) {
    addTodo(text, time, date);
    input.value = "";
    timeInput.value = "";
    dateInput.value = "";
  }
});

// Filter button handling
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Set active class
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    // Update filter and re-render
    currentFilter = button.dataset.filter;
    renderTodos();
  });
});

    // Hapus semua tugas
const deleteAllBtn = document.getElementById("delete-all");

deleteAllBtn.addEventListener("click", () => {
  const confirmDelete = confirm("Yakin ingin menghapus semua tugas?");
  if (confirmDelete) {
    todos = [];
    saveAndRender();
  }
});

// Initial render
renderTodos();
