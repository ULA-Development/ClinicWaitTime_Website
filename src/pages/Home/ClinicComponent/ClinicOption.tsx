import React, { useState } from "react";
import "./ClinicOption.css";
import BusinessMeasure from "./BusynessIndicator";
import StarRating from "../StarRating";

interface ClinicOptionProps {
  name: string;
  distance: number;
  number: string;
  busyness: number;
  rating: number;
  isActive: boolean;
}
const ClinicOption: React.FC<ClinicOptionProps> = ({
  name,
  distance,
  number,
  busyness,
  rating,
  isActive,
}) => {
  const getColor = (busyness: number) => {
    // busyness ranges between 1 and 6
    if (busyness <= 2) {
      return "#ccdca4";
    } else if (busyness <= 4) {
      return "#f1b84a";
    } else {
      return "#e1897b";
    }
  };

  return (
    <div
      className={isActive ? "clinic-component-active" : "clinic-component"}
    >
      <div
        className="circle-num"
        style={{ backgroundColor: getColor(busyness) }}
      >
        {number}
      </div>
      <div className="clinic-info">
        <h3 style={isActive ? { color: "white" } : { color: "black" }}>
          {name}
        </h3>
        <div className="clinic-secondary-info">
          <StarRating rating={rating} />
          <p style={isActive ? { color: "white" } : { color: "black" }}>
            {distance} km
          </p>
        </div>
      </div>
      <div className="measure-bars">
        <BusinessMeasure
          busyness={busyness}
          greyBarColor={isActive ? "white" : "#e5e4e3"}
        />
      </div>
    </div>
  );
};

export default ClinicOption;
