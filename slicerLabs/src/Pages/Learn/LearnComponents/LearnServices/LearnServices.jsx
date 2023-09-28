import React, { useState }  from "react";
import { SCheader1, SSpan } from "../../../Services/Serviceselement";
import { LMContainer } from "../LearnMaterials/LearnMaterialelements";
import { LTsubHeader } from "../LearnTech/LearnTechelement";
import { TBcontainer } from "../ToBlogs/ToBlogselement";
import { LSContents } from "./learnservicescontents";
import {
  LSNavbtn,
  LSNavcontainer,
  LSVDcontent,
  LSVDheader,
  LSVDsubH,
  LSviewdiv,
  LSviewer,
} from "./LearnServiceselements";
const LearnServices = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  return (
    <TBcontainer>
      <LTsubHeader>OUR SERVICES</LTsubHeader>
      <SCheader1>
        Made In <SSpan>SlicerLabs</SSpan>{" "}
      </SCheader1>
      <LMContainer>
        <LSNavcontainer>
          {LSContents.map((material, index) => (
            <LSNavbtn
              key={material.id}
              onClick={() => setSelectedMaterial(index)}
            >
              <p>{material.header}</p>
            </LSNavbtn> 
          ))}
        
        </LSNavcontainer>

        <LSviewer>
          <LSviewdiv>
          <LSVDheader>{LSContents[selectedMaterial].header}</LSVDheader>
          <LSVDsubH>{LSContents[selectedMaterial].subHeader}</LSVDsubH>
          <LSVDcontent>{LSContents[selectedMaterial].content}</LSVDcontent>
          </LSviewdiv>
        </LSviewer>
      </LMContainer>
    </TBcontainer>
  );
};

export default LearnServices;
