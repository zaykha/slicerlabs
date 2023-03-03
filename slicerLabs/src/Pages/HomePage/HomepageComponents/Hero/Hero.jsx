import React from 'react'
import { CTABtn } from '../../../../globalcomponents/Buttons/CtaBtn'
import { HeroContainer, HeroPhrase, Herop } from './Heroelement'

export const Hero = () => {
  return (
    <HeroContainer>     
        <HeroPhrase>
            TRANSFORM YOU IDEAS INTO PHYSICAL OBJECTS
        </HeroPhrase>
        <Herop>
            with just a few clicks!
        </Herop>

        <CTABtn>Start 3D Printing</CTABtn>
    </HeroContainer>
  )
}
