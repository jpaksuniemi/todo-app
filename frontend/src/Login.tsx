import { AxiosError } from "axios";
import React, { FormEvent, useState } from "react"
import userService from "./services/userService";
import { User, UserInformation } from "./interfaces";
import noteService from "./services/noteService";

export const Login = ({setUser}: { setUser: React.Dispatch<React.SetStateAction<User | null>> }) => {
  const [username, setUsername] = useState<string>(""); 
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const loginUser: UserInformation = {
      username,
      password
    }
    try {
      const response: User = await userService.loginUser(loginUser); 
      console.log(response);
      alert("Login succesful!");
      setUser(response);
      noteService.setToken(response.token); 
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else if (error.request) {
          setMessage("No response from server");
        }
      } else {
        setMessage("Unknown error occured")
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}         
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
        <button type="submit">Login</button>
        {message}
      </form>
    </div>
    )
}