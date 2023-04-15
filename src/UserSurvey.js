import React from 'react';
import { useSelector } from 'react-redux';
import SurveyForm from './SurveyForm';

function UserSurvey() {
  const checkpointData = useSelector((state) => state.checkpoints.value);
  const keypressData = useSelector((state) => state.keypresses.value);
  const statData = useSelector((state) => state.statPackage.value);

  return (
    <div>
      <div style={{textAlign: "center", paddingBottom: "0"}}>
        <h2>Exit Survey</h2>
      </div>
      <div>
        <SurveyForm checkpointData={checkpointData} keypressData={keypressData} statData={statData}/>
      </div>
    </div>
  )
}

export default UserSurvey;