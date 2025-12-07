// import modules 
import * as tasksRepositories from '../Repositories/tasks.repository'
import { NewTask, UpdateTask } from '../Types/tasks.types'


// get all tasks 
export const getAllTasks= async()=> await tasksRepositories.getAllTasks()

// create new task 
export const createTask = async(newtask:NewTask)=>await tasksRepositories.createTask(newtask)

// get task by Id 
export const getTaskById = async(id:number)=>{
    // handle bad requests 
    if(isNaN(id)){
        throw new Error("Invalid Task ID")
    }
    const existingtask = await tasksRepositories.getTaskById(id)
    if(!existingtask){
        throw new Error("Task not found")
    }
    return existingtask
}

// delete task by id 
export const deleteTaskById = async(id:number)=> {
    // handle bad requests 
    if (isNaN(id)){
        throw new Error('Invalid Task Id')
    }
    const existingtask = await tasksRepositories.getTaskById(id)
    if(!existingtask){
        throw new Error('Task not found')
    }
    return await tasksRepositories.deleteTaskById(id);
}

// update task by id 
export const updateTaskById=async(id:number,task:UpdateTask)=>{
    // handle bad requests
    if(isNaN(id)){
        throw new Error("Invalid Task Id")
    }
    const existingtask=await tasksRepositories.getTaskById(id)
    if(!existingtask){
        throw new Error("Task not found")
    }
    return await tasksRepositories.updateTaskById(id,task)
}