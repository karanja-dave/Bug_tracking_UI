// configure the store 

import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/es/storage";
import { userApi } from "../features/auth/UserAPI"
import { persistReducer, persistStore } from "redux-persist"
import { loginAPI } from "../features/auth/loginAPI";
import userSlice from "../features/auth/userSlice"
import { taskAPI } from "../features/task/taskAPI";
import { bugAPI } from "../features/bugs/bugsAPI";
import { projectAPI } from "../features/projects/projectsAPI";


const persistConfig ={
    key:'root', //label used to identify and update a store default is root
    version:1,
    storage,
    whitelist:['user']
}

// combine all reducers into 1 route 
const rootReducer = combineReducers({
    [userApi.reducerPath]:userApi.reducer,
    [loginAPI.reducerPath]:loginAPI.reducer,
    [taskAPI.reducerPath]:taskAPI.reducer,
    [bugAPI.reducerPath]:bugAPI.reducer,
    [projectAPI.reducerPath]:projectAPI.reducer,
    user:userSlice
})


export const persistedReducers = persistReducer(persistConfig,rootReducer)


export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
         serializableCheck:false
    })
    // concat userApi 
    .concat(userApi.middleware)
    // concat loginAPI 
    .concat(loginAPI.middleware)
    // concat taskAPI 
    .concat(taskAPI.middleware)
    // concat bugAPI
    .concat(bugAPI.middleware)
    // concat projectAPI
    .concat(projectAPI.middleware)
    //concat other middlewares below
 })

 export const persistedStore = persistStore(store)
 export type RootState = ReturnType<typeof store.getState>