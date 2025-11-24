import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


import { ApiDomain } from"../../utils/ApiDomains"; //endpoint to hit backend

// define user types for ading new users 
export type TUser={
    userid:number,
    first_names:string,
    last_name:string,
    email:string,
    phone_number:string,
    password:string,
    role:string

}

// create a new user 

// fun perfroms all CRUD ops for users 
export const userApi= createApi({   //setsup api endpoints for user managment ie creating&cerifying users
    reducerPath:"usersAPI", //key in e store where API state is stored: name of API in store
    baseQuery: fetchBaseQuery({ //where we config endpoints
        baseUrl:ApiDomain,
    }),
    tagTypes:['Users'], //used to invalidate items that relates to user
    endpoints:(builder)=>({//builder is a fun that helps define endpoint in an API
        createUsers:builder.mutation<TUser,Partial<TUser>>({ //mutation means your perfoming data changes in your DB

            query:(newUser)=>({
                url:"/users",
                method:'POST',
                body:newUser
            }),
            invalidatesTags:['Users'] //Invalidates the cache for users tag when a new user is created
        }) ,
        // fetch users 
        // update users 
    })
})


