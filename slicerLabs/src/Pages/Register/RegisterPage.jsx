import React, { useState } from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import Sidebar from '../../globalcomponents/SidebarMenu/Sidebar'
import { Welcometext } from '../Login/LoginComponents/LoginForm/LoginFormelements'
import Registerform from './RegisterComponents/Registerform'

const RegisterPage = () => {
 
  return (
    <>
     
      <Welcometext>Welcome!</Welcometext>
      <Registerform/>
    
    </>
  )
}

export default RegisterPage