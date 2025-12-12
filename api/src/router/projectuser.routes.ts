// import packages 
import { Express } from "express";
// import modules 
import * as userProjectControllers from '../controllers/projectuser.controller'

// define routes function 
const userProjectRoutes = async(app:Express)=>{
    // add users to a project
    app.post('/projects/members',userProjectControllers.newMember)
    // get all users in a project 
    app.get('/projects/members/:projid', userProjectControllers.getAllUsersInProject);

}

export default userProjectRoutes