import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { ReactComponent as Location } from "../../assets/icons/location-crosshairs-solid.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import SelectionPanel from "./SelectionPanel";
import HospitalComponent from "../../components/HospitalComponent/HospitalComponent";
import "./HomePage.css";
import SmallFooter from "../../components/SmallFooter";
import TextInput from "../../components/TextInput";
import StarRating from "../../components/HospitalComponent/StarRating";
const HomePage = () => {
  const isMobile = useSelector((state: any) => state.isMobile.value);
  const [resetInput, setResetInput] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<null | string>(
    null
  );
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
      {isMobile ? null : <Header selectedItem={"Home"} />}
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
        <HospitalComponent
          name="OCAD University - Hospital"
          distance={5.3}
          number="1"
          busyness={2}
          rating={4}
          isActive={active}
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
