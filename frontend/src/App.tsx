import { useEffect, useState } from 'react'
import { Note, User } from './interfaces';
import { Authentication } from './Authentication';
import noteService from './services/noteService';
import { AxiosError } from 'axios';

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [message, setMessage] = useState<string>("");

  const fetchNotes = async () => {
    try {
      const notes: Note[] = await noteService.getAllNotes();
      console.log(notes);
      setNotes(notes);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else if (error.request) {
          setMessage("No response from server");
        }
      } else {
        setMessage("Unknown error occured");
      }
    } 
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  return (
    <div>
      {message}
      <ul>
        {
          notes.map((note: Note) => <li key={note.id}>{note.title} {note.content}</li>)
        }
      </ul>
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState<User | null>(null); 
  
  return (
    <div>
      <h1>Notes</h1>
      {!user && <Authentication setUser={setUser} />}
      {user && <Notes/>}
    </div>
  )
}

export default App
