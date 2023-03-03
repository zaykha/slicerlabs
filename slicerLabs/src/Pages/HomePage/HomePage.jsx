import React from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import { Hero } from './HomepageComponents/Hero/Hero'
import { HomepageContiner } from './HomepageComponents/Homepageelement'
import InfoCTA from './HomepageComponents/InfoCTA/InfoCTA'
import HomeStats from './HomepageComponents/Stats/HomeStats'
import Testimonials from './HomepageComponents/Testimonials/Testimonials'
import ToMaterial from './HomepageComponents/ToMaterial/ToMaterial'
import ToServices from './HomepageComponents/ToServices/ToServices'

const HomePage = () => {
  return (
    <HomepageContiner>
        <Navbar/>
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