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
  EditIconLoginDetails,
  EditIconLoginDetails1,
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
  ProductConcernCollection,
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
  updateUserEmail,
} from "../../ReduxStore/actions/userDetails";
import EditProfileForm from "./EditProfileForm";
import { fetchAddressDetails } from "../../globalcomponents/MapServices/MapServices";
import { setAuthenticationStatus } from "../../ReduxStore/actions/Authentication";
import { useNavigate } from "react-router-dom";
import { resetCartCount } from "../../ReduxStore/actions/cartCountActions";
import { resetCartState } from "../../ReduxStore/reducers/CartItemReducer";
import { resetAddressDetails } from "../../ReduxStore/reducers/MapServicesReducer";
import { stopAuthListener } from "../../authListener";
import EditLoginDetailForm from "./EditLoginDetailForm";
import EditPasswordForm from "./EditPasswordForm";
import ProductConcernPrompt from "../../globalcomponents/ProductConcern/ProductConcernPrompt";
import SpinningLoader from "../../globalcomponents/DropDown/SpinningLoader";
import RotatingLoader from "../../globalcomponents/DropDown/RotatingLoader";

export const DashBoard = () => {
  const [FetchingData, setFetchingData] = useState(true);
  // Initialize an array to store the retrieved documents
  const [purchaseInstances, setPurchaseInstances] = useState([]);
  const [productIssue, setProductIssue] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isEditLoginDetailsFormOpen, setIsEditLoginDetailsFormOpen] =
    useState(false);
  const [isEditPasswordFormOpen, setIsEditPasswordFormOpen] = useState(false);
  const [isProductConcernFormOpen, setIsProductConcernFormOpen] =
    useState(false);
  setIsEditLoginDetailsFormOpen;
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetailsUnparsed = localStorage.getItem("userDetails");
  const userDetails =
    useSelector((state) => state?.userDetails) ;
  // const userDetails = JSON.parse(userDetailsUnparsed);
  const [localUser, setLocalUser] = useState(userDetails);
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const userUIDInLocalStorage = userDetails.userUID;
  // const postalCode = userDetails?.userDetails.postalCode
  // useEffect(() => {
  //   console.log(userDetails.userDetails);
  // }, [userDetails])

  useEffect(() => {
    setFetchingData(true);
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
    async function getProductIssueForUser(userId) {
      try {
        // const q = query(
        //   ProductConcernCollection,
        //   where("userUID", "==", userId)
        // );
        // const querySnapshot = await getDocs(q);
        const userConcernsRef = doc(ProductConcernCollection, userId);
        const userConcernsDoc = await getDoc(userConcernsRef);
        const existingConcerns = userConcernsDoc.data()?.concerns || [];

        console.log(userConcernsDoc);
        const ProductIssueData = [];
        // Loop through the snapshot and extract the data from each document
        existingConcerns.forEach((doc) => {
          // Extract the data from the document and add it to the array
          const ProductIssueDatatoPush = doc;
          console.log(ProductIssueData);
          ProductIssueData.push(ProductIssueDatatoPush);
        });
        console.log("Product Issue", ProductIssueData);
        setProductIssue(ProductIssueData);
      } catch (error) {
        console.error("Error retrieving Product Issue:", error);
        return []; // Return an empty array if an error occurs
      }
    }

    // Call the function and use async/await to handle the asynchronous nature
    const fetchData = async () => {
      const purchaseInstancesData = await getPurchaseInstancesForUser(
        userUIDInLocalStorage
      );
      const productIDData = await getProductIssueForUser(userUIDInLocalStorage);
      // fetchAddress(postalCode);
      // Handle the fetched data here if needed
      // console.log("fetched data:", purchaseInstancesData);
    };

    fetchData(); // Call the function
    setFetchingData(false);
  }, [FetchingData]);

  const EditFormClose = async () => {
    // setLoading(true);
    setIsEditFormOpen(false);
    // try {
    //   // Continue with your other logic
    //   const USERUID = userUIDInLocalStorage;
    //   const userDetailsRef = doc(usersCollection, USERUID);

    //   getDoc(userDetailsRef)
    //     .then((docSnap) => {
    //       if (docSnap.exists()) {
    //         const userDetailsData = docSnap.data();
    //         setLocalUser(userDetailsData);
    //         dispatch(setUserDetails(userDetailsData));
    //         localStorage.setItem(
    //           "userDetails",
    //           JSON.stringify(userDetailsData)
    //         );
    //         console.log("Document data in UserProfile:", userDetailsData);
    //         setLoading(false);
    //       } else {
    //         console.log("No such document!");
    //         setLoading(false);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching user details:", error);
    //       setLoading(false);
    //     });
    // } catch {
    //   console.error("Error gettingdocs:", error);
    //   setLoading(false);
    // }
  };

  const handleEditClick = () => {
    setIsEditFormOpen(true);
  };

  const handleEditLoginDetailsClick = () => {
    setIsEditLoginDetailsFormOpen(true);
  };

  const EditLoginDetailsFormClose = async () => {
    setLoading(true);
    setIsEditLoginDetailsFormOpen(false);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      // console.log(user)
      if (user !== null) {
        user.providerData.forEach(async (profile) => {
          const newEmail = profile.email;
          dispatch({ type: "UPDATE_EMAIL", payload: newEmail });
          setLoading(false);
         
        });
      }
    } catch {
      setLoading(false);
      console.error("Error gettingdocs:", error);
    }
  };

  const handleProductConcernClick = () => {
    setIsProductConcernFormOpen(true);
  };
  const handleEditPasswordClick = () => {
    setIsEditPasswordFormOpen(true);
  };

  const EditPasswordFormClose = async () => {
    // setLoading(true);
    setIsEditPasswordFormOpen(false);
  };

  const onSubmitProductConcern = () => {
    setIsProductConcernFormOpen(false);
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
                  // console.log("logout");
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
      {FetchingData ? (
        <RotatingLoader />
      ) : (
        <UPHeaderFullline1>Welcome {userDetails?.userName}</UPHeaderFullline1>
      )}

      <LoginFromcontainer>
        <ItemHeaderprofile>In Production</ItemHeaderprofile>
        {purchaseInstances.length > 0 &&
        purchaseInstances[0].status !== "Delivered" ? (
          <InnerHeaderWrapper>
            <InnerHeader1></InnerHeader1>
            <DisplayHeader>Product Details</DisplayHeader>
            <DisplayHeader>Delivery Date</DisplayHeader>
            <DisplayHeader>Status</DisplayHeader>
            <DisplayHeader>Price Paid</DisplayHeader>
          </InnerHeaderWrapper>
        ) : (
          <DisplayHeader>No Outstanding Unshipped Items</DisplayHeader>
        )}

        {purchaseInstances.length > 0 ? (
          purchaseInstances.map((purchaseInstance, outerIndex) => (
            <div key={outerIndex}>
              {purchaseInstance.purchasedItems
                .filter((item) => item.status !== "Delivered")
                .map((item, index) => {
                  return (
                    <InnerHeaderWrapper key={item.itemId}>
                      <InnerHeader>
                        <InnerLayerP> {item.fileName}</InnerLayerP>
                      </InnerHeader>
                      <InnerHeader>
                        <InnerLayerP>FDM Printing ({item.color})</InnerLayerP>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            margin: "5px 0",
                          }}
                        >
                          <InnerLayersP>with </InnerLayersP>
                          <InnerLayerP>{item.material}</InnerLayerP>
                        </div>

                        <InnerLayerP>
                          {item.dimensions.depth.toFixed(2)}mm Depth
                        </InnerLayerP>
                        <InnerLayerP>
                          {" "}
                          {item.dimensions.width.toFixed(2)}mm Width
                        </InnerLayerP>
                        <InnerLayerP>
                          {" "}
                          {item.dimensions.height.toFixed(2)}mm Height
                        </InnerLayerP>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            margin: "5px 0",
                          }}
                        >
                          <InnerLayersP>Quantity of </InnerLayersP>
                          <InnerLayerP>x {item.quantity}</InnerLayerP>
                        </div>
                      </InnerHeader>
                      <InnerHeader>
                        {purchaseInstance.approxDeliDate || "TBD"}
                      </InnerHeader>
                      <InnerHeader>{item.status}</InnerHeader>
                      <InnerHeaderLeft>
                        SGD {item.pricePerUnit.toFixed(2)}
                      </InnerHeaderLeft>
                    </InnerHeaderWrapper>
                  );
                })}
            </div>
          ))
        ) : (
          <></>
        )}
      </LoginFromcontainer>

      <LoginFromcontainer>
        <ItemHeaderprofile>Delivered Products</ItemHeaderprofile>
        {purchaseInstances.length > 0 &&
        purchaseInstances.map((purchaseInstance) => {
          purchaseInstance.purchasedItems.filter(
            (item) => item.status == "Delivered"
          );
        }) ? (
          <InnerHeaderWrapper>
            <InnerHeader1></InnerHeader1>
            <DisplayHeader>Material & color</DisplayHeader>
            <DisplayHeader>Dimension</DisplayHeader>
            <DisplayHeader>Delivered On</DisplayHeader>
            <DisplayHeader>Price Paid</DisplayHeader>
          </InnerHeaderWrapper>
        ) : (
          <DisplayHeader>No Items Have Been Delivered</DisplayHeader>
        )}
        {purchaseInstances.length > 0 ? (
          purchaseInstances.map((purchaseInstance, outerIndex) => (
            <div key={outerIndex}>
              {purchaseInstance.purchasedItems
                .filter((item) => item.status == "Delivered")
                .map((item, index) => {
                  return (
                    <InnerHeaderWrapper key={item.itemId}>
                      <InnerHeader>
                        <InnerLayerP> {item.fileName}</InnerLayerP>
                      </InnerHeader>
                      <InnerHeader>
                        <InnerLayerP>FDM Printing({item.color})</InnerLayerP>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            margin: "5px 0",
                          }}
                        >
                          <InnerLayersP>with </InnerLayersP>
                          <InnerLayerP>{item.material}</InnerLayerP>
                        </div>

                        <InnerLayerP>
                          {item.dimensions.depth.toFixed(2)}mm Depth
                        </InnerLayerP>
                        <InnerLayerP>
                          {" "}
                          {item.dimensions.width.toFixed(2)}mm Width
                        </InnerLayerP>
                        <InnerLayerP>
                          {" "}
                          {item.dimensions.height.toFixed(2)}mm Height
                        </InnerLayerP>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            margin: "5px 0",
                          }}
                        >
                          <InnerLayersP>Quantity of </InnerLayersP>
                          <InnerLayerP>x {item.quantity}</InnerLayerP>
                        </div>
                      </InnerHeader>
                      <InnerHeader>
                        {purchaseInstance.approxDeliDate || "TBD"}
                      </InnerHeader>
                      <InnerHeader>{item.status}</InnerHeader>
                      <InnerHeaderLeft>
                        SGD {item.pricePerUnit.toFixed(2)}
                      </InnerHeaderLeft>
                    </InnerHeaderWrapper>
                  );
                })}
            </div>
          ))
        ) : (
          <></>
        )}
      </LoginFromcontainer>

      <LoginFromcontainer>
        <ItemHeaderprofile>Product Concern</ItemHeaderprofile>
        {FetchingData ? (
          <SpinningLoader />
        ) : (
          <>
            <InnerHeaderWrapper>
              <DisplayHeader></DisplayHeader>
              <DisplayHeader>Product Details</DisplayHeader>
              <DisplayHeader>Status</DisplayHeader>
              <DisplayHeader>Last updated</DisplayHeader>
              <DisplayHeader>Note</DisplayHeader>
            </InnerHeaderWrapper>

            {purchaseInstances.length > 0 ? (
              purchaseInstances
                .filter((item) => item.status !== "Delivered")
                .map((purchaseInstance, index) => (
                  <div key={index}>
                    {purchaseInstance.purchasedItems.map((item) =>
                      productIssue.map((issue) => {
                        if (issue.productId === item.itemId) {
                          return (
                            <InnerHeaderWrapper key={item.itemId}>
                              <InnerHeader>
                                <InnerLayerP> {item.fileName}</InnerLayerP>
                              </InnerHeader>
                              <InnerHeader>
                                <InnerLayerP>
                                  FDM Printing({item.color})
                                </InnerLayerP>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    margin: "5px 0",
                                  }}
                                >
                                  <InnerLayersP>with </InnerLayersP>
                                  <InnerLayerP>{item.material}</InnerLayerP>
                                </div>

                                <InnerLayerP>
                                  {item.dimensions.depth.toFixed(2)}mm Depth
                                </InnerLayerP>
                                <InnerLayerP>
                                  {" "}
                                  {item.dimensions.width.toFixed(2)}mm Width
                                </InnerLayerP>
                                <InnerLayerP>
                                  {" "}
                                  {item.dimensions.height.toFixed(2)}mm Height
                                </InnerLayerP>

                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    margin: "5px 0",
                                  }}
                                >
                                  <InnerLayersP>Quantity of </InnerLayersP>
                                  <InnerLayerP>x {item.quantity}</InnerLayerP>
                                </div>
                              </InnerHeader>
                              <InnerHeader>
                                {issue.status || "pending"}
                              </InnerHeader>
                              <InnerHeader>
                                {issue.lastUpdate || ""}
                              </InnerHeader>
                              <InnerHeader>{issue.concernNote}</InnerHeader>
                            </InnerHeaderWrapper>
                          );
                        }
                      })
                    )}
                  </div>
                ))
            ) : (
              <></>
            )}
            <StyledAddButton onClick={handleProductConcernClick}>
              <span style={plusSignStyle}>+</span>
            </StyledAddButton>
          </>
        )}
      </LoginFromcontainer>

      {Loading && FetchingData ? (
        <RotatingLoader />
      ) : (
        <LoginFromcontainer>
          <ItemHeaderprofile>Personalization</ItemHeaderprofile>
          <EditIcon onClick={handleEditClick}>
            <MdEdit />
          </EditIcon>
          <InnerHeaderWrapper>
            <DisplayHeader>Name</DisplayHeader>
            <InnerHeaderpersonalize>
              {userDetails?.userName}
            </InnerHeaderpersonalize>
          </InnerHeaderWrapper>

          <InnerHeaderWrapper>
            <DisplayHeader>Shipping Address</DisplayHeader>
            <InnerHeaderpersonalize>
              {userDetails?.displayFullAddress}
            </InnerHeaderpersonalize>
          </InnerHeaderWrapper>

          <InnerHeaderWrapper>
            <DisplayHeader>Contact</DisplayHeader>
            <InnerHeaderpersonalize>
              {userDetails?.phone}
            </InnerHeaderpersonalize>
          </InnerHeaderWrapper>
        </LoginFromcontainer>
      )}

      <LoginFromcontainer>
        <ItemHeaderprofile>Login Details</ItemHeaderprofile>

        <InnerHeaderWrapper>
          <DisplayHeader>Email</DisplayHeader>
          <InnerHeaderpersonalize>
            {userDetails?.email }
          </InnerHeaderpersonalize>
          <EditIconLoginDetails1 onClick={handleEditLoginDetailsClick}>
            Change Login Email
          </EditIconLoginDetails1>
        </InnerHeaderWrapper>

        <InnerHeaderWrapper>
          <DisplayHeader>Password</DisplayHeader>
          <InnerHeaderpersonalize>************</InnerHeaderpersonalize>
          <EditIconLoginDetails1 onClick={handleEditPasswordClick}>
            Change Password
          </EditIconLoginDetails1>
        </InnerHeaderWrapper>
        <NextBtn onClick={handleLogout}>logout</NextBtn>
      </LoginFromcontainer>

      {isProductConcernFormOpen && (
        <ProductConcernPrompt
          purchaseInstances={purchaseInstances}
          onSubmitProductConcern={onSubmitProductConcern}
          onClose={onSubmitProductConcern}
          setFetchingData={setFetchingData}
        />
      )}

      {isEditFormOpen && (
        <EditProfileForm
          user={userDetails}
          onClose={EditFormClose} // Function to close the form
          onSave={(updatedUser) => {
            // Handle saving the updated user data here
            // updateUserInFirestore(updatedUser);
            console.log("Updated user data:", updatedUser);
            setIsEditFormOpen(false); // Close the form after saving
          }}
        />
      )}

      {isEditLoginDetailsFormOpen && (
        <EditLoginDetailForm
          onClose={EditLoginDetailsFormClose} // Function to close the form
        />
      )}

      {isEditPasswordFormOpen && (
        <EditPasswordForm
          onClose={EditPasswordFormClose} // Function to close the form
        />
      )}
    </>
  );
};
const plusSignStyle = {
  // paddingRight: '5px',
  fontSize: "20px",
};
