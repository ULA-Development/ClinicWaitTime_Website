import { set } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";

const HERE_API_KEY = "qnqs8KIVHizEGZrlrFdR--I0Run_DM5H5qQjoOd87NQ";
declare global {
  interface Window {
    H: any;
  }
}
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
};

function HereMapComponent({
  hospitals,
  setTopHospitals,
  setLoading,
  UserLocation,
}: HereMapComponentProps) {
  console.log("map run");
  const mapRef = useRef(null);
  useEffect(() => {
    console.log("add markers run");
    const processMap = async () => {
      if (
        !mapRef.current ||
        !window.H ||
        !UserLocation.lat ||
        !UserLocation.lng
      ) {
        return;
      }

      const platform = new window.H.service.Platform({
        apikey: HERE_API_KEY,
      });

      const defaultLayers = platform.createDefaultLayers();

      const map = new window.H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          center: UserLocation,
          zoom: 14,
          pixelRatio: window.devicePixelRatio || 1,
        }
      );
      new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
      let iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="40" height="60"><path fill="red" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/></svg>`;
      let icon = new window.H.map.Icon(iconSvg);
      let marker = new window.H.map.Marker(UserLocation, { icon: icon });
      map.addObject(marker);

      const hospitalWithTimesPromises = hospitals.map(async (hospital) => {
        let { time: travelTime, distance: routeDistance } =
          await getTravelTimeAndDistance(
            UserLocation,
            hospital.location,
            platform
          );
        let totalWaitTime =
          hospital.info.occupancy.current * hospital.info.occupancy.avgWaitTime; // 10 minutes per person
        // let travelTime = (hospital.location.distance / 40) * 60; // 40 km/h average speed, time in minutes (distance in km)
        let totalTime = totalWaitTime + travelTime;
        // 30 minutes
        const hospitalMarker = new window.H.map.Marker({
          lat: hospital.location.lat,
          lng: hospital.location.lng,
        });
        map.addObject(hospitalMarker);
        hospitalMarker.addEventListener(
          "tap",
          function () {
            const directionUrl = `https://www.google.com/maps/dir/?api=1&origin=${UserLocation.lat},${UserLocation.lng}&destination=${hospital.location.lat},${hospital.location.lng}`;
            window.open(directionUrl, "_blank");
          },
          false
        );
        return {
          ...hospital,
          totalTime,
          totalWaitTime,
          travelTime,
          routeDistance,
        } as HospitalWithTime & { routeDistance: number };
      });
      const hospitalWithTimes = await Promise.all(hospitalWithTimesPromises);
      hospitalWithTimes.sort((a, b) => a.totalTime - b.totalTime);
      setTopHospitals(hospitalWithTimes.slice(0, 10)); // Select top 5
      setLoading(false);
    };

    processMap();
  }, [mapRef, UserLocation, hospitals]);
  return (
    <div
      ref={mapRef}
      style={{
        height: "100%",
        width: "100%",
      }}
    />
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

export default HereMapComponent;
