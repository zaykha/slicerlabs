import React from 'react'
import { 
    Copyright,
    Fcontent,
    Fheader,
    Flink,
    Flinks,
    Footercomp,
    Footercontainer, 
    FooterContent, 
    FooterContentcontainer, 
    Footercopyright, 
    FooterIMG, 
    Footerpartition,
    Socialimg,
    Sociallogolink,
    Socials
} from './footerelement'
import logo4 from '../../assets/Asset 4.png';
import FB from '../../assets/fb.png';
import INSTA from '../../assets/insta.png';
import Mail from '../../assets/mail.png';

const Footer = () => {
  return (
    <Footercontainer>
        <FooterContentcontainer>
            <FooterContent>

                <Footerpartition>
                    <FooterIMG src={logo4}></FooterIMG>
                    <Footercomp>
                        Slicerlabs, founded by a group of 
                        young entreprenures.From single parts to large runs, 
                        we have the functional materials you need. Our range of MJF, SLS, 
                        and FDM materials is perfect for high-stress applications. 
                       
                        </Footercomp>
                </Footerpartition>

                <Footerpartition>
                    <Fheader>Contact Us</Fheader>
                    <Fcontent>
                        685 Market Street,
                        Las Vegas, LA 95820,
                        United States.
                    </Fcontent>
                </Footerpartition>

            </FooterContent>

            <FooterContent>
                <Fheader>Materials</Fheader>

                <Flinks>
                    <Flink>Acrylonitrile Butadiene Styrene (ABS)</Flink>
                    <Flink>Polylactic Acid (PLA)</Flink>
                    <Flink>Thermoplastic Polyurethane (TPU)</Flink>
                    <Flink>Nylon</Flink>
                    <Flink>Polyethylene Terephthalate Glycol (PETG)</Flink>
                    <Flink>Resins</Flink>
                </Flinks>
            </FooterContent>

            <FooterContent>
                <Fheader>Support</Fheader>

                <Flinks>
                    <Flink>Contact</Flink>
                    <Flink>FAQ</Flink>
                    <Flink>MAterial Guide</Flink>
                    <Flink>Service Update</Flink>
                </Flinks>
            </FooterContent>
        </FooterContentcontainer>

        <Footercopyright>
            <Copyright>
                @Copyright 2023 | SlicerLabs | All Rights Reserved 
            </Copyright>
            <Socials>
                <Sociallogolink>
                    <Socialimg src={FB}></Socialimg>
                </Sociallogolink>

                <Sociallogolink>
                <Socialimg src={INSTA}></Socialimg>

                </Sociallogolink>

                <Sociallogolink>
                <Socialimg src={Mail}></Socialimg>

                </Sociallogolink>
            </Socials>
        </Footercopyright>
    </Footercontainer>
  )
}

export default Footer