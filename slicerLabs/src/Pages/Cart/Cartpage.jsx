import React from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import { CUheader, CUsubheader } from '../ContactUs/ContactUsComponents/ContactUsHero/ContactUsHeroelemements'
import { SSpan } from '../Services/Serviceselement'
import { useLocation } from 'react-router-dom';

const Cartpage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const cartString = params.get('cart');
  const cart = JSON.parse(decodeURIComponent(cartString || '[]'));
  return (
    <>
        <Navbar/>
        <CUheader>CHECKOUT <SSpan>PROCESS</SSpan></CUheader>
        <CUsubheader>Fast and Smooth Processing</CUsubheader>
        <ul>
        {cart.map((item, index) => (
          <li key={index}>
            Material: {item.material}, Finishing: {item.finishing}, Dimension: {item.dimension}, Quantity: {item.quantity}
          </li>
        ))}
      </ul>
        <Footer/>
    </>
  )
}

export default Cartpage