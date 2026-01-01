import { el, createField } from "./utils.js";

class projectManager {
  constructor() {
    this._projects = [];
  }

  add(project) {
    this._projects.push(project);
  }

  remove(id) {
    const rmIndex = this._projects.findIndex((item) => item.id === id);
    this._projects.splice(rmIndex, 1);
  }

  list() {
    return this._projects;
  }

  nextIndex() {
    return this._projects.length + 1;
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

    for (const project of this._projects) {
      const projectInfo = el(
        "h3",
        {
          className: "project-div",
          id: `project-${project.id}`,
        },
        [`${this._projects.indexOf(project) + 1}. ${project.name}`]
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
}

export { projectManager, Project };
