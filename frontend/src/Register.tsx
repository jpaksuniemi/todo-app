import { FormEvent, useState } from "react";
import userService from "./services/userService";
import { NewUser } from "./interfaces";

export const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVerify, setPasswordVerify] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== passwordVerify) {
      setMessage("Passwords don't match!");
    } else {
      const newUser: NewUser = {
        username,
        password
      }
      const response: string = await userService.registerUser(newUser);
      setMessage(response);
    }
  }

  const checkAvailability = async () => {
    const response: string = await userService.isUsernameAvailable(username);
    setMessage(response);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={checkAvailability}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label >Password again:</label>
        <input 
          type="password" 
          value={passwordVerify}    
          onChange={(e) => setPasswordVerify(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
        {message}
      </form>
    </div>
  )
}