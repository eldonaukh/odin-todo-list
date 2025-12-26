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
}

class Project {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export { projectManager, Project };
