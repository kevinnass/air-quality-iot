
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDKReQTpb9afC-fDCC3WkqlVKwHMhVYPLo",
  authDomain: "firevuechat-a28fa.firebaseapp.com",
  databaseURL: "https://firevuechat-a28fa-default-rtdb.firebaseio.com",
  projectId: "firevuechat-a28fa",
  storageBucket: "firevuechat-a28fa.appspot.com",
  messagingSenderId: "898061988635",
  appId: "1:898061988635:web:ade49d9d9e4276c6e819be",
  databaseURL: "https://firevuechat-a28fa-default-rtdb.firebaseio.com"
};

const db = initializeApp(firebaseConfig);
const database = getDatabase(db);

export default  {
  db,
  database
};