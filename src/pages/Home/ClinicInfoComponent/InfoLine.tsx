import React, { ReactComponentElement, ReactNode } from "react";
import "./InfoLine.css";

interface InfoLineProps {
  children: ReactNode;
  text?: string;
  decor?: boolean
}
const unavilableMessage = "Not currently available"
const InfoLine: React.FC<InfoLineProps> = ({ children, text = unavilableMessage, decor = true }) => {
  return (
    <div className="info-line">
      <div className="info-icon">{children}</div>
      <span className="info-text" style={(text === unavilableMessage || !decor ) ? {textDecoration: "none"} : {}}>
        {text}
      </span>
    </div>
  );
};

export default InfoLine;
