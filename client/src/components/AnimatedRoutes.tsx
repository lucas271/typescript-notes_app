import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import UserAuth from '../pages/userAuth/UserAuth'
import { AnimatePresence } from 'framer-motion'
import HomePage from '../pages/homePage/HomePage'
import Page404 from '../pages/page404/page404'

const RoutesWithNavbar: React.FC = () => {
  const user = JSON.parse(String(localStorage.getItem('user')))
  const location = useLocation()

  return (
    <>
      {!(location.pathname === '/' && !user) && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to='/userAuth'/>} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  )
}

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<RoutesWithNavbar />} />
        <Route path="/userAuth" element={<UserAuth/>}></Route>
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
