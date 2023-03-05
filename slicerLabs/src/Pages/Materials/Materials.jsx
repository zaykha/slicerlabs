import React from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import { Sheader1, SSpan } from '../Services/Serviceselement'
import MaterialHero from './MaterialsComponents/MaterialHeros/MaterialHeros'
import MaterialStats from './MaterialsComponents/MaterialStats/MaterialStats'
import MaterialUsage from './MaterialsComponents/MaterialUsage/MaterialUsage'

const Materials = () => {
  return (
    <>
      <Navbar/>
      <Sheader1>OUR <SSpan> 3D PRINTING MATERIALS</SSpan>
        </Sheader1>
        <MaterialHero/>
        <MaterialStats/>
        <MaterialUsage/>
      <Footer/>
    </>
  )
}

export default Materials