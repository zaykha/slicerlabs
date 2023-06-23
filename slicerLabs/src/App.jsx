import React, { useEffect, useState, useContext } from "react";
// import { Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./ReduxStore/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./globalcomponents/Footer/footer";
import Navbar from "./globalcomponents/navbar/navbar";
import Sidebar from "./globalcomponents/SidebarMenu/Sidebar";
import Cartpage from "./Pages/Cart/Cartpage";
import ContactUs from "./Pages/ContactUs/ContactUs";
import HomePage from "./Pages/HomePage/HomePage";
import Learn from "./Pages/Learn/Learn";
import Login from "./Pages/Login/Login";
import Materials from "./Pages/Materials/Materials";
import RegisterPage from "./Pages/Register/RegisterPage";
import Services from "./Pages/Services/Services";
import StartPrinting from "./Pages/StartPrinting/StartPrinting";
import { db, usersCollection } from "./firebase";
import { useDispatch } from 'react-redux';
import { setUserDetails } from "./ReduxStore/actions/userDetails";
import {doc, getDoc} from "firebase/firestore";
import { useSelector } from "react-redux";
import { setAuthenticationStatus } from "./ReduxStore/actions/Authentication";
// Create a context object with default values
// const CartCountContext = React.createContext({
//   cartCount: 0,
//   setCartCount: () => {},
// });

// Create a custom hook to make accessing the context easier
// export function useCartCount() {
//   return useContext(CartCountContext);
// }

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const cartItemsDetails = useSelector(state => state.cartItems.cartItems);

  const { isAuthenticated } = useSelector((state) => state.authentication);

  const cartDataLength = cartItemsDetails.length || 0;
  // const [cart, setCart] = useState(cartItemsDetails);
  const [cartCount, setCartCount] = useState(cartDataLength);
  // const handleCartStorageChange = (event) => {
  //   if (event.key === "cart") {
  //     const cartData = JSON.parse(event.newValue);
  //     setCart(cartData || []);
  //     setCartCount(cartData ? cartData.length : 0);
  //   }
  // };

  // useEffect(() => {
  //   const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
  //   if (cartFromLocalStorage) {
  //     setCart(cartFromLocalStorage);
  //     setCartCount(cartFromLocalStorage.length); // update cartCount
  //   }
  //   // Listen for changes to cart data in local storage
  //   window.addEventListener("storage", handleCartStorageChange);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("storage", handleCartStorageChange);
  //   };
   
  // }, []);
  useEffect(() => {
    async function fetchData() {
      const USERUID = localStorage.getItem("uid");
      if (USERUID) {
        // Retrieve user details from Firestore based on the UID
        const userDetailsRef = doc(usersCollection, USERUID);
        const docSnap = await getDoc(userDetailsRef);
        if (docSnap.exists()) {
          dispatch(setUserDetails(docSnap.data().userDetails));
          console.log("Document data:", docSnap.data().userDetails);
        } else {
          console.log("No such document!");
        }
        dispatch(setAuthenticationStatus(true));
      }
    }
  
    fetchData(); // Call the async function immediately
  
    // Clean-up function (if needed)
    return () => {
      // Perform any clean-up tasks here (if necessary)
    };
  }, [dispatch, usersCollection]);

  // useEffect(() => {
  //   setCartCount(cart.length); // update cartCount whenever the cart changes
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   // setCount(cart.length);
  //   console.log(localStorage.getItem("cart"));
  // }, [cart]);

  const [showPrompt, setShowPrompt] = useState(false);

  const handleUnload = (e) => {
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
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [showPrompt]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/Materials",
      element: <Materials />,
    },
    {
      path: "/Learn",
      element: <Learn />,
    },
    {
      path: "/ContactUs",
      element: <ContactUs />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/registerPage",
      element: <RegisterPage />,
    },
    {
      path: "/Start3dPrinting",
      element: <StartPrinting />,
    },
    {
      path: "/cart",
      element: (
        <Cartpage
          showPrompt={showPrompt}
          handleOk={handleOk}
          handleHidePrompt={handleHidePrompt}
        />
      ),
    },
  ]);

  return (
    <Provider store={store}>
      {/* <CartCountContext.Provider value={{ cartCount, setCartCount }}> */}
        <RouterProvider router={router} />
      {/* </CartCountContext.Provider> */}
    </Provider>
  );
}

export default App;
