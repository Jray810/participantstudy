import React from 'react';
import bulb from './static/images/bulb.png';

function Thanks() {
  return (
    <div style={{margin: "auto"}}>
      <div style={{textAlign: "center"}}>
        <img src={bulb} style={{width: '50px'}}/>
      </div>
      <div style={{textAlign: "center"}}>
        Thank you for participating in this study! 
        <br/>
        This study was conducted as a part of Georgia Institute of Technology's Cognitive Science course taught by Prof. Ashok Goel.
      </div>
    </div>
  );
}

export default Thanks;