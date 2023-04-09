import React from 'react';
import { useDispatch } from 'react-redux';
import { setExpState } from './app/stateSlice';
import SurveyForm from './SurveyForm';

function UserSurvey() {
  const dispatch = useDispatch();

  return (
    <div>
      <div style={{textAlign: "center", paddingBottom: "0"}}>
        <h2>Exit Survey</h2>
      </div>
      <div>
        <SurveyForm/>
      </div>
    </div>
  )
}

export default UserSurvey;