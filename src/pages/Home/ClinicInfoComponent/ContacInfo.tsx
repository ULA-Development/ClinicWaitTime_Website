import React from "react";
import StarRating from "../StarRating";
import "./ContactInfo.css";
import InfoLine from "./InfoLine";
import { ReactComponent as EmailIcon } from "../../../assets/icons/envelope-solid.svg";
import { ReactComponent as LinkIcon } from "../../../assets/icons/link-solid.svg";
import { ReactComponent as PhoneIcon } from "../../../assets/icons/phone-solid.svg";
import { ReactComponent as MapIcon } from "../../../assets/icons/map-location-dot-solid.svg";

interface ClinicInfoProps {
  email?: string;
  phone?: string;
  website?: string;
  address: string;
  location: Location;
  currLocation: Location;
}
type Location = {
  lat: number;
  lng: number;
};

const ContactInfo: React.FC<ClinicInfoProps> = ({
  email,
  phone,
  website,
  address,
  location,
  currLocation,
}) => {
  const directionUrl = `https://www.google.com/maps/dir/?api=1&origin=${currLocation.lat},${currLocation.lng}&destination=${location.lat},${location.lng}`;
  return (
    <div className="center-container">
      <div className="contact-info-container">
        <InfoLine text={email} message="Email">
          <EmailIcon />
        </InfoLine>
        <InfoLine text={website} message="Website">
          <LinkIcon />
        </InfoLine>
        <InfoLine text={phone} message="Phone">
          <PhoneIcon />
        </InfoLine>
        <InfoLine text={address} message="Address - Copied">
          <MapIcon />
        </InfoLine>
        <div
          className="directions-button"
          onClick={() => window.open(directionUrl, "_blank")}
        >
          Get directions
        </div>
      </div>
    </div>
  );
};
export default ContactInfo;
