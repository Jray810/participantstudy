// Analogy Interface Page

import React, { useEffect, useState } from 'react';
import Keyboard from './Keyboard';
import { useSelector, useDispatch } from 'react-redux';
import { triggerCommit, addToCompletedGroup, addToSplitQueue, removeFirstSplitQueue, resetInterface, resetCompleted, initializeInterface, makeSubmission, triggerError } from './app/interfaceSlice';
import { checkUniformClass } from './helpers';
import { addAttempt, addSplit, calcScore, resetSplit } from './app/statSlice';
import AnalogDisplay from './AnalogDisplay';
import TestDisplay from './TestDisplay';
import { analog_data } from './data/analogData';
import { task_data } from './data/taskData';
import { setExpState } from './app/stateSlice';
import helpIcon from './help_FILL0_wght400_GRAD0_opsz24.png';

function Interface() {
  const stateSelector = useSelector((state) => state.exp_state.value);
  const user_interface = useSelector((state) => state.interface.value);
  const user_stats = useSelector((state) => state.stats.value);
  const dispatch = useDispatch();

  const modes = ['Feature Select', 'Operator Select', 'Sort', 'Move Split'];
  const operators = ['AND', 'OR', 'XOR']
  const sorts = ['DESC', 'None', 'ASC']

  let sample_list = user_interface.completed ? [] : JSON.parse(user_interface.currSamples);

  // React states
  const [displayList, setDisplayList] = useState([...sample_list]);

  useEffect(() => {
    // Calculate the expression values
    if (user_interface.exprVar1 !== -1) {
      if (user_interface.exprOp !== -1 && user_interface.exprVar2 !== -1) {
        // Two feature expression
        sample_list.forEach((sample) => {
          let expr1 = sample[`f${user_interface.exprVar1 + 1}`];
          let expr2 = sample[`f${user_interface.exprVar2 + 1}`];
          switch (user_interface.exprOp) {
            case 0:
              sample.calcExpr = expr1 && expr2;
              break;
            case 1:
              sample.calcExpr = expr1 || expr2;
              break;
            case 2:
              sample.calcExpr = (expr1 === 0 && expr2 !== 0 || expr1 !== 0 && expr2 === 0) ? 1 : 0;
              break;
            default:
              break;
          } 
        })
      } else {
        // One feature expression
        sample_list.forEach((sample) => {
          sample.calcExpr = sample[`f${user_interface.exprVar1 + 1}`];
        })
      }
    }

    // Sort the list (if applicable)
    if (user_interface.sort !== 0) {
      if (user_interface.sort === 1) {
        // Sort Ascending
        sample_list.sort((a, b) => (a.calcExpr > b.calcExpr) ? 1 : -1);
      } else {
        // Sort Descending
        sample_list.sort((a, b) => (a.calcExpr < b.calcExpr) ? 1 : -1);
      }
    }

    setDisplayList([...sample_list]);

    // Insert the split image (if applicable)
    if (user_interface.mode === 3) {
      let tmp_list = [...displayList];
      const lastSplitIdx = tmp_list.map(sample => sample.imgPath).indexOf('/images/split.png');
      if (lastSplitIdx != -1) {
        tmp_list.splice(lastSplitIdx, 1);
      }
      tmp_list.splice(user_interface.splitPosition, 0, {
        imgPath: '/images/split.png'
      });
      setDisplayList([...tmp_list]);
    }
    
    // Check if commit is triggered, if so process it
    if (user_interface.commit) {
      // Check if a valid split location
      if (user_interface.splitPosition !== 0 && user_interface.splitPosition !== user_interface.numSamples && displayList[user_interface.splitPosition - 1].calcExpr !== displayList[user_interface.splitPosition + 1].calcExpr) {
        // Obtain splits
        let left = displayList.slice(0, user_interface.splitPosition);
        let right = displayList.slice(user_interface.splitPosition + 1, displayList.length);
        // Check if all are the same class
        if (left.length !== 0) {
          if (checkUniformClass(left)) {
            dispatch(addToCompletedGroup(left));
          } else {
            dispatch(addToSplitQueue(left));
          }
        }
        if (right.length !== 0) {
          if (checkUniformClass(right)) {
            dispatch(addToCompletedGroup(right));
          } else {
            dispatch(addToSplitQueue(right));
          }
        }
        // Remove current split from queue
        dispatch(removeFirstSplitQueue());
        // Reset commit flag
        dispatch(triggerCommit());
        // Reset Interface
        dispatch(resetInterface());
        // Increase split count
        dispatch(addSplit());
      } else {
        dispatch(triggerError('Invalid split position!'));
        // Reset commit flag
        dispatch(triggerCommit());
      }
    }

    // Check if completed
    if (user_interface.completed) {
      // Update stats
      dispatch(calcScore(user_interface.numCompleted / user_interface.numSamples));
      // Increase attempts count
      dispatch(addAttempt());
    }
  }, [user_interface]);

  // Retry
  function retry() {
    if (stateSelector === 'Task') {
      dispatch(initializeInterface({
        numFeatures: 3,
        numSamples: task_data.length,
        samples: JSON.stringify(task_data)
      }));
      dispatch(resetInterface());
      dispatch(resetSplit());
    } else {
      dispatch(initializeInterface({
        numFeatures: 3,
        numSamples: analog_data.length,
        samples: JSON.stringify(analog_data)
      }));
      dispatch(resetInterface());
      dispatch(resetSplit());
    }
  }

  // Proceed
  function proceed() {
    if (stateSelector === 'Analogy') {
      dispatch(setExpState('Break'));
    } else {
      dispatch(setExpState('Survey'));
    }
  }

  // Give Up
  function giveUp() {
    dispatch(makeSubmission());
  }

  return (
    <div className='interface-container'>
      <div className='upper-section'>
        <div style={{width: "80%"}}>
          <div>
            <div style={{display: "flex", padding: "0"}}>
              <div style={{padding: "0", display: "flex", flexDirection: "column", justifyContent: "center"}}>Sort Expression: </div>
              <div className='expr-box'>
                <div className='expr-sub-box'>{user_interface.exprVar1 === -1 ? '' : 'Feature ' + (user_interface.exprVar1 + 1)}</div>
                {
                  (user_interface.exprOp !== -1 || user_interface.exprVar2 !== -1) && <div className='expr-sub-box'>{user_interface.exprOp === -1 ? (user_interface.exprVar2 === -1 ? '' : '?') : operators[user_interface.exprOp]}</div>
                }
                {
                  (user_interface.exprOp !== -1 || user_interface.exprVar2 !== -1) && <div className='expr-sub-box'>{user_interface.exprVar2 === -1 ? '' : 'Feature ' + (user_interface.exprVar2 + 1)}</div>
                }
              </div>
              {
                user_interface.errorMessage !== '' && <div style={{padding: "0", display: "flex", flexDirection: "column", justifyContent: "center"}}><h5 style={{color: "#900C3F"}}>Error: {user_interface.errorMessage}</h5></div>
              }
            </div>
          </div>
          {
            !user_interface.completed && sample_list.length !== 0 && 
            <div style={{padding: "0"}}>
              <div>
                Current Batch:
              </div>
              {
                stateSelector === 'Analogy' && <AnalogDisplay arr={displayList}/>
              }
              {
                stateSelector === 'Task' && <TestDisplay arr={displayList}/>
              }
              {
                stateSelector === 'Test' && <TestDisplay arr={displayList}/>
              }
              <div>
                Batch Queue: <i>{user_interface.splitQueue.length} Unsorted Groups</i>
              </div>
            </div>
          }
          {
            user_interface.completed &&
            <div style={{padding: "0"}}>
              {
                user_stats.score >= 50 && (stateSelector === 'Analogy' || user_stats.score != 100) &&
                <div>
                  Congratulations! You completed the task with a score of <b>{user_stats.score}/100</b> using <b>{user_stats.numSplits} splits</b>. {user_stats.score !== 100 && <span>This task is achievable with <b>{user_stats.minSplits} splits</b></span>}.
                </div>
              }
              {
                user_stats.score < 50 &&
                <div>
                  You aborted the task with a score of <b>{user_stats.score}/100</b>. {user_stats.score !== 100 && <span>This task is achievable with <b>{user_stats.minSplits} splits</b></span>}.
                </div>
              }
              {
                (stateSelector === 'Analogy' || user_stats.score !== 100) &&
                <div>
                  <button onClick={() => retry()}>Try Again</button>
                </div>
              }
              {
                stateSelector !== 'Analogy' &&
                <div>
                  <button onClick={() => proceed()}>Submit</button>
                </div>
              }
              {
                stateSelector === 'Analogy' &&
                <div>
                  <button onClick={() => proceed()}>Continue</button>
                </div>
              }
            </div>
          }
        </div>
        <div>
          {
              user_interface.mode === 0 &&
              <div className='focus-box'>Feature {user_interface.feature + 1}</div>
          }
          {
              user_interface.mode === 1 &&
              <div className='focus-box'>Operator {operators[user_interface.operator]}</div>
          }
          {
              user_interface.mode === 2 &&
              <div className='focus-box'>{sorts[user_interface.sort + 1]}</div>
          }
          {
              user_interface.mode === 3 &&
              <div className='focus-box'>{user_interface.splitPosition === 0 || user_interface.splitPosition === user_interface.numSamples || displayList[user_interface.splitPosition - 1].calcExpr === displayList[user_interface.splitPosition + 1].calcExpr ? 'Invalid' : 'Valid'}</div>
          }
          <Keyboard/>
          <div style={{textAlign: 'right'}}><img style={{height: '1rem'}} src={helpIcon}/> <span>User Manual</span></div>
          <div style={{textAlign: 'right'}}>Time Elapsed: <b>1m 23s</b></div>
          <div style={{textAlign: 'right'}}><button onClick={() => giveUp()}>Give Up</button></div>
        </div>
      </div>
      <div className='lower-section'>
        <div className='lower-third'>
          Percent Separated: <b>{user_interface.numCompleted / user_interface.numSamples * 100}%</b>
          <br/>
          Number of Splits: <b>{user_stats.numSplits}</b>
          <br/>
          Score: <b>{user_stats.score === 0 ? 'N/A' : `${user_stats.score}/100`}</b>
        </div>
        <div className='lower-third'>
          <b>Mode</b>
          <div className='state-box'>{modes[user_interface.mode]}</div>
        </div>
        <div className='lower-third'>
          Attempts: <b>{user_stats.attempts}</b>
          <br/>
          High Score: <b>{user_stats.highScore}/100</b>
        </div>
      </div>
    </div>
  );
}

export default Interface;