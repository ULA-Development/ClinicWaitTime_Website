import React, { useState } from "react";
import "./HospitalComponent.css";
import BusinessMeasure from "./BusinessMeasure";
import StarRating from "./StarRating";

interface HospitalComponentProps {
  name: string;
  distance: number;
  number: string;
  busyness: number;
  rating: number;
  isActive: boolean;
}
const HospitalComponent: React.FC<HospitalComponentProps> = ({
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
      className={isActive ? "hospital-component-active" : "hospital-component"}
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

export default HospitalComponent;
