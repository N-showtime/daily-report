import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// 設定情報
const firebaseConfig = {
  apiKey: "AIzaSyCIWLX9MYil4p0Z6dRJSmmp45y5Q0YEajw",
  authDomain: "daily-report-9aa62.firebaseapp.com",
  projectId: "daily-report-9aa62",
  storageBucket: "daily-report-9aa62.firebasestorage.app",
  messagingSenderId: "174096308142",
  appId: "1:174096308142:web:417a0c03b4074165fa9a3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cloud Firestoreの初期化
const db = getFirestore(app);

//Cloud Firestoreから取得したデータを表示する
const fetchHistoryData = async () => {
  let tags = "";

//reportsコレクションのデータを取得
  const querySnapshot = await getDocs(collection(db, "reports"));

  //データをテーブル表の形式に合わせてHTMLに挿入
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    tags += `<tr><td>${doc.data().date}</td><td>${doc.data().name}</td><td>${doc.data().work}</td><td>${doc.data().comment}</td></tr>`
  });
  document.getElementById("js-history").innerHTML = tags;
};

// Cloud Firestoreから取得したデータを表示する
if ( document.getElementById("js-history")) {
  fetchHistoryData();
}

//Cloud Firestoreにデータを送信する
const submitData = async (e) => {
  e.preventDefault();

  const formData =new FormData(e.target);

  try {
    const docRef = await addDoc(collection(db, "reports"), {
      date: new Date(),
      name: formData.get("name"),
      work: formData.get("work"),
      comment: formData.get("comment")
  });
    console.log("Document written with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

//Cloud Firestoreにデータを送信する
if (document.getElementById("js-form")) {
  document.getElementById("js-form").addEventListener("submit", (e) => submitData(e));
};
