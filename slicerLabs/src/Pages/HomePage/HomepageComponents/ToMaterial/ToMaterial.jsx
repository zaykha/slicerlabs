import React from 'react'
import { CTABtn } from '../../../../globalcomponents/Buttons/CtaBtn'
import { 
    CTAh1,
    InfoCTAContainer, 
    InfoIMG, 
    Infop, 
    LeftContent, 
    RightContent
} from '../InfoCTA/InfoCTAelement'
import { Sfoot } from '../Stats/HomeStatselement'
import MaterialIMG from '../../../../assets/1235.png'

const ToMaterial = () => {
  return (
    <InfoCTAContainer>
        <LeftContent data-aos="fade-right">
            <InfoIMG src={MaterialIMG}>

            </InfoIMG>
        </LeftContent>
        <RightContent data-aos="fade-left">
                <CTAh1>High-Performance 3D Printing Materials</CTAh1><Sfoot>- At Your FingerTips</Sfoot>
                <Infop>From single parts to large runs, we have the functional materials you need.
                     Our range of MJF, SLS, and FDM materials is perfect for high-stress applications. 
                    With build sizes up to 90cm, we can handle projects of any size.</Infop>
                <CTABtn to={"/services"}>Our Materials</CTABtn>
        </RightContent>
    </InfoCTAContainer>
  )
}

export default ToMaterial