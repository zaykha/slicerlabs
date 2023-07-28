import React, { useEffect, useState } from "react";
import Sidebar from "../../globalcomponents/SidebarMenu/Sidebar";
import Navbar from "../../globalcomponents/navbar/navbar";
import Footer from "../../globalcomponents/Footer/footer";
import { PaymentResponsecontainer } from "../Payment/PaymentSuccesselement";
import {
  DropzoneContainer,
  UPHeaderFullline,
} from "../StartPrinting/StartPrintingComponents/Dropfile/Dropfileelements";
import {
  InnerHeader,
  InnerHeaderWrapper,
  SubHeader,
} from "./UserProfileElement";
import { LoginFromcontainer } from "../Login/LoginComponents/LoginForm/LoginFormelements";
import { PurchasedItemsCollection, db, firestore } from "../../firebase";
import { collection, getDocs, where } from "firebase/firestore";
import { query } from "firebase/database";

export const DashBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglesidebar = () => {
    setIsOpen(!isOpen);
  };
  const userUIDInLocalStorage = localStorage.getItem("uid");
  useEffect(() => {
    async function getPurchaseInstancesForUser(userId) {
      console.log("userid", userId);
      // Get a reference to the "PurchaseInstance" collection
      const purchaseInstanceRef = collection(firestore, "PurchasedItems", "PurchaseInstance");

      // Create a query to filter documents based on the "userId" field
    //   const q = query(purchaseInstanceRef, userId);

      try {
        // Execute the query and get the snapshot of matching documents
        const querySnapshot = await getDoc(purchaseInstanceRef, userId);

        // Initialize an array to store the retrieved documents
        const purchaseInstances = [];

        // Loop through the snapshot and extract the data from each document
        querySnapshot.forEach((doc) => {
          // Extract the data from the document and add it to the array
          const purchaseInstanceData = doc.data();
          purchaseInstances.push(purchaseInstanceData);
        });
        console.log("purchaseInstances", purchaseInstances);
        return purchaseInstances; // Return the array of purchase instances
      } catch (error) {
        console.error("Error retrieving purchase instances:", error);
        return []; // Return an empty array if an error occurs
      }
    }
    // Call the function and use async/await to handle the asynchronous nature
    const fetchData = async () => {
      const purchaseInstancesData = await getPurchaseInstancesForUser(
        userUIDInLocalStorage
      );
      // Handle the fetched data here if needed
      console.log("fetched data:", purchaseInstancesData);
    };

    fetchData(); // Call the function
  }, []);
  return (
    <>
      <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
      <Navbar togglesidebar={togglesidebar} />

      <UPHeaderFullline>Welcome</UPHeaderFullline>

      <LoginFromcontainer>
        <SubHeader>Item Status</SubHeader>
        <InnerHeaderWrapper>
          <InnerHeader></InnerHeader>
          <InnerHeader>Material and color</InnerHeader>
          <InnerHeader>Dimension</InnerHeader>
          <InnerHeader>Status</InnerHeader>
          <InnerHeader>Price Paid</InnerHeader>
        </InnerHeaderWrapper>
      </LoginFromcontainer>
      <Footer />
    </>
  );
};
