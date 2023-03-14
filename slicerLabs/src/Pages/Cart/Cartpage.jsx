import React from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import { CUheader, CUsubheader } from '../ContactUs/ContactUsComponents/ContactUsHero/ContactUsHeroelemements'
import { SSpan } from '../Services/Serviceselement'

const Cartpage = () => {
  return (
    <>
        <Navbar/>
        <CUheader>CHECKOUT <SSpan>Process</SSpan></CUheader>
        <CUsubheader></CUsubheader>

        <Footer/>
    </>
  )
}

export default Cartpage