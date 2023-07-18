import React, { CSSProperties } from "react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  style?: CSSProperties;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "Loading...",
  style,
}) => {

  return (
    <div className="loading-spinner" style={style}>
      <div className="spinner"></div>
      <div className="spinner-text">{text}</div>
    </div>
  );
};

export default LoadingSpinner;
