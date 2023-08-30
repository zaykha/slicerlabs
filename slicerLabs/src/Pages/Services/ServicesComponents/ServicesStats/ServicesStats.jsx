import React from "react";
import { CTABtn } from "../../../../globalcomponents/Buttons/CtaBtn";
import {
  InfoIMG,
  Infop,
} from "../../../HomePage/HomepageComponents/InfoCTA/InfoCTAelement";
import { SCheader1, SSpan } from "../../Serviceselement";
import {
  IMGServices,
  S1content,
  S1contents,
  Scardhearder,
  Scardp,
  Scardp1,
  Servicespright,
  Stats1container,
} from "./ServicesStatselements";
import Makerbot from "../../../../assets/Printer1.png";
import { LTsubHeader } from "../../../Learn/LearnComponents/LearnTech/LearnTechelement";
const ServicesStats = () => {
  return (
    <>
      <Stats1container>
      <LTsubHeader>MADE IN SLICERLABS</LTsubHeader>
        <SCheader1>Product <SSpan>Technology</SSpan> </SCheader1>
        <S1contents>
          <S1content>
            <IMGServices src={Makerbot} />
          </S1content>
          <S1content>
            <Servicespright>Functional(FDM)</Servicespright>
            <Scardhearder>Our Printer Capabilities</Scardhearder>
            <Scardp>
              <strong>Model Type:</strong> Creality Ender
            </Scardp>
            <Scardp>
              <strong>Print Bed Size:</strong> 235 x 235 mm
            </Scardp>
            <Scardp>
              <strong>Print Volume:</strong> 220 x 220 x 250 mm
            </Scardp>
            <Scardp>
              <strong>Est. Tolerance:</strong> +/- 0.2mm
            </Scardp>
            <Scardp>
              <strong>Material:</strong> PLA
            </Scardp>
            <Scardp>
              <strong>Colors:</strong> Default (Matt Black/Black/Grey; Others:
              Upon Request)
            </Scardp>
            <Scardp>
              <strong>Est. Lead-Time:</strong> Typically 1-3 days per part
            </Scardp>
            <Scardp>
              <strong>Costs (Price-Match Guarantee):</strong> We
              will ensure that our quotes are the cheapest in town to make sure
              that you get the bang for the buck pricings. Supply an official
              invoice from the supplier and we will match it should you find one
              cheaper than our quote!
            </Scardp>
          </S1content>
        </S1contents>

        <Scardp1>
          We provide fuss-free service using hobbisy FDM and SLA technologies
          with Competitive Price
        </Scardp1>

        {/* <CTABtn to={"/Learn"}>Learn More</CTABtn> */}
      </Stats1container>
    </>
  );
};

export default ServicesStats;
