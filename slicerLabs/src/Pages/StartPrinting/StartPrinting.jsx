import React, { useState, useEffect } from "react";
import Footer from "../../globalcomponents/Footer/footer";
import Navbar from "../../globalcomponents/navbar/navbar";
import Sidebar from "../../globalcomponents/SidebarMenu/Sidebar";
import {
  CUheader,
  CUsubheader,
} from "../ContactUs/ContactUsComponents/ContactUsHero/ContactUsHeroelemements";
import { SSpan } from "../Services/Serviceselement";
import Dropfile from "./StartPrintingComponents/Dropfile/Dropfile";
import MaterialsOptions from "./StartPrintingComponents/MaterialsOptions/MaterialsOptions";
import {
  NotiPrompt,
  PMAlertBox,
  PMButton,
  PMContainer,
  TocartCTABtn,
} from "./StartPrintingComponents/MaterialsOptions/MaterialsOptionselements";
import { useDispatch, useSelector } from "react-redux";
import {
  StyledAddButton,
  StyledAddButtonForStartPrinting,
} from "../Cart/Cartpageelement";
import { FaCheck, FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StartPrinting = () => {
  const cart = useSelector((state) => state.cartItems);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(cart.cartItems.length > 0);
  const [isFormFilled, setisFormFilled] = useState(false);
  const StoreItems = useSelector((state) => state.cartItems.cartItems);
  const [tempModelId, setTempModelId] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const navigate = useNavigate();
  const handleBeforeUnload = (e) => {
    if (showPrompt) {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to leave? Your cart will be emptied.";
    }
  };

  const handleHidePrompt = () => {
    setShowPrompt(false);
  };

  const handleOk = () => {
    localStorage.removeItem("cart");
    window.location.reload();
  };

  const handleCheckOutInParent = () => {
    // This function will be executed when the action is triggered in the child component
    // Put the logic you want to execute in the parent here
    // For example, you can update some state or perform some other action in the parent component
    console.log("Action triggered in the child, executing in the parent!");
  };

  const handleCheckOut = () => {
    if (cart.cartItems.length > 0) {
      if (!isModelLoaded) {
        if (!isFormFilled) {
          navigate(`/cart?cart=${cart.cartItems.length}`);
        } else {
          console.log("forgot to clear form field");
        }
      } else {
        if (!isFormFilled) {
          alert(
            "please fill all in empty fields or empty the field to proceed"
          );
        } else {
          if (!isAddedToCart) {
            alert("please add to cart first");
          } else {
            navigate(`/cart?cart=${cart.cartItems.length}`);
          }
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [showPrompt]);
  return (
    <>
      {showPrompt && (
        <PMContainer>
          <PMAlertBox>
            <h3>Warning</h3>
            <p>Leaving this page will remove all items from your cart.</p>
            <div>
              <PMButton onClick={handleHidePrompt} cancel>
                Cancel
              </PMButton>
              <PMButton onClick={handleOk} ok>
                OK
              </PMButton>
            </div>
          </PMAlertBox>
        </PMContainer>
      )}
      
      <CUheader>
        UPLOAD <SSpan>FILE</SSpan>
      </CUheader>
      <CUsubheader>to get instant quote!</CUsubheader>

      <Dropfile
        tempModelId={tempModelId}
        setTempModelId={setTempModelId}
        isModelLoaded={isModelLoaded}
        setIsModelLoaded={setIsModelLoaded}
        isCheckedOut={isCheckedOut}
        setIsCheckedOut={setIsCheckedOut}
        isAddedToCart={isAddedToCart}
        setIsAddedToCart={setIsAddedToCart}
      />

      {isModelLoaded ? (
        <MaterialsOptions
          tempModelId={tempModelId}
          setTempModelId={setTempModelId}
          isModelLoaded={isModelLoaded}
          setIsModelLoaded={setIsModelLoaded}
          isCheckedOut={isCheckedOut}
          setIsCheckedOut={setIsCheckedOut}
          isAddedToCart={isAddedToCart}
          setIsAddedToCart={setIsAddedToCart}
          isFormFilled={isFormFilled}
          setisFormFilled={setisFormFilled}
          handleCheckOutInChild={handleCheckOutInParent}
        />
      ) : (
        <></>
      )}
      {StoreItems.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <StyledAddButtonForStartPrinting onClick={handleCheckOut}>
              <div>CHECK OUT</div>
              {(cart.cartItems.length === 0 &&
                isModelLoaded &&
                isAddedToCart) ||
              (cart.cartItems.length > 0 &&
                !isModelLoaded &&
                isAddedToCart) ? (
                <FaCheck style={{ marginTop: "10px" }} />
              ) : (
                <FaExclamationCircle style={{ marginTop: "10px" }} />
              )}
            </StyledAddButtonForStartPrinting>

            {/* {cart && isFormFilled ? (
              <NotiPrompt>{cart.cartItems.length}</NotiPrompt>
            ) : (
              <></>
            )} */}
          </div>
        </>
      ) : (
        <></>
      )}
   
    </>
  );
};

export default StartPrinting;
