// Keyboard Component

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useKeypress from 'react-use-keypress';
import { nextMode, nextFeature, nextOperator, moveSplit, addFeature, removeFeature, addOperator, removeOperator, sortAsc, sortDesc, triggerCommit, triggerError, resetError } from './app/interfaceSlice';
import { logKeypress } from './app/keypressSlice';

function Keyboard() {
  // React states
  const [activeKey, setActiveKey] = useState('');
  const stateSelector = useSelector((state) => state.exp_state.value);
  const user_interface = useSelector((state) => state.interface.value);
  const dispatch = useDispatch();

  // Listen for W Keypress
  function handleWPress() {
    dispatch(resetError());
    setActiveKey('w');
    dispatch(nextMode());
    dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: false}));
  }
  useKeypress('w', () => {
    if (!user_interface.completed) {
      handleWPress();
    }
  });

  // List for A Keypress
  function handleAPress() {
    dispatch(resetError());
    setActiveKey('a');
    switch (user_interface.mode) {
      case 0:
        if (user_interface.exprVar1 === user_interface.feature || user_interface.exprVar2 === user_interface.feature) {
          dispatch(removeFeature(user_interface.feature));
          dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: false}));
        } else {
          dispatch(triggerError("Feature not in expression!"));
          dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: true}));
        }
        break;
      case 1:
        if (user_interface.exprOp === user_interface.operator) {
          dispatch(removeOperator(user_interface.operator));
          dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: false}));
        } else {
          dispatch(triggerError("Operator not in expression!"));
          dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: true}));
        }
        break;
      case 2:
        dispatch(sortDesc());
        dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: false}));
        break;
      case 3:
        if (user_interface.splitPosition !== 0) {
          dispatch(moveSplit(-1));
          dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: false}));
        } else {
          console.log("Can't move split!");
          dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: true}));
        }
        break;
      default:
        console.log("No Mapped Action!");
        dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: true}));
        break;
    }
  }
  useKeypress('a', () => {
    if (!user_interface.completed) {
      handleAPress();
    }
  });

  // Listen for S Keypress
  function handleSPress() {
    dispatch(resetError());
    setActiveKey('s');
    switch (user_interface.mode) {
      case 0:
        dispatch(nextFeature());
        dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: false}));
        break;
      case 1:
        dispatch(nextOperator());
        dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: false}));
        break;
      default:
        console.log("No Mapped Action!");
        dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: true}));
        break;
    }
  }
  useKeypress('s', () => {
    if (!user_interface.completed) {
      handleSPress();
    }
  });

  // Listen for D Keypress
  function handleDPress() {
    dispatch(resetError());
    setActiveKey('d');
    switch (user_interface.mode) {
      case 0:
        if (user_interface.exprVar1 === -1 && user_interface.exprVar2 !== user_interface.feature) {
          dispatch(addFeature(user_interface.feature));
          dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: false}));
        } else if (user_interface.exprVar2 === -1 && user_interface.exprVar1 !== user_interface.feature) {
          dispatch(addFeature(user_interface.feature))
          dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: false}));
        } else {
          dispatch(triggerError("Cannot add this feature!"));
          dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: true}));
        }
        break;
      case 1:
        if (user_interface.exprOp === -1 && user_interface.exprVar1 !== -1) {
          dispatch(addOperator(user_interface.operator));
          dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: false}));
        } else {
          dispatch(triggerError("Cannot add this operator!"));
          dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: true}));
        }
        break;
      case 2:
        dispatch(sortAsc());
        break;
      case 3:
        if (user_interface.splitPosition !== user_interface.numSamples + 1) {
          dispatch(moveSplit(1));
          dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: false}));
        } else {
          console.log("Can't move split!");
          dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: true}));
        }
        break;
      default:
        console.log("No Mapped Action!");
        dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: true}));
        break;        
    }
  }
  useKeypress('d', () => {
    if (!user_interface.completed) {
      handleDPress();
    }
  });

  // Listen for Enter Keypress
  function handleEnterPress() {
    dispatch(resetError());
    setActiveKey('Enter');
    if (user_interface.mode === 3 && user_interface.sort !== 0) {
      // Commit the split and update everything
      dispatch(triggerCommit());
      dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: false}));
    } else {
      console.log("No Mapped Action!");
      dispatch(logKeypress({logging: !user_interface.completed, taskType: stateSelector, erroneous: true}));
    }
  }
  useKeypress('Enter', () => {
    if (!user_interface.completed) {
      handleEnterPress();
    }
  });

  // Key Animations
  function handleTransitionEnd() {
    setActiveKey('');
  }

  return (
    <div>
      <div className="keyboard">
        <div className='key-box'>
          <div className="top-row">
            <div className={`key ${activeKey === 'w' && 'activeKey'}`} onTransitionEnd={() => handleTransitionEnd()} onClick={() => handleWPress()}>
              <p>W</p>
            </div>
          </div>
          <div className="middle-row">
            <div className={`key ${activeKey === 'a' && 'activeKey'}`} onTransitionEnd={() => handleTransitionEnd()} onClick={() => handleAPress()}>
              <p>A</p>
            </div>
            <div className={`key ${activeKey === 's' && 'activeKey'}`} onTransitionEnd={() => handleTransitionEnd()} onClick={() => handleSPress()}>
              <p>S</p>
            </div>
            <div className={`key ${activeKey === 'd' && 'activeKey'}`} onTransitionEnd={() => handleTransitionEnd()} onClick={() => handleDPress()}>
              <p>D</p>
            </div>
          </div>
          <div className="bottom-row">
            <div className={`enter-key ${activeKey === 'Enter' && 'activeKey'}`} onTransitionEnd={() => handleTransitionEnd()} onClick={() => handleEnterPress()}>
              <p>Enter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Keyboard;