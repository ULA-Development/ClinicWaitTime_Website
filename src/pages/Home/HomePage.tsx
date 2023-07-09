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
const HomePage = () => {
  
  const [resetInput, setResetInput] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<null | string>(
    null
  );
  const [data, setData] = useState([]);
  useEffect(() => {
    dbHandler.fetchClinics().then((clinics: any) => {
    setData(clinics);
    });
    }, []);
  const [active, setActive] = useState(true)
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
  return (
    <div>
      <Header selectedItem={"Home"} />
      {/* <HereMapComponent hospitals={data}></HereMapComponent> */}
      <div className="home-content">
        {/* <TextInput
          value={emailText}
          onChange={setEmailText}
          type="Search"
          errorMessage={emailErrorMessage}
          setError={setEmailErrorMessage}
          reset={resetInput}
          setReset={setResetInput}
        />
        <SelectionPanel /> */}
        <ClinicInfoSection
          name="OCAD University - Hospital"
          totalTime="1 hr 30 min"
          waitTime="55 min"
          travelTime="35 min"
          email="medicine@utoronto.ca"
          website="www.temertymedicince.com"
          phone="(416) 996-4526"
          address="10 kings college road"
          rating={4.5}
        />
      </div>
      <SmallFooter/>

      {/* <Location
        onClick={() => handleCurrLocaiton()}
        style={{ width: "50px", height: "50px" }}
      /> */}
    </div>
  );
};

export default HomePage;
