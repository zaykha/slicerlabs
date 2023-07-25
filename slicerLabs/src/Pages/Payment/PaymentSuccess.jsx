import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../globalcomponents/SidebarMenu/Sidebar";
import Navbar from "../../globalcomponents/navbar/navbar";
import Footer from "../../globalcomponents/Footer/footer";
import { useSelector } from "react-redux";
import { PurchasedItemsCollection } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getAllFilesFromDB } from "../../indexedDBUtilis";

const PaymentSuccess = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglesidebar = () => {
    setIsOpen(!isOpen);
  };
  const location = useLocation();
  const userUID = new URLSearchParams(location.search).get("user_id");
  const cartItemsDetails = useSelector((state) => state.cartItems.cartItems);
  // Function to store the data in Firestore
  const storeDataInFirestore = async (Purchased3dData) => {
    console.log(Purchased3dData);
    try {
      // Convert the File objects to base64 strings
      const filesBase64 = await Promise.all(
        Purchased3dData.map(async (fileData) => {
          const base64String = await fileToBase64(fileData.file);
          return {
            id: fileData.id, // Assuming you have an identifier for each file
            file: base64String,
            fileName: fileData.file.name,
            mimeType: fileData.file.type,
          };
        })
      );
  
      // Add the data to Firestore
      await setDoc(doc(PurchasedItemsCollection, userUID), {
        Purchased3dData: filesBase64,
      });
  
      // Return true to indicate success
      return true;
    } catch (error) {
      // Log and handle the error
      console.error('Error storing data in Firestore:', error);
  
      // Return false to indicate failure
      return false;
    }
  };
  
  useEffect(() => {
    // Handle success payment response from Stripe
    if (userUID) {
       // Get all files from IndexedDB
    getAllFilesFromDB()
    .then((files) => {
      // Send data to Firebase and perform additional functionalities here
      storeDataInFirestore(files).then((success) => {
        if (success) {
          // Handle successful storage, e.g., show success message to the user
          console.log("Payment successful. Data sent to Firebase.");
        } else {
          // Handle failure to store data, e.g., show an error message to the user
          console.log("Error storing data.");
        }
      });
    })
    .catch((error) => {
      console.error('Error getting files from IndexedDB:', error);
    });
    } else {
      // Handle case where userId is missing (e.g., if user directly navigates to /success)
      console.error("Invalid payment response from Stripe.");
    }
  }, [userUID]);

  return (
    <>
      <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
      <Navbar togglesidebar={togglesidebar} />
      <h1>Payment Successful</h1>
      {/* Additional content for the success page */}
      <Footer />
    </>
  );
};

export default PaymentSuccess;
