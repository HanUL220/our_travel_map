// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MapComponent from './components/Map/MapComponent';
import SeoulMapComponent from './components/Map/SeoulMapComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 기본 주소일 때는 전국 지도 */}
          <Route path="/" element={<MapComponent />} />
          
          {/* /seoul 주소일 때는 서울 상세 지도 */}
          <Route path="/seoul" element={<SeoulMapComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;