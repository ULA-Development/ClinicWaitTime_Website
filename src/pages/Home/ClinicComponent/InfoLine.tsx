import React from "react";
import "./InfoLine.css";

interface InfoLineProps {
  icon: any; // Replace 'any' with the appropriate type for the image file
  text: string;
}

const InfoLine: React.FC<InfoLineProps> = ({ icon, text }) => {
  return (
    <div className="info-line">
      <img src={icon} alt="Icon" className="info-icon" />
      <span className="info-text">{text}</span>
    </div>
  );
};

export default InfoLine;
