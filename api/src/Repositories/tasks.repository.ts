import { getPool } from "../db/config";
import { NewTask, Tasks, UpdateTask } from "../Types/tasks.types";

// get all tasks
export const getAllTasks = async (): Promise<Tasks[]> => {
  const pool = await getPool();

  const query = `
    SELECT
      -- Task (main entity)
      t.taskid,
      t.title AS task_title,
      t.description,
      t.priority,
      t.status,
      t.due_date,
      t.created_at,
      t.updated_at,

      -- Project
      t.projectid,
      p.title AS project_title,

      -- Created by
      t.created_by AS created_by_id,
      CONCAT(cu.first_name, ' ', cu.last_name) AS created_by_name,

      -- Assigned to
      t.assigned_to AS assigned_to_id,
      CONCAT(au.first_name, ' ', au.last_name) AS assigned_to_name

    FROM Tasks t
    LEFT JOIN Projects p ON t.projectid = p.projectid
    LEFT JOIN Users cu ON t.created_by = cu.userid
    LEFT JOIN Users au ON t.assigned_to = au.userid
    ORDER BY t.due_date ASC;
  `;

  const result = await pool.request().query(query);
  return result.recordset;
};


// create new task 
export const createTask = async(newTask:NewTask)=>{
    const pool = await getPool();
    await pool
        .request()
        .input('title',newTask.title)
        .input('projectid',newTask.projectid)
        .input('created_by',newTask.created_by)
        .input('assigned_to',newTask.assigned_to)
        .input('description',newTask.description)
        .input('priority',newTask.priority)
        .input("status",newTask.status)
        .input('due_date',newTask.due_date)
        .query('INSERT INTO Tasks (title,projectid,created_by,assigned_to,description,priority,status,due_date) VALUES(@title,@projectid,@created_by,@assigned_to,@description,@priority,@status,@due_date)')
        return{message:"Task Created Successfully"}


}

// get task by Id 
export const getTaskById = async(id:number):Promise<Tasks>=>{
    const pool = await getPool()
    const result=await pool
    .request()
    .input('id',id)
    .query("SELECT *FROM Tasks WHERE taskid=@id")
    return result.recordset[0]
}

// delete task  by Id 
export const deleteTaskById =async(id:number)=>{
    const pool = await getPool();
    await pool
    .request()
    .input('id',id)
    .query('DELETE FROM Tasks WHERE taskid=@id')
    return{message:"Task deleted Sucessfully"}
}

// update task by Id 
export const updateTaskById = async (id: number, task: UpdateTask) => {
  const pool = await getPool();

  await pool
    .request()
    .input('id', id)
    .input('projectid', task.projectid)
    .input('created_by', task.created_by)
    .input('assigned_to', task.assigned_to || null) // handle unassigned
    .input('title', task.title)
    .input('description', task.description)
    .input('priority', task.priority)
    .input('status', task.status)
    .input('due_date', task.due_date)
    .query(`
      UPDATE Tasks
      SET
        projectid = @projectid,
        created_by = @created_by,
        assigned_to = @assigned_to,
        title = @title,
        description = @description,
        priority = @priority,
        status = @status,
        due_date = @due_date,
        updated_at = GETDATE()
      WHERE taskid = @id
    `);

  return { message: "Task updated successfully" };
};