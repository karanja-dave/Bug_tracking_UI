import { Express } from "express";
import * as projectController from "../controllers/project.controllers";
import { adminOrDeveloper,adminOnly,allRoles } from "../middleware/bearAuth";

const projectRoutes = (app: Express) => {
    app.get("/projects", projectController.getAllProjects);
    app.get("/projects/:id", projectController.getProjectById);
    app.post("/projects", allRoles,projectController.createNewProject);
    app.put("/projects/:id",adminOrDeveloper, projectController.updateProject);
    app.delete("/projects/:id", projectController.deleteProject);
    // get all projects with details 
    app.get('/projects-details',projectController.getAllProjectsWithDetails)
}
export default projectRoutes;
