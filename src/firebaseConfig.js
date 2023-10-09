import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCr9h8xodiDSym8gqo2nJN-kiDjU6l82-c",
  authDomain: "agricultural-accountent.firebaseapp.com",
  projectId: "agricultural-accountent",
  storageBucket: "agricultural-accountent.appspot.com",
  messagingSenderId: "820400580757",
  appId: "1:820400580757:web:64b61a145c6760ec68939c",
  measurementId: "G-EVRC5XFXL6",
};

export const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
