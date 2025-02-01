import axios from "axios";
import { User } from "../interfaces";

const BASE_URL: string = "http://localhost:8080"

async function getAll():Promise<User[] | null> {
    try {
        const response = await axios.get(`${BASE_URL}users`);
        return response.data;
    } catch (error) {
        return null;
    }
}

async function post(user: Object):Promise<User | string> {
    try {
        const response = await axios.post(`${BASE_URL}/users`, user);
        return response.data;
    } catch (error) {
        console.error(error);
        return "Unexpected error"
    }
}

async function isUsernameAvailable(username: string):Promise<string> {
    try {
        const response = await axios.get(`${BASE_URL}/getavailability/${username}`);
        if (response.status === 404) {
            return "Username is available";
        } else {
            return "The username is taken";
        }
    } catch (error) {
        console.error(error);
        return "Unexpected error";
    }
}

export default { getAll, post, isUsernameAvailable }
