import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';


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

const logout = document.querySelector('.LogOut');
        logout.addEventListener('click', (e)=>{
            e.preventDefault();
            auth.signOut().then(()=>{
            });
        });
        
onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        console.log(user);
        const uid = user.uid;
    // ...
} else {
    // User is signed out
    location.href = 'SignUp.html';
}
});