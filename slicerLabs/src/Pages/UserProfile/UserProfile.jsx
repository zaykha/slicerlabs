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
  UPHeaderFullline1,
} from "./UserProfileElement";
import { LoginFromcontainer } from "../Login/LoginComponents/LoginForm/LoginFormelements";
import {
  PurchasedItemsCollection,
  db,
  firestore,
  usersCollection,
} from "../../firebase";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { query } from "firebase/database";
import { ItemHeader, NextBtn, StyledAddButton } from "../Cart/Cartpageelement";
import { MdEdit } from "react-icons/md";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUserDetails,
  setUserDetails,
} from "../../ReduxStore/actions/userDetails";
import EditProfileForm from "./EditProfileForm";
import { fetchAddressDetails } from "../../globalcomponents/MapServices/MapServices";
import { setAuthenticationStatus } from "../../ReduxStore/actions/Authentication";
import { useNavigate } from "react-router-dom";
import { resetCartCount } from "../../ReduxStore/actions/cartCountActions";
import { resetCartState } from "../../ReduxStore/reducers/CartItemReducer";
import { resetAddressDetails } from "../../ReduxStore/reducers/MapServicesReducer";
import { stopAuthListener } from "../../authListener";

export const DashBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglesidebar = () => {
    setIsOpen(!isOpen);
  };
  // Initialize an array to store the retrieved documents
  const [purchaseInstances, setPurchaseInstances] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userDetails = useSelector((state) => state?.userDetails);
  const userDetailsUnparsed = localStorage.getItem("userDetails");
  const userDetails = JSON.parse(userDetailsUnparsed);
  const [localUser, setLocalUser] = useState(userDetails.userDetails);
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const userUIDInLocalStorage = localStorage.getItem("uid");
  // const postalCode = userDetails?.userDetails.postalCode
  // useEffect(() => {
  //   console.log(userDetails.userDetails);
  // }, [userDetails])

  useEffect(() => {
    async function getPurchaseInstancesForUser(userId) {
      console.log("userDetails", userDetails);
      try {
        // Execute the query and get the snapshot of matching documents
        const q = query(
          PurchasedItemsCollection,
          where("userUID", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot)
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
      // fetchAddress(postalCode);
      // Handle the fetched data here if needed
      // console.log("fetched data:", purchaseInstancesData);
    };

    fetchData(); // Call the function
  }, []);

  const EditFormClose = async () => {
    setLoading(true);
    setIsEditFormOpen(false);
    try {
      // Continue with your other logic
      const USERUID = userUIDInLocalStorage;
      const userDetailsRef = doc(usersCollection, USERUID);

      getDoc(userDetailsRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userDetailsData = docSnap.data();
            setLocalUser(userDetailsData);
            dispatch(setUserDetails(userDetailsData));
            localStorage.setItem(
              "userDetails",
              JSON.stringify(userDetailsData)
            );
            console.log("Document data in UserProfile:", userDetailsData);
            setLoading(false);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    } catch {
      console.error("Error gettingdocs:", error);
    }
  };

  const handleEditClick = () => {
    // Logic to handle the edit click event
    console.log("Edit button clicked");
    setIsEditFormOpen(true);
  };
  const handleLogout = () => {
   
    const auth = getAuth();
    // Prompt the user for confirmation before logging out
    let confirmClearTempItems = false;
  if (cartItems.length > 0) {
    const confirmClearCart = window.confirm(
      "You have items in your cart that are not checked out. Proceeding with logout will remove these items. Are you sure you want to continue?"
    );
      
    if (!confirmClearCart) {
      return; // Abort logout if user cancels
    }
    confirmClearTempItems = true;
  } else {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) {
      return; // Abort logout if user cancels
    }
    confirmClearTempItems = true;
  }

    signOut(auth)
      .then(() => {
        const unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            // This callback function will be triggered when the auth state changes
            // However, we're only interested in the logout event here
            if (!user) {
              try {
                unsubscribe(); // Unsubscribe to avoid further notifications

                // Clear localStorage based on user confirmation
                if (confirmClearTempItems) {
                  // Get the calculatePriceFunction from localStorage
                  const calculatePriceFunction = localStorage.getItem(
                    "calculatePriceFunction"
                  );

                  localStorage.clear();
                  if (calculatePriceFunction) {
                    localStorage.setItem(
                      "calculatePriceFunction",
                      calculatePriceFunction
                    );
                  }
                  console.log("logout");
                  // Reset redux store and navigate
                  dispatch(setAuthenticationStatus(false));
                  dispatch(resetCartCount());
                  dispatch(resetCartState());
                  dispatch(resetAddressDetails());
                  dispatch(resetUserDetails());

                  navigate("/");
                }
              } catch (error) {
                console.error("Error during logout:", error);
              }
            }
          },
          (error) => {
            // Handle any error that occurs while listening for the auth state changes
            console.error("Error in onAuthStateChanged:", error);
          }
        );
      })
      .catch((error) => {
        // An error happened.
        console.error("Error in signout:", error);
      });

    // Unsubscribe from the onAuthStateChanged listener
  };

  return (
    <>
      <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />
      <Navbar
        togglesidebar={togglesidebar}
        userName={userDetails.userDetails.userName}
      />

      <UPHeaderFullline1>
        Welcome {userDetails?.userDetails?.userName ?? ""}
      </UPHeaderFullline1>

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
                  <InnerHeader>{item.status}</InnerHeader>
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

      {Loading ? (
        <LoginFromcontainer>Loading</LoginFromcontainer>
      ) : (
        <LoginFromcontainer>
          <ItemHeaderprofile>Personalization</ItemHeaderprofile>
          <EditIcon onClick={handleEditClick}>
            <MdEdit />
          </EditIcon>
          <InnerHeaderWrapper>
            <DisplayHeader>Name</DisplayHeader>
            <InnerHeaderpersonalize>
              {userDetails?.userDetails?.userName ?? "Default Username"}
            </InnerHeaderpersonalize>
          </InnerHeaderWrapper>

          <InnerHeaderWrapper>
            <DisplayHeader>Email</DisplayHeader>
            <InnerHeaderpersonalize>
              {userDetails?.userDetails?.email ?? "Default Email"}
            </InnerHeaderpersonalize>
          </InnerHeaderWrapper>

          <InnerHeaderWrapper>
            <DisplayHeader>Password</DisplayHeader>
            <InnerHeaderpersonalize>************</InnerHeaderpersonalize>
          </InnerHeaderWrapper>

          <InnerHeaderWrapper>
            <DisplayHeader>Shipping Address</DisplayHeader>
            <InnerHeaderpersonalize>
              {userDetails?.userDetails?.displayFullAddress ??
                "Default address"}
            </InnerHeaderpersonalize>
          </InnerHeaderWrapper>

          <InnerHeaderWrapper>
            <DisplayHeader>Contact</DisplayHeader>
            <InnerHeaderpersonalize>
              {userDetails?.userDetails?.phone ?? "Default phone"}
            </InnerHeaderpersonalize>
          </InnerHeaderWrapper>
          <NextBtn onClick={handleLogout}>logout</NextBtn>
        </LoginFromcontainer>
      )}

      {isEditFormOpen && (
        <EditProfileForm
          user={userDetails.userDetails}
          onClose={EditFormClose} // Function to close the form
          onSave={(updatedUser) => {
            // Handle saving the updated user data here
            // updateUserInFirestore(updatedUser);
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
