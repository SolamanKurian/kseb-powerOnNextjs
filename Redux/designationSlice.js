'use client'
import { createSlice } from "@reduxjs/toolkit";
let designationSlice=createSlice({
    name:'designations',
    initialState:{
        desigs:[]
    },
    reducers:{
        setDesignations: (state, action) => {
            state.desigs = action.payload;
          },
          addDesignation: (state, action) => {
            state.desigs.unshift(action.payload);
          },
          removeDesignation: (state, action) => {
            state.desigs = state.desigs.filter(designation => designation.id !== action.payload.id);
          }
    }
})
export let{setDesignations,addDesignation,removeDesignation}=designationSlice.actions;
export default designationSlice.reducer;