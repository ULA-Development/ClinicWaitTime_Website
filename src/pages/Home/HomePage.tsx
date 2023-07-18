import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useSelector } from "react-redux";
import SelectionPanel from "./SelectionPanel";
import ClinicOption from "./ClinicComponent/ClinicOption";
import "./HomePage.css";
import SmallFooter from "../../components/SmallFooter";
import ClinicInfoSection from "./ClinicInfoComponent/ClinicInfoSection";
import HereMapComponent from "./Map";
import { dbHandler } from "../../data/firebase";
import LoadingSpinner from "../../components/LoadingSpinner";
import FilterResults from "./FilterResults";
import LocaitonInput from "./LocationInput";
import { set } from "firebase/database";
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
  // The location of the origin as a string
  const [locationAddress, setLocationAddress] = useState("");
  // The location of the origin as a lat lng object
  const [locationCoords, setLocationCoords] = useState<Location>({
    lat: 0,
    lng: 0,
  });
  const [data, setData] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(-1);
  const [topHospitals, setTopHospitals] = useState<HospitalWithTime[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dbHandler.fetchClinics().then((clinics: any) => {
      setData(clinics);
      handleCurrLocaiton();
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
          setLocationAddress(currInfo.address);
          setLocationCoords(currInfo.location);
        } catch (error) {
          alert(error);
        }
      }
    );
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const locationCoords = await getCoordinates(
          locationAddress,
          setLocationAddress
        );
        if (!locationCoords) {
          return;
        }
        console.log(locationCoords);
        setLocationCoords(locationCoords);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoordinates();
  }, [locationAddress]);

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
          key={JSON.stringify(locationCoords)}
          hospitals={data}
          setTopHospitals={setTopHospitals}
          setLoading={setLoading}
          UserLocation={locationCoords}
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
              location={topHospitals[selectedClinic].location}
              currLocation={locationCoords}
            />
          </div>
        )}
      </div>
      <Header selectedItem={"Home"} />
      <div className="home-content">
        <div className="location-container">
          <LocaitonInput
            value={locationAddress}
            onChange={setLocationAddress}
            currLocation={handleCurrLocaiton}
          />
        </div>
        <SelectionPanel />
        <FilterResults />
        <div className="results-container">
          {loading ? (
            <LoadingSpinner
              text="Locating..."
              style={{ alignSelf: "center", position: "absolute", top: "40px" }}
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

async function getCoordinates(address: string, setLocation: any) {
  try {
    const response = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode`,
      {
        params: {
          apiKey: "qnqs8KIVHizEGZrlrFdR--I0Run_DM5H5qQjoOd87NQ",
          q: address,
        },
      }
    );
    if (response.data.items.length === 0) {
      setLocation(null);
      throw new Error("The provided address is not valid.");
    }
    const location = response.data.items[0].position;

    return {
      lat: location.lat,
      lng: location.lng,
    } as Location;
  } catch (error) {
    setLocation(null);
    throw new Error(
      `Failed to get coordinates for the address: ${address}. ${error}`
    );
    return;
  }
}
