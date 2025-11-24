// configure the store 

import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/es/storage";
import { userApi } from "../features/auth/UserAPI"
import { persistReducer, persistStore } from "redux-persist"


const persistConfig ={
    key:'root', //label used to identify and update a store default is root
    version:1,
    storage
}

// combine all reducers into 1 route 
const rootReducer = combineReducers({
    [userApi.reducerPath]:userApi.reducer
})


export const persistedReducers = persistReducer(persistConfig,rootReducer)


export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
         serializableCheck:false
    })
    .concat(userApi.middleware)
    //concat other middlewares below
 })

 export const persistedStore = persistStore(store)
 export type RootState = ReturnType<typeof store.getState>