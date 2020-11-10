import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDWqLf5kjU072XOYxTZCVUiacvZ3uvOQVU",
  authDomain: "add-blank.firebaseapp.com",
  databaseURL: "https://add-blank.firebaseio.com",
  projectId: "add-blank",
  storageBucket: "add-blank.appspot.com",
  messagingSenderId: "722550683654",
  appId: "1:722550683654:web:75ae4590fd012a6243eb87",
  measurementId: "G-G4JZGT8QVQ",
};

export const db = firebase.initializeApp(firebaseConfig).firestore();
