// This is the Welcome State

import React from 'react';
import { useDispatch } from 'react-redux';
import { setExpState } from './app/stateSlice';
import { setGroup } from './app/participantGroupSlice';
import { addCheckpoint } from './app/checkpointSlice';

function Welcome() {
  const dispatch = useDispatch();

  function begin() {
    // Record Checkpoint Timestamp
    dispatch(addCheckpoint(1));
    // Set Participant Group
    dispatch(setGroup());
    // Navigate to Instructions Page
    dispatch(setExpState('Instructions'));
  }

  return (
    <div>
      <div style={{paddingBottom: "0"}}>
        <div style={{paddingBottom: "0"}}>
          <h1>Welcome!</h1>
        </div>
      </div>
      <div style={{margin: "auto"}}>
        <div>
          Thank you for volunteering to participate in this study. Please note that a <b>computer with a keyboard is highly recommended for completing this study</b> and that small mobile devices like smartphones may not render the system properly. Please make sure that you are setup properly before proceeding.
        </div>
        <div>
          This study must be completed in one sitting and is timed. The study should take netween <b>N</b> to <b>M</b> minutes total. Please do not refresh the webpage during the study.
        </div>
        <div>
          When you are ready, click the button below to begin.
        </div>
        <div>
          <button onClick={() => begin()}>Begin</button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;