import React from 'react'
import { CTAh1, InfoCTAContainer } from '../InfoCTA/InfoCTAelement'
import { HSFlex } from '../Stats/HomeStatselement'
import { ToServicesContainer } from '../ToServices/ToServiceselement'
import { Avatar, Avatarname, CTAh2, Testcontainer, Testimonialp } from './Testimonialselement'
import Bro1 from '../../../../assets/Bro1.png';
import woman from '../../../../assets/Woman.png';
import Mark1 from '../../../../assets/Mark1.png';


const Testimonials = () => {
  return (
    <ToServicesContainer>
        <InfoCTAContainer>
        <CTAh2>
            Enabling Designers and engineers everywhere to reach their full potential
        </CTAh2>

        <HSFlex>
            <Testcontainer>
                <Avatar src={Bro1}></Avatar>
                <Avatarname>Bec Brodie</Avatarname>
                <Testimonialp>Excellent quality and service. 
                    They were really knowledgeable about the different 3d printing techniques 
                    and were able to provide valuable suggestions to improve my work.
                     Will definitely work with them again!</Testimonialp>
            </Testcontainer>

            <Testcontainer>
            <Avatar src={woman}></Avatar>

                <Avatarname>Ng Luo Wei</Avatarname>
                <Testimonialp>Affordable pricing with great printing quality.
                     The service was also prompt and friendly. 
                     Highly recommend their 3D printing services!</Testimonialp>
            </Testcontainer>

            <Testcontainer>
            <Avatar src={Mark1}></Avatar>
                <Avatarname>Bec Brodie</Avatarname>
                <Testimonialp>Really great team to deal with. I’ll be back soon!</Testimonialp>
            </Testcontainer>
        </HSFlex>
        </InfoCTAContainer>
    </ToServicesContainer>
  )
}

export default Testimonials