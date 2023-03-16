import React,{useState, useEffect} from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import { CUheader, CUsubheader } from '../ContactUs/ContactUsComponents/ContactUsHero/ContactUsHeroelemements'
import { SSpan } from '../Services/Serviceselement'
import { useLocation } from 'react-router-dom';
import { ItemBtn, Itemdiv, ItemHeader, ItemStats, NoitemCart } from './Cartpageelement'

const Cartpage = () => {

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleRemoveItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  }
  return (
    <>
    
        <Navbar/>
        <CUheader>CHECKOUT <SSpan>PROCESS</SSpan></CUheader>
        <CUsubheader>Fast and Smooth Processing</CUsubheader>
        {cart.length === 0 ? (
          <NoitemCart>
              <CUheader>No Items In Cart</CUheader>
          </NoitemCart>
        ) : (
          cart.map((item, index) => (

            <Itemdiv key={index}>
    
              <ItemHeader>Print item {index +1}</ItemHeader>
              <ItemStats>Material:{item.material}</ItemStats>
              <ItemStats>Finishing: {item.finishing}</ItemStats>
              <ItemStats>Dimension: {item.dimension}</ItemStats>
              <ItemStats>Quantity: {item.quantity}</ItemStats>
              <ItemBtn onClick={() => handleRemoveItem(index)}>Remove</ItemBtn>
            </Itemdiv>
          ))
          )}
        
       
      
        <Footer/>
    </>
  )
}

export default Cartpage