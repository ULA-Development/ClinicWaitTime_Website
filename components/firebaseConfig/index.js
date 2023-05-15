import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

function StartFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyBCMS5SqL8cf1-MuEGDFQbsb_NZL0DKtDM",
        authDomain: "ula-web.firebaseapp.com",
        projectId: "ula-web",
        storageBucket: "ula-web.appspot.com",
        messagingSenderId: "965297657216",
        appId: "1:965297657216:web:b731cd989cc3545475dd65",
        measurementId: "G-40WXY814K1"
      };
      const app = initializeApp(firebaseConfig);
      return getDatabase(app);
}

export default StartFirebase;

