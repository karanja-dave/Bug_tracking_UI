export interface Tasks{
    taskid:number;
    projectid: number;
    created_by: number;
    assigned_to: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    due_date: Date;  
}

export interface NewTask{
    projectid: number;
    created_by: number;
    assigned_to: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    due_date: Date;
}

export type UpdateTask = {
  projectid?: number;
  created_by?: number;
  title?: string;
  description?: string;
  assigned_to?: number;
  priority?: string;
  status?: string;
  due_date?:  Date;
};