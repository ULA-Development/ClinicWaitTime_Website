import React, { ReactComponentElement, ReactNode } from "react";
import "./InfoLine.css";

interface InfoLineProps {
  children: ReactNode;
  text?: string;
  message: string;
}
const unavilableMessage = "Not currently available"
const InfoLine: React.FC<InfoLineProps> = ({ children, text = unavilableMessage, message }) => {
  return (
    <div className="info-line">
      <div className="info-icon">{children}</div>
      <span className="info-text" style={text === unavilableMessage ? {textDecoration: "none"} : {}}onClick={() => alert(message)}>
        {text}
      </span>
    </div>
  );
};

export default InfoLine;
