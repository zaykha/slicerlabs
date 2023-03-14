import React from 'react'
import { SSpan } from '../../../Services/Serviceselement'
import { CUheader, CUsubheader } from '../ContactUsHero/ContactUsHeroelemements'
import { 
    CUFContainer, 
    CUFCTABTN, 
    CUFCTAcard, 
    CUFCTAcardcontent, 
    CUFCTAcardheader, 
    CUFForm, 
    CUFFormBTN, 
    CUFFormHeader, 
    CUFstats, 
    CUFstatscontainer,
    CUFstatscontent,
    CUFstatshead,
    CUFstatsimg,
    CUFstatswraper,
    CUFTextarea,
    NameInp
} from './ContactUsFormelement'
import locationicon from '../../../../assets/location.png';
import emailicon from '../../../../assets/email.png';
import smartphoneicon from '../../../../assets/smartphone.png';



const ContactUsForm = () => {
  return (
    <>
        <CUheader>Contact <SSpan>Us</SSpan></CUheader>
        <CUsubheader>We will get back to you within 1 business day.</CUsubheader>

        <CUFContainer>
            <CUFstats>
                <CUFstatscontainer>
                    <CUFstatsimg src={locationicon}></CUFstatsimg>
                    <CUFstatswraper>
                        <CUFstatshead>Address</CUFstatshead>
                        <CUFstatscontent>3A Toh Guan Rd E, Singapore 608834</CUFstatscontent>
                    </CUFstatswraper>
                </CUFstatscontainer>
                
                <CUFstatscontainer>
                    <CUFstatsimg src={emailicon}></CUFstatsimg>
                    <CUFstatswraper>
                        <CUFstatshead>Contact</CUFstatshead>
                        <CUFstatscontent>+65 6848 1548, +65 6784 1579</CUFstatscontent>
                    </CUFstatswraper>
                </CUFstatscontainer>

                <CUFstatscontainer>
                    <CUFstatsimg src={smartphoneicon}></CUFstatsimg>
                    <CUFstatswraper>
                        <CUFstatshead>E-mail</CUFstatshead>
                        <CUFstatscontent>contact@slicerlabs.com</CUFstatscontent>
                    </CUFstatswraper>
                </CUFstatscontainer>

                <CUFCTAcard>
                    <CUFCTAcardheader>Stay connected with Us</CUFCTAcardheader>
                    <CUFCTAcardcontent>Subscribe to our News letter to get updated on latest News and Promotions</CUFCTAcardcontent>
                    <CUFCTABTN>Subscribe</CUFCTABTN>
                </CUFCTAcard>

                <CUFCTAcard>
                    <CUFCTAcardheader>Already have a 3D file?</CUFCTAcardheader>
                    <CUFCTABTN>Upload File</CUFCTABTN>
                </CUFCTAcard>
            </CUFstats>
                <CUFForm>
                    <CUFFormHeader><SSpan>Send</SSpan> Message</CUFFormHeader>
                    <NameInp name="CTForm" type='text' placeholder='Full Name'></NameInp>
                    <NameInp name="CTForm" type='email' placeholder='Email'></NameInp>
                    <NameInp name="CTForm" type='text' placeholder='Message Topic'></NameInp>
                    <CUFTextarea name="CTForm" rows="10" cols="30" placeholder='Your Message Here'></CUFTextarea>
                    <CUFFormBTN>Send Message</CUFFormBTN>
            </CUFForm>
        </CUFContainer>

    </>
  )
}

export default ContactUsForm