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
type HospitalWithTime = Hospital & {
  totalTime: number;
  totalWaitTime: number;
  travelTime: number;
};
const HomePage = () => {
  const [resetInput, setResetInput] = useState(false);
  const [location, setLocation] = useState("");
  const [locationErrorMessage, setLocationErrorMessage] = useState<null | string>(
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
  const handleCurrLocaiton = () => {
    console.log("press")
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
          setLocation(currInfo.address)
        } catch (error) {
          alert(error);
        }
      }
    );
  };
  const handleSelectClinic = (index: number) => {
    if (selectedClinic === index) {
      setSelectedClinic(-1);
    } else {
      setSelectedClinic(index);
    }
  };
  const busynessSetter = (time: number) => {
    if(time < 15){
      return 1
    }else if(time < 25){
      return 2
    }else if (time < 35){
      return 3
    }else if (time < 45){
      return 4
    }else if (time < 60){
      return 5
    }else{
      return 6
    }
  } 
  return (
    <div className="home-container">
      <div className="map-container">
        <HereMapComponent
          hospitals={data}
          setTopHospitals={setTopHospitals}
        ></HereMapComponent>
        {selectedClinic < 0 ? null : (
          <div className="info-popup">
            <ClinicInfoSection
              name={topHospitals[selectedClinic].info.name}
              totalTime={topHospitals[selectedClinic].totalTime}
              waitTime={topHospitals[selectedClinic].totalWaitTime}
              travelTime={topHospitals[selectedClinic].travelTime}
              email={topHospitals[selectedClinic].info.email}
              website={topHospitals[selectedClinic].info.website}
              phone={topHospitals[selectedClinic].info.phone}
              address={topHospitals[selectedClinic].info.address}
              rating={4.5}
            />
          </div>
        )}
      </div>
      <Header selectedItem={"Home"} />

      <div className="home-content">
        <div style={{display: "flex", alignItems:"center"}}>
          <TextInput
            value={location}
            onChange={setLocation}
            type="Search"
            errorMessage={locationErrorMessage}
            setError={setLocationErrorMessage}
            reset={resetInput}
            setReset={setResetInput}
          />
          <Location
            onClick={() => handleCurrLocaiton()}
            style={{ width: "40px", height: "40px", marginLeft:"10px" }}
          />
        </div>

        <SelectionPanel />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "0px",
          }}
        >
          {topHospitals.map((hospital, index) => (
            <div
              key={index}
              onClick={() => handleSelectClinic(index)}
              className="clinic-option"
            >
              <ClinicOption
                name={hospital.info.name}
                number={String(index + 1)}
                distance={hospital.location.distance}
                busyness={busynessSetter(hospital.totalTime)}
                rating={3.5}
                isActive={selectedClinic === index}
              />
            </div>
          ))}
        </div>
      </div>
      <SmallFooter />
    </div>
  );
};

export default HomePage;
