import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { FIREBASE_CONFIG } from "../assets/globals";

const app = initializeApp(FIREBASE_CONFIG);
const database = getDatabase(app);
const authenticator = getAuth(app);

const handleErrorMessages = (code: string) => {
  switch (code) {
    // Sign in
    case "auth/invalid-email": {
      return ["email", "Invalid email"];
    }
    case "auth/missing-password": {
      return ["password", "Invalid missing password"];
    }
    case "auth/user-not-found": {
      return ["all", "User not found"];
    }
    // Register/Sign up
    case "auth/email-already-in-use": {
      return ["email", "Email is already in use"];
    }
    case "auth/weak-password" || "auth/invalid-password": {
      return ["password", "Password must be at least 6 characters"];
    }
    // Unknown error
    default: {
      return ["All", "Error occured"];
    }
  }
};

async function fetchClinics(currLat: number, currLong: number) {
  const clinicRef = ref(database, "clinics");
  return new Promise<any[]>((resolve, reject) => {
    onValue(
      clinicRef,
      (snapshot) => {
        let closeClincis: any[] = [];
        try {
          const data = snapshot.val();
          const clinicIds = Object.keys(data);
          const closeDist = 30;
          clinicIds.forEach((id: string) => {
              const coords = id.split("|");
              const clinicLat = Number(coords[0].replace("*", "."));
              const clinicLong = Number(coords[1].replace("*", "."));
              const distance = distanceOfCoords(
                currLat,
                currLong,
                clinicLat,
                clinicLong
              );
              if (distance <= closeDist) {
                const clinicInfo = {
                  location: {
                    lat: clinicLat,
                    lng: clinicLong,
                    distance: distance,
                  },
                  info: data[id],
                };
                closeClincis.push(clinicInfo);
              }
          });
          resolve(closeClincis);
        } catch (error) {
          reject(error);
        }
      },
      reject
    );
  });
}

const distanceOfCoords = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = ((Math.acos(dist) * 180) / Math.PI) * 60 * 1.1515;
    return dist * 1.609344;
  }
};

const dbCreateUser = (uid: string, name: string, email: string) => {
  set(ref(database, "users/" + uid), {
    username: name,
    email: email,
  });
};

const dbCreateClinic = (clinicData: any) => {
  const { name, address, coords, occupancy, phoneNumber, email, website } =
    clinicData;
  set(ref(database, "clinics/" + coords), {
    name: name,
    address: address,
    phone: phoneNumber,
    occupancy: occupancy,
    email: email,
    website: website,
  });
};

function dbCreateFeedback(message: string) {
  const promise = new Promise((resolve, reject) => {
    const ticketCode = Math.random().toString(36).substring(2, 12);
    get(ref(database, "feedback/" + ticketCode)).then((snapshot) => {
      if (!snapshot.exists()) {
        set(ref(database, "feedback/" + ticketCode), {
          message: message,
        });
        resolve(true);
      } else {
        reject("Error occured, please try again");
      }
    });
  });
  return promise;
}

const dbHandler = {
  db: database,
  createUser: dbCreateUser,
  fetchClinics: fetchClinics,
  createFeedback: dbCreateFeedback,
  createClinic: dbCreateClinic,
};

const authHandler = {
  auth: authenticator,
  signIn: signInWithEmailAndPassword,
  signUp: createUserWithEmailAndPassword,
  sendEmailVerification: sendEmailVerification,
  updateProfile: updateProfile,
};

export { dbHandler, authHandler, handleErrorMessages };
