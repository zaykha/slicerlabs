import React from 'react'
import { CTABtn } from '../../../../globalcomponents/Buttons/CtaBtn'
import { Sfoot, Shead } from '../Stats/HomeStatselement'
import { InfoCTAContainer, InfoIMG, LeftContent, RightContent, Infop, CTAh1 } from './InfoCTAelement'
import INFOCTAIMG from '../../../../assets/upload.png';

const InfoCTA = () => {
  return (
    <InfoCTAContainer>
        <LeftContent>
            <InfoIMG src={INFOCTAIMG}>

            </InfoIMG>
        </LeftContent>
        <RightContent>
                <CTAh1>Instant quotes</CTAh1><Sfoot>- No delays, No fuss</Sfoot>
                <Infop>Frustrated with slow vendor replies? With us, getting a quote 
                    and placing an order for 3D printed parts takes just 5 seconds.
                    You'll save an average of half the lead time compared to other vendors.</Infop>
                <CTABtn>Get Your Quotes</CTABtn>
        </RightContent>
    </InfoCTAContainer>
  )
}

export default InfoCTA