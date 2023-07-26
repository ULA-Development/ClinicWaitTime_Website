import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { GoogleMap, OverlayView } from "@react-google-maps/api";
import IconMarker from "./IconMarker";
import {
  HERE_MAPS_KEY,
  busynessSetter,
  Location,
  Hospital,
  HospitalWithTime,
} from "../../assets/globals";
import { getTravelTimeAndDistance } from "../../data/mapdata";

declare var H: any, google: any;

type HereMapComponentProps = {
  topHospitals: Hospital[];
  // setTopHospitals: (hospitals: any) => void;
  setLoading: (loading: boolean) => void;
  UserLocation: Location;
  selectedClinic: number;
  setSelectedClinic: (selectedClinic: number) => void;
  activeFilter: string;
  show?: boolean;
};

function GoogleMapComponent({
  topHospitals,
  // setTopHospitals,
  setLoading,
  UserLocation,
  selectedClinic,
  setSelectedClinic,
  activeFilter,
}: HereMapComponentProps) {
  const [bestHospitals, setBestHospitals] = useState<HospitalWithTime[]>([]);
  const [hospitalWithTimes, setHospitalWithTimes] = useState<
    HospitalWithTime[]
  >([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const handleMapLoad = async (map: google.maps.Map) => {
    setMap(map);
  };





  const processMap = async () => {
    const platform = new H.service.Platform({
      apikey: HERE_MAPS_KEY,
    });
    const marker = new google.maps.Marker({
      position: UserLocation,
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeColor: "#fff",
        strokeWeight: 4,
      },
    });
    markerRef.current = marker;

    // const hospitalWithTimesPromises = hospitals.map(async (hospital) => {
    //   // let { time: travelTime, distance: routeDistance } =
    //   //   await getTravelTimeAndDistance(
    //   //     UserLocation,
    //   //     hospital.location,
    //   //     platform
    //   //   );
    //   // Keep the above code commented out for now for testing purposes

    //   let routeDistance = hospital.location.distance || 0; // in km
    //   let travelTime = routeDistance / 0.66; // in minutes (assuming 40km/h)
    //   // comment out the above two lines for deployment

    //   let totalWaitTime =
    //     hospital.info.occupancy.current * hospital.info.occupancy.avgWaitTime;
    //   let totalTime = totalWaitTime + travelTime; // in minutes

    //   return {
    //     ...hospital,
    //     totalTime,
    //     totalWaitTime,
    //     travelTime,
    //     routeDistance,
    //   } as HospitalWithTime & { routeDistance: number };
    // });

    // const hospitalWithTimes = await Promise.all(hospitalWithTimesPromises);
    // setHospitalWithTimes(hospitalWithTimes);
    // setLoading(false);
  };
  
  
  
  
  
  
  
  useEffect(() => {
    if (!UserLocation) {
      return;
    }
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }
    if (typeof google !== "undefined" && google.maps && map) {
      processMap();
    } else {
      return;
    }
  }, [UserLocation, topHospitals, map]);

  useEffect(() => {
    if (activeFilter === "waitTime") {
      hospitalWithTimes.sort((a, b) => a.totalWaitTime - b.totalWaitTime);
    } else if (activeFilter === "travelTime") {
      hospitalWithTimes.sort((a, b) => a.travelTime - b.travelTime);
    } else {
      hospitalWithTimes.sort((a, b) => a.totalTime - b.totalTime);
    }
    const rearrangedHospitals = hospitalWithTimes.slice(0, 5);

    setBestHospitals(rearrangedHospitals);
    // setTopHospitals(topHospitals);
  }, [activeFilter, hospitalWithTimes]);

  const handleSelectClinic = (index: number) => {
    if (selectedClinic === index) {
      setSelectedClinic(-1);
    } else {
      setSelectedClinic(index);
    }
  };
  useEffect(() => {}, []);
  // console.log("selectedClinic", selectedClinic);
  // console.log("activeFilter", activeFilter);
  // console.log("hospitals", hospitals);
  // console.log("hospitalWithTimes", hospitalWithTimes);
  // console.log("bestHospitals", bestHospitals);
  // console.log("UserLocation", UserLocation.lat);
  return (
    <div style={{ width: "100%", height: "100%" }}>
        <GoogleMap
          onLoad={handleMapLoad}
          center={
            selectedClinic < 0
              ? UserLocation
              : {
                  lat: bestHospitals[selectedClinic].location.lat,
                  lng: bestHospitals[selectedClinic].location.lng - 0.02,
                }
          }
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={selectedClinic < 0 ? 13 : 13.5}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            scrollwheel: false,
            fullscreenControl: false,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          {bestHospitals.map((hospital, index) => (
            <OverlayView
              key={index}
              position={{
                lat: hospital.location.lat,
                lng: hospital.location.lng,
              }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div onClick={() => handleSelectClinic(index)}>
                <IconMarker
                  key={index}
                  index={index}
                  busyness={busynessSetter(hospital.totalTime)}
                  isActive={index === selectedClinic}
                />
              </div>
            </OverlayView>
          ))}
        </GoogleMap>
    </div>
  );
}

export default GoogleMapComponent;
