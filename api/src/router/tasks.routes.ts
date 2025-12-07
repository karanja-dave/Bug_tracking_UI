// import packages 
import { Express } from "express";

// import modules 
import * as tasksController from '../controllers/tasks.controller'


// define function for all tasks routes 
const taskRoutes=(app:Express)=>{
    // get all tasks 
    app.get('/tasks',tasksController.getAllTasks)
    // create new task 
    app.post('/tasks',tasksController.createTask)
    // get task by id 
    app.get('/tasks/:id',tasksController.getTaskById) 
    // delete task by id 
    app.delete('/tasks/:id',tasksController.deleteTaskById)
    // update task by Id 
    app.patch('/tasks/:id',tasksController.updateTaskById)
}

export default taskRoutes