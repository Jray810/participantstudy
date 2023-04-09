// This is the Redux state for the group of the participant

// 0: Control Group
// 1: Interface Instructions Group
// 2: Analogies Group

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: ''
}

export const participantGroupSlice = createSlice({
  name: 'par_group',
  initialState, 
  reducers: {
    setGroup: (state) => {
      let par_group = Math.floor(Math.random() * 3);
      state.value = par_group;
      console.log("Participant Group", par_group);
    },
    resetGroup: (state) => {
      state.value = '';
    }
  }
})

export const { setGroup, resetGroup } = participantGroupSlice.actions;

export default participantGroupSlice.reducer;