import React, { useEffect, useRef, useState } from 'react';
import { LoginContainer, LoginFlexdiv, LoginFromcontainer } from '../../../Login/LoginComponents/LoginForm/LoginFormelements'
import { Mdropdownlabel, MinP, Minputqtt, MOdropdown, Moption, PMAlertBox, PMButton, PMContainer, TocartCTABtn, Tocartflexdiv } from './MaterialsOptionselements'
import { useNavigate } from 'react-router-dom';


const MaterialsOptions = ({ cartCount, setCartCount }) => {

  const aboveDivRef = useRef(null);
  const belowDivRef = useRef(null);

  const [material, setMaterial] = useState("");
  const [finishing, setFinishing] = useState("");
  const [dimension, setDimension] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);
  const Navigate = useNavigate();

  

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('cart')));
  }, [cart]);

  const handleAddToCart = () => {
    const item = {
      material,
      finishing,
      dimension,
      quantity,
    };
    if(!material ||!finishing || !dimension || !quantity){
      alert('please fill in empty fields')
    } else{
      const newCart = [...cart, item];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      setMaterial("");
      setFinishing("");
      setDimension("");
      setQuantity(0);
      setCartCount(cartCount +1);
    }
    
    
  };

  const handleCheckOut = () => {
    const item = {
      material,
      finishing,
      dimension,
      quantity,
    };

    if(cart.length>0){
      const cartString = encodeURIComponent(JSON.stringify(cart));
      Navigate(`/cart?cart=${cartString}`);
    }else{
      alert('please add to cart');
      if(!material ||!finishing || !dimension || !quantity ){
        alert('please fill in empty fields')
      } else{
        const newCart = [...cart, item];
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        setMaterial("");
        setFinishing("");
        setDimension("");
        setQuantity(0);
        const cartString = encodeURIComponent(JSON.stringify(cart));
        Navigate(`/cart?cart=${cartString}`);
      }
    }
  }

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
        <Mdropdownlabel htmlFor="material">Materials</Mdropdownlabel>
        <MOdropdown 
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        >
          <Moption value="">Please Select a Material</Moption>
          <Moption value="ABS">Acrylonitrile Butadiene Styrene (ABS)</Moption>
          <Moption value="PLA">Polylactic Acid (PLA)</Moption>
          <Moption value="TPU">Thermoplastic Polyurethane (TPU)</Moption>
          <Moption value="Nylon">Nylon</Moption>
          <Moption value="PETG">Polyethylene Terephthalate Glycol (PETG)</Moption>
          <Moption value="Resin">Resins</Moption>  
        </MOdropdown>

        <Mdropdownlabel htmlFor="finishing">Finshing & Color</Mdropdownlabel>
        <MOdropdown 
        value={finishing}
        onChange={(e) => setFinishing(e.target.value)}
        >
          <Moption value="">Please Select a Color</Moption>
          <Moption value="white">White</Moption>
          <Moption value="black">Black</Moption>
          <Moption value="transparent">Transparent</Moption>
        </MOdropdown>


        <Mdropdownlabel htmlFor="dimension">Dimension ( Length x Width x Height )</Mdropdownlabel>
        <MOdropdown
        value={dimension}
        onChange={(e) => setDimension(e.target.value)}>
          <Moption value="">Please Select a Dimension</Moption>
          <Moption value="10">10 x 10 x 10</Moption>
          <Moption value="20">20 x 20 x 20</Moption>
          <Moption value="30">30 x 30 x 30</Moption>
          <Moption value="40">40 x 40 x 40</Moption>
          <Moption value="50">50 x 50 x 50</Moption>
          <Moption value="custom">custom</Moption>  
        </MOdropdown>

        <Mdropdownlabel htmlFor="quantity">Quantity</Mdropdownlabel>
        <LoginFlexdiv >
            <Minputqtt 
            type='number' 
            placeholder='Quantity' 
            min='0'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            ></Minputqtt>
            <MinP>x </MinP>
            <MinP>$ 0 </MinP>
            <MinP>= </MinP>
            <MinP>$ 0</MinP>


        </LoginFlexdiv>
        <MinP>Your Product will be Produced in ? business days.</MinP>
    </LoginContainer>

  
</LoginFromcontainer>
<Tocartflexdiv ref={belowDivRef}>
        <TocartCTABtn onClick={handleAddToCart}>ADD TO CART</TocartCTABtn>

      {cart.length>0?
      <TocartCTABtn onClick={handleCheckOut}>CHECK OUT</TocartCTABtn>:
      <></>  
      }
        
    </Tocartflexdiv>


    
</>
  )
}

export default MaterialsOptions