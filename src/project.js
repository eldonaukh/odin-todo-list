import { el, createField } from "./utils.js";
import { Todo } from "./todo.js";

class projectManager {
  constructor() {
    this.projects = [];
  }

  add(project) {
    this.projects.push(project);
  }

  remove(id) {
    const rmIndex = this.projects.findIndex((item) => item.id === id);
    this.projects.splice(rmIndex, 1);
  }

  nextIndex() {
    return this.projects.length + 1;
  }

  render() {
    const projectForm = this.renderAddProject();
    const projectList = this.renderProjects();

    const toAppendChild = document.createDocumentFragment();
    toAppendChild.appendChild(projectForm);
    toAppendChild.appendChild(projectList);

    document.body.appendChild(toAppendChild);
  }

  renderProjects() {
    const projectsNode = document.querySelector(".projects-div")
      ? document.querySelector(".projects-div")
      : document.createElement("div");
    projectsNode.className = "projects-div";
    projectsNode.replaceChildren();
    projectsNode.appendChild(el("h2", {}, "Projects"));

    for (const project of this.projects) {
      const projectDiv = project.renderProject();
      projectsNode.appendChild(projectDiv);
    }

    return projectsNode;
  }

  renderAddProject() {
    const projectForm = el("form", { class: "add-project" }, [
      el("h2", {}, ["Add Project"]),
      createField("Project Name", { name: "projectName" }),
      el("button", { type: "submit" }, "Submit"),
    ]);

    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      const project = new Project(this.nextIndex(), data["projectName"], this);
      this.add(project);
      this.renderProjects();
    });

    return projectForm;
  }
}

class Project {
  constructor(id, name, projectManager) {
    this.id = id;
    this.name = name;
    this.projectManager = projectManager;
    this.tasks = [];
  }

  nextIndex() {
    return this.tasks.length + 1;
  }

  renderProject() {
    const projectInfo = el(
      "h3",
      {
        className: "project-div",
        id: `project-${this.id}`,
      },
      [`${this.projectManager.projects.indexOf(this) + 1}. ${this.name}`]
    );
    const rmBtn = el(
      "button",
      {
        onClick: () => {
          this.projectManager.remove(this.id);
          this.projectManager.renderProjects();
        },
      },
      "Remove"
    );

    const addTaskForm = this.renderAddTask();

    const addTaskBtn = el(
      "button",
      {
        onClick: (e) => {
          e.preventDefault();
          const dialog = document.querySelector(`.dialog-addTask`);
          dialog.show();
        },
      },
      "Add Task"
    );

    return el("div", {}, [projectInfo, addTaskForm, rmBtn, addTaskBtn]);
  }

  renderAddTask() {
    const cancelBtn = el(
      "button",
      {
        onClick: (e) => {
          e.preventDefault();
          const dialog = document.querySelector(`.dialog-addTask`);
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

          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());

          const task = new Todo(this.nextIndex(), this, ...data);
          this.tasks.push(task);
        },
      },
      "Submit"
    );

    const taskForm = el("form", { class: "add-task" }, [
      el("h3", {}, [`Add Todo item (${this.name})`]),
      createField("Title", { name: "taskTitle" }),
      createField("Description", { name: "taskDesc" }),
      createField("Due Date", { name: "taskDue", type: "date" }),
      createField("Priority", { name: "taskPriority", type: "number" }),
      cancelBtn,
      submitBtn,
    ]);

    // taskForm.addEventListener("submit", (e) => {
    //   e.preventDefault();

    //   const formData = new FormData(e.target);
    //   const data = Object.fromEntries(formData.entries());

    //   const task = new Todo(this.nextIndex(), this, ...data);
    //   this.tasks.push(task);
    // });

    return el("dialog", { class: `dialog-addTask` }, [taskForm]);
  }
}

export { projectManager, Project };
