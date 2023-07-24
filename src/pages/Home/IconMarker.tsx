import React from "react";
import "./IconMarker.css";

interface IconMarkerProps {
  business: number;
  number: string; // Assuming number will be a string value
}

const IconMarker: React.FC<IconMarkerProps> = ({ business, number }) => {
  let color = "green";

  if (business > 33 && business <= 66) {
    color = "orange";
  } else if (business > 66) {
    color = "red";
  }

  return (
    <div className="icon-container">
      <div
        className="marker"
        dangerouslySetInnerHTML={{
          __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="40" height="60"><path fill="${color}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/></svg>`,
        }}
      />
      <div className="circle">
        <span className="number">{number}</span>
      </div>
    </div>
  );
};

export default IconMarker;
