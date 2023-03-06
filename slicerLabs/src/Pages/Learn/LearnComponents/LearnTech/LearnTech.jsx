import React, { useState } from 'react'
import { SCheader1, SSpan } from '../../../Services/Serviceselement'
import { TBcontainer } from '../ToBlogs/ToBlogselement'

import { LTBDivider, LTBlogCard, LTBlogcontent, LTBlogHeader, LTBlogIMG, LTBlogtoggle, LTsubHeader } from './LearnTechelement'

import pic1 from '../../../../assets/22.jpg';
import uparrowblog from '../../../../assets/uparrowtechblog.svg';
import downarrowblog from '../../../../assets/downarrowtechblog.svg';

const LearnTech = () => {
    
    const [toggleExpand, settoggleExpand] = useState(false)


    const togglefunction = ()=>{
        settoggleExpand(!toggleExpand);
        console.log(toggleExpand)
    }
  return (
    <TBcontainer>
        <LTsubHeader>OUR TECHNOLOGIES</LTsubHeader>
        <SCheader1>Made In <SSpan>SlicerLabs</SSpan> </SCheader1>

        <LTBlogCard toggleExpand={toggleExpand} onClick={togglefunction}>

     
           <LTBlogIMG src={pic1}></LTBlogIMG> 
        <LTBDivider>
           <LTBlogHeader>SLA Printing (Stereolithography)</LTBlogHeader>
           <LTBlogcontent>

           SLA (Stereolithography) is a type of 3D printing technology that uses a laser to cure and solidify photopolymer resin. The laser is directed at a vat of liquid resin and traces a cross-section of the object being printed, solidifying the resin in that area. The build platform then lowers by a small increment, and the process is repeated until the object is fully printed.

            SLA materials include photopolymer resins that are specifically formulated for use with this technology. These resins come in a variety of colors and properties such as flexibility, transparency, and strength. They are known to produce high-resolution and detailed parts with a smooth surface finish. Some of the common materials used in SLA technology are ABS-like, clear, gray and black resins, and castable resins. These materials are suitable for a wide range of applications such as prototyping, jewelry, dentistry, and many more.

            SLA technology is suitable for a wide range of applications, such as prototyping, jewelry, dental models, and other small precision parts. The technology is also suitable for producing small-batch production parts and end-use products.
            There are different types of SLA technologies, such as Digital Light Processing (DLP) and Continuous Liquid Interface Production (CLIP). DLP uses a digital light projector to cure the resin, while CLIP uses a UV projector and a moving oxygen-permeable membrane to control the curing process.

            The choice of resin is also a critical factor in SLA printing, as different resins have different properties and are suitable for different types of applications. Some resins are more flexible, some are more transparent, and others have a higher level of strength. Therefore, it is important to choose the right resin for the application to ensure that the parts have the desired properties.
           </LTBlogcontent>
         
        </LTBDivider>
           {toggleExpand?
           <LTBlogtoggle src={uparrowblog} onClick={togglefunction}></LTBlogtoggle>:
           <LTBlogtoggle src={downarrowblog} onClick={togglefunction}></LTBlogtoggle>
            }
           


        </LTBlogCard>

        <LTBlogCard toggleExpand={toggleExpand} onClick={togglefunction}>

            
           <LTBlogIMG src={pic1}></LTBlogIMG> 

           <LTBDivider>
           <LTBlogHeader>SLA Printing (Stereolithography)</LTBlogHeader>
           <LTBlogcontent>

           SLA (Stereolithography) is a type of 3D printing technology that uses a laser to cure and solidify photopolymer resin. The laser is directed at a vat of liquid resin and traces a cross-section of the object being printed, solidifying the resin in that area. The build platform then lowers by a small increment, and the process is repeated until the object is fully printed.

            SLA materials include photopolymer resins that are specifically formulated for use with this technology. These resins come in a variety of colors and properties such as flexibility, transparency, and strength. They are known to produce high-resolution and detailed parts with a smooth surface finish. Some of the common materials used in SLA technology are ABS-like, clear, gray and black resins, and castable resins. These materials are suitable for a wide range of applications such as prototyping, jewelry, dentistry, and many more.

            SLA technology is suitable for a wide range of applications, such as prototyping, jewelry, dental models, and other small precision parts. The technology is also suitable for producing small-batch production parts and end-use products.
            There are different types of SLA technologies, such as Digital Light Processing (DLP) and Continuous Liquid Interface Production (CLIP). DLP uses a digital light projector to cure the resin, while CLIP uses a UV projector and a moving oxygen-permeable membrane to control the curing process.

            The choice of resin is also a critical factor in SLA printing, as different resins have different properties and are suitable for different types of applications. Some resins are more flexible, some are more transparent, and others have a higher level of strength. Therefore, it is important to choose the right resin for the application to ensure that the parts have the desired properties.
           </LTBlogcontent>
           </LTBDivider>
           {toggleExpand?
           <LTBlogtoggle src={uparrowblog} onClick={togglefunction}></LTBlogtoggle>:
           <LTBlogtoggle src={downarrowblog} onClick={togglefunction}></LTBlogtoggle>
            }
           


        </LTBlogCard>
    </TBcontainer>
  )
}

export default LearnTech