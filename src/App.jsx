import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login-Page/login'
import AddSubnet from './Components/Main-View/AddSubnet'
import SignUp from './Components/SignUp-Page/signup'
import Display from './Components/Main-View/Display'
import NavWindow from './Components/Side-View/NavWindow'

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
