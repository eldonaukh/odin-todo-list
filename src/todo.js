import { el } from "./utils.js";

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
    const infoDIv = el("div", {}, [
      el("h4", {}, `${this.project.tasks.indexOf(this) + 1}. ${this.title}`),
    ]);
    return infoDIv;
  }
}

export { Todo };
