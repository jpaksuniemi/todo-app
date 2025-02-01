import { useState } from 'react'
import { User } from './interfaces';
import { Authentication } from './Authentication';

const App = () => {
  const [user, setUser] = useState<User | null>(null); 
  
  return (
    <div>
      <h1>Notes</h1>
      {!user && <Authentication setUser={setUser} />}
    </div>
  )
}

export default App
