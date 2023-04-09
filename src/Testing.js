import React from 'react';
import { analog_data, analog_stats } from './data/analogData';
import { task_data, task_stats } from './data/taskData';
import { useDispatch, useSelector } from 'react-redux';
import { initializeInterface, resetInterface } from './app/interfaceSlice';
import { initStats, resetStats } from './app/statSlice';
import { setExpState } from './app/stateSlice';
import Interface from './Interface';

function Testing() {
  const stateSelector = useSelector((state) => state.exp_state.value);
  const dispatch = useDispatch();

  function begin(parGroup) {
    dispatch(resetInterface());
    dispatch(resetStats());
    switch(parGroup) {
      case 0:
        dispatch(initializeInterface({
          numFeatures: 3,
          numSamples: analog_data.length,
          samples: JSON.stringify(analog_data)
        }));
        dispatch(initStats(analog_stats));
        dispatch(setExpState('Test'));
        break;
      case 1:
        dispatch(initializeInterface({
          numFeatures: 3,
          numSamples: task_data.length,
          samples: JSON.stringify(task_data)
        }));
        dispatch(initStats(task_stats));
        dispatch(setExpState('Task'));
        break;
      case 2:
        dispatch(initializeInterface({
          numFeatures: 3,
          numSamples: analog_data.length,
          samples: JSON.stringify(analog_data)
        }));
        dispatch(initStats(analog_stats));
        dispatch(setExpState('Analogy'));
        break;
    }
  }

  return (
    <div>
      {
        stateSelector === 'Welcome' &&
        <div>
          <button onClick={() => begin(0)}>Test Tutorial Interface</button>
          <button onClick={() => begin(1)}>Test Task Interface</button>
          <button onClick={() => begin(2)}>Test Analogy Interface</button>
        </div>
      }
      {
        stateSelector === 'Analogy' && <Interface/>
      }
      {
        stateSelector === 'Test' && <Interface/>
      }
      {
        stateSelector === 'Task' && <Interface/>
      }
    </div>
  )
}

export default Testing;