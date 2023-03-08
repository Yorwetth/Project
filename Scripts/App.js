import NoteAPI from "./notes.js"

NoteAPI.saveNote({
    title: "New Note!",
    body: "I am a new note."
})

console.log(NoteAPI.getAllNotes());