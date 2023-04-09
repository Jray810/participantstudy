import React from 'react';

function TestDisplay({ arr }) {
  return (
    <div style={{display: "flex"}}>
      <div>
        <b>Samples:</b>
        <br/>
        Feature 1:
        <br/>
        Feature 2:
        <br/>
        Feature 3:
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
              {sample.f1}
              <br/>
              {sample.f2}
              <br/>
              {sample.f3}
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

export default TestDisplay;