import { createSlice } from "@reduxjs/toolkit";

// define types 
export type UserState={
    token:string|null;
    user:{
        user_id:number;
        FN:string;
        LN:string;
        email:string;
        PN:string
        role:string
    }|null; //user state is null before login and on logout
}

// define  initial state - its the same state on logout 
const initialState: UserState = {
    token:null,
    user:null
}

const userSlice=createSlice({
    name:'user', //name of the slice that will be used to refit in the store
    initialState,
    reducers:{
        loginSuccess:(state,action)=>{
            state.token=action.payload.token //token provided on successfull login
            state.user=action.payload.user //user data provided on successful login
        },
        logOut:(state)=>{
            state.token=null;
            state.user=null;
        }
    }
})


export const {loginSuccess,logOut}=userSlice.actions


export default userSlice.reducer