import React from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import LearnHero from './LearnComponents/LearnHero/LearnHero'
import { ToBlogs } from './LearnComponents/ToBlogs/ToBlogs'

const Learn = () => {
  return (
    <>
      <Navbar/>
      <LearnHero/>
      <ToBlogs/>
      <Footer/>
    </>
  )
}

export default Learn