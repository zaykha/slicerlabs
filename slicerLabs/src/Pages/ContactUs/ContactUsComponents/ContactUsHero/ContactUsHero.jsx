import React from 'react'
import { SSpan } from '../../../Services/Serviceselement'
import { 
    CUcardheader,
    CUcardsubH,
    CUcontent,
    CUCTABG, 
    CUCTABTN, 
    CUCTAcard, 
    CUCTAcontainer, 
    CUheader, 
    CUsubheader, 
    CUsubspan
} from './ContactUsHeroelemements'

const ContactUsHero = () => {
  return (
    <>
        <CUheader>Get <SSpan>Started</SSpan></CUheader>
        <CUsubheader>we are at the ready to assist you with your journey</CUsubheader>

        <CUCTABG>
        <CUCTAcontainer>
            <CUCTAcard>
                <CUcardheader><SSpan>BLAZING FAST </SSpan>QUOTE</CUcardheader>
                <CUcardsubH>All online</CUcardsubH>
                <CUcontent>
                    Already with 3D CAD files in STL, STEP or OBJ format? Upload your files for 
                    <CUsubspan>Instant Quote and Order Online!</CUsubspan>
                </CUcontent>
                <CUCTABTN>Start 3D Printing</CUCTABTN>
            </CUCTAcard>

            <CUCTAcard>
                <CUcardheader><SSpan>READY</SSpan> TO ANSWER</CUcardheader>
                <CUcardsubH>Always online</CUcardsubH>
                <CUcontent>
                Contact sales team. Let us know your requirements through  
                    <CUsubspan>contact form below.</CUsubspan>
                </CUcontent>
                <CUCTABTN>Contact Us</CUCTABTN>
            </CUCTAcard>
        </CUCTAcontainer>
        </CUCTABG>
    </>
  )
}

export default ContactUsHero