import { openDB } from 'idb'
import './App.css'
import { useEffect, useState } from 'react';

const initDB = async () => {
  return openDB("db1", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("notes")) {
        db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
      }
    },
  });
};

function App() {
  const [newNote, setNote] = useState(null)
  const [notes, setNotes] = useState(null)

  const saveNote = async(e) => {
    e.preventDefault()

    const db = await initDB()

    const notes = await db.getAll("notes")
    notes.forEach(note => {
      if (newNote === note.note) {
        alert("Such note exists!")
        return
      }
    })

    db.put("notes", {
      newNote,
      createdAt: new Date(Date.now()),
    });
  }

  useEffect(() => {
    const getNotes = async() => {
      const db = await initDB()

      const notes = await db.getAll("notes")
      setNotes(notes)
    }

    getNotes()
  }, [])

  return (
    <div>
      <form onSubmit={saveNote}>
        <input type="text" onChange={(e) => setNote(e.target.value)} required />
        <button>Store</button>
      </form>
      {notes && notes.map(note => (
        <p>{note.newNote}</p>
      ))}
    </div>
  );
}

export default App
