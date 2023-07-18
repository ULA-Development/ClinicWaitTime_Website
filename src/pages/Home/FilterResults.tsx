import React, { useState } from "react";
import "./FilterResults.css";

interface FilterButtonProps {
  onClick: () => void;
  text: string;
  isActive: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  onClick,
  text,
  isActive,
}) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className={`filter-buttons ${isActive ? "active" : ""}`}
      onClick={handleClick}
      style={{ marginRight: "10px" }}
    >
      {text}
    </button>
  );
};

const FilterResults: React.FC = () => {
  const [activeButton, setActiveButton] = useState("Total Time");

  const handleTotalTimeClick = () => {
    setActiveButton("Total Time");
  };

  const handleTravelTimeClick = () => {
    setActiveButton("Travel Time");
  };

  return (
    <div>
      <h1 className="title-filter-results">Filter Results</h1>
      <FilterButton
        onClick={handleTotalTimeClick}
        text="Total Time"
        isActive={activeButton === "Total Time"}
      />
      <FilterButton
        onClick={handleTravelTimeClick}
        text="Travel Time"
        isActive={activeButton === "Travel Time"}
      />
    </div>
  );
};

export default FilterResults;
