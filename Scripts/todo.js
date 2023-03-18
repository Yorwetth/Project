const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".drop");
let draggableTodo = null;

todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggableTodo = this;
}

function dragEnd() {
  draggableTodo = null;
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
}

function dragEnter() {
  
}

function dragLeave() {
  
}

function dragDrop() {
  this.appendChild(draggableTodo);
}

  /* create todo  */
const todo_submit = document.getElementById("note-btn");

todo_submit.addEventListener("click", createTodo);

function createTodo() {
  const todo_div = document.createElement("div");

  todo_div.classList.add("todo");
  todo_div.setAttribute("draggable", "true");

/* create p  */
  const pref = document.createElement("p");
  pref.classList.add("todo_text");

  const input_val = document.getElementById("todo_input").value;
  const txt = document.createTextNode(input_val);
  pref.appendChild(txt);

  /* create checkbox */
  const expand = document.createElement("INPUT");
  expand.setAttribute("type","checkbox");
  expand.classList.add("expand-btn");

  /* create span */
  const span = document.createElement("span");
  const span_txt = document.createTextNode("\u00D7");
  
  span.classList.add("close");
  span.appendChild(span_txt);

  todo_div.appendChild(pref);
  todo_div.appendChild(expand);
  todo_div.appendChild(span);

  const no_status = document.querySelector('.default');
  no_status.appendChild(todo_div);

  span.addEventListener("click", () => {
    span.parentElement.remove();
  });

  todo_div.addEventListener("dragstart", dragStart);
  todo_div.addEventListener("dragend", dragEnd);

  document.getElementById("todo_input").value = "";
  todo_form.classList.remove("active");
}

const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});