import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdCheck } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  TocartCTABtn,
  Tocartflexdiv,
} from "../../Pages/StartPrinting/StartPrintingComponents/MaterialsOptions/MaterialsOptionselements";
const CarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
  box-sizing: border-box;

  width: 773px;
  margin: 40px auto;
  height: auto; /* Set the desired height of your carousel */
  //   border: 1px solid #ccc;
  // padding-bottom: 40px;
  position: relative;
  @media screen and (max-width: 800px) {
    width: 95%;
  }
`;

const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 100%;
  // height: 100%;
  // padding: 20px;
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
  width: 20px;
  height: 20px;
  background-color: ${(props) =>
    props.active
      ? props.priceNotZero
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(255, 255, 255, 0.4)"
      : "transparent"};
  border: 1px solid ${(props) => (props.priceNotZero ? "green" : "#636363")};
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  svg {
    color: green;
    display: ${(props) => (props.priceNotZero ? "block" : "none")};
  }
`;

const NavigationButton = styled.button`
  //   background: rgba(0, 0, 0, 0.5);
  background: none;
  color: #fff;
  border: none;
  //   padding: 10px;
  cursor: pointer;
`;
export const Tocartflexdiv1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 400px;
  margin: auto;
  position: relative;

  margin: auto;
  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;
export const TocartCTABtn1 = styled.div`
  box-sizing: border-box;
  text-decoration: none;
  padding: 10px 5px;
  background: #f0f0f0;
  border: 2px solid #006b9e;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  width: 180px;
  // height: 32px;
  // margin: 40px;
  text-align: center;
  border: 1px solid #006b9e;
  transition: all 0.2s ease-in;
  cursor: pointer;

  &:hover {
    color: #fff;
    background: #006b9e;
    border: 1px solid white;
  }
`;
const Carousel = ({ items }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const cart = useSelector((state) => state.cartItems);

  useEffect(() => {
    // Check if the currentItem is still valid after deletion
    if (currentItem >= items.length) {
      setCurrentItem(items.length - 1);
    }
  }, [currentItem, items.length]);
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
    <>
      <CarouselContainer>
        <ButtonContainer>
          {/* <NavigationButton onClick={scrollLeft}>
              <FaChevronLeft />
            </NavigationButton> */}

          {cart.cartItems.map((item, index) => (
            <PageIndicator
              key={index}
              active={index === currentItem}
              onClick={() => goToPage(index)}
              priceNotZero={item.pricePerUnit !== 0}
            >
              <MdCheck />
            </PageIndicator>
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
    </>
  );
};

export default Carousel;
