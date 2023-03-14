import React from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import { CUheader, CUsubheader } from '../ContactUs/ContactUsComponents/ContactUsHero/ContactUsHeroelemements'
import { SSpan } from '../Services/Serviceselement'
import Dropfile from './StartPrintingComponents/Dropfile/Dropfile'
import MaterialsOptions from './StartPrintingComponents/MaterialsOptions/MaterialsOptions'

const StartPrinting = () => {
  return (
    <>
      <Navbar/>
      <CUheader>UPLOAD <SSpan>FILE</SSpan></CUheader>
        <CUsubheader>to get instant quote!</CUsubheader>
      <Dropfile/>
      <MaterialsOptions/>
      <Footer/>
    </>
  )
}

export default StartPrinting