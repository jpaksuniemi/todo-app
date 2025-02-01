import axios from "axios";
import { Note } from "../interfaces";
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

export default { setToken, getAllNotes }