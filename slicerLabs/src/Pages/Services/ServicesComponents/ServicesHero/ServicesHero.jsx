import React from 'react'
import { CTABtn } from '../../../../globalcomponents/Buttons/CtaBtn'
import { CTAh1, 
    InfoCTAContainer, 
    InfoIMG, 
    Infop,
    LeftContent
} from '../../../HomePage/HomepageComponents/InfoCTA/InfoCTAelement'
import { Sfoot } from '../../../HomePage/HomepageComponents/Stats/HomeStatselement'
import { 
    RightContentservice,
    ToServicesContainer 
} from '../../../HomePage/HomepageComponents/ToServices/ToServiceselement'
import Makerbot from '../../../../assets/makerbot.png';


const ServicesHero = () => {
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
                <CTABtn>Start 3D Printing</CTABtn>
            
       
        </RightContentservice>
        <LeftContent>
            <InfoIMG src={Makerbot}>

            </InfoIMG>
        </LeftContent>
        
    </InfoCTAContainer>
    </ToServicesContainer>
  )
}

export default ServicesHero