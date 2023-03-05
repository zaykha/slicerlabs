import React from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import OurWorks from './ServicesComponents/OurWorks/OurWorks'
import PApplications from './ServicesComponents/PApplications/PApplications'
import ServicesHero from './ServicesComponents/ServicesHero/ServicesHero'
import ServicesStats from './ServicesComponents/ServicesStats/ServicesStats'
import SMaterials from './ServicesComponents/SMaterials/SMaterials'
import { Sheader1, SSpan } from './Serviceselement'

const Services = () => {
  return (
    <>
    <Navbar/>
      <Sheader1>OUR <SSpan> SERVICES</SSpan>
        </Sheader1>
      <ServicesHero/>
      <ServicesStats/>
      <PApplications/>
      <SMaterials/>
      <OurWorks/>
    <Footer/>
    </>
    
  )
}

export default Services