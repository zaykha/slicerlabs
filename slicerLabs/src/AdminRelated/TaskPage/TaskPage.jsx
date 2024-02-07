import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../globalcomponents/SidebarMenu/Sidebar";
import Navbar from "../../globalcomponents/navbar/navbar";
import {
  DisplayHeader,
  DropdownButton,
  DropdownContainer,
  DropdownIcon,
  DropdownList,
  DropdownListItem,
  EditIcon,
  InnerHeader,
  InnerHeader1,
  InnerHeaderClickable,
  InnerHeaderLeft,
  InnerHeaderP,
  InnerHeaderWrapper,
  InnerHeaderWrapperbtm,
  InnerHeaderpersonalize,
  InnerLayerP,
  InnerLayersP,
  ItemHeaderprofile,
  SubHeader,
  UPHeaderFullline1,
} from "../../Pages/UserProfile/UserProfileElement";
import { LoginFromcontainer } from "../../Pages/Login/LoginComponents/LoginForm/LoginFormelements";
import {
  ProductConcernCollection,
  PurchasedItemsCollection,
  db,
  firestore,
  usersCollection,
} from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  ItemHeader,
  NextBtn,
  StyledAddButton,
} from "../../Pages/Cart/Cartpageelement";
import { MdEdit } from "react-icons/md";
import Footer from "../../globalcomponents/Footer/footer";
import { fetchAddressDetails } from "../../globalcomponents/MapServices/MapServices";
import StatusDropdown from "../../globalcomponents/DropDown/customDropDown";
import SpinningLoader from "../../globalcomponents/DropDown/SpinningLoader";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { setAuthenticationStatus } from "../../ReduxStore/actions/Authentication";
import { resetCartCount } from "../../ReduxStore/actions/cartCountActions";
import { resetCartState } from "../../ReduxStore/reducers/CartItemReducer";
import { resetAddressDetails } from "../../ReduxStore/reducers/MapServicesReducer";
import { resetUserDetails } from "../../ReduxStore/actions/userDetails";
import ConfirmationPrompt from "../../globalcomponents/prompt/ConfirmPrompt";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const TaskPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [FetchingData, setFetchingData] = useState(false);
  const [statusUpdateInProgress, setStatusUpdateInProgress] = useState(false);
  const [productIssue, setProductIssue] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [openIssueDropdownIndex, setOpenIssueDropdownIndex] = useState(null);
  const [totalItemToDisplay, settotalItemToDisplay] = useState(0);
  const [TotalDeliveredItems, setTotalDeliveredItems] = useState(0);
  const [TotalIssueItems, setTotalIssueItems] = useState(0);
  const [pendingPrintJobs, setPendingPrintJobs] = useState([]);
  const [purchaseInstances, setPurchaseInstances] = useState([]);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.userDetails);
  const [localUser, setLocalUser] = useState(userDetails);
  const userUIDInLocalStorage = localStorage.getItem("uid");
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const [formattedAddresses, setFormattedAddresses] = useState([]);
  const [itemStatuses, setItemStatuses] = useState({});
  const [itemIssueStatuses, setItemIssueStatuses] = useState({});
  const [isDownloadPopupOpen, setIsDownloadPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUser, setSelectedFileUser] = useState(null);
  const statusOptions = [
    "Pre-Printing Procedures",
    "Printing",
    "Post Printing Processes",
    "Ready To Deliver",
    "Delivered",
  ];
  const issueOptions = [
    "Pending",
    "Under Review",
    "Investigating",
    "Pending Resolution",
    "Solution Proposed",
    "Customer Feedback",
    "Resolved",
    "Closed",
  ];
  const [confirmationHandling, setConfirmationHandling] = useState({
    state: false,
    header: "",
    message: "",
  });
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  let itemCountChecker = 0;
  let DelivereditemCountChecker = 0;
  async function getPurchaseInstancesForUser(userId) {
    // setFetchingData(true);
    try {
      const querySnapshot = await getDocs(PurchasedItemsCollection, userId);
      const purchaseInstancesData = [];
      const addresses = [];
      let purchaseTotalItems = 0;
      let purchaseTotalDeliveredItems = 0;

      // Loop through the snapshot and extract the data from each document
      for (const doc of querySnapshot.docs) {
        const purchaseInstanceData = doc.data();

        const addressResult = await dispatch(
          fetchAddressDetails(purchaseInstanceData.userPostal)
        );
        purchaseInstanceData.purchasedItems.forEach((item) => {
          setItemStatuses((prevStatuses) => ({
            ...prevStatuses,
            [item.itemId]: item.status,
          }));
        });
        if (addressResult.type === "address/fetchAddressDetails/fulfilled") {
          const { BLK_NO, ROAD_NAME, FLOOR_NO, UNIT_NO, POSTAL } =
            addressResult.payload[0];
          const formattedAddress = `${BLK_NO} ${ROAD_NAME}, ${
            FLOOR_NO && UNIT_NO
              ? `#${FLOOR_NO}-${UNIT_NO}`
              : purchaseInstanceData.userFlatNumber
          }, Singapore ${POSTAL}`;
          addresses.push(formattedAddress);
          // Add the formatted address to the purchase instance data
          // purchaseInstanceData.formattedAddress = formattedAddress;
        } else {
          addresses.push("Address not found");
          // Handle address not found
          // purchaseInstanceData.formattedAddress = 'Address not found';
        }

        // Fetch the address for this purchase instance
        setFormattedAddresses(addresses);

        // Add the purchase instance data to the array
        purchaseInstancesData.push(purchaseInstanceData);
      }

      console.log("purchaseInstances", purchaseInstancesData);
      console.log("address", formattedAddresses);
      purchaseInstancesData.map((instance) => {
        instance.purchasedItems.forEach((item) => {
          if (item.status === "Delivered") {
            purchaseTotalDeliveredItems++;
          } else {
            purchaseTotalItems++;
          }
        });
      });
      settotalItemToDisplay(purchaseTotalItems);
      setTotalDeliveredItems(purchaseTotalDeliveredItems);

      setPurchaseInstances(purchaseInstancesData);
    } catch (error) {
      console.error("Error retrieving purchase instances:", error);
      setPurchaseInstances([]); // Set an empty array if an error occurs
    }
  }

  async function getProductIssueForUser(userId) {
    try {
      let purchasedIssueItems = 0;

      const querySnapshot = await getDocs(ProductConcernCollection, userId);
      // const querySnapshot = await getDocs(q);
      // console.log(querySnapshot)
      const ProductIssueData = [];
      // Loop through the snapshot and extract the data from each document
      // const querySnapshotToLoop= querySnapshot.data().concerns;
      querySnapshot.forEach((doc) => {
        // Extract the data from the document and add it to the array
        const ProductIssueDatatoPushArray = doc.data().concerns;
        ProductIssueDatatoPushArray.map((ProductIssueDatatoPush) => {
          console.log(ProductIssueDatatoPush);
          ProductIssueData.push(ProductIssueDatatoPush);
          setItemIssueStatuses((prevStatuses) => ({
            ...prevStatuses,
            [ProductIssueDatatoPush.productId]: ProductIssueDatatoPush.status,
          }));
        });
      });
      console.log("Product Issue", ProductIssueData);
      ProductIssueData.map((instance) => {
        if (instance.status) {
          purchasedIssueItems++;
        } else {
          return console.log("no issue attached");
        }
      });
      setTotalIssueItems(purchasedIssueItems);
      setProductIssue(ProductIssueData);
    } catch (error) {
      console.error("Error retrieving Product Issue:", error);
      return []; // Return an empty array if an error occurs
    }
    // setFetchingData(false)
  }
  useEffect(() => {
    // Call the function on component mount
    setIsLoading(true);
    if (!FetchingData && !statusUpdateInProgress) {
      getPurchaseInstancesForUser(userUIDInLocalStorage);
      getProductIssueForUser(userUIDInLocalStorage);
    }
    setIsLoading(false);
  }, [FetchingData, statusUpdateInProgress]);
  // Function to handle status change

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const toggleIssueDropdown = (index) => {
    setOpenIssueDropdownIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };
  const handleStatusChange = async (selectedOption, itemId) => {
    setStatusUpdateInProgress(true);
    // setFetchingData(true);
    try {
      setItemStatuses((prevStatuses) => ({
        ...prevStatuses,
        [itemId]: selectedOption,
      }));

      // Get the reference to the document containing the purchasedItems array
      const querySnapshot = await getDocs(
        PurchasedItemsCollection,
        userUIDInLocalStorage
      );

      for (const doc of querySnapshot.docs) {
        const purchaseInstanceData = doc.data();
        const updatedItems = purchaseInstanceData.purchasedItems.map((item) => {
          if (item.itemId === itemId) {
            return {
              ...item,
              status: selectedOption,
            };
          }
          return item;
        });

        // Update the Firestore document with the updated items
        await updateDoc(doc.ref, { purchasedItems: updatedItems });
      }
      setStatusUpdateInProgress(false);
    } catch (error) {
      console.error("Error updating status:", error);
      setFetchingData(false);
    }
    setOpenIssueDropdownIndex(null);
    setStatusUpdateInProgress(false);
    // setFetchingData(false);
  };

  const handleIssueStatusChange = async (selectedOption, itemId) => {
    setStatusUpdateInProgress(true);
    // setFetchingData(true);
    try {
      setItemIssueStatuses((prevStatuses) => ({
        ...prevStatuses,
        [itemId]: selectedOption,
      }));
      console.log(itemIssueStatuses);
      // Get the reference to the document containing the purchasedItems array
      const querySnapshot = await getDocs(
        ProductConcernCollection,
        userUIDInLocalStorage
      );

      for (const doc of querySnapshot.docs) {
        const ProductConcernData = doc.data();
        console.log(ProductConcernData.concerns);
        const concerns = ProductConcernData.concerns.map((item) => {
          console.log(item.productId, itemId);
          if (item.productId === itemId) {
            return {
              ...item,
              status: selectedOption,
            };
          }
          return item;
        });
        console.log(concerns);
        // Update the Firestore document with the updated items
        await updateDoc(doc.ref, { concerns });
      }
      setStatusUpdateInProgress(false);
    } catch (error) {
      console.error("Error updating status:", error);
      setFetchingData(false);
    }
    setOpenIssueDropdownIndex(null);
    setStatusUpdateInProgress(false);
    // setFetchingData(false);
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
  const storage = getStorage();
  const handleDownload = async (item, purchaseInstance) => {
    try {
      const fileName = `${selectedFileUser}&${selectedFile}`;
      // console.log(fileName)
      // Get the reference to the file in Firebase Storage
      const fileRef = ref(storage, `Purchased3DFiles/${fileName}`);

      // Get the download URL for the file
      const downloadURL = await getDownloadURL(fileRef);

      // Create a link and trigger a download
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = fileName;
      link.target = "_blank";
      link.click();
      setConfirmationHandling({
        state: false,
        header: "",
        message: "",
      });
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };
  const handleFileClick = (item, purchaseInstance) => {
    setSelectedFile(item.fileName);
    setSelectedFileUser(purchaseInstance.userUID);
    // console.log(item, purchaseInstance)
    setIsDownloadPopupOpen(true);
    setConfirmationHandling({
      state: true,
      header: "Confirmation Needed",
      message: "Do you want to download the 3D file for this Task?",
    });
  };
  // Your rendering logic here
  return (
    <>
      <UPHeaderFullline1>Admin Task Page</UPHeaderFullline1>

      <LoginFromcontainer>
        <ItemHeaderprofile>Pending Tasks</ItemHeaderprofile>
        {isLoading ? (
          <SpinningLoader />
        ) : (
          <>
            <InnerHeaderWrapper>
              <InnerHeader1></InnerHeader1>
              <DisplayHeader>Product Details</DisplayHeader>
              <DisplayHeader>Address</DisplayHeader>
              <DisplayHeader>Status</DisplayHeader>
              <DisplayHeader>Price Paid</DisplayHeader>
            </InnerHeaderWrapper>
            {purchaseInstances.length > 0 ? (
              purchaseInstances.map((purchaseInstance, outerIndex) => (
                <div key={outerIndex}>
                  {purchaseInstance.purchasedItems
                    .filter((item) => item.status !== "Delivered")
                    .map((item, index) => {
                      itemCountChecker++;

                      return (
                        <InnerHeaderWrapper key={item.itemId}>
                          <InnerHeader>
                            <InnerLayersP>User: </InnerLayersP>
                            <InnerLayerP>
                              {purchaseInstance.userName}
                            </InnerLayerP>
                            <InnerLayersP>
                              Contact: {purchaseInstance.userPhone}
                            </InnerLayersP>
                            <InnerLayersP>
                              {item.fileName.substring(6)}

                            </InnerLayersP>
                          </InnerHeader>
                          <InnerHeaderClickable
                            onClick={() =>
                              handleFileClick(item, purchaseInstance)
                            }
                          >
                            <InnerLayerP>
                              FDM Printing({item.color})
                            </InnerLayerP>
                            <InnerLayersP>with</InnerLayersP>
                            <InnerLayerP>{item.material}</InnerLayerP>
                            <InnerLayerP>
                              {item.dimensions.depth.toFixed(2)} x{" "}
                              {item.dimensions.width.toFixed(2)} x{" "}
                              {item.dimensions.height.toFixed(2)}
                            </InnerLayerP>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <InnerLayersP>Quantity of </InnerLayersP>
                              <InnerLayerP>x {item.quantity}</InnerLayerP>
                            </div>
                          </InnerHeaderClickable>
                          <InnerHeaderP>
                            {formattedAddresses[outerIndex]}
                          </InnerHeaderP>
                          <InnerHeader>
                            <StatusDropdown
                              options={statusOptions}
                              selectedOption={itemStatuses[item.itemId]}
                              onSelect={(selectedOption) =>
                                handleStatusChange(selectedOption, item.itemId)
                              }
                              isOpen={openDropdownIndex === item.itemId}
                              onClick={() => toggleDropdown(item.itemId)}
                              isLastItemTrue={
                                itemCountChecker === totalItemToDisplay
                              }
                              itemCount={totalItemToDisplay}
                            />
                          </InnerHeader>
                          <InnerHeaderLeft>
                            SGD {item.pricePerUnit.toFixed(2)}
                            <InnerLayersP>Purchased Date:</InnerLayersP>
                            <InnerLayerP>
                              {purchaseInstance.purchasedAt}
                            </InnerLayerP>
                          </InnerHeaderLeft>
                          {confirmationHandling.state && (
                            <ConfirmationPrompt
                              header={confirmationHandling.header}
                              message={confirmationHandling.message}
                              onCancel={() =>
                                setConfirmationHandling({
                                  ...confirmationHandling,
                                  state: false,
                                })
                              }
                              onConfirm={() =>
                                handleDownload(item, purchaseInstance)
                              }
                            />
                          )}
                        </InnerHeaderWrapper>
                      );
                    })}
                </div>
              ))
            ) : (
              <></>
            )}
          </>
        )}
      </LoginFromcontainer>

      <LoginFromcontainer>
        <ItemHeaderprofile>Completed Tasks</ItemHeaderprofile>
        {FetchingData ? (
          <SpinningLoader />
        ) : (
          <>
            <InnerHeaderWrapper>
              <InnerHeader1></InnerHeader1>
              <DisplayHeader>Product Details</DisplayHeader>
              <DisplayHeader>Address</DisplayHeader>
              <DisplayHeader>Status</DisplayHeader>
              <DisplayHeader>Price Paid</DisplayHeader>
            </InnerHeaderWrapper>
            {purchaseInstances.length > 0 ? (
              purchaseInstances.map((purchaseInstance, outerIndex) => (
                <div key={outerIndex}>
                  {purchaseInstance.purchasedItems
                    .filter((item) => item.status == "Delivered")
                    .map((item, index) => {
                      DelivereditemCountChecker++;
                      return (
                        <InnerHeaderWrapper key={item.itemId}>
                          <InnerHeader>
                            <InnerLayersP>User: </InnerLayersP>
                            <InnerLayerP>
                              {purchaseInstance.userName}
                            </InnerLayerP>
                            <InnerLayersP>
                              Contact: {purchaseInstance.userPhone}
                            </InnerLayersP>
                            <InnerLayersP>
                              {item.fileName.substring(6)}
                            </InnerLayersP>
                          </InnerHeader>
                          <InnerHeader>
                            <InnerLayerP>
                              FDM Printing({item.color})
                            </InnerLayerP>
                            <InnerLayersP>with</InnerLayersP>
                            <InnerLayerP>{item.material}</InnerLayerP>
                            <InnerLayerP>
                              {item.dimensions.depth.toFixed(2)} x{" "}
                              {item.dimensions.width.toFixed(2)} x{" "}
                              {item.dimensions.height.toFixed(2)}
                            </InnerLayerP>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <InnerLayersP>Quantity of </InnerLayersP>
                              <InnerLayerP>x {item.quantity}</InnerLayerP>
                            </div>
                          </InnerHeader>
                          <InnerHeaderP>
                            {formattedAddresses[outerIndex]}
                          </InnerHeaderP>
                          <InnerHeader>
                            <StatusDropdown
                              options={statusOptions}
                              selectedOption={itemStatuses[item.itemId]}
                              onSelect={(selectedOption) =>
                                handleStatusChange(selectedOption, item.itemId)
                              }
                              isOpen={openDropdownIndex === item.itemId}
                              onClick={() => toggleDropdown(item.itemId)}
                              isLastItemTrue={
                                DelivereditemCountChecker ===
                                TotalDeliveredItems
                              }
                              itemCount={TotalDeliveredItems}
                            />
                          </InnerHeader>
                          <InnerHeaderLeft>
                            SGD {item.pricePerUnit.toFixed(2)}
                            <InnerLayersP>Purchased Date:</InnerLayersP>
                            <InnerLayerP>
                              {purchaseInstance.purchasedAt}
                            </InnerLayerP>
                          </InnerHeaderLeft>
                        </InnerHeaderWrapper>
                      );
                    })}
                </div>
              ))
            ) : (
              <></>
            )}
          </>
        )}
      </LoginFromcontainer>

      <LoginFromcontainer>
        <ItemHeaderprofile>Issue Status</ItemHeaderprofile>
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
                            <InnerLayersP>with</InnerLayersP>
                            <InnerLayerP>{item.material}</InnerLayerP>
                            <InnerLayerP>
                              {item.dimensions.depth.toFixed(2)} x{" "}
                              {item.dimensions.width.toFixed(2)} x{" "}
                              {item.dimensions.height.toFixed(2)}
                            </InnerLayerP>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <InnerLayersP>Quantity of </InnerLayersP>
                              <InnerLayerP>x {item.quantity}</InnerLayerP>
                            </div>
                          </InnerHeader>
                          <InnerHeader>
                            <StatusDropdown
                              options={issueOptions}
                              selectedOption={
                                itemIssueStatuses[issue.productId]
                              }
                              onSelect={(selectedOption) =>
                                handleIssueStatusChange(
                                  selectedOption,
                                  issue.productId
                                )
                              }
                              isOpen={
                                openIssueDropdownIndex === issue.productId
                              }
                              onClick={() =>
                                toggleIssueDropdown(issue.productId)
                              }
                              isLastItemTrue={
                                DelivereditemCountChecker === TotalIssueItems
                              }
                              itemCount={TotalIssueItems}
                            />
                          </InnerHeader>
                          <InnerHeader>{issue.lastUpdate || ""}</InnerHeader>
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
        {/* <StyledAddButton to="/">
          <span style={plusSignStyle}>+</span>
        </StyledAddButton> */}
        <NextBtn onClick={handleLogout}>Logout</NextBtn>
      </LoginFromcontainer>

      {/* {Loading ? (
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
    )} */}

      {/* <NextBtn onClick={handleLogout}>logout</NextBtn> */}
    </>
  );
};
const plusSignStyle = {
  // paddingRight: '5px',
  fontSize: "20px",
};
export default TaskPage;
