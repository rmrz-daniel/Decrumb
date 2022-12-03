import { useState } from 'react'
import Login from './Components/Login-Page/login'
import AddSubnet from './Components/Main-View/AddSubnet'
import Display from './Components/Main-View/Display'
import NavWindow from './Components/Side-View/NavWindow'

function App() {

  const [loggedIn, setLoginStatus] = useState(true);

  return (
    <div className="App">
      {
        loggedIn
        ? <Display setLoginStatus={setLoginStatus}/>
        : <Login setLoginStatus={setLoginStatus}/>
      }
    </div>
  )
}

export default App
