import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
  try {
    console.log("Firebase接続開始...");
    let tags = "";

    //reportsコレクションのデータを取得
    const querySnapshot = await getDocs(collection(db, "reports"));
    console.log("取得したドキュメント数:", querySnapshot.size);

    if (querySnapshot.empty) {
      console.log("データが存在しません");
      tags = "<tr><td colspan='4'>データがありません</td></tr>";
    } else {
      //データをテーブル表の形式に合わせてHTMLに挿入
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        const data = doc.data();
        tags += `<tr><td>${data.date || ''}</td><td>${data.name || ''}</td><td>${data.work || ''}</td><td>${data.comment || ''}</td></tr>`
      });
    }
    
    const targetElement = document.getElementById("js-history");
    if (targetElement) {
      targetElement.innerHTML = tags;
      console.log("HTML挿入完了");
    } else {
      console.error("js-history要素が見つかりません");
    }
  } catch (error) {
    console.error("Firebase接続エラー:", error);
    const targetElement = document.getElementById("js-history");
    if (targetElement) {
      targetElement.innerHTML = "<tr><td colspan='4'>エラーが発生しました</td></tr>";
    }
  }
};

// Cloud Firestoreから取得したデータを表示する
if ( document.getElementById("js-history")) {
  fetchHistoryData();
}


