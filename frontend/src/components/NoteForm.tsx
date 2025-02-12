import React, { FormEvent, useState } from "react";
import { NewNote, ReceivedNote } from "../interfaces";
import { AxiosError } from "axios";
import noteService from "../services/noteService";

export const NoteForm = ({notes, setNotes, setMessage}: {
  notes: ReceivedNote[],
  setNotes: React.Dispatch<React.SetStateAction<ReceivedNote[]>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  function getCurrentDate(): string {
    const date: Date = new Date();
    const month: number = date.getMonth() + 1;
    return `${date.getDate()}-${month}-${date.getFullYear()}`
  }

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      const currDate: string = getCurrentDate();
      const newNote: NewNote = {
        title,
        content,
        dateCreated: currDate,
        user_id: Number.parseInt(localStorage.getItem("id")!)
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
    </form>
  )
}