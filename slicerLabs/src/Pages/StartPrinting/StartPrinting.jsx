import React,{useState, useEffect} from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import { CUheader, CUsubheader } from '../ContactUs/ContactUsComponents/ContactUsHero/ContactUsHeroelemements'
import { SSpan } from '../Services/Serviceselement'
import Dropfile from './StartPrintingComponents/Dropfile/Dropfile'
import MaterialsOptions from './StartPrintingComponents/MaterialsOptions/MaterialsOptions'
import { PMAlertBox, PMButton, PMContainer } from './StartPrintingComponents/MaterialsOptions/MaterialsOptionselements'

const StartPrinting = ({ cartCount, setCartCount }) => {
  const [showPrompt, setShowPrompt] = useState(false);

  const handleBeforeUnload = (e) => {
    if (showPrompt) {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? Your cart will be emptied.';
    }
  };
  
  const handleHidePrompt = () => {
    setShowPrompt(false);
  };
  
  const handleOk = () => {
    localStorage.removeItem('cart');
    window.location.reload();
  };
  
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
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
              <PMButton onClick={handleHidePrompt} cancel>Cancel</PMButton>
              <PMButton onClick={handleOk} ok>OK</PMButton>
            </div>
          </PMAlertBox>
        </PMContainer>
      )}
      <Navbar cartCount={cartCount} setCartCount={setCartCount}/>
      <CUheader>UPLOAD <SSpan>FILE</SSpan></CUheader>
        <CUsubheader>to get instant quote!</CUsubheader>
      <Dropfile/>
      <MaterialsOptions cartCount={cartCount} setCartCount={setCartCount}/>
      <Footer/>
    </>
  )
}

export default StartPrinting