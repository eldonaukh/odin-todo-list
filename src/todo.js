import { el, createField } from "./utils.js";

class Todo {
  constructor(id, project, title, desc, dueDate, priority) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
    this.project = project;
  }

  renderTodoSimple() {
    const task = this.project.tasks[this.id - 1];
    const completedBox = createField("", {
      type: "checkbox",
      onClick: (e) => {
        if (e.target.checked === true) {
          task.completed = true;
        } else {
          task.completed = false;
        }
      },
    });

    completedBox.querySelector("input").checked = task.completed;

    const infoDIv = el(
      "div",
      { style: { display: "flex", alignItems: "center" } },
      [
        completedBox,
        el(
          "h4",
          { id: `task-${this.id}` },
          `${this.project.tasks.indexOf(this) + 1}. ${this.title}`
        ),
      ]
    );
    return infoDIv;
  }
}

export { Todo };
