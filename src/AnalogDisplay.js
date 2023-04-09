import React from 'react';

function AnalogDisplay({ arr }) {
  return (
    <div style={{display: "flex"}}>
    <div>
      <b>Samples:</b>
      <br/>
      <img className='sample-image' src={process.env.PUBLIC_URL + '/images/blank.png'}/>
      <br/>
      <b>Classes:</b>
      <br/>
      ExprVal:
    </div>
    {
      arr.map((sample) => 
        <div>
          {
            sample.imgPath === '/images/split.png' &&
            <div style={{padding: '1.5rem 0'}}>
              <img className='sample-image' src={process.env.PUBLIC_URL + sample.imgPath}/>
            </div>
          }
          {
            sample.imgPath !== '/images/split.png' &&
            <div style={{padding: '0'}}>
              <b>Sample {sample.sample}</b>
              <br/>
              <img className='sample-image' src={process.env.PUBLIC_URL + sample.imgPath}/>
              <br/>
              <b>Class: {sample.class}</b>
              <br/>
              {sample.calcExpr}
            </div>
          }
        </div>
      )
    }
    </div>
  )
}

export default AnalogDisplay;