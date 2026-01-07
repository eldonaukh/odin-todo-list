import { el, createField, createSelect } from "./utils.js";

class Todo {
  constructor(id, project, title, desc, dueDate, priority, completed = false) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.project = project;
  }

  toObject() {
    const task = {};

    for (const key of Object.keys(this)) {
      if (key !== "project") {
        task[key] = this[key];
      }
    }
    return task;
  }

  remove(id) {
    const rmIndex = this.project.tasks.findIndex((item) => item.id === id);
    this.project.tasks.splice(rmIndex, 1);
  }

  edit(id, data) {
    const task = this.project.tasks[this.id - 1];

    task.title = data["taskTitle"];
    task.desc = data["taskDesc"];
    task.dueDate = data["taskDue"];
    task.priority = data["taskPriority"];
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
          this.project.projectManager.toLocalStorage();
        } else {
          task.completed = false;
          taskTitle.style.textDecoration = "";
          this.project.projectManager.toLocalStorage();
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
          this.project.projectManager.toLocalStorage();
        },
      },
      "Remove"
    );

    const editTaskForm = this.renderEditTask();

    const editTaskBtn = el(
      "button",
      {
        onClick: (e) => {
          e.preventDefault();
          const dialog = document.querySelector(`#dialog-editTask-${this.id}`);
          dialog.showModal();
        },
      },
      "Edit"
    );

    return el("div", { style: { backgroundColor: this.getPriorityColor() } }, [
      completedBox,
      taskTitle,
      editTaskForm,
      rmBtn,
      editTaskBtn,
    ]);
  }

  renderEditTask() {
    const cancelBtn = el(
      "button",
      {
        onClick: (e) => {
          e.preventDefault();
          const dialog = document.querySelector(`#dialog-editTask-${this.id}`);
          dialog.close();
        },
      },
      "Cancel"
    );

    const submitBtn = el(
      "button",
      {
        type: "submit",
        onClick: (e) => {
          e.preventDefault();
          const form = document.querySelector(`#editTask-${this.id}`);
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          this.edit(this.id, data);
          this.project.renderTasks();
          const dialog = document.querySelector(`#dialog-editTask-${this.id}`);
          dialog.close();
          this.project.projectManager.toLocalStorage();
        },
      },
      "Submit"
    );

    const priorityOptions = [
      el("option", { value: "h" }, "High"),
      el("option", { value: "m" }, "Mid"),
      el("option", { value: "l" }, "Low"),
    ];

    const taskForm = el(
      "form",
      { class: "edit-task", id: `editTask-${this.id}`, method: "dialog" },
      [
        el("h3", {}, [`Edit Todo item`]),
        createField("Title", { name: "taskTitle", value: this.title }),
        createField("Description", {
          name: "taskDesc",
          value: this.desc,
        }),
        createField("Due Date", {
          name: "taskDue",
          type: "date",
          value: this.dueDate,
        }),
        createSelect(
          "Priority",
          {
            name: "taskPriority",
            value: this.priority,
          },
          priorityOptions
        ),
        cancelBtn,
        submitBtn,
      ]
    );

    return el("dialog", { id: `dialog-editTask-${this.id}` }, [taskForm]);
  }

  renderTodoDetails() {
    const desc = el("div", {}, `Description: ${this.desc}`);
    const dueDate = el("div", {}, `Due Date: ${this.dueDate}`);
    // const priority = el("div", {}, `Priority: ${this.priority}`);

    return el("div", {}, [desc, dueDate]);
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
