import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import {getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"; 

const firebaseConfig = {
    apiKey: "AIzaSyB7vDHyBRcjpnVzRvC6oYBv670s4CZUfMY",
    authDomain: "autentykacja-485ce.firebaseapp.com",
    databaseURL: "https://autentykacja-485ce-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "autentykacja-485ce",
    storageBucket: "autentykacja-485ce.appspot.com",
    messagingSenderId: "344754626728",
    appId: "1:344754626728:web:208e5f84b910170332629d"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);


const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});