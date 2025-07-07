import React from "react"
import Header from "./components/Header"
import DefaultPage from "./pages/DefaultPage"
import AddCityPage from "./pages/AddCityPage"
import DownloadPage from "./pages/DownloadPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/LoginPage"

import { Routes, Route } from "react-router-dom"

import './App.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<DefaultPage />} />
        <Route path='download' element={<DownloadPage />} />
        <Route path='contact' element={<ContactPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='addcity' element={<AddCityPage />} />
      </Routes>
    </>
  )
}

export default App
