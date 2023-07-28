import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../globalcomponents/SidebarMenu/Sidebar";
import Navbar from "../../globalcomponents/navbar/navbar";
import Footer from "../../globalcomponents/Footer/footer";
import { useSelector } from "react-redux";
import { PurchasedItemsCollection } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import {
  deleteAllRecordsFromDB,
  getAllFilesFromDB,
} from "../../indexedDBUtilis";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  ContainerforResponse,
  DropzoneContainer,
  DropzoneFormcontainer,
  UPFullline,
  UPHeaderFullline,
} from "../StartPrinting/StartPrintingComponents/Dropfile/Dropfileelements";
import { PaymentResponsecontainer } from "./PaymentSuccesselement";
import {
  TocartCTABtn,
  Tocartflexdiv,
} from "../StartPrinting/StartPrintingComponents/MaterialsOptions/MaterialsOptionselements";
const PaymentSuccess = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglesidebar = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const aboveDivRef = useRef(null);
  const belowDivRef = useRef(null);
  const [successPaymentState, setsuccessPaymentState] = useState(false);
  const location = useLocation();
  const userUID = new URLSearchParams(location.search).get("user_id");
  const userUIDInLocalStorage = localStorage.getItem("uid");
  const userDetailsUnparsed = localStorage.getItem("userDetails");
  const userDetailsParsed = JSON.parse(userDetailsUnparsed);
  const userDetails = userDetailsParsed.userDetails;
  const unparsedStoreditems = localStorage.getItem("TempItemsDetailsStorage");
  const userPurchasedItems = JSON.parse(unparsedStoreditems);
  // Function to format date and time to the desired format
  const formatDateTime = (dateTime) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateTime).toLocaleDateString(undefined, options);
  };

  // Modify purchasedItems to an array of objects
  let purchasedItems = [];

  if (userPurchasedItems?.length>0) {
    purchasedItems = userPurchasedItems.map((item) => {
      const { material, color, dimensions, itemId } = item;
      return {
        itemId,
        material,
        color,
        dimensions,
      };
    });
  } else {
    console.log("userPurchasedItems nothing in there");
    // Handle the situation where userPurchasedItems is not an array, e.g., show an error message
  }
 
  const storeDataInFirestore = async (Purchased3dData) => {
    try {
      // Upload files to Cloud Firestore Storage
      const storage = getStorage();

      // Loop through each file in Purchased3dData and upload it to Storage
      await Promise.all(
        Purchased3dData.map(async (fileData) => {
          const { file, id } = fileData;
          const fileName = fileData.file.name;
          console.log(fileName);
          const storageRef = ref(
            storage,
            `Purchased3DFiles/${userUIDInLocalStorage}&${fileName}`
          );
          await uploadBytes(storageRef, file);
        })
      );

      // Return true to indicate success
      return true;
    } catch (error) {
      // Log and handle the error
      console.error("Error storing data in Firestore:", error);

      // Return false to indicate failure
      return false;
    }
  };

  useEffect(() => {
    // Handle success payment response from Stripe
    const handlePaymentSuccess = async () => {
      if (userUID) {
        try {
          // Get all files from IndexedDB
          const files = await getAllFilesFromDB();

          // Send data to Firestore and perform additional functionalities here
          const success = await storeDataInFirestore(files);

          if (success) {
            // Handle successful storage, e.g., show success message to the user
            // Add user details to Firestore
            if (
              userDetailsParsed.userUID &&
              userDetails &&
              userDetails.userName &&
              userDetails.email &&
              userDetails.postalCode &&
              userDetails.flatNumber &&
              userDetails.phone &&
              purchasedItems.length>0
            ) {
              // Create the data object to be added to Firestore
              const dataToAdd = {
                userUID: userDetailsParsed.userUID,
                userName: userDetails.userName,
                userEmail: userDetails.email,
                userPostal: userDetails.postalCode,
                userFlatNumber: userDetails.flatNumber,
                userPhone: userDetails.phone,
                purchasedItems,
                purchasedAt: formatDateTime(Date.now()),
              };
              try {
                const documentId = `${userDetailsParsed.userUID}`;
                // Add the data to Firestore
                await addDoc(
                  collection(PurchasedItemsCollection,"PurchaseInstance", documentId),
                  dataToAdd
                );

                // Rest of your code after successful addition to Firestore
              } catch (error) {
                console.error("Error adding document to Firestore:", error);
                // Handle the error, e.g., show an error message to the user
              }
            } else {
              console.error(
                "Missing required fields. Data not added to Firestore."
              );
              // Handle the case where required fields are missing, e.g., show an error message to the user
            }

            deleteAllRecordsFromDB();
            localStorage.removeItem("TempItemsDetailsStorage");
          } else {
            // Handle failure to store data, e.g., show an error message to the user
            console.log("Error storing data.");
          }
        } catch (error) {
          console.error("Error handling payment success:", error);
        }
        setsuccessPaymentState(true);
        console.error("mock send data success");
      } else {
        // Handle case where userId is missing (e.g., if user directly navigates to /success)
        console.error("Invalid payment response from Stripe.");
      }
    };
    handlePaymentSuccess();
    if (!userUID) {
      // Handle case where userId is missing (e.g., if the user directly navigates to /success)
      console.error("Invalid payment response from Stripe.");
    }
    // need to clean localstorage and IDB
  }, [userUID]);

  useLayoutEffect(() => {
    const updatePosition = () => {
      const aboveHeight = aboveDivRef.current.getBoundingClientRect().height;
      belowDivRef.current.style.top = `${aboveHeight + 160}px`;
    };
    const handleResize = () => {
      updatePosition();
    };
    handleResize(); // Set initial positions on page load
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [successPaymentState]);

  const handleRoute = (route) => {
    navigate(`/${route}`);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
      <Navbar togglesidebar={togglesidebar} />
      {successPaymentState ? (
        <ContainerforResponse ref={aboveDivRef}>
          <PaymentResponsecontainer>
            <DropzoneContainer>
              <UPHeaderFullline>Payment Successful</UPHeaderFullline>
              <UPFullline>
                A confirmation email has been sent to {userDetails.email}, along
                with all the details.
              </UPFullline>
              <UPFullline>
                Feel Free to Contact Us at support@silcerlabs.com
              </UPFullline>
            </DropzoneContainer>
          </PaymentResponsecontainer>
        </ContainerforResponse>
      ) : (
        <ContainerforResponse ref={aboveDivRef}>
          <PaymentResponsecontainer>
            <DropzoneContainer>
              <UPHeaderFullline>Payment Unsuccessful</UPHeaderFullline>
              <UPFullline>Please Contact us at +65 8475 1547</UPFullline>
              <UPFullline>Or</UPFullline>
              <UPFullline>Email to us at support@silcerlabs.com</UPFullline>
            </DropzoneContainer>
          </PaymentResponsecontainer>
        </ContainerforResponse>
      )}
      <Tocartflexdiv ref={belowDivRef}>
        <TocartCTABtn onClick={() => handleRoute("Start3dPrinting")}>
          Print More
        </TocartCTABtn>
        <TocartCTABtn onClick={() => handleRoute("Learn")}>
          Track Product
        </TocartCTABtn>
      </Tocartflexdiv>
      {/* Additional content for the success page */}
      <Footer />
    </>
  );
};

export default PaymentSuccess;
