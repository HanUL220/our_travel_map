// src/components/Map/SeoulMapComponent.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🔥 라우터 훅 추가
import { ReactComponent as SeoulMap } from '../../assets/seoul.svg';
import seoulRegionData from './seoulRegionData'; 
import './DetailMap.css'; 

const SeoulMapComponent = () => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const navigate = useNavigate(); // 🔥 페이지 이동 함수

  const handleMapInteraction = (e, type) => {
    const target = e.target.closest('path') || e.target.closest('polygon') || e.target.closest('g');
    if (!target) return;

    const regionId = String(target.id);

    if (type === 'click') {
      console.log("클릭한 구역 ID:", regionId);
    } else if (type === 'hover') {
      setHoveredRegion(regionId);
    }
  };

  return (
    <div className="detail-fullscreen-wrapper fade-in">
      {/* 🔥 브라우저 히스토리 기능을 써서 진짜 전국지도('/')로 돌아감 */}
      <button onClick={() => navigate('/')} className="detail-back-btn">
        ← 전국 지도로 돌아가기
      </button>
      
      <div className="detail-map-container">
        <SeoulMap 
          className="detail-full-map" 
          onClick={(e) => handleMapInteraction(e, 'click')}
          onMouseOver={(e) => handleMapInteraction(e, 'hover')}
          onMouseOut={() => setHoveredRegion(null)}
        />

        {seoulRegionData.map((region) => (
          <div
            key={region.id}
            className={`region-label ${hoveredRegion === region.id ? "hovered-text" : ""}`}
            style={{ left: `${region.x}%`, top: `${region.y}%` }}
            onClick={() => handleMapInteraction({ target: { closest: () => ({ id: region.id }) } }, 'click')}
          >
            {region.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeoulMapComponent;