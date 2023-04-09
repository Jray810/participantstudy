// This is the Redux state for tracking statistics

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    numSplits: 0,
    score: 0,
    attempts: 0,
    highScore: 0,
    maxSplits: -1,
    minSplits: -1,
  }
}

export const statSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    initStats: (state, action) => {
      state.value.maxSplits = action.payload.maxSplits;
      state.value.minSplits = action.payload.minSplits;
    },
    addSplit: (state) => {
      state.value.numSplits += 1;
    },
    addAttempt: (state) => {
      state.value.attempts += 1;
    },
    resetSplit: (state) => {
      state.value.numSplits = 0;
      state.value.score = 0;
    },
    calcScore: (state, action) => {
      console.log(action.payload);
      if (action.payload === 1) {
        state.value.score = 100 - 50 * ((state.value.numSplits - state.value.minSplits) / (state.value.maxSplits - state.value.minSplits));
      } else {
        state.value.score = 50 * (action.payload)
      }
      if (state.value.score > state.value.highScore) {
        state.value.highScore = state.value.score;
      }
    },
    resetStats: (state) => {
      state.value.numSplits = 0;
      state.value.score = 0;
      state.value.attempts = 0;
      state.value.highScore = 0;
    }
  }
})

export const { initStats, addSplit, addAttempt, resetSplit, calcScore, resetStats } = statSlice.actions;

export default statSlice.reducer;