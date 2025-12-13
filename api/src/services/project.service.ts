
import { getAuthUser } from '../middleware/bearAuth';
import * as projectRepositories from '../Repositories/projects.repository';
import { Project, NewProject, UpdateProject } from '../Types/projects.types';
import * as userProjectRepository from '../Repositories/projectuser.repository'

//get all projects 
export const listProjects = async (): Promise<Project[]> => {
    return await projectRepositories.getAllProjects();
};

// get all projects with their users 
export const getAllProjectsWithDetails=async()=>{

  const projects= await projectRepositories.getAllProjectsWithDetails();

  return projects
}

export const getProject = async (id: number): Promise<Project> => {
  //  handle bad request 
    if (isNaN(id)) {
        throw new Error ("Invalid projectid")
    }

    const existingproject = await projectRepositories.getProjectById(id);
    if (!existingproject) {
        throw new Error("Project not found")
    }
    return existingproject;

}


// add a project :refactor this code, it works only when one is logged in
export const createNewProject = async (project: NewProject, authUser: any) => {
  // Validate required fields before any DB work
  if (!project || !project.title) {
    throw new Error("Project title is required");
  }

  // Determine created_by from authenticated user
  const createdBy = authUser && (authUser.userid ?? authUser.userId ?? authUser.sub);
  if (!createdBy || isNaN(createdBy)) {
    throw new Error("Invalid User Id");
  }

  // Build the project payload to insert
  const projectToCreate: NewProject = {
    ...project,
    created_by: createdBy,
    created_at: project.created_at ?? new Date(),
  };

  // await service 
  const result = await projectRepositories.createNewProject(projectToCreate);
  const createdProject = result.project;

  // add creator as lead
  await userProjectRepository.addMember({
    projectid: createdProject.projectid,
    userid: createdBy,
    role_in_project: "lead",
  });

  // add other members of the project 
  if (project.members && project.members.length > 0) {
    for (const member of project.members) {
      await userProjectRepository.addMember({
        projectid: createdProject.projectid,
        userid: member.userid,
        role_in_project: member.role,
      });
    }
  }

  return {
    message: result.message,
    project: result.project,
  };
};



export const deleteProject = async (id: number) => {
    //handle bad requests 
    if (isNaN(id)) {
        throw new Error('Inavlid userid')
    }
    // check if project exists 
    const existingproject = await projectRepositories.getProjectById(id);
    if (!existingproject) {
        throw new Error ('Project not found')
    }
    const result = await projectRepositories.deleteProject(id);
    // return success message and project record deleted 
    return {
    message: result.message,
    project: result.project,
}
}



// update project by id 
export const updateProject = async (id: number, projectData: UpdateProject, authUser:any) => {
  //handle bad requests 
  if (isNaN(id)) {
    throw new Error("Invalid project ID");
  }

  //check that data to update was provided
  if (!projectData || Object.keys(projectData).length === 0) {
    throw new Error("No data provided for update");
  }

  //confirm the project exists before updating
  const existingProject = await projectRepositories.getProjectById(id);
  if (!existingProject) {
    throw new Error("Project not found");
  }
  // authoriation logic 
   // Only admin or project lead can update the project
  const isLead = existingProject.created_by === authUser.userid;
  const isAdmin = authUser.role === "admin";

  if (!isAdmin && !isLead) {
    throw new Error("Unauthorized");
  }
  //ask repo to perform the actual Db update
  const updatedProject = await projectRepositories.updateProject(id, projectData);

  // handle any failed updates
  if (!updatedProject || updatedProject.length === 0) {
    throw new Error("Failed to update project");
  }

  //return a success message and the updated record
  return {
    message: "Project updated successfully",
    project: updatedProject[0],
  };
};