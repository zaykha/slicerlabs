import React, { useState } from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import Sidebar from '../../globalcomponents/SidebarMenu/Sidebar'
import { Hero } from './HomepageComponents/Hero/Hero'
import { HomepageContiner } from './HomepageComponents/Homepageelement'
import InfoCTA from './HomepageComponents/InfoCTA/InfoCTA'
import HomeStats from './HomepageComponents/Stats/HomeStats'
import Testimonials from './HomepageComponents/Testimonials/Testimonials'
import ToMaterial from './HomepageComponents/ToMaterial/ToMaterial'
import ToServices from './HomepageComponents/ToServices/ToServices'

const HomePage = () => {

  const [isOpen, setIsOpen] = useState(false);
  const togglesidebar = () => {
     setIsOpen(!isOpen);
  }  

  return (
    <HomepageContiner>
        <Sidebar isOpen={isOpen} togglesidebar={togglesidebar}/>
        <Navbar togglesidebar={togglesidebar}/>
        <Hero/>
        <HomeStats/>
        <InfoCTA/>
        <ToServices/>
        <ToMaterial/>
        <Testimonials/>
        <Footer/>
    </HomepageContiner>
        
        
  )
}

export default HomePage