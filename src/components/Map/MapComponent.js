// src/components/Map/MapComponent.js

import React, { useState } from "react";
import { ReactComponent as SouthKoreaMap } from "../../assets/korea_map.svg"; 
import regionData from "./regionData";
import "./MapComponent.css";

const MapComponent = () => {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // 지역 클릭 시 동작
  const handleRegionClick = (regionId) => {
    if (!regionId) return;
    console.log(`${regionId} 클릭됨! 해당 지역 사진첩으로 이동합니다.`);
    // TODO: 라우터 이동 (예: navigate(`/region/${regionId}`))
  };

  // 지도(path)에 마우스가 올라가거나 클릭될 때의 통합 이벤트 처리
  const handleMapInteraction = (e, type) => {
    const target = e.target;
    
    // 클릭이나 호버된 요소가 SVG의 path(지역)일 경우에만 작동
    if (target.tagName === 'path') {
      const regionId = target.id;
      if (type === 'click') {
        handleRegionClick(regionId);
      } else if (type === 'hover') {
        setHoveredRegion(regionId);
      }
    }
  };

  return (
    <div className="map-wrapper">
      <div className="map-container">
        
        <SouthKoreaMap 
          className="korea-map" 
          onClick={(e) => handleMapInteraction(e, 'click')}
          onMouseOver={(e) => handleMapInteraction(e, 'hover')}
          onMouseOut={() => setHoveredRegion(null)}
        />

        {regionData.map((region) => (
          <div
            key={region.id}
            className={`region-label ${hoveredRegion === region.id ? "hovered-text" : ""}`}
            style={{ left: `${region.x}%`, top: `${region.y}%` }}
            // 이벤트 통합을 위해 글자의 모든 onClick, onMouse~ 속성을 제거했습니다.
          >
            {region.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapComponent;