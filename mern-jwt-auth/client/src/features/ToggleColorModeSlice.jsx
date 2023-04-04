import {createSlice } from "@reduxjs/toolkit";

const initstate = JSON.parse(localStorage.getItem('colormode'))?JSON.parse(localStorage.getItem('colormode')):'light'
export const toggleColorModeSlice = createSlice({
    name: 'toggleColor',
    initialState: {mode:initstate},
    reducers:{
      toggle: (state,action)=>{
        state.mode = state.mode=='light'?'dark':'light'
      }
    }
})

export const{
  toggle
} = toggleColorModeSlice.actions
export const selectColorMode = (state) => state.toggleColor.mode
export default toggleColorModeSlice.reducer

