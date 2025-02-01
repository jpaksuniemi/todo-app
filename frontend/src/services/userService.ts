import axios from "axios";
import { User, UserInformation } from "../interfaces";

const BASE_USER_URL: string = "http://localhost:8080/users";
const BASE_AUTH_URL: string = "http://localhost:8080/auth";

async function getAll():Promise<User[] | null> {
    try {
        const response = await axios.get(`${BASE_USER_URL}`);
        return response.data;
    } catch (error) {
        return null;
    }
}

async function loginUser(user: UserInformation):Promise<User | string> {
    return "unimplemented";
}

async function registerUser(user: UserInformation):Promise<string> {
    try {
        const response = await axios.post(`${BASE_AUTH_URL}/register`, user, { validateStatus: function (status) {
            return status < 500;
        }});
        return response.data.message;
    } catch (error) {
        console.error(error);
        return "Unexpected error occured";
    }
}

async function isUsernameAvailable(username: string):Promise<string> {
    try {
        const response = await axios.get(`${BASE_USER_URL}/getavailability/${username}`);
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
