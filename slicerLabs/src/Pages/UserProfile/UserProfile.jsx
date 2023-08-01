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
  EditIcon,
  InnerHeader,
  InnerHeader1,
  InnerHeaderLeft,
  InnerHeaderWrapper,
  InnerHeaderWrapperbtm,
  InnerHeaderpersonalize,
  InnerLayerP,
  InnerLayersP,
  ItemHeaderprofile,
  SubHeader,
} from "./UserProfileElement";
import { LoginFromcontainer } from "../Login/LoginComponents/LoginForm/LoginFormelements";
import { PurchasedItemsCollection, db, firestore, usersCollection } from "../../firebase";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { query } from "firebase/database";
import { ItemHeader, StyledAddButton } from "../Cart/Cartpageelement";
import { MdEdit } from "react-icons/md";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../ReduxStore/actions/userDetails";
import EditProfileForm from "./EditProfileForm";

export const DashBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglesidebar = () => {
    setIsOpen(!isOpen);
  };
  // Initialize an array to store the retrieved documents
  const [purchaseInstances, setPurchaseInstances] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.userDetails);
  const [localUser, setLocalUser] = useState(userDetails.userDetails);
  const userUIDInLocalStorage = localStorage.getItem("uid");

  // useEffect(() => {
  //   console.log(userDetails.userDetails);
  // }, [userDetails])
  
  
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
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
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
            setLocalUser(userDetailsWithUid);
            dispatch(setUserDetails(userDetailsWithUid));
            localStorage.setItem(
              "userDetails",
              JSON.stringify(userDetailsWithUid)
            );
            console.log("Document data:", userDetailsWithUid);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching calculatePrice function:", error);
        }
      }
    });
    return () => {
      // Unsubscribe from the onAuthStateChanged listener when the component unmounts
      unsubscribe();
    };
  }, [isEditFormOpen])
  
  const handleEditClick = () => {
    // Logic to handle the edit click event
    console.log("Edit button clicked");
    setIsEditFormOpen(true);
  };

  const updateUserInFirestore = async (updatedUser) => {
    const USERUID = userDetails.userUID;
    const userDetailsRef = doc(usersCollection, USERUID);

    try {
      await updateDoc(userDetailsRef, updatedUser);
      console.log("User information updated in Firestore.");
    } catch (error) {
      console.error("Error updating user information in Firestore:", error);
    }
  };
 
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
          <InnerHeader>10 x 10 x 10</InnerHeader>
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
          <InnerHeader>10 x 10 x 10</InnerHeader>
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
          <InnerHeader>10 x 10 x 10</InnerHeader>
          <InnerHeader>Resolved</InnerHeader>
          <InnerHeaderLeft>15th July 2023</InnerHeaderLeft>
          <InnerHeader>Printed wrong material</InnerHeader>
        </InnerHeaderWrapper>
        <StyledAddButton to="/">
          <span style={plusSignStyle}>+</span>
        </StyledAddButton>
      </LoginFromcontainer>

      <LoginFromcontainer>
        <ItemHeaderprofile>Personalization</ItemHeaderprofile>
        <EditIcon onClick={handleEditClick}>
          <MdEdit />
        </EditIcon>
        <InnerHeaderWrapper>
          <DisplayHeader>Name</DisplayHeader>
          <InnerHeaderpersonalize>{userDetails?.userDetails?.userName ?? 'Default Username'}</InnerHeaderpersonalize>
        </InnerHeaderWrapper>

        <InnerHeaderWrapper>
          <DisplayHeader>Email</DisplayHeader>
          <InnerHeaderpersonalize>{userDetails?.userDetails?.email ?? 'Default Email'}</InnerHeaderpersonalize>
        </InnerHeaderWrapper>

        <InnerHeaderWrapper>
          <DisplayHeader>Password</DisplayHeader>
          <InnerHeaderpersonalize>************</InnerHeaderpersonalize>
        </InnerHeaderWrapper>

        <InnerHeaderWrapper>
          <DisplayHeader>Shipping Address</DisplayHeader>
          <InnerHeaderpersonalize>
            80 Bendemeer Rd, #05-01, Singapore 339949
          </InnerHeaderpersonalize>
        </InnerHeaderWrapper>

        <InnerHeaderWrapper>
          <DisplayHeader>Contact</DisplayHeader>
          <InnerHeaderpersonalize>{userDetails?.userDetails?.phone ?? 'Default phone'}</InnerHeaderpersonalize>
        </InnerHeaderWrapper>
      </LoginFromcontainer>
      {isEditFormOpen && (
        <EditProfileForm
          user={userDetails.userDetails}
          onClose={() => setIsEditFormOpen(false)} // Function to close the form
          onSave={(updatedUser) => {
            // Handle saving the updated user data here
            updateUserInFirestore(updatedUser);
            console.log("Updated user data:", updatedUser);
            setIsEditFormOpen(false); // Close the form after saving
          }}
        />
      )}
      <Footer />
    </>
  );
};
const plusSignStyle = {
  // paddingRight: '5px',
  fontSize: "20px",
};
