// This is the Redux state for packaging statistics

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    group: -1,
    analogy: '',
    task: ''
  }
}

export const statPackageSlice = createSlice({
  name: 'statPackages',
  initialState,
  reducers: {
    setGroup: (state, action) => {
      state.value.group = action.payload;
    },
    addPackage: (state, action) => {
      if (action.payload.taskType === 'Analogy') {
        state.value.analogy = action.payload.package;
      } else {
        state.value.task = action.payload.package;
      }
    }
  }
})

export const { setGroup, addPackage } = statPackageSlice.actions;

export default statPackageSlice.reducer;