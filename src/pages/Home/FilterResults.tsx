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
  const [resize, setResize] = useState(window.innerWidth <= 875)
  window.addEventListener("resize", () => setResize(window.innerWidth <= 75)) // 875

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
        style={resize ? {width: "95%"} : {}}
      >
        Wait Time
      </button>
      <button
        className={`filter-buttons ${
          activeButton == "travelTime" ? "active" : ""
        }`}
        onClick={handleTravelTimeClick}
        style={resize ? {width: "95%"} : {}}
      >
        Travel Time
      </button>
    </div>
  );
};

export default FilterResults;
