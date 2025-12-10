// import packages 
import { Express } from "express";

// import modules 
import * as bugController from '../controllers/bugs.controller'

const bugsRoutes=(app:Express)=>{
    // get all bugs 
    app.get('/bugs',bugController.getAllBugs)
    // add new bug 
    app.post('/bugs',bugController.createBug)
    // get bug by id 
    app.get('/bugs/:id',bugController.getBugById)
    // delete bug by id 
    app.delete('/bugs/:id',bugController.deleteBugById)
    // update bug by id 
    app.put('/bugs/:id',bugController.updateBugById)
}

export default bugsRoutes