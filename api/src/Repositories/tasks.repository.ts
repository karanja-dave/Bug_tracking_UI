import { getPool } from "../db/config";
import { NewTask, Tasks, UpdateTask } from "../Types/tasks.types";

// get all tasks
export const getAllTasks = async():Promise<Tasks[]>=>{
    const pool = await getPool()
    const results = await pool.request().query('SELECT *FROM Tasks')
    return results.recordset
}

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
  const request = pool.request();

  // prepare the inputs dynamically
  const fields = Object.entries(task)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      request.input(key, value);
      return `${key} = @${key}`;
    });

  if (fields.length === 0) throw new Error('No fields to update');

  request.input('id', id);

  const query = `UPDATE Tasks SET ${fields.join(', ')} WHERE taskid = @id`;
  await request.query(query);

  return { message: 'Task updated successfully' };
};
