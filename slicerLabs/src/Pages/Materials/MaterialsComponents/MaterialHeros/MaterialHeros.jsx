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
import Materialsimg from '../../../../assets/Materialsimg.png';


const MaterialHero = () => {
  return (
    <ToServicesContainer>
    <InfoCTAContainer>
    <RightContentservice>
        <CTAh1>Complete 3D printing materials </CTAh1><Sfoot>– SLA & FDM</Sfoot>
                <Infop>Choose from our selection of premium 3D printing materials, 
                    including strong and durable functional nylon 
                    and flexible TPU rubber-like material.
                     Our selection is constantly expanding.</Infop>
                <CTABtn>Start 3D Printing</CTABtn>
            
       
        </RightContentservice>
        <LeftContent>
            <InfoIMG src={Materialsimg}>

            </InfoIMG>
        </LeftContent>
        
    </InfoCTAContainer>
    </ToServicesContainer>
  )
}

export default MaterialHero