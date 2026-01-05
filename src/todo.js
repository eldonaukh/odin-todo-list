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

    const taskTitle = el(
      "h4",
      {
        id: `task-${this.id}`,
        onClick: (e) => {
          if (e.target !== e.currentTarget) {
            return;
          }
          const details = this.renderTodoDetails();
          console.log(e.target);
          console.log(e.target.parentNode);
          // e.target.replaceChildren();
          if (e.target.expanded === undefined || e.target.expanded === false) {
            e.target.expanded = true;
            e.target.appendChild(details);
          } else {
            e.target.expanded = false;
            e.target.removeChild(e.target.lastChild);
          }
        },
      },
      `${this.project.tasks.indexOf(this) + 1}. ${this.title}`
    );

    const completedBox = createField("", {
      type: "checkbox",
      onClick: (e) => {
        if (e.target.checked === true) {
          task.completed = true;
          taskTitle.style.textDecoration = "line-through";
        } else {
          task.completed = false;
          taskTitle.style.textDecoration = "";
        }
      },
    });

    if (task.completed) {
      completedBox.querySelector("input").checked = true;
      taskTitle.style.textDecoration = "line-through";
    }

    return el("div", { style: { display: "flex", alignItems: "center" } }, [
      completedBox,
      taskTitle,
    ]);
  }

  renderTodoDetails() {
    const desc = el("p", {}, `${this.desc}`);
    const dueDate = el("p", {}, `Due Date: ${this.dueDate}`);
    const priority = el("p", {}, `Priority: ${this.priority}`);

    return el("div", {}, [desc, dueDate, priority]);
  }
}

export { Todo };
