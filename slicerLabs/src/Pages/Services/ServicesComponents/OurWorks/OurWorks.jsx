import React, { useState } from "react";
import styled from "styled-components";
import proto1 from "../../../../assets/proto1.png"
import proto2 from "../../../../assets/proto2.png"
import proto3 from "../../../../assets/Proto3.png"
import proto4 from "../../../../assets/Proto4.png"
import proto5 from "../../../../assets/Proto5.png"
import { SCheader1, SSpan } from "../../Serviceselement";
import { LTsubHeader } from "../../../Learn/LearnComponents/LearnTech/LearnTechelement";


const Container = styled.div`
  width: 1200px;
  height: 500px;
  position: relative;
  color:white;
  margin: 20px auto;
  @media screen and (max-width: 1200px){
    width: 100%;
  }
`;
const OurworksContainer = styled.div`
  width: 100%;
  background: linear-gradient(180deg, #083347 0%, #005076 100%);
  padding: 80px 0;
`;
const SlideContainer = styled.div`
  display: flex;
  height: 100%;
  transition: 0.5s all ease-in-out;
   width: 2500px;
  margin: auto;
`;
const SliderViewport = styled.div`
    width: 500px;
  margin: auto;
  overflow: hidden;

`
const Slide = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 72px;
  background: linear-gradient(180deg, #1D1F2B 0%, #1A1A1A 100%);
  // border:1px solid red;
`;
const SlideHeader= styled.div`
  width: 100%;
  text-align:center;
  font-size: 1.4rem;
`;
const SliderIMG= styled.img`
  width: 100%;
  height: 200px;
  object-fit:contain;
  z-index:2;
`;
const SliderImgbg = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 400px;
    height: 100px;
    background:  linear-gradient(180deg, rgba(8, 51, 71, 0.63) 0%, rgba(0, 80, 118, 0.63) 100%);
    z-index:1;
`
const SlideContent = styled.div`
  width: 80%;
  font-size:1rem;
  color: white;
  text-align: center;
`;
const CircleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 8px;
  background-color: ${({ isActive }) => (isActive ? "white" : "darkgray")};
  cursor: pointer;
`;
const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
    color: black;
    font-size: 2rem;
  &:hover {
    color:#48b2e9;
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const LeftArrow = styled(Arrow)`
  left: 0;
`;

const RightArrow = styled(Arrow)`
  right: 0;
`;

const slides = [  
    { id: 1, Title: "Industrial Design", imgsrc:proto1, content:"Form-finding design part for students" },  
    { id: 2, Title: "Capsule sleeve holder", imgsrc:proto2, content:"PLA prototyping part for commercial company" },  
    { id: 3, Title: "PCB mount", imgsrc:proto3, content:"PCB Mounting part for mass production Wifi-Scanner" },  
    { id: 4, Title: "Class-material", imgsrc:proto4, content:"3D Printing workshop for community center" },  
    { id: 5, Title: "Jigs and Fixtures", imgsrc:proto5, content:"Fitting jig for commercial company" },
    { id: 6, Title: "Mass production", imgsrc:proto1, content:"Mass production hand-tool for commercial company" },
    { id: 7, Title: "Custom nozzle fittings", imgsrc:proto5, content:"Customized part for replacement for water pump" },
    { id: 8, Title: "Figurine mold cast", imgsrc:proto5, content:"3D modelled parts for casting for small businesses" },
    { id: 9, Title: "Miniatures", imgsrc:proto5, content:"Decorative items for product design student" },

  ];

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleClick = (index) => {
    setActiveSlide(index);
  };

  const handlePrevClick = () => {
    setActiveSlide((activeSlide - 1 + slides.length) % slides.length);
  };

  const handleNextClick = () => {
    setActiveSlide((activeSlide + 1) % slides.length);
  };

  return (

    <OurworksContainer>
       <LTsubHeader>MADE IN SLICERLABS</LTsubHeader>
        <SCheader1>Featured <SSpan>Prints</SSpan> </SCheader1>
    <Container>
        <SliderViewport>
      <SlideContainer
        style={{
          transform: `translateX(-${activeSlide * 500}px)`,
          width: `${slides.length * 500}px`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide key={slide.id} style={{ backgroundColor: slide.color }}>
            <SlideHeader>
                {slide.Title}
            </SlideHeader>
            <SliderIMG src={slide.imgsrc}>
            </SliderIMG>
            <SliderImgbg></SliderImgbg>
            <SlideContent>
                {slide.content}
            </SlideContent>
          </Slide>
        ))}
      </SlideContainer>
      </SliderViewport>
      <CircleContainer>
        {slides.map((slide, index) => (
          <Circle
            key={slide.id}
            isActive={index === activeSlide}
            onClick={() => handleClick(index)}
          />
        ))}
      </CircleContainer>
      <LeftArrow onClick={handlePrevClick}> {'<'}</LeftArrow>
      <RightArrow onClick={handleNextClick}>{'>'}</RightArrow>
    </Container>
    </OurworksContainer>
  );
};

export default Carousel;
