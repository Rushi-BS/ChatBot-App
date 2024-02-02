import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Register from './components/Register'
import ChatHome from './components/ChatHome'
import NewChat from './components/NewChat'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatHome />} />
        <Route path="/new" element={<NewChat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
