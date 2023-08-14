import React, { useState } from "react";
import styled from "styled-components";

const HelpIcon = styled.div`
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #f0f0f0;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  border-radius: 50%;
  color: black;
`;

const ExplanationContainer = styled.div`
  position: absolute;
  width: 80%;
  top: 0;
  left: 20%;
  display: ${(props) => (props.show ? "block" : "none")};
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: black;
`;
const MaterialCostTag = styled.span`
  font-weight: bold;
  color: blue;
`;

const SizeAndWeightTag = styled.span`
  font-weight: bold;
  color: green;
`;

const PrintTimeTag = styled.span`
  font-weight: bold;
  color: orange;
`;

const MachineUsageTag = styled.span`
  font-weight: bold;
  color: purple;
`;

const PostProcessingLaborTag = styled.span`
  font-weight: bold;
  color: red;
`;

const OverheadCostsTag = styled.span`
  font-weight: bold;
  color: teal;
`;

const TotalCostTag = styled.span`
  font-weight: bold;
  color: darkred;
`;
const PriceCalculatorExplanation = () => {
  const [showExplanation, setShowExplanation] = useState(false);

  const handleMouseEnter = () => {
    setShowExplanation(true);
  };

  const handleMouseLeave = () => {
    setShowExplanation(false);
  };

  return (
    <div>
      <HelpIcon onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        ?
      </HelpIcon>
      <ExplanationContainer show={showExplanation}>
        <p>
          <MaterialCostTag>Material Cost:</MaterialCostTag>
          The first thing we consider is the material that will be used to print
          the object. Different materials have different costs. For example,
          using plastic might be cheaper than using a special type of resin.
          <br />
          <SizeAndWeightTag>Size and Weight:</SizeAndWeightTag> We look at the
          size of the object in terms of its width, height, and depth. We use
          these dimensions to calculate the volume of the object. Bigger objects
          usually need more material, so they might cost more to print.
          <br />
          <PrintTimeTag>Print Time:</PrintTimeTag> We calculate how long it will
          take to 3D print the object. The bigger the object, the more time it
          might take to print. We use the volume we calculated earlier to
          estimate the time.
          <br />
          <MachineUsageTag>Machine Usage:</MachineUsageTag> Using the 3D printer
          takes electricity and other resources. We calculate a cost based on
          how long the printer is used.
          <br />
          <PostProcessingLaborTag>
            Post-Processing Labor:
          </PostProcessingLaborTag>
          After printing, some objects need additional work, like smoothing or
          painting. The complexity of this work affects the cost. If it's
          simple, it might not cost much, but if it's complex, it could cost
          more.
          <br />
          <OverheadCostsTag>Overhead Costs:</OverheadCostsTag> This includes
          other costs that might not be directly related to the object itself,
          like general expenses for running the 3D printing service.
          <br />
          <TotalCostTag>Total Cost:</TotalCostTag> We add up all these costs -
          material, machine usage, labor, and overhead - to get the total cost
          of 3D printing the object.
          <br />
        </p>
      </ExplanationContainer>
    </div>
  );
};

export default PriceCalculatorExplanation;
