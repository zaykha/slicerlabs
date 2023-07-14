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
  PMAlertBox,
  PMButton,
  PMContainer,
} from "./StartPrintingComponents/MaterialsOptions/MaterialsOptionselements";

const StartPrinting = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const togglesidebar = () => {
    setIsOpen(!isOpen);
  };
  const [tempModelId, setTempModelId] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

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
      <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
      <Navbar togglesidebar={togglesidebar} />
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
        />
      ) : (
        <></>
      )}
      <Footer />
    </>
  );
};

export default StartPrinting;
