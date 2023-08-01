import { useEffect, useState } from "react";
import { ReactComponent as CloseIcon } from "../../../assets/icons/times-solid.svg";
import StarRating from "../StarRating";
import ContactInfo from "./ContacInfo";
import ClinicData from "./ClinicData";
import "./ClinicInfoSection.css";
import { Hospital, HospitalWithTime } from "../../../assets/globals";

interface ClinicInfoProps {
  data: HospitalWithTime;
  currLocation: Location;
  seedState?: number;
  isMobile?: boolean;
  setShowInfo: (arg0: boolean) => void;
}
type Location = {
  lat: number;
  lng: number;
};

const ClinicInfoSection = ({
  data,
  currLocation,
  seedState,
  isMobile = false,
  setShowInfo,
}: ClinicInfoProps) => {
  const [focusData, setFocusData] = useState(true);
  const [hourly, setHourly] = useState(hourlyData());
  function hourlyData() {
    let test: any = [];
    for (var i = 0; i < 5; i++) {
      test.push(Math.floor(Math.random() * (60 - 15 + 1) + 15));
    }
    return test;
  }

  useEffect(() => {
    setHourly(hourlyData);
    setFocusData(true);
  }, [seedState]);

  return (
    <div className="info-section-container">
      {!isMobile ? null : (
        <CloseIcon
          className="clinic-close-button"
          onClick={() => setShowInfo(false)}
        />
      )}
      <div className="clinic-info-heading">
        <h3 className="clinic-title">{data.info.name}</h3>
        <StarRating rating={data.info.rating} />
      </div>
      <div className="options">
        <div
          className={
            focusData ? "section-changer-left" : "section-changer-right"
          }
        >
          <div
            className={`section-changer-tail-end-right ${
              focusData ? "active" : ""
            }`}
          />
          <div
            className={`section-changer-tail-right ${
              focusData ? "active" : ""
            }`}
          />
          <div
            className={`section-curve-tail-right ${focusData ? "active" : ""}`}
          />
          <div
            className={` section-changer-tail-end-left ${
              focusData ? "" : "active"
            }`}
          />
          <div
            className={`section-changer-tail-left ${focusData ? "" : "active"}`}
          />
          <div
            className={`section-curve-tail-left ${focusData ? "" : "active"}`}
          />
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
            data={data}
            currLocation={currLocation}
            hourlyData={hourly}
          />
        ) : (
          <ContactInfo data={data} />
        )}
      </div>
    </div>
  );
};
export default ClinicInfoSection;
