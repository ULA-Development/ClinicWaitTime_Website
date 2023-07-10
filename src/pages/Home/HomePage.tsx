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
type HospitalWithTime = Hospital & { totalTime: number, totalWaitTime: number, travelTime: number };
const HomePage = () => {
  const [resetInput, setResetInput] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<null | string>(
    null
  );
  const [data, setData] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(-1);
  const [topHospitals, setTopHospitals] = useState<HospitalWithTime[]>([]);
  useEffect(() => {
    dbHandler.fetchClinics().then((clinics: any) => {
      setData(clinics);
    });
  }, []);
  const [active, setActive] = useState(true);
  const handleCurrLocaiton = () => {
    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        try {
          const apiKey = "qnqs8KIVHizEGZrlrFdR--I0Run_DM5H5qQjoOd87NQ";
          const apiUrl = `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${apiKey}&at=${latitude},${longitude}`;

          const response = (await axios.get(apiUrl)).data.items[0];
          const currInfo = {
            location: {
              lat: response.position.lat,
              lng: response.position.lng,
            },
            address: response.address.label,
          };
          console.log(currInfo);
        } catch (error) {
          alert(error);
        }
      }
    );
  };
  const handleSelectClinic = (index: number) => {
    if(selectedClinic === index){
      setSelectedClinic(-1)
    }else{
      setSelectedClinic(index)
    }
    
  }
  return (
    <div>
      <Header selectedItem={"Home"} />
      <HereMapComponent
        hospitals={data}
        setTopHospitals={setTopHospitals}
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          {topHospitals.map((hospital, index) => (
            <div key={index} onClick={() => handleSelectClinic(index)}>
              <ClinicOption
                name={hospital.info.name}
                number="1"
                distance={hospital.location.distance}
                busyness={4}
                rating={3.5}
                isActive={selectedClinic === index}
              />
            </div>
          ))}
        </div>
        {selectedClinic < 0 ? null :<ClinicInfoSection
          name={topHospitals[selectedClinic].info.name}
          totalTime={String(topHospitals[selectedClinic].totalTime)}
          waitTime={String(topHospitals[selectedClinic].totalWaitTime)}
          travelTime={String(topHospitals[selectedClinic].travelTime)}
          email={topHospitals[selectedClinic].info.email}
          website={topHospitals[selectedClinic].info.website}
          phone={topHospitals[selectedClinic].info.phone}
          address={topHospitals[selectedClinic].info.address}
          rating={4.5}
        />}
      </div>
      <SmallFooter />

      {/* <Location
        onClick={() => handleCurrLocaiton()}
        style={{ width: "50px", height: "50px" }}
      /> */}
    </div>
  );
};

export default HomePage;
