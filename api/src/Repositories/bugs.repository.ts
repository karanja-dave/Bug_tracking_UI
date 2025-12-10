// import modules 
import { getPool } from "../db/config";
import { Bug, NewBug, UpdateBug } from "../Types/bugs.types";

// get all bugs 
export const getAllBugs = async():Promise<Bug[]>=>{
  const pool= await getPool()
  const results = await pool.request().query('SELECT *FROM Bugs')
  return results.recordset
}

// add new bugs 
export const createBug = async (newBug: NewBug) => {
    const pool = await getPool(); // connect to DB

    await pool
        .request() // create a new SQL request
        .input('projectid', newBug.projectid)
        .input('reported_by', newBug.reported_by)
        .input('assigned_to', newBug.assigned_to ?? null) // optional
        .input('title', newBug.title)
        .input('description', newBug.description ?? null)
        .input('severity', newBug.severity)
        .input('status', newBug.status)
        .query(`
            INSERT INTO Bugs 
                (projectid, reported_by, assigned_to, title, description, severity, status)
            VALUES 
                (@projectid, @reported_by, @assigned_to, @title, @description, @severity, @status)
        `);

    return { message: "Bug created successfully" };
};

// get bugs by Id 
export const getBugById=async(id:number):Promise<Bug>=>{
  const pool = await getPool()
  const result = await pool
  .request()
  .input('id',id)
  .query('SELECT *FROM Bugs WHERE bugid=@id')
  return result.recordset[0]
}

// delete bug 
export const deleteBug=async(id:number)=>{
  const pool = await getPool()
  await pool
  .request()
  .input('id',id)
  .query('DELETE FROM Bugs WHERE bugid=@id')
  return('Bug deleted successfully')
}

// update bug by id 
export const updateBugById=async(id:number,bug:UpdateBug)=>{
  const pool = await getPool()
  await pool
  .request()
  .input('id',id)
  .input('title',bug.title)
  .input('projectid',bug.projectid)
  .input('reported_by',bug.reported_by)
  .input('assigned_to',bug.assigned_to)
  .input('description',bug.description)
  .input('severity', bug.severity)
  .input('status',bug.status)
  .input('updated_at',bug.updated_at)
  .query('UPDATE Bugs SET projectid = @projectid, reported_by = @reported_by, assigned_to = @assigned_to, title = @title, description = @description, severity = @severity, status = @status, updated_at = @updated_at WHERE bugid = @id');
  return{message:"Bug update successfully"}

}
