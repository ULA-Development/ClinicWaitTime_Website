import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useSelector } from "react-redux";
import SelectionPanel from "./Selection/SelectionPanel";
import ClinicOption from "./ClinicComponent/ClinicOption";
import "./HomePage.css";
import SmallFooter from "../../components/SmallFooter";
import ClinicInfoSection from "./ClinicInfoComponent/ClinicInfoSection";
import GoogleMaps from "./Map";
import { dbHandler } from "../../data/firebase";
import LoadingSpinner from "../../components/LoadingSpinner";
import FilterResults from "./FilterResults";
import LocaitonInput from "./LocationInput";
import OptionSlider from "./OptionSlider";
import { busynessSetter, Hospital, Location } from "../../assets/globals";
import { HERE_MAPS_KEY } from "../../assets/globals";
const HomePage = () => {
  const [activeButton, setActiveButton] = useState("");
  const [locationAddress, setLocationAddress] = useState("Current Location");
  const [locationCoords, setLocationCoords] = useState<Location>({
    lat: 0,
    lng: 0,
  });
  const [data, setData] = useState<Hospital[]>([]);
  const [selectedClinic, setSelectedClinic] = useState(-1);
  const [topHospitals, setTopHospitals] = useState<Array<any>>(["waiting"]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("list");
  const [dataState, setDataState] = useState("not loaded");
  const [resize, setResize] = useState(window.innerWidth <= 990);
  window.addEventListener("resize", () => setResize(window.innerWidth <= 990));
  
  const fetchData = async () => {
    if (locationCoords.lat === 0 && locationCoords.lng === 0) {
      await getCurrLocation();
    }
    try {
      const clinics = await dbHandler.fetchClinics(
        locationCoords.lat,
        locationCoords.lng
      );
      setData(clinics);
      setDataState("loaded");
    } catch (error) {
      console.error("Failed to fetch clinics:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [locationCoords]);
  useEffect(() => {
    setSelectedClinic(-1);
  }, [activeButton]);
  useEffect(() => {
    setActive("list");
  }, [resize]);
  useEffect(() => {
    if (locationCoords.lat !== 0 || locationCoords.lng !== 0) {
      fetchCoordinates();
    }
  }, [locationAddress]);

  const getCurrLocation = () => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      // Replace YourType with the type of data you expect to resolve with
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          try {
            const apiKey = HERE_MAPS_KEY;
            const apiUrl = `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${apiKey}&at=${latitude},${longitude}`;

            const response = (await axios.get(apiUrl)).data.items[0];
            const currInfo = {
              location: {
                lat: response.position.lat,
                lng: response.position.lng,
              },
              address: response.address.label,
            };
            setLocationAddress("Current Location");
            setLocationCoords(currInfo.location);
            resolve(currInfo); // Resolve the Promise with the desired data
          } catch (error) {
            reject(error); // Reject the Promise with the error
          }
        },
        (error) => {
          reject(error); // Reject the Promise if getting the current position fails
        }
      );
    });
  };

  const fetchCoordinates = async () => {
    try {
      if (locationAddress !== "Current Location" && locationAddress !== "") {
        const locationCoords = await getCoordinates(
          locationAddress,
          setLocationAddress
        );
        setLocationCoords(locationCoords);
      } else {
        return;
      }
    } catch (error) {
      setDataState("failed");
      console.error(error);
    }
  };

  const handleSearch = () => {
    setSelectedClinic(-1);
    setActive("list");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const handleSelectClinic = (index: number) => {
    if (selectedClinic === index) {
      setSelectedClinic(-1);
    } else {
      setSelectedClinic(index);
    }
  };

  return (
    <div className="home-container">
      {!resize ? (
        <div className="map-container">
          {dataState === "not loaded" ? null : (
            <GoogleMaps
              hospitals={data}
              setTopHospitals={setTopHospitals}
              setLoading={setLoading}
              UserLocation={locationCoords}
              selectedClinic={selectedClinic}
              setSelectedClinic={setSelectedClinic}
              activeFilter={activeButton}
            ></GoogleMaps>
          )}
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
                seedState={selectedClinic}
              />
            </div>
          )}
        </div>
      ) : null}
      <Header selectedItem={"Home"} />
      <div
        className="home-content"
        style={resize ? { width: "calc(100% - 14px)" } : {}}
      >
        <div className="location-container">
          <LocaitonInput
            value={locationAddress}
            onChange={setLocationAddress}
            currLocation={getCurrLocation}
            handleSearch={handleSearch}
          />
        </div>
        <SelectionPanel />
        <FilterResults
          setActiveButton={setActiveButton}
          activeButton={activeButton}
        />
        {resize ? <OptionSlider active={active} setActive={setActive} /> : null}
        <div className="results-container">
          {!resize || (resize && active == "list") ? (
            <div className="">
              {loading ? (
                <LoadingSpinner
                  text="Locating..."
                  style={{
                    alignSelf: "center",
                    position: "absolute",
                    top: "10%",
                    left: "40%",
                  }}
                />
              ) : (
                <div>
                  {dataState == "failed" ? (
                    <div className="no-results">
                      <div style={{ display: "block" }}>
                        <span style={{ fontSize: "17px" }}>
                          No results ... try different address
                        </span>
                        <span
                          style={{
                            display: "block",
                            fontSize: "13px",
                            color: "dimgrey",
                          }}
                        >
                          make sure city is included{" "}
                        </span>
                      </div>
                    </div>
                  ) : dataState === "loaded" &&
                    topHospitals[0] !== "waiting" &&
                    topHospitals.length === 0 ? (
                    <div className="no-results">
                      <div style={{ display: "block" }}>
                        <span style={{ fontSize: "17px" }}>No results ...</span>
                        <span
                          style={{
                            display: "block",
                            fontSize: "13px",
                            color: "dimgrey",
                          }}
                        >
                          unfortunately, there no clinics in this area{" "}
                        </span>
                      </div>
                    </div>
                  ) : (
                    topHospitals.map((hospital: any, index: number) => (
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
                    ))
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="map-container-mobile">
              {dataState === "not loaded" &&
              topHospitals[0] === "waiting" &&
              data.length === 0 ? null : (
                <GoogleMaps
                  hospitals={data}
                  setTopHospitals={setTopHospitals}
                  setLoading={setLoading}
                  UserLocation={locationCoords}
                  selectedClinic={selectedClinic}
                  setSelectedClinic={setSelectedClinic}
                  activeFilter={activeButton}
                ></GoogleMaps>
              )}
              {
                selectedClinic < 0 ? null : <div>Popup</div>
                // <div className="info-popup">
                //   <ClinicInfoSection
                //     name={topHospitals[selectedClinic].info.name}
                //     totalTime={topHospitals[selectedClinic].totalTime}
                //     waitTime={topHospitals[selectedClinic].totalWaitTime}
                //     travelTime={topHospitals[selectedClinic].travelTime}
                //     email={topHospitals[selectedClinic].info.email}
                //     website={topHospitals[selectedClinic].info.website}
                //     phone={topHospitals[selectedClinic].info.phone}
                //     address={topHospitals[selectedClinic].info.address}
                //     rating={topHospitals[selectedClinic].info.rating}
                //     location={topHospitals[selectedClinic].location}
                //     currLocation={locationCoords}
                //     seedState={selectedClinic}
                //   />
                // </div>
              }
            </div>
          )}
        </div>
      </div>
      <SmallFooter />
    </div>
  );
};
export default HomePage;

export async function getCoordinates(address: string, setLocation?: any) {
  try {
    const response = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode`,
      {
        params: {
          apiKey: HERE_MAPS_KEY,
          q: address,
        },
      }
    );
    if (response.data.items.length === 0) {
      // if (!setLocation === undefined) {
      //   setLocation(null);
      // }
      throw new Error("The provided address is not valid.");
    }
    const location = response.data.items[0].position;

    return {
      lat: location.lat,
      lng: location.lng,
    } as Location;
  } catch (error) {
    // if (!setLocation === undefined) {
    //   setLocation(null);
    // }
    throw new Error(
      `Failed to get coordinates for the address: ${address}. ${error}`
    );
    // return;
  }
}
