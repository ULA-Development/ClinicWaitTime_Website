import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
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
import ClinicList from "./ClinicList";
import { busynessSetter, Hospital, Location } from "../../assets/globals";
import {
  getCurrLocation,
  getCoordinates,
  getTopHospitals,
  sortData,
} from "../../data/mapdata";

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
      await handleCurrLocation();
    }
    try {
      const clinics = await dbHandler.fetchClinics(
        locationCoords.lat,
        locationCoords.lng
      );
      setData(clinics);
      setDataState("loaded");
      await getTopHospitals(clinics, setLoading, locationCoords).then(
        (topHospitals) => {
          setTopHospitals(topHospitals);
        }
      );
    } catch (error) {
      console.error("Failed to fetch clinics:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [locationCoords]);
  useEffect(() => {
    setSelectedClinic(-1);
    let sortedHospitals = sortData(topHospitals, activeButton);
    setTopHospitals(sortedHospitals);
  }, [activeButton]);
  useEffect(() => {
    setActive("list");
  }, [resize]);
  useEffect(() => {
    if (locationCoords.lat !== 0 || locationCoords.lng !== 0) {
      fetchCoordinates();
    }
  }, [locationAddress]);

  const handleCurrLocation = async () => {
    setLoading(true);
    await getCurrLocation()
      .then((currInfo: any) => {
        setLocationAddress("Current Location");
        setLocationCoords(currInfo.location);
      })
      .catch((error) => console.log(error));
  };

  const fetchCoordinates = async () => {
    try {
      if (locationAddress !== "Current Location" && locationAddress !== "") {
        const locationCoords = await getCoordinates(locationAddress);
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
              topHospitals={topHospitals}
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
            currLocation={handleCurrLocation}
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
                    <div className="clinic-option">
                      <ClinicList
                        hospitals={topHospitals}
                        selectedClinic={selectedClinic}
                        handleSelectClinic={handleSelectClinic}
                      />
                    </div>
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
                  topHospitals={topHospitals}
                  setLoading={setLoading}
                  UserLocation={locationCoords}
                  selectedClinic={selectedClinic}
                  setSelectedClinic={setSelectedClinic}
                  activeFilter={activeButton}
                  isMobile={0}
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
