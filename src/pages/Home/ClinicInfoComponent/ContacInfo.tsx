import React from "react";
import StarRating from "../StarRating";
import "./ContactInfo.css";
import InfoLine from "./InfoLine";
import { ReactComponent as EmailIcon } from "../../../assets/icons/envelope-solid.svg";
import { ReactComponent as LinkIcon } from "../../../assets/icons/link-solid.svg";
import { ReactComponent as PhoneIcon } from "../../../assets/icons/phone-solid.svg";
import { ReactComponent as MapIcon } from "../../../assets/icons/map-location-dot-solid.svg";
import { ReactComponent as HoursIcon } from "../../../assets/icons/calendar-week-solid.svg";

interface ClinicInfoProps {
  email?: string;
  phone?: string;
  website?: string;
  address: string;
}

const ContactInfo: React.FC<ClinicInfoProps> = ({
  email,
  phone,
  website,
  address,
}) => {
  return (
    <div className="center-container">
      <div className="contact-info-container">
        <InfoLine text={email}>
          <EmailIcon />
        </InfoLine>
        <InfoLine text={website}>
          <LinkIcon />
        </InfoLine>
        <InfoLine text={phone}>
          <PhoneIcon />
        </InfoLine>
        <InfoLine text={address}>
          <MapIcon />
        </InfoLine>
        <InfoLine text={"9am - 6pm | Monday - Friday"} decor={false}>
          <HoursIcon/>
        </InfoLine>
      </div>
    </div>
  );
};
export default ContactInfo;
