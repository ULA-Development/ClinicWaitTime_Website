import { useState } from "react";
import "./FilterResults.css";

interface FilterResultsProps {
  setActiveButton: (button: string) => void;
  activeButton: string;
}

const FilterResults = ({
  setActiveButton,
  activeButton,
}: FilterResultsProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 360);
  window.addEventListener("resize", () => setIsMobile(window.innerWidth <= 360));

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
        style={isMobile ? { width: "94%" } : {}}
      >
        Wait Time
      </button>
      <button
        className={`filter-buttons ${
          activeButton == "travelTime" ? "active" : ""
        }`}
        onClick={handleTravelTimeClick}
        style={isMobile ? { width: "94%" } : {}}
      >
        Travel Time
      </button>
    </div>
  );
};

export default FilterResults;
