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
  InnerHeader1,
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
  // Initialize an array to store the retrieved documents
  const [purchaseInstances, setPurchaseInstances] = useState([]);

  const userUIDInLocalStorage = localStorage.getItem("uid");
  useEffect(() => {
    async function getPurchaseInstancesForUser(userId) {
      console.log("userid", userId);
      // Get a reference to the "PurchaseInstance" collection
      // const purchaseInstanceRef = collection(PurchasedItemsCollection, "PurchaseInstance");

      // Create a query to filter documents based on the "userId" field
      //   const q = query(purchaseInstanceRef, userId);

      try {
        // Execute the query and get the snapshot of matching documents
        const querySnapshot = await getDocs(PurchasedItemsCollection, userId);
        const purchaseInstancesData = [];
        // Loop through the snapshot and extract the data from each document
        querySnapshot.forEach((doc) => {
          // Extract the data from the document and add it to the array
          const purchaseInstanceDatatoPush = doc.data();
          purchaseInstancesData.push(purchaseInstanceDatatoPush);
        });
        console.log("purchaseInstances", purchaseInstancesData);
        setPurchaseInstances(purchaseInstancesData);
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
      // console.log("fetched data:", purchaseInstancesData);
    };

    fetchData(); // Call the function
    console.log("purchaseInstances", purchaseInstances);
  }, []);
  return (
    <>
      <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
      <Navbar togglesidebar={togglesidebar} />

      <UPHeaderFullline>Welcome</UPHeaderFullline>

      <LoginFromcontainer>
        <SubHeader>Item Status</SubHeader>
        <InnerHeaderWrapper>
          <InnerHeader1></InnerHeader1>
          <InnerHeader>Material & color</InnerHeader>
          <InnerHeader>Dimension</InnerHeader>
          <InnerHeader>Status</InnerHeader>
          <InnerHeader>Price Paid</InnerHeader>
        </InnerHeaderWrapper>
        {purchaseInstances.length > 0 ? (
          purchaseInstances.map((purchaseInstance, index) => (
            <div key={index}>
              
              {purchaseInstance.purchasedItems.map((item) => (
                <InnerHeaderWrapper key={item.itemId}>
                  <InnerHeader>{/* Add content here */}</InnerHeader>
                  <InnerHeader>
                    {item.material} {item.color}
                  </InnerHeader>
                  <InnerHeader>{item.dimensions.depth} x {item.dimensions.width} x {item.dimensions.height}</InnerHeader>
                  <InnerHeader>{/* Add content here */}</InnerHeader>
                  <InnerHeader>{/* Add content here */}</InnerHeader>
                </InnerHeaderWrapper>
              ))}
            </div>
          ))
        ) : (
          <></>
        )}
      </LoginFromcontainer>
      <Footer />
    </>
  );
};
