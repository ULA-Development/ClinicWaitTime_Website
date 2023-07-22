import React, { useState } from "react";
import "./FilterResults.css";

interface FilterResultsProps {
  setActiveButton: (button: string) => void;
  activeButton: string;
}

const FilterResults: React.FC<FilterResultsProps> = ({
  setActiveButton,
  activeButton,
}) => {
  const handleWaitTimeClick = () => {
    if (activeButton == "waitTime") {
      setActiveButton("");
    } else {
      setActiveButton("waitTime");
    }
  };

  const handleTravelTimeClick = () => {
    if (activeButton == "travelTime") {
      setActiveButton("");
    } else {
      setActiveButton("travelTime");
    }
  };

  return (
    <div>
      <h1 className="title-filter-results">Filter Results</h1>
      <button
        className={`filter-buttons ${
          activeButton == "waitTime" ? "active" : ""
        }`}
        onClick={handleWaitTimeClick}
        style={{ marginRight: "10px" }}
      >
        Wait Time
      </button>
      <button
        className={`filter-buttons ${
          activeButton == "travelTime" ? "active" : ""
        }`}
        onClick={handleTravelTimeClick}
        style={{ marginRight: "10px" }}
      >
        Travel Time
      </button>
    </div>
  );
};

export default FilterResults;
