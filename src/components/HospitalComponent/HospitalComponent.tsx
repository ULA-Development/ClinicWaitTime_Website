import React, { useState } from "react";
import "./HospitalComponent.css";
import BusinessMeasure from "./BusinessMeasure";
import linkIcon from "../../assets/icons/link-solid.svg";
import mapIcon from "../../assets/icons/map-location-dot-solid.svg";
import phoneIcon from "../../assets/icons/phone-solid.svg";
import emailIcon from "../../assets/icons/envelope-solid.svg";
import closeIcon from "../../assets/icons/chevron-up-solid.svg";
import InfoLine from "./InfoLine";
import StarRating from "./StarRating";
import InfoScroll from "./InfoScroll";

interface HospitalComponentProps {
  hospital: string;
  distance: string;
  number: string;
  business: number;
  email: string;
  phone: string;
  website: string;
  address: string;
  rating: number;
}

const HospitalComponent: React.FC<HospitalComponentProps> = ({
  hospital,
  distance,
  number,
  business,
  email,
  phone,
  website,
  address,
  rating,
}) => {
  const [dropdownActive, setDropdownActive] = useState(false);

  const toggleDropdown = () => {
    setDropdownActive((prevActive) => !prevActive);
  };

  const getColor = (business: number) => {
    const green = [0, 175, 0];
    const red = [175, 0, 0];
    const ratio = business / 100;
    const color = green.map((value, index) =>
      Math.round(value + (red[index] - value) * ratio)
    );
    return `rgb(${color.join(",")})`;
  };

  const circleStyle = {
    backgroundColor: getColor(business),
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "20px",
  };

  const dropdownStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "400px", // Set the maximum width to match HospitalComponent
    height: dropdownActive ? "200px" : "0",
    opacity: dropdownActive ? 1 : 0,
    visibility: dropdownActive ? "visible" : "hidden",
    transition: "height 0.4s ease, opacity 0.4s ease, visibility 0.4s ease", // Add visibility to the transition
    display: "flex", // Use flexbox
    flexDirection: "column", // Align items vertically
    alignItems: "stretch", // Stretch items to fill the width
  };

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className={`hospital-component ${
        dropdownActive ? "dropdown-active" : ""
      }`}
      onClick={toggleDropdown}
    >
      <div style={circleStyle}>{number}</div>
      <div className="hospital-distance-container">
        <div className="hospital-text">{hospital}</div>
        <div className="distance-text">{distance}</div>
      </div>
      <div className="measure-bars">
        <BusinessMeasure business={business} />
      </div>
      <div
        className="dropdown-content"
        style={dropdownStyle}
        onClick={stopPropagation}
      >
        <div className="dropdown-line">
          <div className="dropdown-left">
            <InfoScroll texts={["A", "B", "C"]} />
          </div>
          <div className="dropdown-right">
            <InfoLine icon={emailIcon} text={email} />
            <InfoLine icon={phoneIcon} text={phone} />
            <InfoLine icon={linkIcon} text={website} />
            <InfoLine icon={mapIcon} text={address} />
            <StarRating rating={rating} />
            <img
              src={closeIcon}
              alt="Close"
              className="close-icon"
              onClick={toggleDropdown}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalComponent;
