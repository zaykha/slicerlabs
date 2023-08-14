import React from 'react'
import { CTABtn } from '../../../../globalcomponents/Buttons/CtaBtn'
import { Scardhearder, Scardp, Servicespright } from '../../../Services/ServicesComponents/ServicesStats/ServicesStatselements'
import { 
    MSBtn,
    MSCard,
    MSCardContainer,
    MScontainter 
} from './MaterialStatselement'

const MaterialStats = () => {
  return (
    <MScontainter>
        <MSCardContainer>
            <MSCard>
                <Servicespright>Prototyping</Servicespright>
                <Scardhearder>SLA</Scardhearder>
                <Scardp>
                    Our  materials used in SLA technology are ABS-like, 
                    clear, gray and black resins, and castable resins. 
                    These materials are suitable for a wide range of applications 
                    such as prototyping, jewelry, dentistry, and many more.
                </Scardp>
                <MSBtn>Material 1</MSBtn>
                <MSBtn>Material 2</MSBtn>
                <MSBtn>Material 3</MSBtn>
                <MSBtn>Material 4</MSBtn>
            </MSCard>

            <MSCard>
                <Servicespright>Prototyping</Servicespright>
                <Scardhearder>SLA</Scardhearder>
                <Scardp>
                    Our  materials used in SLA technology are ABS-like, 
                    clear, gray and black resins, and castable resins. 
                    These materials are suitable for a wide range of applications 
                    such as prototyping, jewelry, dentistry, and many more.
                </Scardp>
                <MSBtn>Material 1</MSBtn>
                <MSBtn>Material 2</MSBtn>
                <MSBtn>Material 3</MSBtn>
                <MSBtn>Material 4</MSBtn>
            </MSCard>
        </MSCardContainer>
            <Scardp>We provide fuss-free service 
                using hobbyist FDM and SLA technologies with  competitive price</Scardp>

        <CTABtn to={"/Learn"}>Learn More</CTABtn>
    </MScontainter>
  )
}

export default MaterialStats