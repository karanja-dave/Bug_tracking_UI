import { getPool } from "../db/config";
import { Project, NewProject, UpdateProject } from "../Types/projects.types";


//get all projects
export const getAllProjects = async (): Promise<Project[]> => {
    try{
        const pool = await getPool();
        const result = await pool.request().query(`SELECT * FROM Projects`);
        return result.recordset;
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw new Error("Database query failed");
    }    
}

// get all projects with their details 
export const getAllProjectsWithDetails = async () => {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT
      p.projectid AS id,
      p.title,
      p.description,
      p.status,
      p.created_by,
      p.created_at,
      p.updated_at,
      -- Users for this project
      (
        SELECT 
          u.userid AS id,
          u.first_name + ' ' + u.last_name AS name,
          u.role_user,
          u.email,
          u.is_active,
          u.is_verified,
          up.role_in_project
        FROM UserProject up
        JOIN Users u ON up.userid = u.userid
        WHERE up.projectid = p.projectid
        FOR JSON PATH
      ) AS users,
      -- Tasks for this project
      (
        SELECT 
          t.taskid,
          t.title AS task_title,
          t.description,
          t.priority,
          t.status,
          t.due_date,
          t.created_at,
          t.updated_at,
          t.projectid,
          cb.first_name + ' ' + cb.last_name AS created_by_name,
          au.first_name + ' ' + au.last_name AS assigned_to_name
        FROM Tasks t
        LEFT JOIN Users cb ON t.created_by = cb.userid
        LEFT JOIN Users au ON t.assigned_to = au.userid
        WHERE t.projectid = p.projectid  -- correlated to outer project
        FOR JSON PATH
      ) AS tasks,
      -- Bugs for this project
      (
        SELECT 
          b.bugid,
          b.title,
          b.description,
          b.severity,
          b.status,
          b.created_at,
          b.updated_at,
          rb.first_name + ' ' + rb.last_name AS reporter_name,
          au.first_name + ' ' + au.last_name AS assignee_name
        FROM Bugs b
        LEFT JOIN Users rb ON b.reported_by = rb.userid
        LEFT JOIN Users au ON b.assigned_to = au.userid
        WHERE b.projectid = p.projectid  -- correlated to outer project
        FOR JSON PATH
      ) AS bugs
    FROM Projects p
    WHERE p.status != 'archived'
    ORDER BY p.title
  `);

  return result.recordset.map(project => ({
    ...project,
    users: project.users ? JSON.parse(project.users) : [],
    tasks: project.tasks ? JSON.parse(project.tasks) : [],
    bugs: project.bugs ? JSON.parse(project.bugs) : [],
  }));
};





//get project by id 
export const getProjectById = async (id: number): Promise<Project> => {
    try{
        const pool = await getPool();
        const result = await pool
            .request()
            .input('id', id)
            .query(` SELECT *FROM Projects WHERE projectid = @id`);
        return result.recordset[0];
    } catch (error) {
        console.error("Error fetching project by id:", error);
        throw new Error("Database query by project id failed");
    }
} 

// Fetch a project by its title.
export const getProjectByTitle = async (title: string): Promise<Project | null> => {
    try {
        const pool = await getPool();
        const result = await pool
            .request()
            .input("title", title)
            .query(`SELECT *FROM Projects WHERE title = @title`);
            
        return result.recordset[0] || null;
    } catch (error) {
        console.error("Error fetching project by title:", error);
        throw new Error("Database query by title failed");
    }
};

// create new project
export const createNewProject = async (
  project: NewProject
): Promise<{ message: string; project: Project }> => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("title", project.title)
    .input("description", project.description)
    .input("created_by", project.created_by)
    .input("created_at", project.created_at)
    .query(
      `INSERT INTO Projects (title, description, created_by, created_at)  
       OUTPUT INSERTED.* 
       VALUES (@title, @description, @created_by, @created_at)`
    );

  return {
    message: "Project created successfully",
    project: result.recordset[0],
  };
};




//update a Project
export const updateProject = async (id: number, project: UpdateProject) => {
  const pool = await getPool();
  const request = pool.request();

  const fields = Object.entries(project)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      request.input(key, value);
      return `${key} = @${key}`;
    });

  request.input("id", id);

  const query = `UPDATE Projects SET ${fields.join(", ")} OUTPUT INSERTED.* WHERE projectid = @id`;

  const result = await request.query(query);
  return result.recordset;
};


//Delete project
export const deleteProject = async (id: number) => {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('id', id)
        .query('DELETE FROM Projects OUTPUT DELETED.* WHERE projectid = @id');
    return { 
        message: 'Project deleted successfully',
        project: result.recordset[0] || null
     };
}
