import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCUsGzTFfDa2_3_WlB3_28bkPmeFPsPtnc",
  authDomain: "f1-tipovacka-9080c.firebaseapp.com",
  projectId: "f1-tipovacka-9080c",
  storageBucket: "f1-tipovacka-9080c.appspot.com",
  messagingSenderId: "271104172779",
  appId: "1:271104172779:web:fc62d45f4a7651f87414ae",
  measurementId: "G-H5VYFV8GP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth, analytics };