import { projectManager, Project } from "./project.js";

const data = localStorage.getItem("todoData");

if (data) {
  const projects = projectManager.fromJSON(data);
  projects.render();
} else {
  const projects = new projectManager();
  projects.render();
}

