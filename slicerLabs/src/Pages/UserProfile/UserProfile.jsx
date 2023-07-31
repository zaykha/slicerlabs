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
  DisplayHeader,
  InnerHeader,
  InnerHeader1,
  InnerHeaderLeft,
  InnerHeaderWrapper,
  InnerLayerP,
  InnerLayersP,
  ItemHeaderprofile,
  SubHeader,
} from "./UserProfileElement";
import { LoginFromcontainer } from "../Login/LoginComponents/LoginForm/LoginFormelements";
import { PurchasedItemsCollection, db, firestore } from "../../firebase";
import { collection, getDocs, where } from "firebase/firestore";
import { query } from "firebase/database";
import { ItemHeader, StyledAddButton } from "../Cart/Cartpageelement";

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
    // console.log("purchaseInstances", purchaseInstances);
  }, []);
  return (
    <>
      <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
      <Navbar togglesidebar={togglesidebar} />

      <UPHeaderFullline>Welcome</UPHeaderFullline>

      <LoginFromcontainer>
        <ItemHeaderprofile>Item Status</ItemHeaderprofile>
        <InnerHeaderWrapper>
          <InnerHeader1></InnerHeader1>
          <DisplayHeader>Material & color</DisplayHeader>
          <DisplayHeader>Dimension</DisplayHeader>
          <DisplayHeader>Status</DisplayHeader>
          <DisplayHeader>Price Paid</DisplayHeader>
        </InnerHeaderWrapper>
        {purchaseInstances.length > 0 ? (
          purchaseInstances.map((purchaseInstance, index) => (
            <div key={index}>
              {purchaseInstance.purchasedItems.map((item) => (
                <InnerHeaderWrapper key={item.itemId}>
                  <InnerHeader>{item.fileName.substring(6)}</InnerHeader>
                  <InnerHeader>
                    <InnerLayerP>FDM Printing({item.color})</InnerLayerP>
                    <InnerLayersP>with</InnerLayersP>
                    <InnerLayerP>{item.material}</InnerLayerP>
                  </InnerHeader>
                  <InnerHeader>
                    {item.dimensions.depth} x {item.dimensions.width} x{" "}
                    {item.dimensions.height}
                  </InnerHeader>
                  <InnerHeader>Pre-Printing Procedures</InnerHeader>
                  <InnerHeaderLeft>SGD {item.price.toFixed(2)}</InnerHeaderLeft>
                </InnerHeaderWrapper>
              ))}
            </div>
          ))
        ) : (
          <></>
        )}
      </LoginFromcontainer>

      <LoginFromcontainer>
      <ItemHeaderprofile>Purchase History</ItemHeaderprofile>
      <InnerHeaderWrapper>
          <InnerHeader1></InnerHeader1>
          <DisplayHeader>Material & color</DisplayHeader>
          <DisplayHeader>Dimension</DisplayHeader>
          <DisplayHeader>Delivered On</DisplayHeader>
          <DisplayHeader>Price Paid</DisplayHeader>
        </InnerHeaderWrapper>

      <InnerHeaderWrapper>
          <InnerHeader>Item 1</InnerHeader>
          <InnerHeader>
            <InnerLayerP>FDM Printing(Black)</InnerLayerP>
            <InnerLayersP>with</InnerLayersP>
            <InnerLayerP>ABS</InnerLayerP>
          </InnerHeader>
          <InnerHeader>
            10 x 10 x 10
          </InnerHeader>
          <InnerHeader>25th July 2023</InnerHeader>
          <InnerHeaderLeft>SGD 80.33</InnerHeaderLeft>
        </InnerHeaderWrapper>
      </LoginFromcontainer>

      <LoginFromcontainer>
      <ItemHeaderprofile>Issue Status</ItemHeaderprofile>
      <InnerHeaderWrapper>
      <DisplayHeader></DisplayHeader>
          <DisplayHeader>Material & color</DisplayHeader>
          <DisplayHeader>Dimension</DisplayHeader>
          <DisplayHeader>Status</DisplayHeader>
          <DisplayHeader>Last updated</DisplayHeader>
          <DisplayHeader>Note</DisplayHeader>
        </InnerHeaderWrapper>

      <InnerHeaderWrapper>
          <InnerHeader>Ticket 1</InnerHeader>
          <InnerHeader>
            <InnerLayerP>FDM Printing(Black)</InnerLayerP>
            <InnerLayersP>with</InnerLayersP>
            <InnerLayerP>ABS</InnerLayerP>
          </InnerHeader>
          <InnerHeader>
            10 x 10 x 10
          </InnerHeader>
          <InnerHeader>Resolved</InnerHeader>
          <InnerHeaderLeft>25th July 2023</InnerHeaderLeft>
          <InnerHeader>Printed wrong dimension</InnerHeader>
          </InnerHeaderWrapper>

          <InnerHeaderWrapper>
          <InnerHeader>Ticket 2</InnerHeader>
          <InnerHeader>
            <InnerLayerP>FDM Printing(Transparent)</InnerLayerP>
            <InnerLayersP>with</InnerLayersP>
            <InnerLayerP>PLA</InnerLayerP>
          </InnerHeader>
          <InnerHeader>
            10 x 10 x 10
          </InnerHeader>
          <InnerHeader>Resolved</InnerHeader>
          <InnerHeaderLeft>15th July 2023</InnerHeaderLeft>
          <InnerHeader>Printed wrong material</InnerHeader>
          </InnerHeaderWrapper>
          <StyledAddButton to="/">
              <span style={plusSignStyle}>+</span>
            </StyledAddButton>
      </LoginFromcontainer>
      <Footer />
    </>
  );
};
const plusSignStyle = {
  // paddingRight: '5px',
  fontSize: "20px",
};