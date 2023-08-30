import React from "react";
import { CTABtn } from "../../../../globalcomponents/Buttons/CtaBtn";
import { Sfoot, Shead } from "../Stats/HomeStatselement";
import {
  InfoCTAContainer,
  InfoIMG,
  LeftContent,
  RightContent,
  Infop,
  CTAh1,
  Sheader
} from "./InfoCTAelement";
import INFOCTAIMG from "../../../../assets/quote2.png";

const InfoCTA = () => {
  return (
    <InfoCTAContainer>
      <LeftContent>
        <InfoIMG src={INFOCTAIMG}></InfoIMG>
      </LeftContent>
      <RightContent>
        <CTAh1>Instant quotes</CTAh1>
        <Sheader>- No delays, No fuss</Sheader>
        <Infop>
          Frustrated with slow vendor replies?
          <br />
          <br />
          With us, getting a quote and placing an order for 3D printed parts
          takes just 5 seconds. 
          <br />
          <br />
          You'll save an average of half the lead time
          compared to other vendors.
        </Infop>
        <CTABtn to={"/Start3dPrinting"}>Get Your Quotes</CTABtn>
      </RightContent>
    </InfoCTAContainer>
  );
};

export default InfoCTA;
