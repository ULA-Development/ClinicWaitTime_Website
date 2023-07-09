import React, { ReactComponentElement, ReactNode } from "react";
import "./InfoLine.css";

interface InfoLineProps {
  children: ReactNode;
  text: string;
  message: string;
}

const InfoLine: React.FC<InfoLineProps> = ({ children, text, message }) => {
  return (
    <div className="info-line">
      <div className="info-icon">{children}</div>
      <span className="info-text" onClick={() => alert(message)}>
        {text}
      </span>
    </div>
  );
};

export default InfoLine;
