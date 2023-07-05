import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import { ReactComponent as Location } from "../../assets/icons/location-crosshairs-solid.svg";
import axios from "axios";
import { dbHandler } from "../../data/firebase";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isMobile = useSelector((state: any) => state.isMobile.value);
  useEffect(() => {
    dbHandler.fetchClinics();
  }, []);
  const handleClick = () => {
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
      <Location
        onClick={() => handleClick()}
        style={{ width: "50px", height: "50px" }}
      />
      {isMobile ? <p>Mobile</p> : <p>Desktop</p>}
    </div>
  );
};

export default HomePage;
