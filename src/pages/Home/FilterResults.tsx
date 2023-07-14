import React, {useState} from "react";
import "./FilterResults.css";

interface FilterButtonProps {
    onClick: () => void;
    text: string;
    isActive: boolean;
  }
  
  const FilterButton: React.FC<FilterButtonProps> = ({ onClick, text, isActive }) => {
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
    const [activeButton, setActiveButton] = useState("");

    const handleTravelTimeClick = () => {
        console.log("Travel Time button clicked!");
        setActiveButton("Travel Time");
  };

    const handleWaitTimeClick = () => {
        console.log("Wait Time button clicked!");
        setActiveButton("Wait Time");
  };

  return (
    <div>
      <h1 className="title-filter-results">Filter Results</h1>
      <FilterButton 
        onClick={handleTravelTimeClick} 
        text="Travel Time"
        isActive={activeButton === "Travel Time"}
      />
      <FilterButton 
        onClick={handleWaitTimeClick} 
        text="Wait Time" 
        isActive={activeButton === "Wait Time"}
        />
    </div>
  );
};

export default FilterResults;
