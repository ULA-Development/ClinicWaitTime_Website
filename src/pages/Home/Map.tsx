import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, OverlayViewF, OverlayView } from "@react-google-maps/api";
import IconMarker from "./IconMarker";
import {
  busynessSetter,
  Location,
  HospitalWithTime,
} from "../../assets/globals";

declare var H: any, google: any;

type HereMapComponentProps = {
  topHospitals: HospitalWithTime[];
  setLoading: (loading: boolean) => void;
  UserLocation: Location;
  selectedClinic: number;
  setSelectedClinic: (selectedClinic: number) => void;
  activeFilter: string;
  isMobile?: number;
};
function GoogleMapComponent({
  topHospitals,
  UserLocation,
  selectedClinic,
  setSelectedClinic,
  isMobile = 1, // 1 for desktop 0 for mobile
}: HereMapComponentProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const handleMapLoad = async (map: google.maps.Map) => {
    setMap(map);
  };
  const processMap = async () => {
    // const marker = new google.maps.Marker({
    //   position: UserLocation,
    //   map: map,
    //   icon: {
    //     path: google.maps.SymbolPath.CIRCLE,
    //     scale: 12,
    //     fillColor: "#4285F4",
    //     fillOpacity: 1,
    //     strokeColor: "#fff",
    //     strokeWeight: 4,
    //   },
    // });
    // markerRef.current = marker;
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
    } 
  }, [UserLocation, map]);

  const handleSelectClinic = (index: number) => {
    if (selectedClinic === index) {
      setSelectedClinic(-1);
    } else {
      setSelectedClinic(index);
    }
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
{/*       {topHospitals.length === 0 ? null : (
        <GoogleMap
          onLoad={handleMapLoad}
          center={
            selectedClinic < 0
              ? UserLocation
              : {
                  lat: topHospitals[selectedClinic].location.lat,
                  lng: topHospitals[selectedClinic].location.lng - (isMobile * 0.018),
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
          {map &&
            topHospitals.map((hospital, index) => (
              <OverlayViewF
                position={{
                  lat: hospital.location.lat,
                  lng: hospital.location.lng,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                key={index + 10000}
              >
                <div onClick={() => handleSelectClinic(index)}>
                  <IconMarker
                    key={index}
                    index={index}
                    busyness={busynessSetter(hospital.totalTime)}
                    isActive={index === selectedClinic}
                  />
                </div>
              </OverlayViewF>
            ))}
        </GoogleMap>
      )} */}
    </div>
  );
}

export default GoogleMapComponent;
