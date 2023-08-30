import React from "react";
import { CTABtn } from "../../../../globalcomponents/Buttons/CtaBtn";
import {
  MUBox,
  MUContainer,
  MUcontent,
  MUHeader,
  MUIMG,
  MUp,
  MUSubHeader,
} from "./MaterialUsagecomponent";
import saer from "../../../../assets/saer.jpg";
import saer2 from "../../../../assets/22.jpg";
import asdw from "../../../../assets/asdw.jpg";
import { LTsubHeader } from "../../../Learn/LearnComponents/LearnTech/LearnTechelement";
import { SCheader1, SSpan } from "../../../Services/Serviceselement";

const MaterialUsage = () => {
  return (
    <>
      <LTsubHeader>OUR SERVICES</LTsubHeader>
      <SCheader1>
        Made In <SSpan>SlicerLabs</SSpan>{" "}
      </SCheader1>
      <MUContainer>
        <MUBox>
          <MUcontent>
            <MUHeader>General Purpose</MUHeader>
            <MUSubHeader>
              Outstanding performance. Excellent detail.
            </MUSubHeader>
            <MUp>
              Custom-formulated to deliver the highest-quality output, our
              Standard Resins capture astonishing detail without sacrificing
              strength.
            </MUp>
            <CTABtn to={"/Learn"}>Learn More</CTABtn>
          </MUcontent>
          <MUIMG src={saer}></MUIMG>
        </MUBox>
      </MUContainer>
      <MUBox>
        <MUIMG src={saer2}></MUIMG>
        <MUcontent>
          <MUHeader>Engineering Resins</MUHeader>
          <MUSubHeader>Functional prototyping materials.</MUSubHeader>
          <MUp>
            Our library of versatile, reliable Engineering Resins is formulated
            to help you reduce costs, iterate faster, and bring better
            experiences to market.
          </MUp>
          <CTABtn to={"/Learn"}>Learn More</CTABtn>
        </MUcontent>
      </MUBox>
      <MUContainer>
        <MUBox>
          <MUcontent>
            <MUHeader>Thermoplastic Filament</MUHeader>
            <MUSubHeader>plant-based material </MUSubHeader>
            <MUp>
              PLA is a strong and durable material that is suitable for a wide
              range of applications, such as prototyping, low-volume production,
              and end-use parts.
            </MUp>
            <CTABtn to={"/Learn"}>Learn More</CTABtn>
          </MUcontent>
          <MUIMG src={asdw}></MUIMG>
        </MUBox>
      </MUContainer>
    </>
  );
};

export default MaterialUsage;
