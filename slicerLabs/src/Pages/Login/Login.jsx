import React, { useState } from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import Sidebar from '../../globalcomponents/SidebarMenu/Sidebar'
import LoginForm from './LoginComponents/LoginForm/LoginForm'
import { Welcometext } from './LoginComponents/LoginForm/LoginFormelements'

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglesidebar = () => {
     setIsOpen(!isOpen);
  }  
  return (
    <>
      <Sidebar isOpen={isOpen} togglesidebar={togglesidebar}/>
      <Navbar togglesidebar={togglesidebar}/>
      <Welcometext>Welcome!</Welcometext>
      <LoginForm/>
      <Footer/>
    </>
  )
}

export default Login