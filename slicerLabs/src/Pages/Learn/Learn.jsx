import React, { useState } from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import Sidebar from '../../globalcomponents/SidebarMenu/Sidebar'
import LearnHero from './LearnComponents/LearnHero/LearnHero'
import LearnMaterials from './LearnComponents/LearnMaterials/LearnMaterials'
import LearnServices from './LearnComponents/LearnServices/LearnServices'
import LearnTech from './LearnComponents/LearnTech/LearnTech'
import { ToBlogs } from './LearnComponents/ToBlogs/ToBlogs'

const Learn = () => {


  return (
    <>
 
      <LearnHero/>
      {/* <ToBlogs/> */}
      {/* <LearnTech/> */}
      {/* <LearnMaterials/> */}
      <LearnServices/>
   
    </>
  )
}

export default Learn