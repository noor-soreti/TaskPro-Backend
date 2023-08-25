import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAl233ZhHVEVDcUx4CzPKf4rQB7N6khSp0",
    authDomain: "react-app-dd4a6.firebaseapp.com",
    projectId: "react-app-dd4a6",
    storageBucket: "react-app-dd4a6.appspot.com",
    messagingSenderId: "225505533450",
    appId: "1:225505533450:web:908c276e0b3351185cc9f3",
    measurementId: "G-41TPEHLX5J"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);