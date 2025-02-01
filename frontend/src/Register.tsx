import { FormEvent, useState } from "react";
import userService from "./services/userService";

export const Register = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    const checkAvailability = () => {
        userService
            .isUsernameAvailable(username)
            .then(string => {
                setMessage(string);
            })
    }

    return (
        <div>
          <form >
            <label>Username:</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={checkAvailability}
              required
            />
            {message}
          </form>
        </div>
    )
}