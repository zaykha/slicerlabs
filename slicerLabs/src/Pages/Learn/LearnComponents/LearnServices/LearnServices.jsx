import React from 'react'
import { SCheader1, SSpan } from '../../../Services/Serviceselement'
import { LMContainer } from '../LearnMaterials/LearnMaterialelements'
import { LTsubHeader } from '../LearnTech/LearnTechelement'
import { TBcontainer } from '../ToBlogs/ToBlogselement'
import {LSContents}  from './learnservicescontents'
import { LSNavbtn, LSNavcontainer, LSVDcontent, LSVDheader, LSVDsubH, LSviewdiv, LSviewer } from './LearnServiceselements'
const LearnServices = () => {
  return (
    <TBcontainer>
        <LTsubHeader>OUR SERVICES</LTsubHeader>
        <SCheader1>Made In <SSpan>SlicerLabs</SSpan> </SCheader1>
        <LMContainer>

            <LSNavcontainer>
                <LSNavbtn><p>Thermoplastic Filament</p></LSNavbtn>
                |
                <LSNavbtn><p>General Purpose</p></LSNavbtn>
                |
                <LSNavbtn><p>Engineering Resins</p></LSNavbtn>
            </LSNavcontainer>

            <LSviewer>
                <LSviewdiv>
                    <LSVDheader>{LSContents[0].header}</LSVDheader>
                    <LSVDsubH>{LSContents[0].subHeader}</LSVDsubH>
                    <LSVDcontent>{LSContents[0].content}</LSVDcontent>
                </LSviewdiv>
            </LSviewer>
        </LMContainer>
    </TBcontainer>
    
  )
}

export default LearnServices