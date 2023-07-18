import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { ReactComponent as Location } from "../../assets/icons/location-arrow-solid.svg";
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
import FilterResults from "./FilterResults";
type Location = {
  lat: number;
  lng: number;
};
type Hospital = {
  location: Location;
  info: {
    name: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    rating: number;
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
  const [location, setLocation] = useState("");
  const [locationErrorMessage, setLocationErrorMessage] = useState<
    null | string
  >(null);
  const [data, setData] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(-1);
  const [topHospitals, setTopHospitals] = useState<HospitalWithTime[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dbHandler.fetchClinics().then((clinics: any) => {
      setData(clinics);
    });
  }, []);
  const handleCurrLocaiton = () => {
    console.log("press");
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
          setLocation(currInfo.address);
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
    if (time < 15) {
      return 1;
    } else if (time < 25) {
      return 2;
    } else if (time < 35) {
      return 3;
    } else if (time < 45) {
      return 4;
    } else if (time < 60) {
      return 5;
    } else {
      return 6;
    }
  };
  return (
    <div className="home-container">
      <div className="map-container">
        <HereMapComponent
          hospitals={data}
          setTopHospitals={setTopHospitals}
          setLoading={setLoading}
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
              rating={topHospitals[selectedClinic].info.rating}
            />
          </div>
        )}
      </div>
      <Header selectedItem={"Home"} />
      <HereMapComponent
        hospitals={data}
        setTopHospitals={setTopHospitals}
        setLoading={setLoading}
      ></HereMapComponent>
      <div className="home-content">
        <div className="location-container">
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
            className="location-icon"
          />
        </div>
        <SelectionPanel />
        <FilterResults />
        <div className="results-container">
          {loading ? (
            <LoadingSpinner
              text="Locating..."
              style={{ left: "123px", position: "absolute", top: "40px" }}
            />
          ) : (
            <div>
              {topHospitals.map((hospital, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectClinic(index)}
                  className="clinic-option"
                >
                  <ClinicOption
                    name={hospital.info.name}
                    number={String(index + 1)}
                    distance={hospital.routeDistance}
                    busyness={busynessSetter(hospital.totalTime)}
                    rating={hospital.info.rating}
                    isActive={selectedClinic === index}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <SmallFooter />
    </div>
  );
};

export default HomePage;
