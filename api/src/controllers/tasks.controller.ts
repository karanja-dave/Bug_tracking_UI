// import packages 
import { Request, Response } from "express";

// import modules 
import * as tasksServices from '../services/tasks.service'
import { error } from "console";
import { asyncWrapProviders } from "async_hooks";

// get all tasks 
export const getAllTasks = async(req:Request,res:Response)=>{
    try {
        const tasks = await tasksServices.getAllTasks()
        res.status(200).json({data:tasks})
    } catch(error){
        res.status(500).json({error:"Internal Server Error"})
    }
}

// create new task 
export const createTask = async(req:Request,res:Response)=>{
    try {
        const newtask = req.body;
        const result = await tasksServices.createTask(newtask)
        res.status(201).json(result)
    } catch (error:any) {
        res.status(500).json({error:"Internal Server Error!"})
    }
}

// get task by id 
export const getTaskById= async(req:Request,res:Response)=>{
    const id = parseInt(req.params.id)
    try {
        const task = await tasksServices.getTaskById(id)
        res.status(200).json(task)
    } catch (error:any) {
        if(error.message==="Invalid Task ID"){
            res.status(400).json({error:error.message})
        }else if (error.message==="Task not found"){
            res.status(404).json({error:error.message})
        }else{
            res.status(500).json({error:"Internal Server Error"})
        }
    }
}

// delete task by id 
export const deleteTaskById =async(req:Request,res:Response)=>{
    const id = parseInt(req.params.id)

    try {
        const result= await tasksServices.deleteTaskById(id) 
        res.status(200).json(result)
    } catch (error:any) {
        if(error.message=="Invalid Task Id"){
            res.status(400).json({message:'Invalid Taskid'})
        }else if(error.message=='Task not found'){
            res.status(404).json({message:'Task not found'})
        }else{
            res.status(500).json({error:"Internal Server Error"})
        }
    }
}

// update task by id 
export const updateTaskById =async(req:Request,res:Response) =>{
    const id = parseInt(req.params.id);
    const task =req.body  
    try {
        const result = await tasksServices.updateTaskById(id, task)
        res.status(200).json(result)
    } catch (error:any) {
        if(error.message=="Invalid Task Id"){
            res.status(400).json({message:'Invalid Task Id'})
        }else if(error.message=='Task not found'){
            res.status(404).json({message:'Task not found'})
        }else{
            res.status(500).json({error:error.message})
        }
        
    }
}