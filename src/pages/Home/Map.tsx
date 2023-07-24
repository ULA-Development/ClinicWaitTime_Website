import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  OverlayView,
  Marker,
} from "@react-google-maps/api";
// import CustomMarker from "./CustomMarker";

declare var H: any;

const GOOGLE_API_KEY = "AIzaSyBaNVZvlJZpN3s1n2IDPBfInkf98WAhbD0";
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
  setTopHospitals: (hospitals: HospitalWithTime[]) => void;
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
  const [bestHospitals, setBestHospitals] = useState<HospitalWithTime[]>([]);
  const [hospitalWithTimes, setHospitalWithTimes] = useState<
    HospitalWithTime[]
  >([]);
  const mapRef = useRef<google.maps.Map | null>(null);
  const handleMapLoad = async (map: google.maps.Map) => {
    mapRef.current = map;
    if (!UserLocation.lat || !UserLocation.lng) {
      return;
    }
  };
  useEffect(() => {
    if (!UserLocation) {
      return;
    }
    const processMap = async () => {
      const platform = new H.service.Platform({
        apikey: HERE_MAP_KEY, // replace with your HERE Maps API key
      });
      // new google.maps.Marker({
      //   position: UserLocation, // Replace with your position object
      //   map: mapRef.current, // Replace with your Google Map instance
      //   icon: {
      //     path: google.maps.SymbolPath.CIRCLE,
      //     scale: 12, // adjust for desired size
      //     fillColor: "#4285F4",
      //     fillOpacity: 1,
      //     strokeColor: "#fff",
      //     strokeWeight: 2,
      //   },
      // });
      const hospitalWithTimesPromises = hospitals.map(async (hospital) => {
        // let { time: travelTime, distance: routeDistance } =
        //   await getTravelTimeAndDistance(
        //     UserLocation,
        //     hospital.location,
        //     platform
        //   );
        // Keep the above code commented out for now for testing purposes

        let routeDistance = hospital.location.distance || 0; // in km
        let travelTime = routeDistance / 0.66; // in minutes (assuming 40km/h)
        // comment out the above two lines for deployment

        let totalWaitTime =
          hospital.info.occupancy.current * hospital.info.occupancy.avgWaitTime;
        let totalTime = totalWaitTime + travelTime; // in minutes

        return {
          ...hospital,
          totalTime,
          totalWaitTime,
          travelTime,
          routeDistance,
        } as HospitalWithTime & { routeDistance: number };
      });

      const hospitalWithTimes = await Promise.all(hospitalWithTimesPromises);
      setHospitalWithTimes(hospitalWithTimes);
      setTimeout(function () {
        setLoading(false);
      }, 3000);
    };
    processMap();
  }, [UserLocation, hospitals, mapRef]);

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
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
        <GoogleMap
          onLoad={handleMapLoad} // This line was added
          center={UserLocation}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={14}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
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
      </LoadScript> */}
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
