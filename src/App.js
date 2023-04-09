import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Testing from './Testing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = '/' element={<Home/>}/>
        <Route path = '/runtestsuite' element={<Testing/>}/>
      </Routes>
    </Router>
  );
}

export default App;
