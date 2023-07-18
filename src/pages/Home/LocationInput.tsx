import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as Search } from "../../assets/icons/magnifying-glass-solid.svg";
import { ReactComponent as Location } from "../../assets/icons/location-arrow-solid.svg";
import { useSelector } from "react-redux";
import "./LocationInput.css";

interface Props {
  onChange: (arg0: string) => void;
  currLocation: () => void;
  value: string;
}

const LocationInput = ({ value, onChange, currLocation }: Props) => {
  const isMobile = useSelector((state: any) => state.isMobile.value);
  function handleChange(input: React.ChangeEvent<HTMLInputElement>) {
    const { value } = input.target;
    onChange(value);
  }

  return (
    <div
      className= "location-input-container"
      style={isMobile ? { width: "100%" } : { width: "515px" }}
    >
      <Search className="location-icon" />
      <input
        value={value}
        onChange={handleChange}
        placeholder="Your location ..."
        type="text"
        className="location-input"
        autoComplete="off"
      />
      <div
        className="curr-loction-container"
        onClick={() => currLocation()}
      >
        <Location className="curr-location-icon" />
      </div>
    </div>
  );
};

export default LocationInput;
