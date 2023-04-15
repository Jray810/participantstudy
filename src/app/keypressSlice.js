// This is the Redux state for tracking keypresses

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    analogyPresses: 0,
    analogyErrorPresses: 0,
    taskPresses: 0,
    taskErrorPresses: 0
  }
}

export const keypressSlice = createSlice({
  name: 'keypresses',
  initialState,
  reducers: {
    clearKeys: (state) => {
      state.value = initialState.value
    },
    logKeypress: (state, action) => {
      if (action.payload.logging) {
        if (action.payload.taskType === 'Analogy') {
          state.value.analogyPresses += 1;
          console.log("Press!");
          if (action.payload.erroneous) {
            state.value.analogyErrorPresses += 1;
          }
        } else {
          state.value.taskPresses += 1;
          if (action.payload.erroneous) {
            state.value.taskErrorPresses += 1;
          }
        }
      }
    },
    logErrorPress: (state, action) => {
      if (action.payload.taskType === 'Analogy') {
        state.value.analogyErrorPresses += 1;
        console.log("Press!");
      } else {
        state.value.taskErrorPresses += 1;
      }
    }
  }
})

export const { clearKeys, logKeypress, logErrorPress } = keypressSlice.actions;

export default keypressSlice.reducer;