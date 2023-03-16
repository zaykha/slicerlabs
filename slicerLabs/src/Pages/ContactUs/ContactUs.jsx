import React, { useState } from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import Sidebar from '../../globalcomponents/SidebarMenu/Sidebar'
import ContactUsForm from './ContactUsComponents/ContactUSForm/ContactUsForm'
import ContactUsHero from './ContactUsComponents/ContactUsHero/ContactUsHero'

const ContactUs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglesidebar = () => {
     setIsOpen(!isOpen);
  }  
  return (
    <>
      <Sidebar isOpen={isOpen} togglesidebar={togglesidebar}/>
      <Navbar togglesidebar={togglesidebar}/>
      <ContactUsHero/>
      <ContactUsForm/>
      <Footer/>
    </>
  )
}

export default ContactUs