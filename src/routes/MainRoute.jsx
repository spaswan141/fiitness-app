import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GymDetail from '../Pages/GymDetails'
import Home from '../Pages/Home'

const MainRoute = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/:id" element={<GymDetail/>}/>
        </Routes>
    </div>
  )
}

export default MainRoute