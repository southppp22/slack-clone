import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA6G79gRZRYGHqF1YqBUqXO5Ar2CxeZouU",
  authDomain: "slack-clone-c8057.firebaseapp.com",
  projectId: "slack-clone-c8057",
  storageBucket: "slack-clone-c8057.appspot.com",
  messagingSenderId: "31062466316",
  appId: "1:31062466316:web:00803f534b6864b451f329",
  measurementId: "G-F6GNXNZCCH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
