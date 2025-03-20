import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Login/Components/Login'
import { PantallaInicial } from './PantallaInicial'
import { Register } from './Login/Components/Register'
import { LostPass } from './Login/Components/LostPass'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/Inicio' element={<PantallaInicial/>}/>
      <Route path='*' element={<h1>Not Found</h1>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/LostPass' element={<LostPass/>}/>
    </Routes>
  )
}

export default App
