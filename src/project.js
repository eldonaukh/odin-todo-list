import { el, createField } from "./utils.js";

class projectManager {
  constructor() {
    this._projects = [];
  }

  add(project) {
    this._projects.push(project);
  }

  remove(index) {
    this._projects.splice(index, 1);
  }

  list() {
    return this._projects;
  }

  nextIndex() {
    return this._projects.length;
  }

  renderProjects() {
    const projectsNode = document.createElement("div");

    for (const project of this._projects) {
      const projectNode = document.createElement("div");
      projectNode.textContent = `${project.id}. ${project.name}`;
      projectsNode.body.appendChild(projectNode);
    }

    return projectsNode;
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
