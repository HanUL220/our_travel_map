// src/components/Map/SeoulMapComponent.js

import React, { useState } from 'react';
import { ReactComponent as SeoulMap } from '../../assets/seoul.svg'; // 변경하신 파일명
import seoulRegionData from './seoulRegionData'; 
import './DetailMap.css'; // 🔥 새로 만든 공통 CSS 적용

const SeoulMapComponent = ({ onBack }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const handleMapInteraction = (e, type) => {
    // SVG에 따라 path로 그려지기도 하고 polygon으로 그려지기도 합니다
    const target = e.target.closest('path') || e.target.closest('polygon');
    if (!target) return;

    const regionId = String(target.id);

    if (type === 'click') {
      console.log("클릭한 구역 ID:", regionId);
      // alert(`${regionId} 클릭됨!`);
    } else if (type === 'hover') {
      setHoveredRegion(regionId);
    }
  };

  return (
    <div className="detail-fullscreen-wrapper fade-in">
      <button onClick={onBack} className="detail-back-btn">
        ← 전국 지도로 돌아가기
      </button>
      
      {/* 이 컨테이너가 SVG 크기에 딱 맞게 조여져서 라벨 위치가 고정됩니다 */}
      <div className="detail-map-container">
        <SeoulMap 
          className="detail-full-map" 
          onClick={(e) => handleMapInteraction(e, 'click')}
          onMouseOver={(e) => handleMapInteraction(e, 'hover')}
          onMouseOut={() => setHoveredRegion(null)}
        />

        {/* 🗺️ 서울 지역명 라벨 띄우기 */}
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