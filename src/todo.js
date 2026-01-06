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

  remove(id) {
    const rmIndex = this.project.tasks.findIndex((item) => item.id === id);
    this.project.tasks.splice(rmIndex, 1);
  }

  renderTodoSimple() {
    const task = this.project.tasks[this.id - 1];

    const taskTitle = el(
      "span",
      {
        id: `task-${this.id}`,
        style: { fontWeight: "bold", fontSize: "20px" },
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
            e.target.parentNode.appendChild(details);
          } else {
            e.target.expanded = false;
            e.target.parentNode.removeChild(e.target.parentNode.lastChild);
          }
        },
      },
      `${this.project.tasks.indexOf(this) + 1}. ${this.title}`
    );

    const completedBox = el("input", {
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

    const rmBtn = el(
      "button",
      {
        onClick: () => {
          this.remove(this.id);
          this.project.renderTasks();
        },
      },
      "Remove"
    );

    return el("div", { style: { backgroundColor: this.getPriorityColor() } }, [
      completedBox,
      taskTitle,
      rmBtn,
    ]);
  }

  renderTodoDetails() {
    const desc = el("div", {}, `Description: ${this.desc}`);
    const dueDate = el("div", {}, `Due Date: ${this.dueDate}`);
    const priority = el("div", {}, `Priority: ${this.priority}`);

    return el("div", {}, [desc, dueDate, priority]);
  }

  getPriorityColor() {
    const colors = {
      h: "lightpink",
      m: "lightsalmon",
      l: "lightgreen",
    };
    return colors[this.priority];
  }
}

export { Todo };
