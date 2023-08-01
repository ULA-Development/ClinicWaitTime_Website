import React from "react";
import { ReactComponent as EmailIcon } from "../../../assets/icons/envelope-solid.svg";
import { ReactComponent as LinkIcon } from "../../../assets/icons/link-solid.svg";
import { ReactComponent as PhoneIcon } from "../../../assets/icons/phone-solid.svg";
import { ReactComponent as MapIcon } from "../../../assets/icons/map-location-dot-solid.svg";
import { ReactComponent as HoursIcon } from "../../../assets/icons/calendar-week-solid.svg";
import InfoLine from "./InfoLine";
import { Hospital } from "../../../assets/globals";
import "./ContactInfo.css";


interface ClinicInfoProps {
  data: Hospital;
}

const ContactInfo = ({ data }: ClinicInfoProps) => {
  return (
    <div className="center-container">
      <div className="contact-info-container">
        <InfoLine text={data.info.email}>
          <EmailIcon />
        </InfoLine>
        <InfoLine text={data.info.website}>
          <LinkIcon />
        </InfoLine>
        <InfoLine text={data.info.phone}>
          <PhoneIcon />
        </InfoLine>
        <InfoLine text={data.info.address}>
          <MapIcon />
        </InfoLine>
        <InfoLine text={data.info.hours} decor={false}>
          <HoursIcon />
        </InfoLine>
      </div>
    </div>
  );
};
export default ContactInfo;
