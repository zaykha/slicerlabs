import React from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import ContactUsForm from './ContactUsComponents/ContactUSForm/ContactUsForm'
import ContactUsHero from './ContactUsComponents/ContactUsHero/ContactUsHero'

const ContactUs = () => {
  return (
    <>
      <Navbar/>
      <ContactUsHero/>
      <ContactUsForm/>
      <Footer/>
    </>
  )
}

export default ContactUs