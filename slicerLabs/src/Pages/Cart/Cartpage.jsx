import React, { useState, useEffect } from "react";
import Footer from "../../globalcomponents/Footer/footer";
import Navbar from "../../globalcomponents/navbar/navbar";
import {
  CUheader,
  CUsubheader,
} from "../ContactUs/ContactUsComponents/ContactUsHero/ContactUsHeroelemements";
import { SSpan } from "../Services/Serviceselement";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Step1Container,
  StyledAddButton,
} from "./Cartpageelement";
import Sidebar from "../../globalcomponents/SidebarMenu/Sidebar";
import Paymentimage from "../../assets/paymentimg.png";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticationStatus } from "../../ReduxStore/actions/Authentication";
import {
  addMaterialOptions,
  deleteModel,
} from "../../ReduxStore/reducers/CartItemReducer";
import IndividualProduct from "./CartComponents/Cart/IndividualProduct";
import {
  calculateDistance,
  calculateDistanceWithOneMap,
  fetchAddressDetails,
} from "../../globalcomponents/MapServices/MapServices";
import { loadStripe } from '@stripe/stripe-js';
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
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [endCoordinates, setEndCoordinates] = useState("");
  const cartItemsDetails = useSelector((state) => state.cartItems.cartItems);
  const [TTLPriceBeforeRouting, setTTLPriceBeforeRouting] = useState(0);
  // const postalCode = useSelector((state) => state.userDetails.postalCode);
  const AddressDetails = useSelector(
    (state) => state.LocationStorage.endCoordinates
  );
  const storedIdToken = localStorage.getItem("idToken");
  
  const postalCode = 520147;
  const startCoordinates = "1.335,103.846";
  // Split the coordinates into latitude and longitude using comma as the separator
  const [startLat, startLon] = startCoordinates.split(",");

  // Convert the latitude and longitude values from strings to numbers
  const lat1 = parseFloat(startLat);
  const lon1 = parseFloat(startLon);

  useEffect(() => {
    const totalPrice = cartItemsDetails.reduce(
      (total, item) => total + item.options.price * item.options.quantity,
      0
    );

    setTTLPriceBeforeRouting(totalPrice);
    console.log("totalPrice:", TTLPriceBeforeRouting);
  }, [cartItemsDetails]);

  useEffect(() => {
    if (endCoordinates) {
      const [endLat, endLon] = endCoordinates.split(",");
      try {
        const distance = calculateDistance(lat1, lon1, endLat, endLon);
        console.log("Distance between the addresses:", distance, "km");
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.log("endCoordinates not ready");
    }
  }, [endCoordinates]);

  useEffect(() => {
    console.log(AddressDetails);
    if (AddressDetails) {
      setEndCoordinates(AddressDetails);
    }
  }, [AddressDetails]);
  const handleRemoveItem = (modelIdToDelete) => {
    // const newCart = [...cartItemsDetails];
    // newCart.splice(index, 1);
    // console.log(cartItemsDetails);
    dispatch(deleteModel(modelIdToDelete));
  };

  const handleLogout = () => {
    // Remove jwtToken from local storage
    localStorage.removeItem("jwtToken");

    // Redirect to the home page
    dispatch(setAuthenticationStatus(false));
    navigate("/");
  };
  const validatePricesWithMicroservice = async (items) => {
   
    console.log(items)
    try {
      const response = await fetch("http://localhost:3000/validate-price", {
        method: "POST",
        headers: {
          Authorization: storedIdToken,
          "Content-Type": "application/json",
        },
        body:  JSON.stringify(items),
      });

      if (!response.ok) {
        throw new Error("Error validating prices with microservice.");
      }

      const data = await response.json();
      console.log("accepted");
      return data;
    } catch (error) {
      throw new Error("Error validating prices with microservice.");
    }
  };
  // const stripe = loadStripe('pk_test_51NXRyMLJRenTchxdZh6X0oIQths7aa6kIDlyPzR0tAtoRaFXu3pCEv8T65UpKuWFWu9N1oyUwjQAzH4g9vqTLBn000DhgRovlf');
  // const totalAmountInCents = Math.round(TTLPriceBeforeRouting * 100); // Convert dollars to cents

  const handleProceedToPayment = async () => {
    console.log(cartItemsDetails)
    // Create an array to store items for validation
    const itemsForValidation = [];

    // Add each item from cartItemsDetails to the validation array
    cartItemsDetails.forEach((item) => {
      const { material, color, dimensions, price, quantity } =
        item.options;
        const itemId = item.id;
      itemsForValidation.push({
        itemId,
        material,
        color,
        dimensions,
        quantity, // Adjust the expected price based on quantity
        price,
      });
    });

    try {
      // Perform the final check by calling the API endpoint to validate prices
      const response = await validatePricesWithMicroservice(itemsForValidation);
  
      if (response.valid) {
        // If prices are valid, proceed to Stripe.js for payment
        const checkoutSessionResponse = await fetch(
          "http://localhost:3000/create-checkout-session", 
          {
            method: "POST",
            headers: {
              Authorization: storedIdToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(itemsForValidation),
          }
        );
  
        if (checkoutSessionResponse.ok) {
          const checkoutSessionData = await checkoutSessionResponse.json();
          // Redirect the user to the Stripe Checkout page
          window.location.href = checkoutSessionData.url;
        } else {
          // Handle error response from the server
          console.error("Error creating checkout session:", checkoutSessionResponse);
          alert("Error creating checkout session. Please try again later.");
        }
      } else {
        // If prices are not valid, show an error message to the user
        alert('There was an issue with the prices. Please review your cart.');
      }
    } catch (error) {
      // Handle any error that occurred during the validation or payment process
      console.error('Error processing payment:', error);
      alert('Error processing payment. Please try again later.');
    }
  };

  return (
    <>
      <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
      <Navbar togglesidebar={togglesidebar} />
      <CUheader>
        Shopping <SSpan>Cart</SSpan>
      </CUheader>
      <CUsubheader>Fast and Smooth Processing</CUsubheader>

      <Step1Container>
        {cartItemsDetails.length === 0 ? <></> : <ProgressBar step={step} />}
        {cartItemsDetails.length === 0 ? (
          <NoitemCart>
            <CUheader>No Items In Cart</CUheader>
          </NoitemCart>
        ) : (
          cartItemsDetails.map((item, index) => (
            <IndividualProduct
              key={index}
              index={index + 1}
              model={item.model}
              tempID={item.options.ProductId}
              material={item.options.material}
              color={item.options.color}
              width={item.options.dimensions.width}
              height={item.options.dimensions.height}
              depth={item.options.dimensions.depth}
              quantity={item.options.quantity}
              price={item.options.price}
              onDelete={handleRemoveItem}
            />
          ))
        )}
        {cartItemsDetails.length === 0 ? (
          <></>
        ) : (
          <>
            <StyledAddButton to="/Start3dPrinting">
              <span style={plusSignStyle}>+</span>
            </StyledAddButton>
          </>
        )}
        {cartItemsDetails.length === 0 ? (
          <></>
        ) : (
          <>
            <PaymentroutingContainer>
              <PaymentImg src={Paymentimage}></PaymentImg>

              <PaymentRinner>
                <PRHead>Summary</PRHead>
                <PRsub>
                  <PRp>Total Items cost</PRp>
                  <PRp>${TTLPriceBeforeRouting.toFixed(2)}</PRp>
                </PRsub>
                {/* <PaymentOptionLabel>Shipping</PaymentOptionLabel>
                <Shippingoption>
                  <Soption value="">Please Select an Option</Soption>
                  <Soption value="NML">Normal</Soption>
                  <Soption value="EXP">Express</Soption>
                </Shippingoption>
                <PRp>Shipment arriving in 3-5 days</PRp> */}
                <PaymentOptionLabel>Promo Code</PaymentOptionLabel>
                <PromoInput type="text"></PromoInput>

                <Grandtotaldisplay>
                  <PRp>Grand Total</PRp>
                  <PRp>${TTLPriceBeforeRouting.toFixed(2)}</PRp>
                </Grandtotaldisplay>
              </PaymentRinner>

              <NextBtn onClick={handleProceedToPayment}>
                Proceed to Payment
              </NextBtn>
            </PaymentroutingContainer>
          </>
        )}
      </Step1Container>
      <NextBtn onClick={handleLogout}>logout</NextBtn>

      <Footer />
    </>
  );
};

const plusSignStyle = {
  // paddingRight: '5px',
  fontSize: "20px",
};
export default Cartpage;
