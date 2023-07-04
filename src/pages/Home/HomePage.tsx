import React, {useEffect} from "react";
import Header from "../../components/Header/Header";
import { ReactComponent as Location } from "../../assets/icons/location-crosshairs-solid.svg";
import axios from "axios";

const Index: React.FC = () => {
  const handleClick = () => {
  //   navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
  //     console.log(position);
  // });
        navigator.geolocation.getCurrentPosition(async (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;

          try {
            const apiKey = "qnqs8KIVHizEGZrlrFdR--I0Run_DM5H5qQjoOd87NQ";
            const apiUrl = `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${apiKey}&at=${latitude},${longitude}`;
      
            const response = await axios.get(apiUrl);
            console.log(response.data);

            const address = response.data.items[0].address.label;
            console.log(address);
          } catch (error) {
            console.error("Error:", error);
          }
        });
  };

  return (
    <div>
      <Header selectedItem={"Home"} />
      Home
      <Location onClick={() => handleClick()} 
      style={{ width: "50px", height: "50px" }}/>
    </div>
  );
};

export default Index;
