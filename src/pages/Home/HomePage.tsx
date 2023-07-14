import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { ReactComponent as Location } from "../../assets/icons/location-crosshairs-solid.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import SelectionPanel from "./SelectionPanel";
import ClinicOption from "./ClinicComponent/ClinicOption";
import "./HomePage.css";
import SmallFooter from "../../components/SmallFooter";
import TextInput from "../../components/TextInput";
import ClinicInfoSection from "./ClinicInfoComponent/ClinicInfoSection";
import HereMapComponent from "./Map";
import { dbHandler } from "../../data/firebase";
import LoadingSpinner from "../../components/LoadingSpinner";
type Location = {
  lat: number;
  lng: number;
  distance: number;
};
type Hospital = {
  location: Location;
  info: {
    name: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    occupancy: {
      current: number;
      capacity: number;
    };
  };
};

type HospitalWithTime = Hospital & {
  totalTime: number;
  totalWaitTime: number;
  travelTime: number;
  routeDistance: number;
};
const HomePage = () => {
  const [resetInput, setResetInput] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<null | string>(
    null
  );
  const [data, setData] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(-1);
  const [topHospitals, setTopHospitals] = useState<HospitalWithTime[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dbHandler.fetchClinics().then((clinics: any) => {
      setData(clinics);
    });
  }, []);
  const [active, setActive] = useState(true);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  const handleSelectClinic = (index: number) => {
    if (selectedClinic === index) {
      setSelectedClinic(-1);
    } else {
      setSelectedClinic(index);
    }
  };

  return (
    <div>
      <Header selectedItem={"Home"} />
      <HereMapComponent
        hospitals={data}
        setTopHospitals={setTopHospitals}
        setLoading={setLoading}
      ></HereMapComponent>
      <div className="home-content">
        <TextInput
          value={emailText}
          onChange={setEmailText}
          type="Search"
          errorMessage={emailErrorMessage}
          setError={setEmailErrorMessage}
          reset={resetInput}
          setReset={setResetInput}
        />
        <SelectionPanel />
        {loading ? (
          <LoadingSpinner color={"green"} />
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {topHospitals.map((hospital, index) => (
              <div key={index} onClick={() => handleSelectClinic(index)}>
                <ClinicOption
                  name={hospital.info.name}
                  number="1"
                  distance={parseFloat(hospital.routeDistance.toFixed(2))}
                  busyness={4}
                  rating={3.5}
                  isActive={selectedClinic === index}
                />
              </div>
            ))}
          </div>
        )}
        {selectedClinic < 0 ? null : (
          <ClinicInfoSection
            name={topHospitals[selectedClinic].info.name}
            totalTime={String(topHospitals[selectedClinic].totalTime)}
            waitTime={String(topHospitals[selectedClinic].totalWaitTime)}
            travelTime={String(topHospitals[selectedClinic].travelTime)}
            email={topHospitals[selectedClinic].info.email}
            website={topHospitals[selectedClinic].info.website}
            phone={topHospitals[selectedClinic].info.phone}
            address={topHospitals[selectedClinic].info.address}
            rating={4.5}
          />
        )}
      </div>
      <SmallFooter />
    </div>
  );
};

export default HomePage;
