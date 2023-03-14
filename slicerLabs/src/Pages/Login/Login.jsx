import React from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import LoginForm from './LoginComponents/LoginForm/LoginForm'
import { Welcometext } from './LoginComponents/LoginForm/LoginFormelements'

const Login = () => {
  return (
    <>
      <Navbar/>
      <Welcometext>Welcome!</Welcometext>
      <LoginForm/>
      <Footer/>
    </>
  )
}

export default Login