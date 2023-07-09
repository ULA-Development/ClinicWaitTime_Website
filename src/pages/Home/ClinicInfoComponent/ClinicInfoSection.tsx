import React, { useState } from "react";
import StarRating from "../StarRating";
import "./ClinicInfoSection.css";
import ContactInfo from "./ContacInfo";
import ClinicData from "./ClinicData";

interface ClinicInfoProps {
  name: string;
  rating: number;
  waitTime: string;
  travelTime: string;
  totalTime: string;
  email: string;
  website: string;
  phone: string;
  address: string;
}

const ClinicInfoSection: React.FC<ClinicInfoProps> = ({
  name,
  waitTime,
  travelTime,
  totalTime,
  email,
  website,
  phone,
  address,
  rating,
}) => {
  const [focusData, setFocusData] = useState(true);
  return (
    <div className="info-section-container">
      <div className="clinic-info-heading">
        <h3 className="clinic-title">{name}</h3>
        <StarRating rating={rating} />
      </div>
      <div className="options">
        <div
          className={
            focusData ? "section-changer-left" : "section-changer-right"
          }
        >
          <div className="section-changer-tail-end-right" />
          <div className="section-changer-tail-right" />
          <div className="section-curve-tail-right" />
          <div className="section-changer-tail-end-left" />
          <div className="section-changer-tail-left" />
          <div className="section-curve-tail-left" />
        </div>
        <p
          style={
            focusData
              ? { marginLeft: "30px", color: "white" }
              : { marginLeft: "30px", color: "black" }
          }
          onClick={() => setFocusData(true)}
        >
          Real time data
        </p>
        <p
          style={
            focusData
              ? { marginRight: "30px", color: "black" }
              : { marginRight: "30px", color: "white" }
          }
          onClick={() => setFocusData(false)}
        >
          Contact information
        </p>
      </div>
      <div className="option-background">
        {focusData ? (
          <ClinicData
            waitTime={waitTime}
            travelTime={travelTime}
            totalTime={totalTime}
          />
        ) : (
          <ContactInfo
            email={email}
            website={website}
            phone={phone}
            address={address}
          />
        )}
      </div>
    </div>
  );
};
export default ClinicInfoSection;
