import { useState } from 'react'
import './App.css'
import { Box } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { CreatePage } from './pages/CreatePage'
import { Navbar } from './components/Navbar'


function App() {
  return (
    <>
      <Box sx = {{
        minHeight: '100vh',
      }}>
        <Navbar />
        <Box sx = {{
          height: '10vh'
        }}></Box>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<CreatePage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  )
}

export default App
