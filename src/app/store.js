import { configureStore } from "@reduxjs/toolkit";
import stateReducer from './stateSlice.js';
import groupReducer from './participantGroupSlice.js';
import checkpointReducer from './checkpointSlice.js';
import interfaceReducer from './interfaceSlice.js';
import statReducer from './statSlice.js';

export const store = configureStore({
  reducer: {
    exp_state: stateReducer,
    par_group: groupReducer,
    checkpoints: checkpointReducer,
    interface: interfaceReducer,
    stats: statReducer,
  },
})