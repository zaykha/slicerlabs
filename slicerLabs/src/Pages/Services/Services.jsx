import React, { useState } from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import Sidebar from '../../globalcomponents/SidebarMenu/Sidebar'
import OurWorks from './ServicesComponents/OurWorks/OurWorks'
import PApplications from './ServicesComponents/PApplications/PApplications'
import ServicesHero from './ServicesComponents/ServicesHero/ServicesHero'
import ServicesStats from './ServicesComponents/ServicesStats/ServicesStats'
import SMaterials from './ServicesComponents/SMaterials/SMaterials'
import { Sheader1, SSpan } from './Serviceselement'
import LearnHero from '../Learn/LearnComponents/LearnHero/LearnHero'
import { ToBlogs } from '../Learn/LearnComponents/ToBlogs/ToBlogs'
import LearnTech from '../Learn/LearnComponents/LearnTech/LearnTech'
import LearnMaterials from '../Learn/LearnComponents/LearnMaterials/LearnMaterials'
import LearnServices from '../Learn/LearnComponents/LearnServices/LearnServices'
import MaterialUsage from '../Materials/MaterialsComponents/MaterialUsage/MaterialUsage'

const Services = () => {
  
  return (
    <>
  
      <Sheader1>OUR <SSpan> SERVICES</SSpan>
        </Sheader1>
      <ServicesHero/>
      <ServicesStats/>
      {/* <PApplications/>
      <SMaterials/> */}
      <OurWorks/>
      {/* <LearnHero/> */}
      <ToBlogs/>
      <LearnTech/>
      <LearnMaterials/>
      <MaterialUsage/>
    </>
    
  )
}

export default Services