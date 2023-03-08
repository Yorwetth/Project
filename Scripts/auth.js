import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";


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
const database = getDatabase(app);
const signupFrom = document.querySelector('#signup-form');
const signupFrom1 = document.querySelector('#signup-form1');

const subBtn = document.querySelector('.submitData').addEventListener('click', (e) => {
    var email = document.querySelector('#signup-email').value;
    var password = document.querySelector('#signup-password').value;
    //sign up user
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ... user.uid
            set(ref(database, 'users/' + user.uid), {
                email: email,
                password: password
            })
                .then(() => {
                    // Data saved successfully!
                    alert('user created successfully');
                    signupFrom.reset();
    
                })
                .catch((error) => {
                    // The write failed...
                    alert(error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            alert(errorMessage);
        });
});

const subBtn1 = document.querySelector('.submitData1').addEventListener('click', (e) => {
    var emailLog = document.querySelector('#signin-email').value;
    var passwordLog = document.querySelector('#signin-password').value;

    signInWithEmailAndPassword(auth, emailLog, passwordLog)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...

            // save log in details into real time database
            var lgDate = new Date();
            update(ref(database, 'users/' + user.uid), {
                last_login: lgDate,
            })
                .then(() => {
                    // Data saved successfully!
                    alert('user logged in successfully');
                    signupFrom1.reset();

                })
                .catch((error) => {
                    // The write failed...
                    alert(error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        setTimeout("location.href = 'Index.html';",1500);
        const uid = user.uid;
    // ...
} else {
    // User is signed out
    // ...
}
});