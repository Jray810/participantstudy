// This is the Welcome State

import React, { useState, useEffect } from 'react';
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

  // Screen Width Restrictions
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, [])

  return (
    <div>
      <div style={{paddingBottom: "0"}}>
        <div style={{paddingBottom: "0"}}>
          <h1>Welcome!</h1>
        </div>
      </div>
      <div style={{margin: "auto"}}>
        <div>
          Thank you for volunteering to participate in this study. Please note that a <b>computer with a keyboard is highly recommended for completing this study</b>. Please make sure that you are setup properly before proceeding.
        </div>
        <div>
          This study must be completed in one sitting and is timed. The study is expected to take between <b>20</b> to <b>30</b> minutes total. Please make sure you are able to complete the study in one sitting and please do not refresh the webpage during the study.
        </div>
        <div>
          When you are ready, click the button below to begin.
        </div>
        {
          windowWidth >= 1024 &&
          <div>
            <button onClick={() => begin()}>Begin</button>
          </div>
        }
        {
          windowWidth < 1024 &&
          <div>
            <p><b>Your screen width is too small, try rotating your screen. If this message does not change, please switch to a device with a screen width of at least 1024px.</b></p>
          </div>
        }
      </div>
    </div>
  );
}

export default Welcome;