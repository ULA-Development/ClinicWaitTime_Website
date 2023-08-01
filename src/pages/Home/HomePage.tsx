import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import SelectionPanel from "./Selection/SelectionPanel";
import SmallFooter from "../../components/SmallFooter";
import ClinicInfoSection from "./ClinicInfoComponent/ClinicInfoSection";
import LoadingSpinner from "../../components/LoadingSpinner";
import FilterResults from "./FilterResults";
import LocaitonInput from "./LocationInput";
import OptionSlider from "./OptionSlider";
import ClinicList from "./ClinicList";
import GoogleMaps from "./Map";
import { dbHandler } from "../../data/firebase";
import { Hospital, Location } from "../../assets/globals";
import {
  getCurrLocation,
  getCoordinates,
  getTopHospitals,
  sortData,
} from "../../data/mapdata";
import "./HomePage.css";

const HomePage = () => {
  const [showMore, setShowMore] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [locationAddress, setLocationAddress] = useState("Current Location");
  const [locationCoords, setLocationCoords] = useState<Location>({
    lat: 0,
    lng: 0,
  });
  const [selectedClinic, setSelectedClinic] = useState(-1);
  const [showInfo, setShowInfo] = useState(selectedClinic >= 0);
  const [topHospitals, setTopHospitals] = useState<Array<any>>(["waiting"]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("list");
  const [dataState, setDataState] = useState("not loaded");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 990);
  window.addEventListener("resize", () => {
    setIsMobile(window.innerWidth <= 990);
  });

  async function fetchData() {
    if (locationCoords.lat === 0 && locationCoords.lng === 0) {
      await handleCurrLocation();
    }
    try {
      const clinics = await dbHandler.fetchClinics(
        locationCoords.lat,
        locationCoords.lng
      );
      setDataState("loaded");
      await getTopHospitals(clinics, setLoading, locationCoords).then(
        (topHospitals) => {
          setTopHospitals(topHospitals);
        }
      );
    } catch (error) {
      alert(
        "Error occured, sorry for the inconvenince. Please try again later"
      );
    }
  }
  async function handleCurrLocation() {
    setLoading(true);
    await getCurrLocation()
      .then((currInfo: any) => {
        setLocationAddress("Current Location");
        setLocationCoords(currInfo.location);
      })
      .catch(() => alert("Can't find current locaiton. Try again later"));
  }
  async function fetchCoordinates() {
    try {
      if (locationAddress !== "Current Location" && locationAddress !== "") {
        const locationCoords = await getCoordinates(locationAddress);
        setLocationCoords(locationCoords);
      } else {
        return;
      }
    } catch (error) {
      setDataState("failed");
    }
  }
  function handleSearch() {
    setSelectedClinic(-1);
    setActive("list");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
  function handleSelectClinic(index: number) {
    if (selectedClinic === index) {
      if (isMobile) {
        setShowInfo(true);
      } else {
        setSelectedClinic(-1);
      }
    } else {
      setSelectedClinic(index);
    }
  }
  const listSection = () => {
    // LOADING DATA
    if (loading) {
      return (
        <LoadingSpinner
          text="Locating..."
          style={{
            alignSelf: "center",
            marginTop: "30px",
            left: "40%",
          }}
        />
      );
      // BAD LOCATION INPUT
    } else if (dataState === "failed") {
      return (
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
      );
      // NO CLINIC NEAR BY
    } else if (
      dataState === "loaded" &&
      topHospitals[0] !== "waiting" &&
      topHospitals.length === 0
    ) {
      return (
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
      );
      // RESULTS
    } else {
      return (
        <div className="clinic-option">
          <ClinicList
            topHospitals={topHospitals}
            displayedHospitals={
              !showMore ? topHospitals.slice(0, 5) : topHospitals
            }
            setShowMore={setShowMore}
            showMore={showMore}
            selectedClinic={selectedClinic}
            handleSelectClinic={handleSelectClinic}
          />
        </div>
      );
    }
  };
  const desktopMapsInfo = () => {
    return (
      <div className="map-container">
        {dataState === "not loaded" ? null : (
          <GoogleMaps
            topHospitals={!showMore ? topHospitals.slice(0, 5) : topHospitals}
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
              setShowInfo={setShowInfo}
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
    );
  };

  useEffect(() => {
    setShowMore(false);
    fetchData();
  }, [locationCoords]);

  useEffect(() => {
    if (locationCoords.lat !== 0 || locationCoords.lng !== 0) {
      fetchCoordinates();
    }
  }, [locationAddress]);

  useEffect(() => {
    setShowInfo(selectedClinic >= 0);
  }, [selectedClinic]);

  useEffect(() => {
    setSelectedClinic(-1);
    let sortedHospitals = sortData(topHospitals, activeButton);
    setTopHospitals(sortedHospitals);
  }, [activeButton]);

  useEffect(() => {
    setActive("list");
  }, [isMobile]);

  return (
    <div className="home-container">
      {!isMobile ? desktopMapsInfo() : null}
      <Header />
      <div
        className="home-content"
        style={isMobile ? { width: "calc(100% - 14px)" } : {}}
      >
        <div className="location-container">
          <LocaitonInput
            value={locationAddress}
            onChange={setLocationAddress}
            currLocation={handleCurrLocation}
            handleSearch={handleSearch}
            isLoading={loading}
          />
        </div>
        <SelectionPanel />
        <FilterResults
          setActiveButton={setActiveButton}
          activeButton={activeButton}
        />

        {isMobile ? (
          <OptionSlider active={active} setActive={setActive} />
        ) : null}
        <div className="results-container">
          {!isMobile ? (
            <div>{listSection()}</div>
          ) : (
            <div>
              {active === "list" ? listSection() : null}
              <div className="map-container-mobile" hidden={active !== "map"}>
                {dataState === "not loaded" ? null : (
                  <GoogleMaps
                    topHospitals={
                      !showMore ? topHospitals.slice(0, 5) : topHospitals
                    }
                    setLoading={setLoading}
                    UserLocation={locationCoords}
                    selectedClinic={selectedClinic}
                    setSelectedClinic={setSelectedClinic}
                    activeFilter={activeButton}
                    isMobile={0}
                  ></GoogleMaps>
                )}
              </div>
              {showInfo === false && isMobile === true ? null : (
                <div className="mobile-clinic-screen">
                  <div
                    className="dim-background-mobile"
                    onClick={() => setShowInfo(false)}
                  />
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
                    setShowInfo={setShowInfo}
                    seedState={selectedClinic}
                    isMobile={true}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <SmallFooter />
    </div>
  );
};
export default HomePage;
