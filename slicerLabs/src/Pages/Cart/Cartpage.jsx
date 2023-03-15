import React,{useState} from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import { CUheader, CUsubheader } from '../ContactUs/ContactUsComponents/ContactUsHero/ContactUsHeroelemements'
import { SSpan } from '../Services/Serviceselement'
import { useLocation } from 'react-router-dom';
import { ItemBtn, Itemdiv, ItemHeader, ItemStats } from './Cartpageelement'

const Cartpage = ({ showPrompt, handleOk, handleHidePrompt }) => {

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const handleRemoveItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }
  return (
    <>
    {showPrompt && (
        <div>
          <div>Are you sure you want to leave? Your cart will be emptied.</div>
          <button onClick={handleOk}>OK</button>
          <button onClick={handleHidePrompt}>Cancel</button>
        </div>
      )}
    
        <Navbar/>
        <CUheader>CHECKOUT <SSpan>PROCESS</SSpan></CUheader>
        <CUsubheader>Fast and Smooth Processing</CUsubheader>
        <ul>
        {cart.map((item, index) => (

          <Itemdiv key={index}>

            <ItemHeader>Print item {index +1}</ItemHeader>
            <ItemStats>Material:{item.material}</ItemStats>
            <ItemStats>Finishing: {item.finishing}</ItemStats>
            <ItemStats>Dimension: {item.dimension}</ItemStats>
            <ItemStats>Quantity: {item.quantity}</ItemStats>
            <ItemBtn onClick={() => handleRemoveItem(index)}>Remove</ItemBtn>
          </Itemdiv>
        ))}
      </ul>
        <Footer/>
    </>
  )
}

export default Cartpage