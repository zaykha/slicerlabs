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
                        <CUFstatscontent>661C Jurong West Street 64, Singapore 643661</CUFstatscontent>
                    </CUFstatswraper>
                </CUFstatscontainer>
                
                <CUFstatscontainer>
                    <CUFstatsimg src={smartphoneicon}></CUFstatsimg>
                    <CUFstatswraper>
                        <CUFstatshead>Contact</CUFstatshead>
                        <CUFstatscontent>+65 8188 3267</CUFstatscontent>
                    </CUFstatswraper>
                </CUFstatscontainer>

                <CUFstatscontainer>
                    <CUFstatsimg src={emailicon}></CUFstatsimg>
                    <CUFstatswraper>
                        <CUFstatshead>E-mail</CUFstatshead>
                        <CUFstatscontent>slicerlabs@gmail.com</CUFstatscontent>
                    </CUFstatswraper>
                </CUFstatscontainer>

                {/* <CUFCTAcard>
                    <CUFCTAcardheader>Stay connected with Us</CUFCTAcardheader>
                    <CUFCTAcardcontent>Subscribe to our News letter to get updated on latest News and Promotions</CUFCTAcardcontent>
                    <CUFCTABTN>Subscribe</CUFCTABTN>
                </CUFCTAcard>

                <CUFCTAcard>
                    <CUFCTAcardheader>Already have a 3D file?</CUFCTAcardheader>
                    <CUFCTABTN>Upload File</CUFCTABTN>
                </CUFCTAcard> */}
                 <CUFCTAcard>
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.733146385878!2d103.70248147677039!3d1.3363511616153514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da0f8d47addcf5%3A0xd1f73cb231a37e9c!2sBlock%20661A%20HDB%20Jurong%20West!5e0!3m2!1sen!2smm!4v1693414940380!5m2!1sen!2smm" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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