import React, { useState } from "react";
import styled from "styled-components";
import {
  FaAngleLeft,
  FaAngleRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
const CarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
  box-sizing: border-box;

  width: 773px;
  margin: 40px auto;
  //   height: 300px; /* Set the desired height of your carousel */
  //   border: 1px solid #ccc;
  position: relative;
  @media screen and (max-width: 800px) {
    width: 95%;
  }
`;

const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 100%;
  height: 100%;
  //   padding: 20px;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  //   transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
`;
const PageIndicator = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.active ? "white" : "transparent")};
  border: 1px solid white;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
`;

const NavigationButton = styled.button`
  //   background: rgba(0, 0, 0, 0.5);
  background: none;
  color: #fff;
  border: none;
  //   padding: 10px;
  cursor: pointer;
`;

const Carousel = ({ items }) => {
  const [currentItem, setCurrentItem] = useState(0);

  const scrollLeft = () => {
    if (currentItem > 0) {
      setCurrentItem(currentItem - 1);
    }
  };

  const scrollRight = () => {
    if (currentItem < items.length - 1) {
      setCurrentItem(currentItem + 1);
    }
  };

  const goToPage = (pageIndex) => {
    setCurrentItem(pageIndex);
  };
  return (
    <CarouselContainer>
      <ButtonContainer>
        {/* <NavigationButton onClick={scrollLeft}>
          <FaChevronLeft />
        </NavigationButton> */}
        {items.map((_, index) => (
          <PageIndicator
            key={index}
            active={index === currentItem}
            onClick={() => goToPage(index)}
          />
        ))}
        {/* <NavigationButton onClick={scrollRight}>
          <FaChevronRight />{" "}
        </NavigationButton> */}
      </ButtonContainer>
      <div
        style={{
          display: "flex",
          transform: `translateX(-${currentItem * 100}%)`,
          transition: "transform 0.3s",
        }}
      >
        {items.map((item, index) => (
          <CarouselItem key={index}>{item}</CarouselItem>
        ))}
      </div>
    </CarouselContainer>
  );
};

export default Carousel;
