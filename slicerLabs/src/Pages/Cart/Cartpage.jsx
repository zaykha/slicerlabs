import React,{useState, useEffect} from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import { CUheader, CUsubheader } from '../ContactUs/ContactUsComponents/ContactUsHero/ContactUsHeroelemements'
import { SSpan } from '../Services/Serviceselement'
import { useLocation } from 'react-router-dom';
import { 
  ItemBtn,
  Itemdiv, 
  ItemHeader, 
  ItemStats, 
  NoitemCart, 
  ProgressBarBall, 
  ProgressBarContainer, 
  ProgressBarStep, 
  ProgressBarText
} from './Cartpageelement'
import Sidebar from '../../globalcomponents/SidebarMenu/Sidebar'


const ProgressBar = ({ step }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarStep>
        <ProgressBarBall active={step >= 1} />
        <ProgressBarText active={step >= 1}>Final Check</ProgressBarText>
      </ProgressBarStep>
      <ProgressBarStep>
        <ProgressBarBall active={step >= 2} />
        <ProgressBarText active={step >= 2}>Payment</ProgressBarText>
      </ProgressBarStep>
      <ProgressBarStep>
        <ProgressBarBall active={step >= 3} />
        <ProgressBarText active={step >= 3}>Post Payment</ProgressBarText>
      </ProgressBarStep>
    </ProgressBarContainer>
  );
};

const Cartpage = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const togglesidebar = () => {
     setIsOpen(!isOpen);
  }  

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
    <Sidebar isOpen={isOpen} togglesidebar={togglesidebar}/>
    <Navbar togglesidebar={togglesidebar}/>
        <CUheader>CHECKOUT <SSpan>PROCESS</SSpan></CUheader>
        <CUsubheader>Fast and Smooth Processing</CUsubheader>
        {cart.length ===0 ?<></>:(<ProgressBar step={step}/>)}
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

export default Cartpage;