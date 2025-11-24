import { error } from 'console';
import * as userProjectRepository from '../Repositories/projectuser.repository'
import { NewMember } from '../Types/projectuser.types'


// get all users in a project 
export const getAllUsersInProject = async(projectid:number)=>{
  if(isNaN(projectid)){
    throw new Error("Invalid Project Id")

  }

  const result = await userProjectRepository.getAllUsersInProject(projectid)
  if(!result){
    throw new Error("Project not found!")
  }
  return result
}

// add member to a project 
export const newMember = async (member: NewMember) => {
  const userExist = await userProjectRepository.getUserInProject(member.projectid, member.userid);

  if (userExist) {
    throw new Error("User already exist in the current project");
  }

  return await userProjectRepository.addMember(member);
};
