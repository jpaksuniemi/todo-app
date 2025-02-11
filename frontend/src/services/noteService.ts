import axios from "axios";
import { NewNote } from "../interfaces";
const BASE_URL = "http://localhost:8080/notes";

let token: string | null = null;

function setToken(newToken: string) {
    token = `Bearer ${newToken}`;
}

async function getAllNotes() {
    const response = await axios.get(BASE_URL, {headers: { Authorization: token }});
    console.log("from service: ", response);
    return response.data;
}

async function postNote(note: NewNote) {
    const response = await axios.post(BASE_URL, note, {headers: { Authorization: token }});
    console.log("from service: ", response);
    return response.data;
}

async function deleteNote(noteId: number): Promise<string> {
    const response = await axios.delete(`${BASE_URL}/${noteId}`, {headers: { Authorization: token }});
    console.log("from service: ", response);
    return response.data.message;
}

export default { setToken, deleteNote, getAllNotes, postNote }