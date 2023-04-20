// This is the Instructions State

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCheckpoint } from './app/checkpointSlice';
import { setExpState } from './app/stateSlice';
import { fullReset, initializeInterface } from './app/interfaceSlice';
import { analog_stats, analog_data } from './data/analogData';
import { task_stats, task_data } from './data/taskData';
import { initStats, resetStats } from './app/statSlice';
import fig1 from './static/images/fig1.png';
import { setGroup } from './app/statPackageSlice';

function Instructions() {
  const dispatch = useDispatch();

  // Redux States
  const groupSelector = useSelector((state) => state.par_group.value);

  // React States
  const [parGroup, setParGroup] = useState(groupSelector);

  // Monitor parGroup
  useEffect(() => {
    setParGroup(groupSelector);
  }, [groupSelector]);

  function begin(parGroup) {
    // Mark the group number
    dispatch(setGroup(parGroup));
    // Record Checkpoint Timestamp Dependent on Task
    if (parGroup === 2) {
      // Begin Analogy Task
      dispatch(addCheckpoint(2));
    } else {
      // Begin True Task
      dispatch(addCheckpoint(4));
    }
    // Set interface parameters
    // let samples_list = parGroup === 2 ? analog_data : task_data;
    let samples_list = analog_data;
    // Set same dataset for analogy and experiment
    // if (parGroup === 2) {
    //   dispatch(initializeInterface({
    //     numFeatures: 3,
    //     numSamples: samples_list.length,
    //     samples: JSON.stringify(samples_list)
    //   }));
    // } else {
    //   dispatch(initializeInterface({
    //     numFeatures: 4,
    //     numSamples: samples_list.length,
    //     samples: JSON.stringify(samples_list)
    //   }));
    // }
    dispatch(initializeInterface({
      numFeatures: 3,
      numSamples: samples_list.length,
      samples: JSON.stringify(samples_list)
    }));
    dispatch(fullReset());
    // Set stat tracker
    // let base_stats = parGroup === 2 ? analog_stats : task_stats;
    let base_stats = analog_stats;
    dispatch(initStats(base_stats));
    dispatch(resetStats());
    // Navigate to State Dependent Page
    let newState = parGroup === 2 ? 'Analogy' : 'Task';
    dispatch(setExpState(newState));
  }

  return (
    <div>
      <div style={{paddingBottom: "0"}}>
        <div style={{paddingBottom: "0"}}>
          <h2>Instructions</h2>
        </div>
      </div>
      {
        parGroup === 0 &&
        <div style={{paddingBottom: "0"}}>
          <div>
            On the next page, you will be provided with a user interface and timed on completing a task. All information presented below will be accessible at any time by clicking the <b>User Manual</b> button. <b>Your time will start when the "Begin" button below is clicked.</b>
          </div>
          <div>
            <h4>The Task</h4>
            <p>
              You will be presented with a set of samples and your task will be to separate samples of different classes using as few splits as possible. Each sample will have several distinguishable features that you are able to use to filter and split the samples on. An example of a set of samples is shown below.
            </p>
            <img src={fig1} style={{width: '700px', border: '1px solid #900C3F'}}/>
            <p>
              The <b>ExprVal</b> variable will be calculated based on an expression that you create using one or a combination of two features. Supported operations for combining two features include <b>AND, OR, and XOR</b>.
            </p>
            <h4>The Interface</h4>
            <p>
              The interface is controlled by 5 keys, the <b>W, A, S, D, and Enter</b> keys. A visual representation of the keys will be presented on screen and are usable if you find that preferrable over your keyboard.
            </p>
            <p>
              The <b>W</b> key is bound to a <b>Mode</b> switcher. By repeatedly pressing <b>W</b>, you will toggle through 4 modes: <b>Feature Select, Operator Select, Sort, and Move Split</b>.
            </p>
            <p>
              <h5 style={{display: "inline"}}>Feature Select</h5> - In Feature Select mode, you may press the <b>S</b> key to toggle through features of interest. Once you have your feature of interest selected, you may press the <b>D</b> key to add that feature to the sort expression or the <b>A</b> key to remove that feature from the sort expression.
            </p>
            <p>
              <h5 style={{display: "inline"}}>Operator Select</h5> - In Operator Select mode, you may press the <b>S</b> key to toggle through operators of interest. Once you have your operator of interest selected, you may press the <b>D</b> key to add that operator to the sort expression or the <b>A</b> key to remove that operator from the sort expression.
            </p>
            <p>
              <h5 style={{display: "inline"}}>Sort</h5> - In Sort mode, you may press the <b>D</b> key to sort the samples in <i>Ascending</i> order based on the calculated value using the sort expression. You may press the <b>A</b> key to sort the samples in <i>Descending</i> order. Note that a valid sort expression must be available in order for you to be able to sort the samples.
            </p>
            <p>
              <h5 style={{display: "inline"}}>Move Split</h5> - In Move Split mode, you may press the <b>D</b> key to move the split position to the left or the <b>A</b> key to move the split position to the right. Note that the samples must be sorted in order for you to move the splitter. When you have positioned in a valid split location of your choosing, you may press the <b>Enter</b> key to commit the split and divide the samples into two batches. If a batch contains only samples from one class, that batch is considered completed and will no longer need to be split.
            </p>
            <h4>Completing the Activity</h4>
            <p>
              You will have unlimited attempts to complete the activity. The activity is considered complete when <b>(a)</b> you achieve a score of 100 or <b>(b)</b> you choose to give up and end the activity.
            </p>
            <p>
              A score of 100 is achieved by reaching 100% separation while using the minimum number of splits possible. Clicking the <b>Give Up</b> button will submit your current attempt for scoring and terminate that attempt. From there you can either try again or submit the activity and move on. It is highly encouraged that you attempt to reach a score of 100.
            </p>
            <p>
              Upon completing the activity you will be presented with a quick post-activity survey.
            </p>
          </div>
        </div>
      }
      {
        parGroup === 1 &&
        <div style={{paddingBottom: "0"}}>
          <div>
            Please watch the following video for an explanation of the task and how it may be completed.
          </div>
          <div style={{paddingBottom: "0"}}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/uShLqCJXtvk"
              title="Instructions"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen="true"
            />
            <p>
              Upon completing the activity you will be presented with a quick post-activity survey.
            </p>
          </div>
        </div>
      }
      {
        parGroup === 2 &&
        <div style={{paddingBottom: "0"}}>
          <div>
            <p>
              On the next page, you will be provided with a user interface and given <b>15</b> minutes to explore the system. A brief tutorial will introduce you to the interface.
            </p>
            <p>
              If you choose to exit early or when the time runs out, you will be presented with the study activity followed by a quick post-activity survey.
            </p>
            <p>
              The entire study is expected to take around <b>30</b> minutes. Please make sure you are able to complete this study in one continuous sitting.
            </p>
          </div>
        </div>
      }
      <div>
        <div>
          When you are ready, click the button below to begin.
        </div>
        <div>
          <button onClick={() => begin(parGroup)}>Begin</button>
        </div>
      </div>
    </div>
  );
}

export default Instructions;