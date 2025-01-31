"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const updateTitle = document.getElementById("updatetitle");
  const updateDesc = document.getElementById("updatedesc");
  const saveUpdateBtn = document.getElementById("saveUpdateBtn");
  const tasks = getTasks();
  const editId = JSON.parse(localStorage.getItem("editId"));

  if (editId !== null) {
    updateTitle.value = editId.title;
    updateDesc.value = editId.desc;
  }

  saveUpdateBtn.addEventListener("click", () => {
    if (updateTitle && updateDesc) {
      const newList = tasks.map((task) => {
        if (task.id === editId.id) {
          return {
            id: editId.id,
            title: sanitizeInput(updateTitle.value),
            desc: sanitizeInput(updateDesc.value),
          };
        }
        return task;
      });
      saveTasks(newList);
      localStorage.removeItem("editId");
      window.location.href = "index.html";
    } else {
      alert("Task cannot be empty!");
    }
  });
});
