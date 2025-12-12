// import modules 
import { getPool } from "../db/config";
import { Bug, NewBug, UpdateBug } from "../Types/bugs.types";

export const getAllBugs = async (): Promise<Bug[]> => {
  const pool = await getPool();

  const result = await pool.request().query(`
    SELECT 
      b.bugid,
      b.projectid,
      p.title AS project_title,
      p.description AS project_description,
      b.reported_by,
      r.first_name + ' ' + r.last_name AS reporter_name,
      b.assigned_to,
      a.first_name + ' ' + a.last_name AS assignee_name,
      b.title,
      b.description,
      b.severity,
      b.status,
      b.created_at,
      b.updated_at
    FROM Bugs b
    LEFT JOIN Projects p ON b.projectid = p.projectid
    LEFT JOIN Users r ON b.reported_by = r.userid
    LEFT JOIN Users a ON b.assigned_to = a.userid
    ORDER BY b.created_at DESC;
  `);

  return result.recordset;
};

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
