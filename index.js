"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("search");
  const searchQuery = document.getElementById("search-query");
  const taskList = document.getElementById("taskList");
  const deleteAllBtn = document.getElementById("deleteall");
  const tasks = getTasks();
  const searchValue = JSON.parse(localStorage.getItem("search-value"));
  localStorage.removeItem("search-value");

  function renderTasks(displayList = tasks) {
    taskList.innerHTML = "";
    if (displayList.length > 0) {
      displayList.forEach((task) => {
        const li = document.createElement("li");
        if (task.status) {
          li.classList.add("disabled");
        }

        const liIndex = document.createElement("div");
        liIndex.classList.add("li-index");

        const inputCheckBox = document.createElement("input");
        inputCheckBox.type = "checkbox";
        inputCheckBox.checked = task.status;
        inputCheckBox.name = "status";
        inputCheckBox.id = task.id;

        const indexNum = document.createElement("span");
        indexNum.textContent = task.id;

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info");

        const title = document.createElement("p");
        title.textContent = task.title;
        title.classList.add("title");
        const desc = document.createElement("p");
        desc.textContent = task.desc;

        const actionDiv = document.createElement("div");
        actionDiv.classList.add("actions");

        const editBtn = document.createElement("button");
        editBtn.dataset.index = task.id;
        editBtn.classList.add("btn");
        editBtn.classList.add("edit");
        if (task.status) {
          editBtn.setAttribute("disabled", true);
        }

        const editSpan = document.createElement("span");
        editSpan.textContent = "Edit";
        editSpan.classList.add("hidden-text");

        const editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid");
        editIcon.classList.add("fa-pen");

        const deleteBtn = document.createElement("button");
        deleteBtn.dataset.index = task.id;
        deleteBtn.classList.add("btn");
        deleteBtn.classList.add("delete");
        if (task.status) {
          deleteBtn.setAttribute("disabled", true);
        }

        const deleteSpan = document.createElement("span");
        deleteSpan.textContent = "Delete";
        deleteSpan.classList.add("hidden-text");

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid");
        deleteIcon.classList.add("fa-trash");

        editBtn.appendChild(editSpan);
        editBtn.appendChild(editIcon);
        deleteBtn.appendChild(deleteSpan);
        deleteBtn.appendChild(deleteIcon);

        liIndex.appendChild(inputCheckBox);
        liIndex.appendChild(indexNum);

        infoDiv.appendChild(title);
        infoDiv.appendChild(desc);

        actionDiv.appendChild(editBtn);
        actionDiv.appendChild(deleteBtn);

        li.appendChild(liIndex);
        li.appendChild(infoDiv);
        li.appendChild(actionDiv);

        taskList.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.classList.add("empty");

      const div = document.createElement("div");

      const span = document.createElement("span");

      const emptyIcon = document.createElement("i");
      emptyIcon.classList.add("fas");
      emptyIcon.classList.add("fa-box-open");

      const p = document.createElement("p");
      p.textContent = "No tasks";

      span.appendChild(emptyIcon);
      div.appendChild(span);
      div.appendChild(p);
      li.appendChild(div);
      taskList.appendChild(li);
    }
  }

  taskList.addEventListener("click", (event) => {
    // Action input checkbox
    if (event.target.tagName === "INPUT") {
      const newList = tasks.map((task) => {
        if (task.id === parseInt(event.target.id)) {
          return { ...task, status: event.target.checked };
        }
        return task;
      });
      saveTasks(newList);
      localStorage.setItem("search-value", JSON.stringify(search.value));
      window.location.reload();
    }

    // Action buttons
    const id = event.target.closest("button")?.dataset.index;
    if (event.target.closest("button")?.classList.contains("delete")) {
      const newList = tasks.filter((task) => task.id != id);
      saveTasks(newList);
      window.location.reload();
    }
    if (event.target.closest("button")?.classList.contains("edit")) {
      localStorage.setItem(
        "editId",
        JSON.stringify(tasks.filter((task) => task.id == id)[0])
      );
      window.location.href = "update.html";
    }
  });

  deleteAllBtn.addEventListener("click", () => {
    saveTasks([]);
    window.location.reload();
  });

  search?.addEventListener("input", debounce(searchTodos, 300));

  function searchTodos() {
    const query = document.getElementById("search").value.toLowerCase();
    const newList = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.desc.toLowerCase().includes(query)
    );
    searchQuery.textContent = query ? "Showing Results For: " + query : "";
    renderTasks(newList);
  }

  if (searchValue) {
    search.value = searchValue;
    searchTodos();
  } else {
    renderTasks();
  }
});
