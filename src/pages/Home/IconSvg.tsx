import React from "react";
import "./IconSvg.css";

interface IconSvgProps {
  business: number;
  number: number;
}

const IconSvg: React.FC<IconSvgProps> = ({ business, number }) => {
  let color = "";

  if (business >= 0 && business <= 33) {
    color = "green";
  } else if (business > 33 && business <= 66) {
    color = "orange";
  } else if (business > 66 && business <= 100) {
    color = "red";
  }

  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="40" height="60"><path fill="${color}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/></svg>`;

  return (
    <svg>
      <div className="icon-svg">
        <div className="icon-circle">
          <span className="icon-number">{number}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: iconSvg }} />
      </div>
    </svg>
  );
};

export default IconSvg;
