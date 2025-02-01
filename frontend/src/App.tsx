import { FormEvent, useState } from 'react'
import userService from './services/userService';
import { User } from './interfaces';
import { Register } from './Register';

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const submitUserForm = (e: FormEvent) => {
    e.preventDefault();
    const newUser: Object = { username, password };
    console.log(newUser);
    
    userService
      .post(newUser)
      .then((response: string | User) => {
        console.log(response);
      })
  }

  return (
    <div>
      <Register />
    </div>
  )
}

export default App
