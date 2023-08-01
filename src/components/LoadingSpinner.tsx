import React, { CSSProperties } from "react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  style?: CSSProperties;
  text?: string;
}

const LoadingSpinner = ({
  text = "Loading...",
  style,
}: LoadingSpinnerProps) => {
  return (
    <div className="loading-spinner" style={style}>
      <div className="spinner"></div>
      <div className="spinner-text">{text}</div>
    </div>
  );
};

export default LoadingSpinner;
