import { createSlice } from "@reduxjs/toolkit";
import { useGetProfileMutation } from "./profileApiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../auth/authSlice";


const profileSlice = createSlice({
    name:'profile',
    initialState:{bio:null,name:null,picture:null},
    reducers:{
        setProfileData:(state,action)=>{
            const {bio,name} = action.payload
            state.bio = bio
            state.name = name
        },
        setProfilePicture:(state,action)=>{
            const {picture} = action.payload
            state.picture = picture
        }
    }
})

export const {
    setProfileData,
    setProfilePicture
} = profileSlice.actions

export const selectBio = state=>state.profile.bio
export const selectName = state=>state.profile.name
export const selectPicture = state=>state.profile.picture



export default profileSlice.reducer