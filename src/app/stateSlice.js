// This is the Redux state for the state of the experiment (which page)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 'Welcome'
}

export const stateSlice = createSlice({
  name: 'exp_state',
  initialState, 
  reducers: {
    setExpState: (state, action) => {
      state.value = action.payload;
      console.log('State', state.value);
    },
    resetExpState: (state) => {
      state.value = initialState.value;
    }
  }
})

export const { setExpState, resetExpState } = stateSlice.actions;

export default stateSlice.reducer;