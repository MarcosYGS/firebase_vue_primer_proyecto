import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBsxKrM3q24ktW8rw0wbpuFppMdzRuMLbA",
  authDomain: "proyecto-1-3c0f6.firebaseapp.com",
  projectId: "proyecto-1-3c0f6",
  storageBucket: "proyecto-1-3c0f6.appspot.com",
  messagingSenderId: "47241875535",
  appId: "1:47241875535:web:f72073581eb1c990f7da3a"
};


initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
export {auth, db};