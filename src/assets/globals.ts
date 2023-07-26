// API KEYS
export const GOOGLE_MAPS_KEY = "AIzaSyBaNVZvlJZpN3s1n2IDPBfInkf98WAhbD0"
export const HERE_MAPS_KEY = "J73GMzFDN4sVuswUGmqeuj2CTJQ9uAeFfNvIpNVjrGI"
export const FIREBASE_CONFIG =  {
    apiKey: "AIzaSyBCMS5SqL8cf1-MuEGDFQbsb_NZL0DKtDM",
    authDomain: "ula-web.firebaseapp.com",
    projectId: "ula-web",
    storageBucket: "ula-web.appspot.com",
    messagingSenderId: "965297657216",
    appId: "1:965297657216:web:b731cd989cc3545475dd65",
    measurementId: "G-40WXY814K1",
  }; 
// DATA TYPES
export type Location = {
  lat: number;
  lng: number;
  distance?: number;
};
export type Hospital = {
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
export type HospitalWithTime = Hospital & {
  totalTime: number;
  totalWaitTime: number;
  travelTime: number;
  routeDistance: number;
};

// FUNCTIONS
export function busynessSetter(time: number) {
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
}
