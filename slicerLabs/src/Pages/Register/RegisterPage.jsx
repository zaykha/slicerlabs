import React, { useState } from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import Sidebar from '../../globalcomponents/SidebarMenu/Sidebar'
import { Welcometext } from '../Login/LoginComponents/LoginForm/LoginFormelements'
import Registerform from './RegisterComponents/Registerform'

const RegisterPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const togglesidebar = () => {
       setIsOpen(!isOpen);
    }  
  return (
    <>
       <Sidebar isOpen={isOpen} togglesidebar={togglesidebar}/>
        <Navbar togglesidebar={togglesidebar}/>
      <Welcometext>Welcome!</Welcometext>
      <Registerform/>
      <Footer/>
    </>
  )
}

export default RegisterPage