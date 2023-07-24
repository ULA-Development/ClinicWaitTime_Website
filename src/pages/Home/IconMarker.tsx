import React, { useState } from "react";
import "./IconMarker.css";

interface IconMarkerProps {
  busyness: number;
  index: number;
}

const IconMarker: React.FC<IconMarkerProps> = ({ busyness = 3, index}) => {
  const [active, setActive] = useState(false)
  const getColor = () => {
    // busyness ranges between 1 and 6
    if (busyness <= 2) {
      return "#ccdca4";
    } else if (busyness <= 4) {
      return "#f1b84a";
    } else {
      return "#e1897b";
    }
  };


  return (
    <div
    onClick={() => setActive(!active)} 
    className={active ? "icon-container-active" : "icon-container"}>
      <div
        className="marker"
        dangerouslySetInnerHTML={{
          __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="40" height="60"><path fill="${getColor()}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/></svg>`,
        }}
      />
      <div className="circle">
        <span className="number">{index + 1}</span>
      </div>
    </div>
  );
};

export default IconMarker;
