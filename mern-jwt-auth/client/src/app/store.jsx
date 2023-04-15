import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from '../features/auth/authSlice'
import toggleColorReducer from "../features/ToggleColorModeSlice";
import profileReducer from "../features/profile/profileSlice"
export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        profile: profileReducer,
        toggleColor: toggleColorReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})