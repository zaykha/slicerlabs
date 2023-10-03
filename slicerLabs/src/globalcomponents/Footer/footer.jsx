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
import whatsappicon from "../../assets/whatsapp.png";
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
                    661C Jurong West Street 64, Singapore 643661
                    </Fcontent>
                </Footerpartition>

            </FooterContent>

            <FooterContent>
                <Fheader>Materials</Fheader>

                <Flinks>
                    <Flink to="/services">Acrylonitrile Butadiene Styrene (ABS)</Flink>
                    <Flink to="/services">Polylactic Acid (PLA)</Flink>
                    <Flink to="/services">Thermoplastic Polyurethane (TPU)</Flink>
                    <Flink to="/services">Nylon</Flink>
                    <Flink to="/services">Polyethylene Terephthalate Glycol (PETG)</Flink>
                    <Flink to="/services">Resins</Flink>
                </Flinks>
            </FooterContent>

            <FooterContent>
                <Fheader>Support</Fheader>

                <Flinks>
                    <Flink to="/ContactUs">Contact</Flink>
                    {/* <Flink>FAQ</Flink>
                    <Flink>Material Guide</Flink> */}
                    <Flink to="/terms&policies">Service Update</Flink>
                </Flinks>
            </FooterContent>
        </FooterContentcontainer>

        <Footercopyright>
            <Copyright>
                @Copyright 2023 | SlicerLabs | All Rights Reserved 
            </Copyright>
            <Socials>
                <Sociallogolink to="https://wa.me/+6581883267?text=Hello%20there!" target="_blank">
                    <Socialimg src={whatsappicon} ></Socialimg>
                </Sociallogolink>

                <Sociallogolink to="https://www.instagram.com/slicerlabs/" target="_blank">
                <Socialimg src={INSTA} ></Socialimg>

                </Sociallogolink>

                <Sociallogolink to="mailto:slicerlabs@gmail.com">
                <Socialimg src={Mail} ></Socialimg>

                </Sociallogolink>
            </Socials>
        </Footercopyright>
    </Footercontainer>
  )
}

export default Footer