import React, { useEffect, useRef, useState } from "react";
import ClinicOption from "./ClinicComponent/ClinicOption";

const HERE_API_KEY = "Bv_Ltyse4K-yulQjZ_aBzJIbbeEl4K1eUQSqITFhWxg";
declare global {
  interface Window {
    H: any;
  }
}
type Location = {
  lat: number;
  lng: number;
  distance: number;
};

type Hospital = {
  location: Location;
  info: {
    name: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    occupancy: {
      current: number;
      capacity: number;
    };
  };
};
type HospitalWithTime = Hospital & { totalTime: number };

function HereMapComponent({ hospitals }: { hospitals: Hospital[] }) {
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = React.useState({
    lat: 0,
    lng: 0,
  });
  const [topHospitals, setTopHospitals] = useState<HospitalWithTime[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    const addMarkers = async () => {
      if (
        !mapRef.current ||
        !window.H ||
        !currentLocation.lat ||
        !currentLocation.lng
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
          center: currentLocation,
          zoom: 14,
          pixelRatio: window.devicePixelRatio || 1,
        }
      );
      new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
      let iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="40" height="60"><path fill="red" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/></svg>`;
      let icon = new window.H.map.Icon(iconSvg);
      let marker = new window.H.map.Marker(currentLocation, { icon: icon });
      map.addObject(marker);

      const hospitalWithTimesPromises = hospitals.map(async (hospital) => {
        // let travelTime = await getTravelTime(
        //   currentLocation,
        //   hospital.location,
        //   platform
        // );
        let totalWaitTime = hospital.info.occupancy.current * 10; // 10 minutes per person
        let travelTime = (hospital.location.distance / 40) * 60; // 40 km/h average speed, time in minutes (distance in km)
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
            const directionUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${hospital.location.lat},${hospital.location.lng}`;
            window.open(directionUrl, "_blank");
          },
          false
        );
        return {
          ...hospital,
          totalTime,
        } as HospitalWithTime;
      });

      const hospitalWithTimes = await Promise.all(hospitalWithTimesPromises);
      hospitalWithTimes.sort((a, b) => a.totalTime - b.totalTime);
      setTopHospitals(hospitalWithTimes.slice(0, 5)); // Select top 5
    };

    addMarkers();
  }, [mapRef, currentLocation, hospitals]);
  return (
    <div>
      <div
        ref={mapRef}
        style={{
          position: "absolute",
          right: 0,
          height: "100vh",
          width: "60vw",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {topHospitals.map((hospital, index) => (
          <ClinicOption
            name={hospital.info.name}
            number="1"
            distance={hospital.location.distance}
            busyness={4}
            rating={3.5}
            isActive={true}
            // key={index}
            // hospital={hospital.info.name}
            // distance={hospital.totalTime.toFixed(2)} // Converting seconds to kilometers
            // number={String(index + 1)}
            // business={1} // Placeholder
            // email={hospital.info.email}
            // phone={hospital.info.phone}
            // website={hospital.info.website}
            // address={hospital.info.address}
            // rating={5} // Placeholder
          />
        ))}
      </div>
    </div>
  );
}
async function getTravelTime(
  origin: Location,
  destination: Location,
  platform: any
): Promise<number> {
  const router = platform.getRoutingService(null, 8);
  const routeRequestParams = {
    routingMode: "fast",
    transportMode: "car",
    origin: `${origin.lat},${origin.lng}`,
    destination: `${destination.lat},${destination.lng}`,
    return: "polyline,travelSummary",
  };
  const routePromise = new Promise<number>((resolve: any, reject: any) => {
    router.calculateRoute(
      routeRequestParams,
      (result: any) => {
        if (result.routes.length) {
          resolve(result.routes[0].sections[0].travelSummary.duration);
        } else {
          reject(new Error("Could not find any routes."));
        }
      },
      reject
    );
  });

  return routePromise;
}

export default HereMapComponent;
