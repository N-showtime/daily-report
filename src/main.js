import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// 設定情報
// const firebaseConfig = {
//   apiKey: "AIzaSyCIWLX9MYil4p0Z6dRJSmmp45y5Q0YEajw",
//   authDomain: "daily-report-9aa62.firebaseapp.com",
//   projectId: "daily-report-9aa62",
//   storageBucket: "daily-report-9aa62.firebasestorage.app",
//   messagingSenderId: "174096308142",
//   appId: "1:174096308142:web:417a0c03b4074165fa9a3f"
// };


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};


// デバッグ用：設定値を確認
// console.log("Environment variables:");
// console.log("VITE_API_KEY:", import.meta.env.VITE_API_KEY);
// console.log("VITE_PROJECT_ID:", import.meta.env.VITE_PROJECT_ID);
// console.log("Firebase Config:", firebaseConfig);
// console.log("Project ID:", firebaseConfig.projectId);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cloud Firestoreの初期化
const db = getFirestore(app);

//Cloud Firestoreにデータを送信する

import { fetchHistoryData } from "./my-modules/fetch-history-data";

// Cloud Firestoreから取得したデータを表示する
if ( document.getElementById("js-history")) {
  fetchHistoryData(getDocs, collection, db);
}

//Cloud Firestoreにデータを送信する
import { submitData } from "./my-modules/submit-data";

//Cloud Firestoreにデータを送信する
if (document.getElementById("js-form")) {
  document.getElementById("js-form").addEventListener("submit", (e) => submitData(e, addDoc, collection, db));
}
