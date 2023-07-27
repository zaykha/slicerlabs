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
import { useDispatch } from "react-redux";
import { setUserDetails } from "./ReduxStore/actions/userDetails";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { setAuthenticationStatus } from "./ReduxStore/actions/Authentication";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PaymentSuccess from "./Pages/Payment/PaymentSuccess";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If the user is logged in, get the ID token
        const idToken = await user.getIdToken();
        // Store the ID token in local storage
        localStorage.setItem("idToken", idToken);
   
        // Now you can make the fetch request to retrieve the calculatePrice function
        // and store it in local storage.
        try {
          const response = await fetch(
            "http://localhost:3000/calculate-function",
            {
              method: "GET",
              headers: {
                Authorization: idToken,
              },
            }
          );

          if (!response.ok) {
            // Handle the response error, if any
            console.error("Error fetching calculatePrice function");
            return;
          }

          const data = await response.json();
          // Assuming data contains all three functions: calculatePrice, calculateMassAndPrintTime, and calculatePostProcessingTime
          const { calculatePrice } = data;

          // Serialize the functions to JSON strings
          const calculatePriceString = JSON.stringify(calculatePrice);

          // Store the functions in local storage
          localStorage.setItem("calculatePriceFunction", calculatePriceString);
          // Continue with your other logic
          const USERUID = user.uid;
          const userDetailsRef = doc(usersCollection, USERUID);
          const docSnap = await getDoc(userDetailsRef);
          if (docSnap.exists()) {
            const userDetailsData = docSnap.data();
            const userDetailsWithUid = {
              ...userDetailsData,
              userUID: docSnap.id,
            };
            dispatch(setUserDetails(userDetailsWithUid));
            localStorage.setItem("userDetails",JSON.stringify(userDetailsWithUid));
            console.log("Document data:",userDetailsWithUid );
          } else {
            console.log("No such document!");
          }
          dispatch(setAuthenticationStatus(true));
        } catch (error) {
          console.error("Error fetching calculatePrice function:", error);
        }
      }
    });

    return () => {
      // Unsubscribe from the onAuthStateChanged listener when the component unmounts
      unsubscribe();
    };
  }, []);

  // const [showPrompt, setShowPrompt] = useState(false);

  // const handleUnload = (e) => {
  //   if (showPrompt) {
  //     e.preventDefault();
  //     e.returnValue =
  //       "Are you sure you want to leave? Your cart will be emptied.";
  //   }
  // };

  // const handleHidePrompt = () => {
  //   setShowPrompt(false);
  // };

  // const handleOk = () => {
  //   localStorage.removeItem("cart");
  //   window.location.reload();
  // };

  // useEffect(() => {
  //   window.addEventListener("beforeunload", handleUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleUnload);
  //   };
  // }, [showPrompt]);

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
        // showPrompt={showPrompt}
        // handleOk={handleOk}
        // handleHidePrompt={handleHidePrompt}
        />
      ),
    },
    {
      path: "/success",
      element: <PaymentSuccess />,
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
