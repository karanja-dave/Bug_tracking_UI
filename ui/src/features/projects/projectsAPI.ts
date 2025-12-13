import { ApiDomain } from "../../utils/ApiDomains";
import type { RootState } from "../../app/store";
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TypeBug } from "../bugs/bugsAPI";
import type { TypeTask } from "../task/taskAPI";

export type TypeProject={
    projectid: number;
    title:string;
    description: string;
    status: string;
    created_by: number;
    created_at: string;
    updated_at: string ;
    message:string;
    due_date:string
}

export type TProjectWithDetails = {
    id: number;
    title: string;
    description: string;
    status: string;
    users: {
        id: number;
        name: string;
        role: string;
        email:string;
    }[];
    tasks: TypeTask[];
    bugs: TypeBug[];
};


export const projectAPI=createApi({
    reducerPath:'projectsAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:ApiDomain,
        // prepare headers 
        prepareHeaders:(headers,{getState})=>{
            const token = (getState() as RootState).user.token;
            if (token){
                headers.set('Authorization', `Bearer ${token}`)
            }
            headers.set('Content-Type','application/json');
            return headers
        }
    }),
    tagTypes:['Projects'],
    endpoints:(builder)=>({
        
        // create project 
        createProject: builder.mutation<TypeProject,Partial<TypeProject>>({
            query:(newProject)=>({
                url:'projects',
                method:'POST',
                body:newProject
            }),
            invalidatesTags:['Projects']
        }),

        // get all projects
        getProjects: builder.query<{data:TypeProject[]},void>({
            query:()=>'/projects',
            providesTags:['Projects']
        }),

        // get all projects with their users
        getProjectsWithDetails: builder.query<{data:TProjectWithDetails[]}, void>({
            query: () => '/projects-details', // the new backend endpoint
            providesTags: ['Projects'],
        }),

        // delete project 
        deleteProject: builder.mutation<{success:boolean,id:number},number>({
            query:(id)=>({
                url:`/projects/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:['Projects']
        }),
        // update project
        updateProject:builder.mutation<TypeProject,Partial<TypeProject>&{projectid:number}>({
            query:(updatedProject)=>({
                url:`/projects/${updatedProject.projectid}`,
                method:'PUT',
                body:updatedProject
            }),
            invalidatesTags:['Projects']
        })
    })
})