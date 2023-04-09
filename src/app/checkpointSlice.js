// This is the Redux state for tracking checkpoint timestamps

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {}
}

export const checkpointSlice = createSlice({
  name: 'checkpoints',
  initialState,
  reducers: {
    addCheckpoint: (state, action) => {
      let checkpoint_num = action.payload;
      let timestamp = JSON.stringify(new Date());
      state.value[checkpoint_num] = timestamp;
      console.log("Checkpoint!", checkpoint_num, timestamp);
    },
    clearCheckpoints: (state) => {
      state.value = initialState.value;
    }
  }
})

export const { addCheckpoint, clearCheckpoints } = checkpointSlice.actions;

export default checkpointSlice.reducer;