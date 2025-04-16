import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../views/home/Home'
import Login from '../views/login/Login'
import Signup from '../views/signup/Signup'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/dashboard' element={<Dashboard />} /> */}
        {/* <Route path='/forgot-password' element={<ForgotPassword />} /> */}
        {/* <Route path='/reset-password/:resetToken' element={<ResetPassword />} /> */}
    </Routes>
  )
}

export default AppRoutes