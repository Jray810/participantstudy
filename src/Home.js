// This serves as the overarching handler for what state of the experiment to display

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Welcome from './Welcome';
import Instructions from './Instructions';
import Interface from './Interface';
import Break from './Break';
import UserSurvey from './UserSurvey';
import Thanks from './Thanks';
import Footer from './Footer';

function Home() {
  // Redux States
  const stateSelector = useSelector((state) => state.exp_state.value);
  const groupSelector = useSelector((state) => state.par_group.value);

  // React States
  const [expState, setExpState] = useState(stateSelector);
  const [parGroup, setParGroup] = useState(groupSelector);

  // Monitor expState
  useEffect(() => {
    setExpState(stateSelector);
  }, [stateSelector]);

  // Monitor parGroup
  useEffect(() => {
    setParGroup(groupSelector);
  }, [groupSelector]);

  return (
    <div className='super-container'>
      <main>
      {
        expState === 'Welcome' && <Welcome/>
      }
      {
        expState === 'Instructions' && <Instructions/>
      }
      {
        expState === 'Analogy' && <Interface/>
      }
      {
        expState === 'Break' && <Break/>
      }
      {
        expState === 'Task' && <Interface/>
      }
      {
        expState === 'Test' && <Interface/>
      }
      {
        expState === 'Survey' && <UserSurvey/>
      }
      {
        expState === 'Thanks' && <Thanks/>
      }
      </main>
      <Footer/>
    </div>
    // <div style={{margin: "0", height: "100vh", backgroundColor: "green"}}>
    //   Hello
    // </div>
  );
}

export default Home;