import React, { useRef, useEffect, useState } from "react";
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

  const [localValue, setLocalValue] = useState(value);

  function handleChange(input: React.ChangeEvent<HTMLInputElement>) {
    const { value } = input.target;
    setLocalValue(value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      onChange(localValue);
    }
  }

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div
      className="location-input-container"
      style={isMobile ? { width: "100%" } : { width: "515px" }}
    >
      <Search className="location-icon" onClick={() => onChange(localValue)} />
      <input
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Your location ..."
        type="text"
        className="location-input"
        autoComplete="off"
      />
      <div className="curr-loction-container" onClick={currLocation}>
        <Location className="curr-location-icon" />
      </div>
    </div>
  );
};
export default LocationInput;
