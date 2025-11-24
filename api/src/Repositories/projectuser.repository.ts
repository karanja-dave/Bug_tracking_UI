import { getPool } from "../db/config";
import { NewMember } from "../Types/projectuser.types";


// get all users by id in a project based on project id 
export const getAllUsersInProject = async(projectid:number)=>{
  const pool = await getPool()
  const result = await pool.request()
  .input('projectid',projectid)
  .query('SELECT * FROM UserProject WHERE projectid=@projectid;')
  return result.recordset
}


// get a user in a project by user and project id 
export const getUserInProject = async (projectid: number, userid: number) => {
  const pool = await getPool();
  const result = await pool.request()
    .input("projectid", projectid)
    .input("userid", userid)
    .query("SELECT * FROM UserProject WHERE projectid=@projectid AND userid=@userid");
  
  return result.recordset[0];
};

// add members to a project 
export const addMember = async (member:NewMember) => {
  const pool = await getPool();
  const result = await pool.request()
    .input("projectid", member.projectid)
    .input("userid", member.userid)
    .input("role_in_project", member.role_in_project)
    .query(` INSERT INTO UserProject (projectid, userid, role_in_project) OUTPUT INSERTED.* 
      VALUES (@projectid, @userid, @role_in_project);`);
  return { message: 'User added to the project' };
};
