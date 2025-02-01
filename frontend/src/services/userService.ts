import axios from "axios";
import { NewUser, User } from "../interfaces";

const BASE_URL: string = "http://localhost:8080/users"

async function getAll():Promise<User[] | null> {
    try {
        const response = await axios.get(`${BASE_URL}`);
        return response.data;
    } catch (error) {
        return null;
    }
}

async function registerUser(user: NewUser):Promise<string> {
    const response = await axios.post(`${BASE_URL}`, user, { validateStatus: function (status) {
        return status < 500;
    }});
    if (response.status === 200) {
        return "Registration succesful!";
    }
    return response.data.message;
}

async function isUsernameAvailable(username: string):Promise<string> {
    try {
        const response = await axios.get(`${BASE_URL}/getavailability/${username}`);
        console.log(response);
        if (response.data.exists === true) {
            return "Username is taken";
        } else {
            return "The username is available";
        }
    } catch (error) {
        console.error(error);
        return "Unexpected error";
    }
}

export default { getAll, registerUser, isUsernameAvailable }
