// import modules 
import * as bugsRepositories from '../Repositories/bugs.repository'
import { NewBug, UpdateBug } from '../Types/bugs.types'

// get all bugs 
export const getAllBugs=async()=> await bugsRepositories.getAllBugs()

// add new bug 
export const createBug=async(newbug:NewBug)=>await bugsRepositories.createBug(newbug)

// get bug by id 
export const getBugById=async(id:number)=>{
  // handle bad requests
  if(isNaN(id)){
    throw new Error('Invalid Bug Id')
  }
  const existingbug=await bugsRepositories.getBugById(id)
  if(!existingbug){
    throw new Error("Bug not found")
  }
  return existingbug;
}

// delete todo by id 
export const deleteTodoById=async(id:number)=>{
  // handle bad requests 
  if(isNaN(id)){
    throw new Error("Invalid Bug Id")
  }
  const existingbug=await bugsRepositories.getBugById
  if(!existingbug){
    throw new Error("Bug not found")
  }
  return await bugsRepositories.deleteBug(id)
}

// update bug by Id 
export const updateBugById=async(id:number,bug:UpdateBug)=>{
  // handle bad requests 
  if(isNaN(id)){
    throw new Error('Invalid Bug Id')
  }
  const existingbug=await bugsRepositories.getBugById(id)
  if(!existingbug){
    throw new Error('Bug not found')
  }
  return await bugsRepositories.updateBugById(id,bug)
}