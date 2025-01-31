"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title");
  const desc = document.getElementById("desc");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const tasks = getTasks();

  addTaskBtn.addEventListener("click", () => {
    let task = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      title: sanitizeInput(title.value),
      desc: sanitizeInput(desc.value),
      status: false,
    };

    if (task.title && task.desc) {
      const tasks = getTasks();
      tasks.push(task);
      saveTasks(tasks);
      title.value = "";
      desc.value = "";
      window.location.href = "index.html";
    } else {
      alert("Title & Desc cannot be empty!");
    }
  });
});
