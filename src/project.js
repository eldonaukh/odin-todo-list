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
    const projectForm = this.renderAddProjectForm();
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
      const projectInfo = el(
        "h3",
        {
          className: "project-div",
          id: `project-${project.id}`,
        },
        [`${this.projects.indexOf(project) + 1}. ${project.name}`]
      );
      const rmBtn = el(
        "button",
        {
          onClick: () => {
            this.remove(project.id);
            this.renderProjects();
          },
        },
        "Remove"
      );
      const projectDiv = el("div", {}, [projectInfo, rmBtn]);
      projectsNode.appendChild(projectDiv);
    }

    return projectsNode;
  }

  renderAddProjectForm() {
    const projectForm = el("form", { class: "add-project" }, [
      el("h2", {}, ["Add Project"]),
      createField("Project Name", { name: "projectName" }),
      el("button", { type: "submit" }, "Submit"),
    ]);

    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      const project = new Project(this.nextIndex(), data["projectName"]);
      this.add(project);
      this.renderProjects();
    });

    return projectForm;
  }
}

class Project {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.tasks = [];
  }

  nextIndex() {
    return this.tasks.length + 1;
  }

  renderAddTask() {
    const taskForm = el("form", { class: "add-task" }, [
      el("h3", {}, [`Add Todo item (${this.name})`]),
      createField("Title", { name: "taskTitle" }),
      createField("Description", { name: "taskDesc" }),
      createField("Due Date", { name: "taskDue", type: "date" }),
      createField("Priority", { name: "taskPriority", type: "number" }),
      el("button", { type: "submit" }, "Submit"),
    ]);

    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      const task = new Todo(this.nextIndex(), ...data);
      this.tasks.push(task);
    });

    return taskForm;
  }
}

export { projectManager, Project };
