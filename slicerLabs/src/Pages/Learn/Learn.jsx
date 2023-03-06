import React from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import LearnHero from './LearnComponents/LearnHero/LearnHero'
import LearnMaterials from './LearnComponents/LearnMaterials/LearnMaterials'
import LearnTech from './LearnComponents/LearnTech/LearnTech'
import { ToBlogs } from './LearnComponents/ToBlogs/ToBlogs'

const Learn = () => {
  return (
    <>
      <Navbar/>
      <LearnHero/>
      <ToBlogs/>
      <LearnTech/>
      <LearnMaterials/>
      <Footer/>
    </>
  )
}

export default Learn