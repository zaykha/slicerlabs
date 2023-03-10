import React from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import ContactUsHero from './ContactUsComponents/ContactUsHero/ContactUsHero'

const ContactUs = () => {
  return (
    <>
      <Navbar/>
      <ContactUsHero/>
      <Footer/>
    </>
  )
}

export default ContactUs