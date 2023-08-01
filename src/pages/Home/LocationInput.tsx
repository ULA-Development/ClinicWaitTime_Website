import React, { useEffect, useState } from "react";
import { ReactComponent as Search } from "../../assets/icons/magnifying-glass-solid.svg";
import { ReactComponent as Location } from "../../assets/icons/location-arrow-solid.svg";
import "./LocationInput.css";

interface Props {
  onChange: (arg0: string) => void;
  currLocation: () => void;
  value: string;
  handleSearch: () => void;
  isLoading: boolean;
}

const LocationInput = ({
  value,
  onChange,
  currLocation,
  handleSearch,
  isLoading,
}: Props) => {
  const [localValue, setLocalValue] = useState(value);

  function handleChange(input: React.ChangeEvent<HTMLInputElement>) {
    const { value } = input.target;
    setLocalValue(value);
  }

  function handleKeyDown(e?: React.KeyboardEvent<HTMLInputElement>) {
    if (isLoading) {
      return;
    }
    if (e && e.key === "Enter") {
      e.preventDefault();
      handleSearch();
      onChange(localValue);
    }
    if (!e) {
      handleSearch();
      onChange(localValue);
    }
  }
  function handleCurrLocationClick() {
    if (isLoading) {
      return;
    }
    currLocation();
  }
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="location-input-container">
      <input
        value={localValue === "Current Location" ? "" : localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={
          localValue === "Current Location"
            ? "Current Location"
            : "Your location ..."
        }
        type="text"
        className="location-input"
        autoComplete="off"
      />
      <div
        className="curr-loction-container"
        onClick={() => handleCurrLocationClick()}
      >
        <Location className="curr-location-icon" />
      </div>
      <div className="search-loction-container">
        <Search className="search-icon" onClick={() => handleKeyDown()} />
      </div>
    </div>
  );
};
export default LocationInput;
