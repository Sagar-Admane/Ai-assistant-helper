import { Routes, Route  } from "react-router-dom"
import "./App.css"
import Signup from "./Components/Signup/Signup"
import Login from "./Components/Login/Login"
import Dashboard from "./Components/Dashboard/Dashboard"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>  
  )
}

export default App
