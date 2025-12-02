import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ApiDomain } from "../../utils/ApiDomains"; //endpoint to hit backend


// define types for response on login 
export type TLoginResponse={
    message:string,
    token:string,
    user:{
        user_id:number,
        first_name:string,
        last_name:string,
        email:string,
        // phone_number:string,
        role_user:string
    }
}

// define types for info required for login 
type LogInputs={
    email:string,
    password:string
}

export const loginAPI = createApi({
    reducerPath:'loginAPI',
    baseQuery:fetchBaseQuery({baseUrl:ApiDomain}),
    tagTypes:['Login'],
    endpoints:(builder)=>({
        // define the login functionality here 
        loginUser:builder.mutation<TLoginResponse,LogInputs>({
            query:(loginData)=>({
                url:'/login',
                method:'POST',
                body:loginData
            }),
            invalidatesTags:['Login']
        })
    })
})