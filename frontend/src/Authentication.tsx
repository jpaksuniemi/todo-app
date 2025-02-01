import { User } from "./interfaces";
import { Register } from "./Register";
import { Login } from "./Login";
import { useState } from "react";

export const Authentication = ({setUser}: { setUser: React.Dispatch<React.SetStateAction<User | null>> }) => {
  const [showRegister, setShowRegister] = useState<boolean>(false);

  return (
    <div>
      <button 
        onClick={() => setShowRegister(!showRegister)}>
        {(showRegister) ? "Already an user" : "New user"}
      </button>
      {(showRegister) 
      ? <Register />
      : <Login setUser={setUser}/>}
    </div>
  )
}