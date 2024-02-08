import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  Fragment,
} from "react";
// import { Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./ReduxStore/store";
import {
  BrowserRouter as Router,
  Route,
  Outlet,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
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
import { DevServer, ServerConfig, db, usersCollection } from "./firebase";
import { useDispatch } from "react-redux";
import {
  resetUserDetails,
  setUserDetails,
} from "./ReduxStore/actions/userDetails";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { setAuthenticationStatus } from "./ReduxStore/actions/Authentication";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
import { DashBoard } from "./Pages/UserProfile/UserProfile";
import usePaymentSuccessHandler from "./Pages/Payment/SendDataToFireStore";
import TaskPage from "./AdminRelated/TaskPage/TaskPage";
import { resetCartCount } from "./ReduxStore/actions/cartCountActions";
import { resetCartState } from "./ReduxStore/reducers/CartItemReducer";
import { resetAddressDetails } from "./ReduxStore/reducers/MapServicesReducer";
import { startAuthListener } from "./authListener";
import TermsAndPolicies from "./Pages/Register/RegisterComponents/TermsAndPolicies";
import BlogPage from "./AdminRelated/BlogPage/BlogPage";
import ConfigPage from "./AdminRelated/ConfigPage/ConfigPage";
import NavbarForChecks from "./globalcomponents/navbar/navbarForChecks";
import RotatingLoader from "./globalcomponents/DropDown/RotatingLoader";
import { UPHeaderFullline1 } from "./Pages/UserProfile/UserProfileElement";
import SplashScreen from "./globalcomponents/DropDown/SplashScreen";
import AOS from "aos";
import "aos/dist/aos.css";
import FAQ from "./Pages/FAQ/FAQ";

function App() {
  // const [isOpen, setIsOpen] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const successParam = queryParams.get("success");
  const dispatch = useDispatch();
  const [OKtoRoute, setOKtoRoute] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const togglesidebar = () => {
    setIsOpen(!isOpen);
  };
  const [isLoading, setIsLoading] = useState(true);
  const unparsedStoreditems = localStorage.getItem("TempItemsDetailsStorage");
  const userPurchasedItems = JSON.parse(unparsedStoreditems);
  const successPaymentState = useSelector(
    (state) => state.paymentState.isSuccessPaymentDone
  );
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const userDetailsUnparsed = localStorage.getItem("userDetails");
  const userDetails =
    useSelector((state) => state.userDetails) ||
    JSON.parse(userDetailsUnparsed)?.userDetails;
  const [isAdmin, setIsAdmin] = useState(userDetails?.adminPrivileges || false);
  const cartItems = useSelector((state) => state?.cartItems?.cartItems);
  const hasMountedRef = useRef(false);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      offset: 200, // Offset from the top of the window (in pixels)
      easing: "ease-in-out", // Easing for the animation (default is 'ease')
      once: true, // Whether animations should only happen once
    });
  }, []);
  async function fetchCalculatePriceFunction() {
    try {
      const response = await fetch(`${ServerConfig}/calculate-function`, {
        method: "GET",
        // headers: {
        //   Authorization: idToken,
        // },
      });

      if (!response.ok) {
        // Handle the response error, if any
        console.error("Error fetching calculatePrice function");
        return null; // Return null or an appropriate value to indicate failure
      }

      const data = await response.json();
      // Assuming data contains all three functions: calculatePrice, calculateMassAndPrintTime, and calculatePostProcessingTime
      const { calculatePrice } = data;

      // Serialize the functions to JSON strings
      const calculatePriceString = JSON.stringify(calculatePrice);

      // Store the functions in local storage
      localStorage.setItem("calculatePriceFunction", calculatePriceString);

      return calculatePrice; // Return the calculatePrice function
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
      return null; // Return null or an appropriate value to indicate failure
    }
  }
  useEffect(() => {
    if (!hasMountedRef.current) {
      const auth = getAuth();
      // startAuthListener();
      fetchCalculatePriceFunction().then((calculatePriceFunction) => {
        // Handle the result here, you can set it in your component's state or do something else
        if (calculatePriceFunction) {
          // Do something with calculatePriceFunction
          console.log("fetch cal func successful", calculatePriceFunction);
        } else {
          // Handle the case where fetching failed
          console.log("fetch cal func failed");
        }
      });

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // If the user is logged in, get the ID token
          const idToken = await user.getIdToken();
          // Store the ID token in local storage
          localStorage.setItem("idToken", idToken);

          // Now you can make the fetch request to retrieve the calculatePrice function
          // and store it in local storage.
          try {
            // const response = await fetch(
            //   // "http://localhost:3000/calculate-function",
            //   // "https://cerulean-hermit-crab-robe.cyclic.cloud/calculate-function",
            //     `${ServerConfig}/calculate-function`,
            //   {
            //     method: "GET",
            //     headers: {
            //       Authorization: idToken,
            //     },
            //   }
            // );

            // if (!response.ok) {
            //   // Handle the response error, if any
            //   console.error("Error fetching calculatePrice function");
            //   return;
            // }

            // const data = await response.json();
            // // Assuming data contains all three functions: calculatePrice, calculateMassAndPrintTime, and calculatePostProcessingTime
            // const { calculatePrice } = data;

            // // Serialize the functions to JSON strings
            // const calculatePriceString = JSON.stringify(calculatePrice);

            // // Store the functions in local storage
            // localStorage.setItem(
            //   "calculatePriceFunction",
            //   calculatePriceString
            // );
            // console.log("useeffect triggered");
            // Continue with your other logic
            const USERUID = user.uid;
            const userDetailsRef = doc(usersCollection, USERUID);
            const docSnap = await getDoc(userDetailsRef);
            if (docSnap.exists()) {
              const userDetailsData = docSnap.data().userDetails;
              const userDetailsWithUid = {
                ...userDetailsData,
                // userUID: docSnap.id,
              };
              dispatch(setUserDetails(userDetailsData));
              localStorage.setItem(
                "userDetails",
                JSON.stringify(userDetailsData)
              );
              console.log("Document data in APP.jsx:", userDetailsData);
              const userDetails = userDetailsData;
              const AdminCheck = userDetailsData?.adminPrivileges;
              setIsAdmin(AdminCheck);
              // console.log(AdminCheck);
              // Check if the payment was successful
              if (successParam === "true") {
                if (unparsedStoreditems && unparsedStoreditems.length > 0) {
                  const { error } = usePaymentSuccessHandler(
                    user.uid,
                    userPurchasedItems,
                    userDetails,
                    dispatch,
                    successPaymentState
                  );
                  console.log(
                    "localstorage has purchased item and purchase is success"
                  );
                } else {
                  console.log(
                    "localstorage has no purchased item and no purchase is made"
                  );
                }
              }
            } else {
              console.log("No such document!");
            }
            dispatch(setAuthenticationStatus(true));
            setIsLoading(false);
          } catch (error) {
            console.error("Error fetching calculatePrice function:", error);
            setIsLoading(false);
          }
        } else {
          // User is logged out
          setIsAdmin(false);
          dispatch(setAuthenticationStatus(false));
          dispatch(resetCartCount());
          dispatch(resetCartState());
          dispatch(resetAddressDetails());
          dispatch(resetUserDetails());
          console.log("userloggedout", user);
        }
        setIsLoading(false);
      });
      hasMountedRef.current = true;

      return () => {
        // Unsubscribe from the onAuthStateChanged listener when the component unmounts
        unsubscribe();
      };
    }
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
      element: (
        <>
          <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
          <Navbar togglesidebar={togglesidebar} />
          <HomePage />
          <Footer />
        </>
      ),
    },
    {
      path: "/services",
      element: (
        <>
          <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
          <Navbar togglesidebar={togglesidebar} />
          <Services />
          <Footer />
        </>
      ),
    },
    {
      path: "/Materials",
      element: (
        <>
          <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
          <Navbar togglesidebar={togglesidebar} />
          <Materials />
          <Footer />
        </>
      ),
    },
    {
      path: "/Learn",
      element: (
        <>
          <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
          <Navbar togglesidebar={togglesidebar} />
          <Learn />
          <Footer />
        </>
      ),
    },
    {
      path: "/ContactUs",
      element: (
        <>
          <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
          <Navbar togglesidebar={togglesidebar} />
          <ContactUs />
          <Footer />
        </>
      ),
    },
    {
      path: "/faq",
      element: (
        <>
          <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
          <Navbar togglesidebar={togglesidebar} />
          <FAQ />
          <Footer />
        </>
      ),
    },
    {
      path: "/Login",
      element: (
        <>
          <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
          <Navbar togglesidebar={togglesidebar} />
          <Login />
          <Footer />
        </>
      ),
    },
    {
      path: "/registerPage",
      element: (
        <>
          <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
          <Navbar togglesidebar={togglesidebar} />
          <RegisterPage />
          <Footer />
        </>
      ),
    },
    {
      path: "/Start3dPrinting",
      element: (
        <>
          <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
          <NavbarForChecks
            togglesidebar={togglesidebar}
            OKtoRoute={OKtoRoute}
          />
          <StartPrinting setOKtoRoute={setOKtoRoute} />
          <Footer />
        </>
      ),
    },
    {
      path: "/DashBoard",
      element: (
        <>
          <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
          <Navbar
            togglesidebar={togglesidebar}
            userDetails={userDetails}
            cartItems={cartItems}
            isAuthenticated={isAuthenticated}
          />
          {isAdmin ? <TaskPage /> : <DashBoard />}
          <Footer />
        </>
      ),
    },
    {
      path: "/blog",
      element: userDetails.adminPrivileges ? (
        <>
          <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
          <Navbar togglesidebar={togglesidebar} />
          <BlogPage />
          <Footer />
        </>
      ) : (
        <UPHeaderFullline1>Only Admins Allowed</UPHeaderFullline1>
      ),
    },
    {
      path: "/Config",
      element: userDetails.adminPrivileges ? (
        <>
          <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
          <Navbar togglesidebar={togglesidebar} />
          <ConfigPage />
          <Footer />
        </>
      ) : (
        <UPHeaderFullline1>Only Admins Allowed</UPHeaderFullline1>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
          <Navbar togglesidebar={togglesidebar} />
          <Cartpage />
          <Footer />
        </>
      ),
    },
    {
      path: "/success",
      element: (
        <>
          <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
          <Navbar togglesidebar={togglesidebar} />
          <PaymentSuccess />
          <Footer />
        </>
      ),
    },
    {
      path: "/terms&policies",
      element: (
        <>
          <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
          <Navbar togglesidebar={togglesidebar} />
          <TermsAndPolicies />
          <Footer />
        </>
      ),
    },
  ]);
  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    // <>
    //   <Provider store={store}>
    //     <RouterProvider router={router}></RouterProvider>
    //   </Provider>
    // </>
  );
}

//   return (
//     <Provider store={store}>
//       <Router>
//         {isLoading ? (
//           <RotatingLoader />
//         ) : (
//           <MainRoutes
//             isOpen={isOpen}
//             setIsOpen={setIsOpen}
//             userDetails={userDetails}
//             cartItems={cartItems}
//             isAuthenticated={isAuthenticated}
//             OKtoRoute={OKtoRoute}
//             setOKtoRoute={setOKtoRoute}
//             togglesidebar={togglesidebar}
//           />
//         )}
//       </Router>
//     </Provider>
//   );
// }

// function MainRoutes({
//   isOpen,
//   setIsOpen,
//   userDetails,
//   cartItems,
//   isAuthenticated,
//   OKtoRoute,
//   setOKtoRoute,
//   togglesidebar,
// }) {
//   const routes = [
//     {
//       path: "/",
//       element: (
//         <div>
//           <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
//           <Navbar togglesidebar={togglesidebar} />
//           <HomePage />
//           <Footer />
//         </div>
//       ),
//     },
//     {
//       path: "/services",
//       element: (
//         <div>
//           <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
//           <Navbar togglesidebar={togglesidebar} />
//           <Services />
//           <Footer />
//         </div>
//       ),
//     },
//     {
//       path: "/Materials",
//       element: (
//         <div>
//           <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
//           <Navbar togglesidebar={togglesidebar} />
//           <Materials />
//           <Footer />
//         </div>
//       ),
//     },
//     {
//       path: "/Learn",
//       element: (
//         <div>
//           <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
//           <Navbar togglesidebar={togglesidebar} />
//           <Learn />
//           <Footer />
//         </div>
//       ),
//     },
//     {
//       path: "/ContactUs",
//       element: (
//         <Fragment>
//           <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
//           <Navbar togglesidebar={togglesidebar} />
//           <ContactUs />
//           <Footer />
//         </Fragment>
//       ),
//     },
//     {
//       path: "/Login",
//       element: (
//         <Fragment>
//           <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
//           <Navbar togglesidebar={togglesidebar} />
//           <Login />
//           <Footer />
//         </Fragment>
//       ),
//     },
//     {
//       path: "/registerPage",
//       element: (
//         <Fragment>
//           <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
//           <Navbar togglesidebar={togglesidebar} />
//           <RegisterPage />
//           <Footer />
//         </Fragment>
//       ),
//     },
//     {
//       path: "/Start3dPrinting",
//       element: (
//         <Fragment>
//           <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
//           <NavbarForChecks
//             togglesidebar={togglesidebar}
//             OKtoRoute={OKtoRoute}
//           />
//           <StartPrinting setOKtoRoute={setOKtoRoute} />
//           <Footer />
//         </Fragment>
//       ),
//     },
//     {
//       path: "/blog",
//       element: (
//         <Fragment>
//           <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
//           <Navbar togglesidebar={togglesidebar} />
//           <BlogPage />
//           <Footer />
//         </Fragment>
//       ),
//     },
//     {
//       path: "/Config",
//       element: (
//         <Fragment>
//           <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
//           <Navbar togglesidebar={togglesidebar} />
//           <ConfigPage />
//           <Footer />
//         </Fragment>
//       ),
//     },
//     {
//       path: "/cart",
//       element: (
//         <Fragment>
//           <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
//           <Navbar togglesidebar={togglesidebar} />
//           <Cartpage />
//           <Footer />
//         </Fragment>
//       ),
//     },
//     {
//       path: "/success",
//       element: (
//         <Fragment>
//           <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
//           <Navbar togglesidebar={togglesidebar} />
//           <PaymentSuccess />
//           <Footer />
//         </Fragment>
//       ),
//     },
//     {
//       path: "/terms&policies",
//       element: (
//         <Fragment>
//           <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
//           <Navbar togglesidebar={togglesidebar} />
//           <TermsAndPolicies />
//           <Footer />
//         </Fragment>
//       ),
//     },
//   ];
//   return (
//     <Routes>
//       {routes.map((route, index) => (
//         <Route
//           key={index}
//           path={route.path}
//           element={
//             route.path === "/DashBoard" ? (
//               userDetails.adminPrivileges ? (
//                 <Fragment>
//                 <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
//                 <Navbar
//                   togglesidebar={togglesidebar}
//                   userDetails={userDetails}
//                   cartItems={cartItems}
//                   isAuthenticated={isAuthenticated}
//                 />
//                 <TaskPage />
//                 <Footer />
//               </Fragment>
//               ) : (
//                 <Fragment>
//                 <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
//                 <Navbar
//                   togglesidebar={togglesidebar}
//                   userDetails={userDetails}
//                   cartItems={cartItems}
//                   isAuthenticated={isAuthenticated}
//                 />
//                 <DashBoard />
//                 <Footer />
//               </Fragment>
//               )
//             ) : (
//               <route.element
//                 isOpen={isOpen}
//                 setIsOpen={setIsOpen}
//                 userDetails={userDetails}
//                 cartItems={cartItems}
//                 isAuthenticated={isAuthenticated}
//                 OKtoRoute={OKtoRoute}
//                 setOKtoRoute={setOKtoRoute}
//               />
//             )
//           }
//         />
//       ))}
//     </Routes>
//   );
// }

export default App;
