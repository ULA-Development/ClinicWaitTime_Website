import * as React from 'react'
import { initializeApp } from "firebase/app"
import { getDatabase, ref, set, onValue } from "firebase/database"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import firebaseConfig from './config';
import './App.css';

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth(app)

function writeToDatabase() {
  const randomData = Math.random()
  set(ref(db, 'users/EthanTestDB'), {
    'randNum': randomData
  }).then(() => {
    console.log("WROTE TO DB")
  })
}

function readDatabase() {
  const info = ref(db, 'users/EthanTestDB/randNum')
  onValue(info, (snapshot) => {
    const data = snapshot.val()
    console.log("READING FROM DB:", data)
  })
}

function createUser() {
  createUserWithEmailAndPassword(auth, 'ula@gmail.com', 'password')
    .then((userCredential) => {
      console.log("CREATED USER")
    })
    .catch((error) => {
      console.log(error.message)
    })
} 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={writeToDatabase}>Write </button>
        <button onClick={readDatabase}>Read </button>
        <button onClick={createUser}>Create user </button>
      </header>
    </div>
  );
}

export default App;
