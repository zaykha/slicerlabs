
import React, { useEffect, useState, useContext } from 'react';
// import { Route, Routes } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Footer from './globalcomponents/Footer/footer';
import Navbar from './globalcomponents/navbar/navbar';
import Sidebar from './globalcomponents/SidebarMenu/Sidebar';
import Cartpage from './Pages/Cart/Cartpage';
import ContactUs from './Pages/ContactUs/ContactUs';
import HomePage from './Pages/HomePage/HomePage';
import Learn from './Pages/Learn/Learn';
import Login from './Pages/Login/Login';
import Materials from './Pages/Materials/Materials';
import RegisterPage from './Pages/Register/RegisterPage';
import Services from './Pages/Services/Services';
import StartPrinting from './Pages/StartPrinting/StartPrinting';

// Create a context object with default values
const CartCountContext = React.createContext({
  cartCount: 0,
  setCartCount: () => {},
});

// Create a custom hook to make accessing the context easier
export function useCartCount() {
  return useContext(CartCountContext);
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
     setIsOpen(!isOpen);
  }

  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  const cartDataLength = cartData.length || 0;
  const [cart, setCart] = useState(cartData);
  const [cartCount, setCartCount] = useState(cartDataLength);
  const handleCartStorageChange = (event) => {
    if (event.key === "cart") {
      const cartData = JSON.parse(event.newValue);
      setCart(cartData || []);
      setCartCount(cartData ? cartData.length : 0);
    }
  };

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
    if (cartFromLocalStorage) {
      setCart(cartFromLocalStorage);
      setCartCount(cartFromLocalStorage.length); // update cartCount
    }
     // Listen for changes to cart data in local storage
  window.addEventListener("storage", handleCartStorageChange);

  // Clean up the event listener when the component unmounts
  return () => {
    window.removeEventListener("storage", handleCartStorageChange); };
  }, []);

  useEffect(() => {
    setCartCount(cart.length); // update cartCount whenever the cart changes
    localStorage.setItem('cart', JSON.stringify(cart));
    // setCount(cart.length);
    console.log(localStorage.getItem('cart'))
  }, [cart]);

  const [showPrompt, setShowPrompt] = useState(false);

  const handleUnload = (e) => {
    if (showPrompt) {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? Your cart will be emptied.';
    }
  }

  const handleHidePrompt = () => {
    setShowPrompt(false);
  }

  const handleOk = () => {
    localStorage.removeItem('cart');
    window.location.reload();
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    }
  }, [showPrompt]);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },{
      path:"/services",
      element: <Services/>
    },{
      path:"/Materials",
      element: <Materials/>
    },{
      path:"/Learn",
      element: <Learn/>
    },{
      path:"/ContactUs",
      element: <ContactUs/>
    },{
      path:"/Login",
      element: <Login/>
    },{
      path:"/registerPage",
      element: <RegisterPage/>
    },{
      path:"/Start3dPrinting",
      element: <StartPrinting />
    },{
      path:"/cart",
      element: <Cartpage showPrompt={showPrompt} handleOk={handleOk} handleHidePrompt={handleHidePrompt} />    }
  ]);

  return (
    <CartCountContext.Provider value={{ cartCount, setCartCount }}>
      
        <RouterProvider router={router} />
   
    </CartCountContext.Provider>
  )
}

export default App