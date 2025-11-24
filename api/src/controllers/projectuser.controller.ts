// import packages 
import { Request,Response } from "express";

// import modules 
import * as userProjectService from '../services/projectuser.service'


// get all users in a project 
export const getAllUsersInProject = async(req:Request,res:Response)=>{
    const projectid = parseInt(req.params.projid)
    try {
        const result = await userProjectService.getAllUsersInProject(projectid)
        res.status(200).json(result)
    } catch (error:any) {
        if(error.message==='Invalid Project Id'){
            res.status(400).json({message:error.message})
        }
        if(error.message==="Project not found"){
            res.status(404).json({message:error.message})
        }else{
            res.status(500).json({error:error.message})
        }
        
        
    }
}

// add members to a project 
export const newMember = async(req:Request,res:Response)=>{
    const member = req.body
    try {
        const result = await userProjectService.newMember(member)
        res.status(200).json({message:"Member Added to Project"})
    } catch (error:any) {
        if(error.message==='User already exist in the current project'){
            res.status(400).json({message:error.message})
        }else{
            res.status(500).json({error:error.message})
            console.log(error.message)
        }
        
    }
}