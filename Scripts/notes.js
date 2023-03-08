export default class NoteAPI{
    static getAllNotes(){
        //zapisywanie elementów w storage
        const notes
        return this.getAllNotes.sort((a, b)=>{
            return new Date(a.updated) > new Date(b.updated) ? -1:1;
        }); //sortowanie danych po odczytanej dacie
    }

    static saveNote(noteToSave){
        const notes = NoteAPI.getAllNotes();
        notes.push(noteToSave);
        
    }
    
}
