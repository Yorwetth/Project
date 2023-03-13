import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, setDoc, doc, query, where, orderBy, serverTimestamp, getDoc} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"; 

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
const colRef = collection(db,'Note');
// const washingtonRef = doc(db, "cities", "DC"); //update doc

//wypisywanie dokumentu
// const querySnapshot = await getDocs(collection(db, "Note"));
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data().Title);
//     console.log(doc.id, " => ", doc.data().Descritpion);
// });
const ext = document.querySelector('.ext_nav');

function addElement(doc){
    const div = document.createElement('div');
    div.classList.add('note-list-item');

    let divTitle = document.createElement('div');
    divTitle.classList.add('note-titles');

    let divBody = document.createElement('div');
    divBody.classList.add('note-bodys');

    let divDate = document.createElement('div');
    divDate.classList.add('note-dates');

    div.setAttribute('data-id', doc.id);
    divTitle.textContent = doc.data().Title;
    divBody.textContent = doc.data().Descritpion;
    divDate.textContent = doc.data().Time;


    div.appendChild(divTitle);
    div.appendChild(divBody);
    div.appendChild(divDate);

    ext.appendChild(div)

}
colRef.get().then((snapshot)=>{
        snapshot.docs.forEach(doc =>{
            addElement(doc);
        })
    })

//queries
const q = query(colRef,orderBy('Time'))



// //realtime collection
onSnapshot(q,(snapshot) => {
    let note = []
    snapshot.docs.forEach((doc) =>{
        note.push({...doc.data(), id:doc.id})
    })
    console.log(note)
})



//dodawanie poprzez formularz
const addNote = document.querySelector('.note-container');
const addBtn = document.querySelector('.note-btn');
addBtn.addEventListener('click',(e)=>{
    e.preventDefault();

    if(addNote.title.value && addNote['text-body'].value != null){
        addDoc(colRef,{
            Title: addNote.title.value,
            Descritpion: addNote['text-body'].value,
            Time: serverTimestamp()
        }).then(()=>{
            addNote.reset();
            console.log('dodano treść');
        })}

    else{
        alert("dodaj treść");
    }
});

//weź pojedynczy dokument
const docRef = doc(db, 'Note','8QzcFtqeEYFZeprEsSvi');

onSnapshot(docRef, (doc) =>{
    console.log(doc.data(), doc.id)
})

//aktualizacja dokumentu
// const updateForm = document.querySelector('.')