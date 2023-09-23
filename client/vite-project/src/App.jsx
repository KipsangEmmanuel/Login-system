import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from "./Components/Navbar"
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
    </Routes>
    </>
  )
}

export default App
