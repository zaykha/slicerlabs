
import React, { useEffect, useState, useContext } from 'react';
// import { Route, Routes } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Cartpage from './Pages/Cart/cartpage';
import ContactUs from './Pages/ContactUs/ContactUs';
import HomePage from './Pages/HomePage/HomePage';
import Learn from './Pages/Learn/Learn';
import Login from './Pages/Login/Login';
import Materials from './Pages/Materials/Materials';
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
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(JSON.parse(localStorage.getItem('cart')).length || 0);

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
    if (cartFromLocalStorage) {
      setCart(cartFromLocalStorage);
      setCartCount(cartFromLocalStorage.length); // update cartCount
    }
  }, []);

  useEffect(() => {
    setCartCount(cart.length); // update cartCount whenever the cart changes
    localStorage.setItem('cart', JSON.stringify(cart));
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
      path:"/Start3dPrinting",
      element: <StartPrinting cartCount={cartCount} setCartCount={setCartCount}/>
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
