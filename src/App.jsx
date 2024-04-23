import { useState } from 'react'

import './App.css'
import CitiesTable from './Components/CitiesTable'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WeatherPage from './Components/WeatherPage'

function App() {

  return (
    <>
<div>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<CitiesTable/>}></Route>
    <Route path='/weather/:cityName' element={<WeatherPage/>}></Route>
  
  </Routes>
  </BrowserRouter>
  
</div>
    </>
  )
}

export default App
