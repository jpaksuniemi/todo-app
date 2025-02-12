import { FormEvent, useEffect, useState } from 'react'
import { NewNote, ReceivedNote, User } from './interfaces';
import { Authentication } from './Authentication';
import noteService from './services/noteService';
import { AxiosError } from 'axios';

const Notes = ({user}: {user: User}) => {
  const [notes, setNotes] = useState<ReceivedNote[]>([]);
  const [message, setMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const fetchNotes = async (): Promise<void> => {
    try {
      const notes: ReceivedNote[] = await noteService.getAllNotes();
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

  const handleDelete = async (noteId: number): Promise<void> => {
    try {
      const response: string = await noteService.deleteNote(noteId);
      setNotes(notes.filter((note: ReceivedNote) => note.id !== noteId));
      setMessage(response);
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
  
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault() 
    try {
      const newNote: NewNote = {
        title,
        content,
        user_id: user.id
      }
      const response: ReceivedNote = await noteService.postNote(newNote);
      setNotes(notes.concat(response));
      setMessage("New note added succesfully")
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else if (error.request) {
          setMessage("No response from server");
        }
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <label>Content:</label>
      <input type="text" 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <br />
      <button type='submit'>Create new note</button>
      {message}
      </form>
      <p>Welcome user: {user.username}</p> 
      {
        notes.map((note: ReceivedNote) => (
          <Note note={note} deleteHandler={handleDelete}/>
        ))
      }
      <br />
    </div>
  )
}

const Note = ({note, deleteHandler}: {note: ReceivedNote, deleteHandler: (id: number) => void}) => (
  <>
    <h3>{note.title} - {note.dateCreated}</h3>
    {note.content}
    <button onClick={() => deleteHandler(note.id)}>
      Delete note
    </button>
  </>
)

const App = () => {
  const [user, setUser] = useState<User | null>(null); 
  
  return (
    <div>
      <h1>Notes</h1>
      {!user && <Authentication setUser={setUser} />}
      {user && <Notes user={user}/>}
    </div>
  )
}

export default App
