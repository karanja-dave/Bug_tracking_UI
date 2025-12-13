import { ApiDomain } from "../../utils/ApiDomains";
import type { RootState } from "../../app/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TypeBug = {
    bugid: number;
    projectid: number;
    project_title:string;
    reported_by: number;
    reporter_name:string;
    assigned_to: number;
    assignee_name:string;
    title: string;
    description: string;
    severity: string;
    status: string;
    created_at: string;
    updated_at: string;
    message: string; // optional, e.g., "Bug created successfully"
};

export const bugAPI = createApi({
    reducerPath: 'bugsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        
        // prepare headers(for tokesn to be used in authoriation )
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    tagTypes: ['Bugs'],
    endpoints: (builder) => ({

        // Create bug
        createBug: builder.mutation<TypeBug, Partial<TypeBug>>({
            query: (newBug) => ({
                url: '/bugs',
                method: 'POST',
                body: newBug
            }),
            invalidatesTags: ['Bugs']
        }),

        // Get all bugs
        getBugs: builder.query<{ data: TypeBug[] }, void>({
            query: () => '/bugs',
            providesTags: ['Bugs']
        }),

        // Delete bug
        deleteBug: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/bugs/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Bugs']
        }),

        // Update bug
        updateBug: builder.mutation<TypeBug, Partial<TypeBug> & { bugid: number }>({
            query: (updatedBug) => ({
                url: `/bugs/${updatedBug.bugid}`,
                method: 'PUT',
                body: updatedBug
            }),
            invalidatesTags: ['Bugs']
        })
    })
});
