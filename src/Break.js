import React from 'react';
import { useDispatch } from 'react-redux';
import { setExpState } from './app/stateSlice';
import { addCheckpoint } from './app/checkpointSlice';
import { fullReset, initializeInterface } from './app/interfaceSlice';
import { task_data, task_stats } from './data/taskData';
import { initStats, resetStats } from './app/statSlice';

function Break() {
  const dispatch = useDispatch();

  function begin() {
    // Record Checkpoint Timestamp
    dispatch(addCheckpoint(4));
    // Set Interface parameters
    dispatch(initializeInterface({
      numFeatures: 3,
      numSamples: task_data.length,
      samples: JSON.stringify(task_data)
    }));
    dispatch(fullReset());
    // Set stat tracker
    dispatch(initStats(task_stats));
    dispatch(resetStats());
    // Navigate to Task Page
    dispatch(setExpState('Task'));
  }

  return (
    <div>
      <div style={{paddingBottom: "0"}}>
        <div style={{paddingBottom: "0"}}>
          <h2>Instructions</h2>
        </div>
      </div>
      <div style={{paddingBottom: "0"}}>
        <div>
          <p>
            On the next page, you will be timed on completing a task. As a reminder, task and interface instructions will be accessible at any time by clicking the <b>User Manual</b> button. <b>Your time will start when the "Continue" button below is clicked.</b>
          </p>
          <p>
            You will have unlimited attempts to complete the task. The task is considered complete when <b>(a)</b> you achieve a score of 100 or <b>(b)</b> you choose to give up and end the activity.
          </p>
          <p>
            A score of 100 is achieved by reaching 100% separation while using the minimum number of splits possible. Clicking the <b>Give Up</b> button will submit your current attempt for scoring and terminate that attempt. From there you can either try again or submit the activity and move on. It is highly encouraged that you attempt to reach a score of 100.
          </p>
          <p>
            Upon completing the activity you will be presented with a quick post-activity survey.
          </p>
        </div>
      </div>
      <div>
        <div>
          When you are ready, click the button below to proceed.
        </div>
        <div>
          <button onClick={() => begin()}>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default Break;