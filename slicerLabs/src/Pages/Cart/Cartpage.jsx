import React, { useState, useEffect, useRef } from "react";
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
// import stripe from "../../stripeConfig";
import Stripe from "stripe";
import {
  countItemsInDB,
  deleteAllRecordsFromDB,
  deleteFileFromDB,
  getAllFilesFromDB,
} from "../../indexedDBUtilis";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MeshNormalMaterial, Box3, Vector3, Mesh, LoadingManager } from "three";
import { getAuth } from "firebase/auth";
import ErrorPrompt from "../../globalcomponents/prompt/ErrorPrompt";
import ConfirmationPrompt from "../../globalcomponents/prompt/ConfirmationPrompt";
import { ConfigCollection } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

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

const isComingFromStripePage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("returning_user_id");
};

const Cartpage = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const togglesidebar = () => {
    setIsOpen(!isOpen);
  };
  const userUIDInLocalStorage = localStorage.getItem("uid");
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [endCoordinates, setEndCoordinates] = useState("");
  const cartItemsDetails = useSelector((state) => state.cartItems.cartItems);
  const userUID = useSelector((state) => state.userDetails.userUID);
  const [userConfirmationPrompt, setuserConfirmationPrompt] = useState(false);
  const [renderedObjects, setRenderedObjects] = useState([]);
  const [TTLPriceBeforeRouting, setTTLPriceBeforeRouting] = useState(0);
  const [ErrorHandling, setErrorHandling] = useState({
    state: false,
    header: "",
    message: "",
  });
  const [confirmationHandling, setConfirmationHandling] = useState({
    state: false,
    header: "",
    message: "",
  });
  const [isFetchingMSetting, setIsFetchingMSetting] = useState(false);
  const [materialSettings, setMaterialSettings] = useState({
    printTimePerUnitVolume: {
      ABS: 0.05, // minutes/cm^3
      PLA: 0.04, // minutes/cm^3
      TPU: 0.06, // minutes/cm^3
      NYLON: 0.07, // minutes/cm^3
      PETG: 0.05, // minutes/cm^3
      RESIN: 0.03, // minutes/cm^3
    },
    materialCosts: {
      ABS: 0.05, // SGD per gram
      PLA: 0.04, // SGD per gram
      TPU: 0.06, // SGD per gram
      NYLON: 0.07, // SGD per gram
      PETG: 0.05, // SGD per gram
      RESIN: 0.1, // SGD per gram
    },
    hourlyRate: 20,
    laborCost: 25,
    overheadCost: 5,
  });
  // const postalCode = useSelector((state) => state.userDetails.postalCode);
  const AddressDetails = useSelector(
    (state) => state.LocationStorage.endCoordinates
  );
  const storedIdToken = localStorage.getItem("idToken");
  const unparsedStoreditems = localStorage.getItem("TempItemsDetailsStorage");
  const storedItems = JSON.parse(unparsedStoreditems);

  const postalCode = 520147;
  const startCoordinates = "1.335,103.846";
  // Split the coordinates into latitude and longitude using comma as the separator
  const [startLat, startLon] = startCoordinates.split(",");
  const fetchDataRef = useRef(true);
  // Convert the latitude and longitude values from strings to numbers
  const lat1 = parseFloat(startLat);
  const lon1 = parseFloat(startLon);

  // useEffect(() => {
  //   // Function to fetch data from IndexedDB
  //   const fetchFilesFromIndexedDB = async () => {
  //     try {
  //       // Get all files from IndexedDB
  //       const filesFromDB = await getAllFilesFromDB();
  //       console.log("collected", filesFromDB);
  //       processFilesFromIndexedDB(filesFromDB);
  //     } catch (error) {
  //       console.error("Error getting files from IndexedDB:", error);
  //     }
  //   };

  //   const processFilesFromIndexedDB = (filesFromDB) => {
  //     countItemsInDB()
  //     .then((count) => {
  //       if (count>0){
  //         filesFromDB.map((file) => {
  //           const fileExtension = file.file.name.split(".").pop().toLowerCase();
  //           console.log("filerendered to processFileFunction",file)
  //           const reader = new FileReader();
  //           reader.onload = async () => {
  //             try {
  //               const fileContent = reader.result;
  //               const manager = new LoadingManager();
  //               if (fileExtension === "obj") {
  //                 const objLoader = new OBJLoader(manager);
  //                 objLoader.load(
  //                   fileContent,
  //                   (objData) => {
  //                     setRenderedObjects((prevRenderedObjects) => [
  //                       ...prevRenderedObjects,
  //                       {
  //                         objData,
  //                         id:file.id
  //                       }
  //                     ]);
  //                   },

  //                   // undefined,
  //                   function (xhr) {
  //                     console.log("loading");
  //                   },
  //                   // onProgress,
  //                   (error) => {
  //                     console.log("An error happened", error);
  //                   }
  //                 );
  //               } else if (fileExtension === "stl") {
  //                 const stlLoader = new STLLoader();
  //                 const stlData = stlLoader.loadAsync(file);
  //               } else {
  //                 console.log(
  //                   "Invalid file type. Please upload only .stl and .obj files."
  //                 );
  //               }
  //             } catch (error) {
  //               console.log(error);
  //             }
  //           };
  //           reader.readAsDataURL(file.file);
  //         });
  //       }
  //     })
  //     .catch((error) => console.error("Error counting items:", error));

  //   };

  //   setShouldFetchData(false);
  //   // }
  //   // Fetch files from IndexedDB when the component mounts or when coming from the Stripe page
  //   if (fetchDataRef.current) {
  //     fetchFilesFromIndexedDB();
  //     // After fetching data, set shouldFetchData to false to prevent re-fetching on re-renders
  //     fetchDataRef.current = false;

  //   }
  //   countItemsInDB()
  //     .then((count) => console.log("indexedDb Count is ", count))
  //     .catch((error) => console.error("Error counting items:", error));
  // }, [fetchDataRef]);

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
  const fetchConfigSettings = async () => {
    setIsFetchingMSetting(true);
    try {
      const configDocRef = doc(ConfigCollection, userUIDInLocalStorage); // Replace with your collection and document IDs
      const configDocSnapshot = await getDoc(configDocRef);

      if (configDocSnapshot.exists()) {
        const data = configDocSnapshot.data();
        setMaterialSettings(data);
      }
      console.log(materialSettings);
    } catch (error) {
      console.error("Error fetching configuration settings:", error);
    }
    setIsFetchingMSetting(false);
  };
  useEffect(() => {
    fetchConfigSettings();
  }, []);
  useEffect(() => {
    if (AddressDetails) {
      setEndCoordinates(AddressDetails);
    }
  }, [AddressDetails]);
  const handleRemoveItem = (modelIdToDelete) => {
    dispatch(deleteModel(modelIdToDelete));
    deleteFileFromDB(modelIdToDelete);
  };

  const getStripeKey = async () => {
    try {
      const response = await fetch("https://cerulean-hermit-crab-robe.cyclic.cloud/get-stripe-key");
      if (response.ok) {
        const data = await response.json();
        const stripe = new Stripe(data.publishableKey, {
          apiVersion: "2022-11-15",
        });
        return stripe;
      } else {
        throw new Error("Failed to fetch Stripe API key from the server.");
      }
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
      setErrorHandling({
        state: true,
        header: "An Error Occured",
        message: "Error fetching Stripe API key. Please try again later.",
      });
      // alert("Error fetching Stripe API key. Please try again later.");
      return null;
    }
  };
  const validatePricesWithMicroservice = async (items) => {
    console.log(items);
    try {
      const response = await fetch("https://cerulean-hermit-crab-robe.cyclic.cloud/validate-price", {
        method: "POST",
        headers: {
          Authorization: storedIdToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      });

      if (!response.ok) {
        throw new Error("Error validating prices with microservice.");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      throw new Error("Error validating prices with microservice.");
    }
  };
  // const stripe = loadStripe('pk_test_51NXRyMLJRenTchxdZh6X0oIQths7aa6kIDlyPzR0tAtoRaFXu3pCEv8T65UpKuWFWu9N1oyUwjQAzH4g9vqTLBn000DhgRovlf');
  // const totalAmountInCents = Math.round(TTLPriceBeforeRouting * 100); // Convert dollars to cents
  const handleConfirmation = () => {
    // Perform the delete action here
    setShowPrompt(false);
  };
  const handleProceedToPayment = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    // Check if the user is logged in
    if (!user) {
      // User is not logged in, prompt them to log in and redirect to the login page
      // const confirmLogin = window.confirm(
      //   "Please log in or create an account to proceed to payment."
      // );

      setConfirmationHandling({
        state: true,
        header: "Confirmation Needed",
        message: "Please log in or create an account to proceed to payment.",
      });

      // if (confirmLogin) {
      //   navigate("/login"); // Redirect to the login page
      // }
      return; // Stop the function if the user is not logged in
    }

    const stripe = await getStripeKey();
    if (!stripe) {
      return console.log("error with stripeapiKey fetching");
    }
    console.log(cartItemsDetails);
    // Create an array to store items for validation
    let itemsForValidation = [];

    // Add each item from cartItemsDetails to the validation array
    cartItemsDetails.forEach((item) => {
      const { material, color, dimensions, price, quantity } = item.options;
      const itemId = item.id;
      const fileName = item.fileName;
      itemsForValidation.push({
        itemId,
        fileName,
        material,
        color,
        dimensions,
        quantity, // Adjust the expected price based on quantity
        price,
        userUID,
        materialSettings
      });
    });
    console.log("itemsForValidation", itemsForValidation)
    localStorage.setItem(
      "TTLprice",
      JSON.stringify({ totalPrice: TTLPriceBeforeRouting.toFixed(2) })
    );
    localStorage.setItem(
      "TempItemsDetailsStorage",
      JSON.stringify(itemsForValidation)
    );
  //   useEffect(() => {
  //   console.log(userConfirmationPrompt);
  // }, [userConfirmationPrompt]);
    // // Check if there is any data in localStorage
    // if (storedItems) {
    //   // Use the retrieved data
    //   itemsForValidation = localStorage.getItem("TempItemsDetailsStorage");
    //   console.log("storeditems",storedItems);
    // } else {
    //   localStorage.setItem("TempItemsDetailsStorage",JSON.stringify( itemsForValidation));
    //   // Handle the case when the data is not present in localStorage
    //   console.log("No data found in localStorage.");
    // }
    try {
      // Perform the final check by calling the API endpoint to validate prices
      const response = await validatePricesWithMicroservice(itemsForValidation);

      if (response.valid) {
        // If prices are valid, proceed to Stripe.js for payment
        const checkoutSessionResponse = await fetch(
          "https://cerulean-hermit-crab-robe.cyclic.cloud/create-checkout-session",
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
          //  stripe.redirectToCheckout({
          //   sessionId: checkoutSessionData.id
          //  }).then((result) => {
          //   // Handle any errors during the redirect, if necessary
          //   if (result.error) {
          //     console.error(result.error);
          //     alert('Error redirecting to Stripe Checkout. Please try again.');
          //   }
          // });
        } else {
          // Handle error response from the server
          console.error(
            "Error creating checkout session:",
            checkoutSessionResponse
          );
          setErrorHandling({
            state: true,
            header: "Error",
            message: "Error creating checkout session. Please try again later.",
          });
          // alert("Error creating checkout session. Please try again later.");
        }
      } else {
        // If prices are not valid, show an error message to the user
        setErrorHandling({
          state: true,
          header: "Error",
          message:
            "There was an issue with the prices. Please review your cart.",
        });
        // alert("There was an issue with the prices. Please review your cart.");
      }
    } catch (error) {
      // Handle any error that occurred during the validation or payment process
      console.error("Error processing payment:", error);
      // alert("Error processing payment. Please try again later.");
      setErrorHandling({
        state: true,
        header: "Error",
        message: "Error processing payment. Please try again later.",
      });
    }
  };

  const handleDeleteAllRecords = () => {
    deleteAllRecordsFromDB();
    localStorage.removeItem("TempItemsDetailsStorage");
  };
  return (
    <>
      <CUheader>
        Shopping <SSpan>Cart</SSpan>
      </CUheader>
      <CUsubheader>Fast and Smooth Processing</CUsubheader>

      <Step1Container>
        {/* {cartItemsDetails.length === 0 ? <></> : <ProgressBar step={step} />} */}
        {cartItemsDetails.length === 0 ? (
          // renderedObjects.length > 0 && storedItems.length>0 ? (
          //   renderedObjects.map((objData) => {
          //     // Find the corresponding item in storedItems based on itemId
          //     const item = storedItems.find((storedItem) => storedItem.itemId === objData.id);

          //     // Check if the item is found
          //     if (item) {
          //       return (
          //         <IndividualProduct
          //           key={item.itemId} // Use the itemId as the key instead of index
          //           index={1} // You can remove index from here since it's not being used
          //           model={objData.objData}
          //           tempID={item.itemId}
          //           material={item.material}
          //           color={item.color}
          //           width={item.dimensions.width}
          //           height={item.dimensions.height}
          //           depth={item.dimensions.depth}
          //           quantity={item.quantity}
          //           price={item.price}
          //           onDelete={handleRemoveItem}
          //         />
          //       );
          //     } else {
          //       // Handle the case when the corresponding item in storedItems is not found
          //       // For example, you can return a placeholder or null
          //       return null;
          //     }
          //   })
          // ) : (
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
              setuserConfirmationPrompt={setuserConfirmationPrompt}
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
      {ErrorHandling.state && (
        <ErrorPrompt
          header={ErrorHandling.header}
          message={ErrorHandling.message}
          onClose={() => setErrorHandling({ ...ErrorHandling, state: false })}
        />
      )}
      {/* <NextBtn onClick={handleDeleteAllRecords}>deleteAllFromIDB</NextBtn> */}
      {confirmationHandling.state && (
        <ConfirmationPrompt
          header={confirmationHandling.header}
          message={confirmationHandling.message}
          onClose={() =>
            setConfirmationHandling({ ...confirmationHandling, state: false })
          }
          onConfirm={() =>{
            setConfirmationHandling({ ...confirmationHandling, state: false })
            navigate("/login")
          }
            
          }
        />
      )}
    </>
  );
};

const plusSignStyle = {
  // paddingRight: '5px',
  fontSize: "20px",
};
export default Cartpage;
