import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";

const config = {
  apiKey: "AIzaSyBCMS5SqL8cf1-MuEGDFQbsb_NZL0DKtDM",
  authDomain: "ula-web.firebaseapp.com",
  projectId: "ula-web",
  storageBucket: "ula-web.appspot.com",
  messagingSenderId: "965297657216",
  appId: "1:965297657216:web:b731cd989cc3545475dd65",
  measurementId: "G-40WXY814K1",
};

const app = initializeApp(config);
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


const dbCreateUser = (uid: string, name: string, email: string) => {
  set(ref(database, 'users/' + uid), {
    username: name,
    email: email
  })
}

const dbHandler = {
  db: database,
  createUser: dbCreateUser,
};

const authHandler = {
  auth: authenticator,
  signIn: signInWithEmailAndPassword,
  signUp: createUserWithEmailAndPassword,
  sendEmailVerification: sendEmailVerification,
  updateProfile: updateProfile
};


export { dbHandler, authHandler, handleErrorMessages };
