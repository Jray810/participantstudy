import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Testing from './Testing';
import { TourProvider, useTour } from '@reactour/tour';

function Close({ onClick }) {
  return (
    <button onClick={onClick} className='tour-close'>x</button>
  );
}

function App() {
  const steps = [
    {
      selector: '.tour-1',
      content: 'You are presented with a set of samples and your goal is to separate the samples by their class using as few splits as possible.',
      position: 'bottom'
    },
    {
      selector: '.tour-2',
      content: 'To split the samples, you will need to create expressions to organize the samples on. Here you can see your current expression.'
    },
    {
      selector: '.state-box',
      content: 'The interface has 4 modes and can be seen here. You may use the W key to toggle between modes.'
    },
    {
      selector: '.focus-box',
      content: 'Information relevant to each mode will be shown here.',
      position: 'left'
    },
    {
      selector: '.w-key',
      content: 'Press W until the mode shows Feature Select. (You can use a keyboard if you have one)',
      position: 'left'
    },
    {
      selector: '.s-key',
      content: 'In the Feature Select mode, you can use the S key to toggle between different features of interest.',
      position: 'bottom'
    },
    {
      selector: '.lr-key',
      content: 'You can use the D and A key to add or remove the feature of interest from the expression respectively.',
      position: 'bottom'
    },
    {
      selector: '.tour-home',
      content: 'You can add a maximum of two features to the expression. Use the keys to add Features 2 and 3 to the expression.'
    },
    {
      selector: '.state-box',
      content: 'Press W until the mode shows Operator Select.'
    },
    {
      selector: '.s-key',
      content: 'In the Operator Select mode, you can use the S key to toggle between different operators of interest.',
      position: 'bottom'
    },
    {
      selector: '.lr-key',
      content: 'You can use the D and A key to add or remove the operator of interest from the expression respectively. Note that an operator is only necessary when there is more than one feature in the expression.',
      position: 'bottom'
    },
    {
      selector: '.tour-home',
      content: 'Use the keys to add the operator OR to the expression, then change the mode to Sort.'
    },
    {
      selector: '.lr-key',
      content: 'In Sort mode, you can use the D and A keys to sort the samples in ascending or descending order based on their calculated values from the expression. Sorting is necessary before attempting to split the data.',
      position: 'bottom'
    },
    {
      selector: '.tour-home',
      content: 'Use the keys to sort the samples in ascending order based on the expression. Then change the mode to Move Split.'
    },
    {
      selector: '.lr-key',
      content: 'In Move Split mode, you can use the D and A keys to move the splitting position. Note that the data must be sorted in order for the splitter to be moved. A valid position is a position where the samples on the two sides of the split have different expression values.',
      position: 'bottom'
    },
    {
      selector: '.enter-key',
      content: 'Once you move the splitter to a valid position, you can hit enter to commit the split.',
      position: 'bottom'
    },
    {
      selector: '.tour-17',
      content: 'After committing a split, you may see the values in the bottom left change. Percent separation refers to the number of samples that have been successfully separated from the rest.'
    },
    {
      selector: '.tour-18',
      content: 'Batch queue shows you a count of how many groups containing mixed classes are waiting to be sorted. You may find that committing a split sometimes increases the number of groups in queue, but that may also help expedite the overall process.'
    },
    {
      selector: '.tour-19',
      content: 'Scoring is out of 100 and only occurs when you have either Given Up or successfully split all of the data. A score of 100 is achieved when everything is split using the minimum number of splits possible, upon which this section will end.'
    },
    {
      selector: '.tour-20',
      content: 'The Give Up button is always available for you to submit the current state of your work. Upon submitting you will have the option to either retry or end this section altogether.'
    },
    {
      selector: '.user-manual',
      content: 'You can always reference this tutorial again by clicking the User Manual for help. Good luck!'
    }
  ]

  return (
    <Router>
      <TourProvider steps={steps} components={{ Close }}>
        <Routes>
          <Route path = '/' element={<Home/>}/>
          <Route path = '/runtestsuite' element={<Testing/>}/>
        </Routes>
      </TourProvider>
    </Router>
  );
}

export default App;
