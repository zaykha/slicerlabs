import React, { useState } from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import Sidebar from '../../globalcomponents/SidebarMenu/Sidebar'
import LoginForm from './LoginComponents/LoginForm/LoginForm'
import { Welcometext } from './LoginComponents/LoginForm/LoginFormelements'

const Login = () => {
 
  return (
    <>
    
      <Welcometext>Welcome!</Welcometext>
      <LoginForm/>
     
    </>
  )
}

export default Login