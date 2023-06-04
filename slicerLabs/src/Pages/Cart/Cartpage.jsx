import React,{useState, useEffect} from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import { CUheader, CUsubheader } from '../ContactUs/ContactUsComponents/ContactUsHero/ContactUsHeroelemements'
import { SSpan } from '../Services/Serviceselement'
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Grandtotaldisplay,
  ItemBtn,
  Itemdiv, 
  ItemHeader, 
  ItemStats, 
  NextBtn, 
  NoitemCart, 
  PaymentImg, 
  PaymentOptionLabel, 
  PaymentRinner, 
  PaymentroutingContainer, 
  PRHead, 
  ProgressBarBall, 
  ProgressBarContainer, 
  ProgressBarStep, 
  ProgressBarText,
  PromoInput,
  PRp,
  PRsub,
  Shippingoption,
  Soption,
  Step1Container
} from './Cartpageelement'
import Sidebar from '../../globalcomponents/SidebarMenu/Sidebar'
import Paymentimage from '../../assets/paymentimg.png'
import { useDispatch } from 'react-redux'
import { setAuthenticationStatus } from '../../ReduxStore/actions/Authentication'


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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Remove jwtToken from local storage
    localStorage.removeItem("jwtToken");
  
    // Redirect to the home page
    dispatch(setAuthenticationStatus(false));
    navigate("/");
    
  };
  
  return (
    <>
    <Sidebar isOpen={isOpen} togglesidebar={togglesidebar}/>
    <Navbar togglesidebar={togglesidebar}/>
        <CUheader>Shopping <SSpan>Cart</SSpan></CUheader>
        <CUsubheader>Fast and Smooth Processing</CUsubheader>

        <Step1Container>
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
        {cart.length ===0 ?<></>:
        (<>
          <PaymentroutingContainer>
              <PaymentImg src={Paymentimage}></PaymentImg>


              <PaymentRinner>
                <PRHead>Summary</PRHead>
                <PRsub>
                  <PRp>Total Items cost</PRp>
                  <PRp>$64.86</PRp>
                </PRsub>
                <PaymentOptionLabel>Shipping</PaymentOptionLabel>
                <Shippingoption>
                  <Soption value="">Please Select an Option</Soption>
                  <Soption value="ABS">Express</Soption>
                  <Soption value="PLA">Normal</Soption>
                </Shippingoption>
                <PRp>Shipment arriving in 3-5 days</PRp>
                <PaymentOptionLabel>Promo Code</PaymentOptionLabel>
                <PromoInput type='text'></PromoInput>

                <Grandtotaldisplay>
                  <PRp>Grand Total</PRp>
                  <PRp>$54.86</PRp>
                </Grandtotaldisplay>
              </PaymentRinner>

              <NextBtn>Proceed to Payment</NextBtn>
          </PaymentroutingContainer>
        </>)}
       
        </Step1Container>
        <NextBtn onClick={handleLogout}>logout</NextBtn>
        <Footer/>
    </>
  )
}

export default Cartpage;