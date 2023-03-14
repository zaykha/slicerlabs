import React, { useEffect, useRef } from 'react';
import { LoginContainer, LoginFlexdiv, LoginFromcontainer } from '../../../Login/LoginComponents/LoginForm/LoginFormelements'
import { Mdropdownlabel, MinP, Minputqtt, MOdropdown, Moption, TocartCTABtn, Tocartflexdiv } from './MaterialsOptionselements'

const MaterialsOptions = () => {

  const aboveDivRef = useRef(null);
  const belowDivRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      const aboveHeight = aboveDivRef.current.getBoundingClientRect().height;
      belowDivRef.current.style.top = `${aboveHeight+520}px`;
    };
    
    updatePosition(); // Set initial position on page load
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, []);
  return (
    <>
    <LoginFromcontainer ref={aboveDivRef} >
    <LoginContainer >
        <Mdropdownlabel>Materials</Mdropdownlabel>
        <MOdropdown>
          <Moption>Acrylonitrile Butadiene Styrene (ABS)</Moption>
          <Moption>Polylactic Acid (PLA)</Moption>
          <Moption>Thermoplastic Polyurethane (TPU)</Moption>
          <Moption>Nylon</Moption>
          <Moption>Polyethylene Terephthalate Glycol (PETG)</Moption>
          <Moption>Resins</Moption>  
        </MOdropdown>

        <Mdropdownlabel>Finshing & Color</Mdropdownlabel>
        <MOdropdown>
          <Moption>White</Moption>
          <Moption>Black</Moption>
          <Moption>Transparent</Moption>
        </MOdropdown>


        <Mdropdownlabel>Dimension ( Length x Width x Height )</Mdropdownlabel>
        <MOdropdown>
          <Moption>10 x 10 x 10</Moption>
          <Moption>20 x 20 x 20</Moption>
          <Moption>30 x 30 x 30</Moption>
          <Moption>40 x 40 x 40</Moption>
          <Moption>50 x 50 x 50</Moption>
          <Moption>custom</Moption>  
        </MOdropdown>

        <Mdropdownlabel>Quantity</Mdropdownlabel>
        <LoginFlexdiv >
            <Minputqtt type='number' placeholder='Quantity' min='0'></Minputqtt>
            <MinP>x </MinP>
            <MinP>$ 0 </MinP>
            <MinP>= </MinP>
            <MinP>$ 0</MinP>


        </LoginFlexdiv>
        <MinP>Your Product will be Produced in ? business days.</MinP>
    </LoginContainer>

  
</LoginFromcontainer>
<Tocartflexdiv ref={belowDivRef}>
        <TocartCTABtn>ADD TO CART</TocartCTABtn>
        <TocartCTABtn>CHECK OUT</TocartCTABtn>
    </Tocartflexdiv>
</>
  )
}

export default MaterialsOptions