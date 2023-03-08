import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import {getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"; 

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
const db = getFirestore(app);
try {
    const docRef = await addDoc(collection(db, "Note"), {
      Description: "Ada",
      Time: "Lovelace",
      Title: "tak"
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
}

const colRef = collection(db,'Note');

getDocs(colRef)
.then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc)=>{
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
})
.catch(err =>{
    console.log(err.message)
})