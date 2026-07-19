// src/components/Map/MapComponent.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 뒤로/앞으로 가기 지원을 위한 훅
import { ReactComponent as SouthKoreaMap } from "../../assets/korea_map.svg"; 
import regionData from "./regionData";
import "./MapComponent.css";

const MapComponent = () => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [zoomingRegion, setZoomingRegion] = useState(null);
  
  const navigate = useNavigate(); // 🔥 페이지 이동 함수

  const handleMapInteraction = (e, type) => {
    const target = e.target.closest('path') || e.target.closest('g');
    if (!target) return;

    const regionId = String(target.id);
    
    if (type === 'click') {
      const isSeoul = regionId.includes("Seoul") || 
                      regionId.includes("seoul") || 
                      regionId.includes("서울") || 
                      regionId.includes("C11C");

      if (isSeoul) {
        setZoomingRegion("Seoul"); 
        
        // 🔥 줌인 애니메이션 진행 후, 진짜 /seoul 주소로 이동시킴
        setTimeout(() => {
          navigate("/seoul");
        }, 600); 
      } else {
        alert("현재 서울 지역만 구현되어 있습니다.");
      }
    } else if (type === 'hover') {
      setHoveredRegion(regionId);
    }
  };

  return (
    <div className="map-wrapper">
      <div 
        className={`map-container ${zoomingRegion ? 'zoom-active' : ''}`}
        style={
          zoomingRegion === 'Seoul' 
            ? { transformOrigin: '32.5% 19.5%' } 
            : {}
        }
      >
        <SouthKoreaMap 
          className="korea-map" 
          onClick={(e) => handleMapInteraction(e, 'click')}
          onMouseOver={(e) => handleMapInteraction(e, 'hover')}
          onMouseOut={() => setHoveredRegion(null)}
        />

        {regionData.map((region) => (
          <div
            key={region.id}
            className={`region-label ${hoveredRegion === region.id ? "hovered-text" : ""} ${zoomingRegion ? "fade-out" : ""}`}
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

export default MapComponent;