// import packages 
import { Request, Response } from "express";

// import modules 
import * as bugServices from '../services/bugs.services'
import { parse } from "path";

// get all bugs 
export const getAllBugs= async(req:Request,res:Response)=>{
  try {
    const bugs = await bugServices.getAllBugs()
    res.status(200).json({data:bugs})
  } catch (error:any) {
    res.status(500).json({error:error.message})
  }
}

// add new bug 
export const createBug=async(req:Request,res:Response)=>{
  try {
    const newtodo=req.body;
    const result=await bugServices.createBug(newtodo)
    res.status(201).json(result)
  } catch (error:any) {
    res.status(500).json({error:"Internal Server Error"})
  }
}

// get bug by id 
export const getBugById=async(req:Request,res:Response)=>{
  const id = parseInt(req.params.id)

  try {
    const bug= await bugServices.getBugById(id)
    res.status(200).json(bug)
  } catch (error:any) {
    if(error.message==="Invalid Bug Id"){
      res.status(400).json({message:error.message})
    }else if(error.message==="Bug not found"){
      res.status(404).json({message:error.message})
    }else{
      res.status(500).json(error.message)
    }
  }
}

// delete bug by Id 
export const deleteBugById= async(req:Request,res:Response)=>{
  const id = parseInt(req.params.id)
  try {
    const result = await bugServices.deleteTodoById(id)
    res.status(200).json(result)
  } catch (error:any) {
    if(error.message==="Invalid Bug Id"){
      res.status(400).json({message:error.message})
    }else if(error.message==="Bug not found"){
      res.status(404).json({message:error.message})
    }else{
      res.status(500).json({mesage:error.message})
    }
  }
}

// update bug by id 
export const updateBugById=async(req:Request,res:Response)=>{
  const id = parseInt(req.params.id);
  const bug = req.body

  try {
    const result = await bugServices.updateBugById(id,bug)
    res.status(200).json(result)
  } catch (error:any) {
    if(error.message==="Invalid Bug Id"){
      res.status(400).json({message:error.message})
    }else if(error.message==="Bug not found"){
      res.status(404).json({message:error.message})
    }else{
      res.status(500).json({error:error.message})
    }
  }
}