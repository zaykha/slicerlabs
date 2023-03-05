import React from 'react'
import { CTABtn } from '../../../../globalcomponents/Buttons/CtaBtn'
import { Infop } from '../../../HomePage/HomepageComponents/InfoCTA/InfoCTAelement'
import { SCheader1, SSpan } from '../../Serviceselement'
import { 
    S1content,
    S1contents,
    Scardhearder,
    Scardp,
    Servicespright,
    Stats1container 
} from './ServicesStatselements'

const ServicesStats = () => {
  return (
    <>
        <Stats1container>
            <SCheader1>Product <SSpan>Technologies</SSpan></SCheader1>
            <S1contents>
                <S1content>
                    <Servicespright>Prototyping</Servicespright>
                    <Scardhearder>SLA</Scardhearder>
                    <Scardp>STEROLITHOGRAHY</Scardp>
                </S1content>
                <S1content>
                    <Servicespright>Functional</Servicespright>
                    <Scardhearder>FDM</Scardhearder>
                    <Scardp>FUSED DEPOSITION MODELING</Scardp>
                </S1content>
            </S1contents>

            <Scardp>We provide fuss-free service using hobbisy FDM and SLA technologies with 
                Competitive Price
            </Scardp>

            <CTABtn>Learn More</CTABtn>
        </Stats1container>
    </>
  )
}

export default ServicesStats