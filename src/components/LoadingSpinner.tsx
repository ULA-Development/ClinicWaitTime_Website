import React from "react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  color = "green",
  text = "Loading...",
}) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderTopColor: color,
  };

  return (
    <div className="loading-spinner">
      <div className="spinner" style={spinnerStyle}></div>
      <div className="spinner-text">{text}</div>
    </div>
  );
};

export default LoadingSpinner;
