import React, { useState, useEffect } from "react";
import Footer from "../../globalcomponents/Footer/footer";
import Navbar from "../../globalcomponents/navbar/navbar";
import {
  CUheader,
  CUsubheader,
} from "../ContactUs/ContactUsComponents/ContactUsHero/ContactUsHeroelemements";
import { SSpan } from "../Services/Serviceselement";
import { useLocation, useNavigate } from "react-router-dom";
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
} from "./Cartpageelement";
import Sidebar from "../../globalcomponents/SidebarMenu/Sidebar";
import Paymentimage from "../../assets/paymentimg.png";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticationStatus } from "../../ReduxStore/actions/Authentication";
import { addMaterialOptions } from "../../ReduxStore/reducers/CartItemReducer";
import IndividualProduct from "./CartComponents/Cart/IndividualProduct";

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
  const cartItemsDetails = useSelector((state) => state.cartItems.cartItems);

  const DB_NAME = "TEMP_MODEL_STORAGE";
  const DB_VERSION = 1;
  const OBJECT_STORE_NAME = "models";
  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        db.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
      };

      request.onsuccess = () => {
        const db = request.result;
        resolve(db);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  };
  const retrieveModelsFromIndexedDB = async () => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction([OBJECT_STORE_NAME], "readonly");
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

      // Get all models from the object store
      const models = await objectStore.getAll();

      // Log the count and retrieved models
      console.log("Number of items:", models.length);
      console.log("Retrieved models:", models);
    } catch (error) {
      console.log("Failed to open IndexedDB", error);
    }
  };
  const handleRetrieveAllModels = async () => {
    await retrieveModelsFromIndexedDB();
  };

  const handleRemoveItem = (index) => {
    const newCart = [...cartItemsDetails];
    newCart.splice(index, 1);
    console.log(cartItemsDetails);
  };

  const handleLogout = () => {
    // Remove jwtToken from local storage
    localStorage.removeItem("jwtToken");

    // Redirect to the home page
    dispatch(setAuthenticationStatus(false));
    navigate("/");
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
              index={index+1}
              tempID={item.ProductId}
              material={item.material}
              color={item.color}
              width={item.dimensions.width}
              height={item.dimensions.height}
              depth={item.dimensions.depth}
              quantity={item.quantity}
              price={item.price}
              onDelete={handleRemoveItem}
            />
          ))
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
                <PromoInput type="text"></PromoInput>

                <Grandtotaldisplay>
                  <PRp>Grand Total</PRp>
                  <PRp>$54.86</PRp>
                </Grandtotaldisplay>
              </PaymentRinner>

              <NextBtn>Proceed to Payment</NextBtn>
            </PaymentroutingContainer>
          </>
        )}
      </Step1Container>
      <NextBtn onClick={handleLogout}>logout</NextBtn>
      <NextBtn onClick={handleRetrieveAllModels}>retrieve</NextBtn>
      <Footer />
    </>
  );
};

export default Cartpage;
