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
import Makerbot from '../../../../assets/1235.png';


const ServicesHero = () => {
  return (
    <ToServicesContainer>
    <InfoCTAContainer>
    <RightContentservice data-aos="zoom-out-right">
        <CTAh1>Complete 3D printing solutions </CTAh1><Sfoot>– we've got you covered</Sfoot>
                <Infop>From the convenience of your home, 
                    access our full range of plastic polymer 3D printing options, 
                    including SLA, SLS, FDM, and MJF. 
                    Experience top-quality prints at ultra-competitive rates
                    and lightning-fast lead times.</Infop>
                <CTABtn to={"/Start3dPrinting"}>Start 3D Printing</CTABtn>
            
       
        </RightContentservice>
        <LeftContent data-aos="zoom-out-left">
            <InfoIMG src={Makerbot}>

            </InfoIMG>
        </LeftContent>
        
    </InfoCTAContainer>
    </ToServicesContainer>
  )
}

export default ServicesHero