import React from 'react'
import { CTABtn } from '../../../../globalcomponents/Buttons/CtaBtn'
import { CTAh1, InfoCTAContainer, InfoIMG, Infop, LeftContent } from '../InfoCTA/InfoCTAelement'
import { Sfoot } from '../Stats/HomeStatselement'
import Makerbot from '../../../../assets/makerbot.png';
import { RightContentservice, ToServicesContainer } from './ToServiceselement';

const ToServices = () => {
  return (
    <ToServicesContainer>
    <InfoCTAContainer>
    <RightContentservice>
        <CTAh1>Complete 3D printing solutions </CTAh1><Sfoot>– we've got you covered</Sfoot>
                <Infop>From the convenience of your home, 
                    access our full range of plastic polymer 3D printing options, 
                    including SLA, SLS, FDM, and MJF. 
                    Experience top-quality prints at ultra-competitive rates
                    and lightning-fast lead times.</Infop>
                <CTABtn>View Our Techs</CTABtn>
            
       
        </RightContentservice>
        <LeftContent>
            <InfoIMG src={Makerbot}>

            </InfoIMG>
        </LeftContent>
        
    </InfoCTAContainer>
    </ToServicesContainer>
  )
}

export default ToServices