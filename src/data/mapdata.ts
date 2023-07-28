import axios from "axios";
import {
  HERE_MAPS_KEY,
  Location,
  HospitalWithTime,
  Hospital,
} from "../assets/globals";

export async function getTravelTimeAndDistance(
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
export function getCurrLocation() {
  // setLoading(true);
  return new Promise((resolve, reject) => {
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
          resolve(currInfo);
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export async function getCoordinates(address: string) {
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
      throw new Error("The provided address is not valid.");
    }
    const location = response.data.items[0].position;

    return {
      lat: location.lat,
      lng: location.lng,
    } as Location;
  } catch (error) {
    throw new Error(
      `Failed to get coordinates for the address: ${address}. ${error}`
    );
  }
}

declare var H: any;
export async function getTopHospitals(
  hospitals: Hospital[],
  setLoading: (arg0: boolean) => void,
  userLocation: Location
) {
  var platform = new H.service.Platform({ apikey: HERE_MAPS_KEY });
  const hospitalWithTimesPromises = hospitals.map(async (hospital) => {
    // let { time: travelTime, distance: routeDistance } =
    //   await getTravelTimeAndDistance(userLocation, hospital.location, platform);
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
  hospitalWithTimes.sort((a, b) => a.totalTime - b.totalTime);
  setTimeout(() => {
    setLoading(false);
  }, 200);

  return hospitalWithTimes;
}

export function sortData(
  hospitalWithTimes: HospitalWithTime[],
  activeFilter: string
): HospitalWithTime[] {
  let sortedHospitals = [...hospitalWithTimes]; // creates a new copy
  if (activeFilter === "waitTime") {
    sortedHospitals.sort((a, b) => a.totalWaitTime - b.totalWaitTime);
  } else if (activeFilter === "travelTime") {
    sortedHospitals.sort((a, b) => a.travelTime - b.travelTime);
  } else {
    sortedHospitals.sort((a, b) => a.totalTime - b.totalTime);
  }
  return sortedHospitals;
}

