import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState: {user:null,token:null},
    reducers:{
        setCredentials: (state,action)=>{
            const {user,accessToken} = action.payload
            state.user = user
            state.token = accessToken
        },
        clearCredentials: (state)=>{
            console.log('here')
            state.user = null 
            state.token = null
        }
    },
})

export const{
    setCredentials,
    clearCredentials
} = authSlice.actions

export const selectUser = state => state.auth.user
export const selectToken = state => state.auth.token

export default authSlice.reducer