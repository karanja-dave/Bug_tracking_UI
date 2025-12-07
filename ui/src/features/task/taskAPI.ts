import { ApiDomain } from "../../utils/ApiDomains";
import type { RootState } from "../../app/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TypeTask={
    message:string,
    taskid:number
    projectid: number;
    created_by: number;
    assigned_to: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    due_date: string; 
}


export const taskAPI = createApi({
    reducerPath:'tasksAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:ApiDomain,
        // prepare Headers(for tokes to be used in authoriartion)
        prepareHeaders:(headers,{getState})=>{
            const token = (getState() as RootState).user.token
            if(token){
                headers.set('Authorization', `Bearer ${token}`)
            }
            headers.set('Content-Type','application/json');
            return headers
        }
    }),
    tagTypes:['Tasks'],
    endpoints:(builder)=>({

        // // create tasks 
        // createTask:builder.mutation<TypeTask,Partial<TypeTask>>({
        //     query:(newTask)=>({
        //         url:'/tasks',
        //         method:'POST',
        //         body:(newTask)
        //     }),
        //     invalidatesTags:['Tasks']
        // }),

        // get all tasks 
        getTasks:builder.query<{data:TypeTask[]},void>({
            query:()=>'/tasks',
            providesTags:['Tasks']
        }),

        // delete tasks 
        // deleteTask:builder.mutation<{success:boolean,id:number},number>({
        //     query:(id)=>({
        //         url:`/tasks/${id}`,
        //         method:'DELETE'
        //     }),
        //     invalidatesTags:['Tasks']
        // }),

        // update tasks
        // updateTask:builder.mutation<TypeTask,Partial<TypeTask>&{id:number}>({
        //     query:(updatedTask)=>({
        //         url:`/tasks/${updatedTask.id}`,
        //         method:'PUT',
        //         body:updatedTask
        //     }),
        //     invalidatesTags:['Tasks']
        // })
    })   
})
