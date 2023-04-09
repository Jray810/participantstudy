// This is the Redux state for tracking the interface

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    numSamples: 8,
    numModes: 4,
    numFeatures: 3,
    currSamples: [],
    splitQueue: [],
    mode: 0,
    feature: 0,
    operator: 0,
    numOperators: 3,
    splitPosition: 0,
    exprVar1: -1,
    exprVar2: -1,
    exprOp: -1,
    sort: 0,
    commit: false,
    completedGroup: [],
    numCompleted: 0,
    completed: false,
    errorMessage: ''
  }
}

export const interfaceSlice = createSlice({
  name: 'interface',
  initialState,
  reducers: {
    initializeInterface: (state, action) => {
      state.value.numFeatures = action.payload.numFeatures;
      state.value.numSamples = action.payload.numSamples;
      state.value.currSamples = action.payload.samples;
      state.value.completed = false;
    },
    nextMode: (state) => {
      state.value.mode = (state.value.mode + 1) % state.value.numModes;
      // console.log("Mode", state.value.mode);
    },
    nextFeature: (state) => {
      state.value.feature = (state.value.feature + 1) % state.value.numFeatures;
      // console.log("Feature", state.value.feature);
    },
    nextOperator: (state) => {
      state.value.operator = (state.value.operator + 1) % state.value.numOperators;
      // console.log("Operator", state.value.operator);
    },
    moveSplit: (state, action) => {
      if (action.payload === -1) {
        state.value.splitPosition -= 1;
        if (state.value.splitPosition < 0) {
          state.value.splitPosition = 0;
        }
      } else if (action.payload === 1) {
        state.value.splitPosition += 1;
        if (state.value.splitPosition > state.value.numSamples) {
          state.value.splitPosition = state.value.numSamples;
        }
      } else {
        state.value.splitPosition = 0;
      }
    },
    addFeature: (state, action) => {
      if (state.value.exprVar1 === -1 && state.value.exprVar2 !== action.payload) {
        state.value.exprVar1 = action.payload;
      } else if (state.value.exprVar2 === -1 && state.value.exprVar1 !== action.payload) {
        state.value.exprVar2 = action.payload;
      }
    },
    removeFeature: (state, action) => {
      if (state.value.exprVar1 === action.payload) {
        state.value.exprVar1 = -1;
      }
      if (state.value.exprVar2 === action.payload) {
        state.value.exprVar2 = -1;
      }
    },
    addOperator: (state, action) => {
      if (state.value.exprOp === -1 && state.value.exprVar1 !== -1) {
        state.value.exprOp = action.payload;
      }
    },
    removeOperator: (state, action) => {
      if (state.value.exprOp === action.payload) {
        state.value.exprOp = -1
      }
    },
    sortAsc: (state) => {
      state.value.sort = 1;
    },
    sortDesc: (state) => {
      state.value.sort = -1;
    },
    triggerCommit: (state) => {
      state.value.commit = !state.value.commit;
    },
    addToCompletedGroup: (state, action) => {
      state.value.completedGroup.push(action.payload);
      state.value.numCompleted += action.payload.length;
    },
    addToSplitQueue: (state, action) => {
      state.value.splitQueue.push(action.payload);
    },
    removeFirstSplitQueue: (state) => {
      state.value.currSamples = [];
      if (state.value.splitQueue.length !== 0) {
        state.value.currSamples = JSON.stringify([...state.value.splitQueue[0]]);
        state.value.splitQueue.splice(0, 1);
      } else {
        state.value.completed = true;
      }
    },
    resetInterface: (state) => {
      state.value.mode = 0;
      state.value.feature = 0;
      state.value.operator = 0;
      state.value.numOperators = 3;
      state.value.splitPosition = 0;
      state.value.exprVar1 = -1;
      state.value.exprVar2 = -1;
      state.value.exprOp = -1;
      state.value.sort = 0;
      state.value.numClassified = 0;
    },
    makeSubmission: (state) => {
      state.value.completed = true;
    },
    resetCompleted: (state) => {
      state.value.completed = false;
    },
    triggerError: (state, action) => {
      state.value.errorMessage = action.payload;
    },
    resetError: (state) => {
      state.value.errorMessage = ''
    }
  }
})

export const { initializeInterface,
                nextMode,
                nextFeature,
                nextOperator,
                moveSplit,
                addFeature,
                removeFeature,
                addOperator,
                removeOperator,
                sortAsc,
                sortDesc,
                triggerCommit,
                addToCompletedGroup,
                addToSplitQueue,
                removeFirstSplitQueue,
                resetInterface,
                makeSubmission,
                resetCompleted,
                triggerError,
                resetError } = interfaceSlice.actions;

export default interfaceSlice.reducer;