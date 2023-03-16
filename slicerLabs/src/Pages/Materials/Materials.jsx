import React,{useState} from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import Sidebar from '../../globalcomponents/SidebarMenu/Sidebar'
import { Sheader1, SSpan } from '../Services/Serviceselement'
import MaterialHero from './MaterialsComponents/MaterialHeros/MaterialHeros'
import MaterialStats from './MaterialsComponents/MaterialStats/MaterialStats'
import MaterialUsage from './MaterialsComponents/MaterialUsage/MaterialUsage'

const Materials = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglesidebar = () => {
     setIsOpen(!isOpen);
  }  
  return (
    <>
      <Sidebar isOpen={isOpen} togglesidebar={togglesidebar}/>
        <Navbar togglesidebar={togglesidebar}/>
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