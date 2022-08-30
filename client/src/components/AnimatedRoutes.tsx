import React from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import Navbar from './navbar/Navbar'
import UserAuth from '../pages/userAuth/UserAuth'
import {AnimatePresence} from 'framer-motion'
import HomePage from '../pages/homePage/HomePage'
import Page404 from '../pages/page404/page404'

const RoutesWithNavbar: React.FC = () => {


  return <>
      <Navbar/>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='*' element={<Page404/>}/>
      </Routes>
  </>
}

const AnimatedRoutes: React.FC = () => {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='*' element={<RoutesWithNavbar/>}/>
        <Route path='/userAuth' element={<UserAuth user={true}/>}></Route>

      </Routes>
    </AnimatePresence>
    )
}

export default AnimatedRoutes