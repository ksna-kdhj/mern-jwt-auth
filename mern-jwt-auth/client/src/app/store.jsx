import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from '../features/auth/authSlice'
import toggleColorReducer from "../features/ToggleColorModeSlice";

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        toggleColor: toggleColorReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})