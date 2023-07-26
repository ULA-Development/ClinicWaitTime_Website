import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { GoogleMap, OverlayView } from "@react-google-maps/api";
import IconMarker from "./IconMarker";
import * as M from "../../data/MapData";

declare var H: any, google: any;

const HERE_MAP_KEY = "J73GMzFDN4sVuswUGmqeuj2CTJQ9uAeFfNvIpNVjrGI";

type Location = {
  lat: number;
  lng: number;
  distance?: number;
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
      avgWaitTime: number;
      numDoctors: number;
    };
  };
};

type HospitalWithTime = Hospital & {
  totalTime: number;
  totalWaitTime: number;
  travelTime: number;
  routeDistance: number;
};

type HereMapComponentProps = {
  hospitals: Hospital[];
  setTopHospitals: (hospitals: any) => void;
  setLoading: (loading: boolean) => void;
  UserLocation: Location;
  selectedClinic: number;
  setSelectedClinic: (selectedClinic: number) => void;
  activeFilter: string;
};

function GoogleMapComponent({
  hospitals,
  setTopHospitals,
  setLoading,
  UserLocation,
  selectedClinic,
  setSelectedClinic,
  activeFilter,
}: HereMapComponentProps) {
  console.log("Component re-rendering");
  const [bestHospitals, setBestHospitals] = useState<HospitalWithTime[]>([]);
  const [hospitalWithTimes, setHospitalWithTimes] = useState<
    HospitalWithTime[]
  >([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const handleMapLoad = async (map: google.maps.Map) => {
    console.log("Map instance created and handleMapLoad called");
    setMap(map);
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
      console.log("map ref not ready yet");
      return;
    }
  }, [UserLocation, hospitals, map]);

  useEffect(() => {
    if (activeFilter === "waitTime") {
      hospitalWithTimes.sort((a, b) => a.totalWaitTime - b.totalWaitTime);
    } else if (activeFilter === "travelTime") {
      hospitalWithTimes.sort((a, b) => a.travelTime - b.travelTime);
    } else {
      hospitalWithTimes.sort((a, b) => a.totalTime - b.totalTime);
    }
    const topHospitals = hospitalWithTimes.slice(0, 10);

    setBestHospitals(topHospitals);
    setTopHospitals(topHospitals);
  }, [activeFilter, hospitalWithTimes]);
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
  const handleSelectClinic = (index: number) => {
    if (selectedClinic === index) {
      setSelectedClinic(-1);
    } else {
      setSelectedClinic(index);
    }
  };
  useEffect(() => {
    console.log("Component mounted");
    return () => console.log("Component unmounting");
  }, []);
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

async function getTravelTimeAndDistance(
  origin: any,
  destination: any,
  platform: any
): Promise<{ time: number; distance: number }> {
  const router = platform.getRoutingService(null, 8);
  const routeRequestParams = {
    routingMode: "fast",
    transportMode: "car",
    origin: `${origin.lat},${origin.lng}`,
    destination: `${destination.lat},${destination.lng}`,
    return: "polyline,travelSummary",
  };
  const routePromise = new Promise<{ time: number; distance: number }>(
    (resolve: any, reject: any) => {
      router.calculateRoute(
        routeRequestParams,
        (result: any) => {
          if (result.routes.length) {
            const travelTimeInMinutes =
              result.routes[0].sections[0].travelSummary.duration / 60;
            const routeDistanceInMeters =
              result.routes[0].sections[0].travelSummary.length / 1000; // converting to km
            resolve({
              time: Math.round(travelTimeInMinutes), // rounding to the nearest integer
              distance: routeDistanceInMeters,
            });
          } else {
            reject(new Error("Could not find any routes."));
          }
        },
        reject
      );
    }
  );

  return routePromise;
}

export default GoogleMapComponent;
