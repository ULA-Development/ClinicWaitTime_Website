import React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "./data/firebaseConfig";
import TextInput from "./components/TextInput";
import Button from "./components/Button";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

function writeToDatabase() {
  const randomData = Math.random();
  set(ref(db, "users/EthanTestDB"), {
    randNum: randomData,
  }).then(() => {
    console.log("WROTE TO DB");
  });
}

function readDatabase() {
  const info = ref(db, "users/EthanTestDB/randNum");
  onValue(info, (snapshot) => {
    const data = snapshot.val();
    console.log("READING FROM DB:", data);
  });
}

function createUser() {
  createUserWithEmailAndPassword(auth, "ula@gmail.com", "password")
    .then((userCredential) => {
      console.log("CREATED USER");
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function App() {
  return (
    <div>
      <Button onClick={() => console.log("clicked")}>Sign in</Button>
    </div>
  );
}

export default App;
