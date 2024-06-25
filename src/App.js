import { useState } from "react";
import Signin from "./Components/Signin/Signin";
import Admin from "./Components/Admin/Admin";
import Employee from "./Components/Employee/Employee";
import { Button } from "react-bootstrap";


function App() {

  const [admin, setAdmin] = useState(null);

  const signInHandler = (user) => {
    setAdmin(user)
  }

  const adminHandler = () => {
    setAdmin(null)
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-evenly', padding: '20px 0', backgroundColor: 'orange'}}>
        <h1>Kiraj Project</h1>
        {admin && <Button variant="danger" onClick={adminHandler}>Log Out</Button>}
      </div>
      {!admin && <Signin onSignIn={signInHandler} />}
      {admin==='admin' && <Admin />}
      {admin==='employee' && <Employee />}
    </div>
  );
}

export default App;
