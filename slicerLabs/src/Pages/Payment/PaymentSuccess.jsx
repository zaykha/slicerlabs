import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../globalcomponents/SidebarMenu/Sidebar";
import Navbar from "../../globalcomponents/navbar/navbar";
import Footer from "../../globalcomponents/Footer/footer";
import { useSelector } from "react-redux";
import { PurchasedItemsCollection } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getAllFilesFromDB } from "../../indexedDBUtilis";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  ContainerforResponse,
  DropzoneContainer,
  DropzoneFormcontainer,
  UPFullline,
  UPHeaderFullline,
} from "../StartPrinting/StartPrintingComponents/Dropfile/Dropfileelements";
import { PaymentResponsecontainer } from "./PaymentSuccesselement";
const PaymentSuccess = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglesidebar = () => {
    setIsOpen(!isOpen);
  };
  const [successPaymentState, setsuccessPaymentState] = useState(false);
  const location = useLocation();
  const userUID = new URLSearchParams(location.search).get("user_id");
  const userUIDInLocalStorage = localStorage.getItem("uid");
  const userEmail = useSelector((state) => state.userDetails.userDetails.email);
  // Function to store data in Firestore and upload files to Storage
  const storeDataInFirestore = async (Purchased3dData) => {
    console.log(Purchased3dData);
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
    if (userUID) {
      // Get all files from IndexedDB
      // getAllFilesFromDB()
      //   .then((files) => {
      //     // Send data to Firebase and perform additional functionalities here
      //     storeDataInFirestore(files).then((success) => {
      //       if (success) {
      //         // Handle successful storage, e.g., show success message to the user
      //         console.log("Payment successful. Data sent to Firebase.");
      //       } else {
      //         // Handle failure to store data, e.g., show an error message to the user
      //         console.log("Error storing data.");
      //       }
      //     });
      //   })
      //   .catch((error) => {
      //     console.error("Error getting files from IndexedDB:", error);
      //   });
      setsuccessPaymentState(true);
      console.error("mock send data success");
    } else {
      // Handle case where userId is missing (e.g., if user directly navigates to /success)
      console.error("Invalid payment response from Stripe.");
    }
  }, [userUID]);

  return (
    <>
      <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
      <Navbar togglesidebar={togglesidebar} />
      {successPaymentState ? (
        <ContainerforResponse>
          <PaymentResponsecontainer>
            <DropzoneContainer>
              <UPHeaderFullline>Payment Successful</UPHeaderFullline>
              <UPFullline>
                A confirmation email has been sent to {userEmail}, along with
                all the details.
              </UPFullline>
              <UPFullline>
                Feel Free to Contact Us at support@silcerlabs.com
              </UPFullline>
            </DropzoneContainer>
          </PaymentResponsecontainer>
        </ContainerforResponse>
      ) : (
        <ContainerforResponse>
          <PaymentResponsecontainer>
            <DropzoneContainer>
              <UPHeaderFullline>Payment Unsuccessful</UPHeaderFullline>
              <UPFullline>
                Please Contact us at +65 8475 1547
              </UPFullline>
              <UPFullline>
                Or
              </UPFullline>
              <UPFullline>
                Email to us at support@silcerlabs.com
              </UPFullline>
            </DropzoneContainer>
          </PaymentResponsecontainer>
        </ContainerforResponse>
      )}

      {/* Additional content for the success page */}
      <Footer />
    </>
  );
};

export default PaymentSuccess;
