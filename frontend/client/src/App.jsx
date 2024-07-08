
import {Routes,Route} from 'react-router-dom'
import './App.css'
import DashBoard from './pages/DashBoard.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import EditNotes from './pages/EditNotes.jsx'
import User from './pages/User.jsx'
import AddNotes from './pages/AddNotes.jsx'
import { useState } from 'react'

function App() {
  const[userNotes,setUserNotes]=useState([])

  return (
    <>
    <div className="App">
    <Routes>
      <Route exact path='/' element={<DashBoard />}/>
      <Route  path='/login' element={<Login />}/>
      <Route  path='/signup' element={<Signup />}/>
      <Route  path='/edit/notes/:id' element={<EditNotes userNotes={userNotes} setUserNotes={setUserNotes}/>}/>
      <Route  path='/account' element={<User userNotes={userNotes} setUserNotes={setUserNotes}/>}/>
      <Route  path="/add/notes" element={<AddNotes userNotes={userNotes} setUserNotes={setUserNotes}/>}/>
    </Routes>
    </div>
      </>
  )
}

export default App
