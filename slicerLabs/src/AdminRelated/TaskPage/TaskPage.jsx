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

const TaskPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [FetchingData, setFetchingData] = useState(false);
  const [statusUpdateInProgress, setStatusUpdateInProgress] = useState(false);

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [totalItemToDisplay, settotalItemToDisplay] = useState(0);
  const [TotalDeliveredItems, setTotalDeliveredItems] = useState(0);
  const [pendingPrintJobs, setPendingPrintJobs] = useState([]);
  const [purchaseInstances, setPurchaseInstances] = useState([]);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.userDetails);
  const [localUser, setLocalUser] = useState(userDetails.userDetails);
  const userUIDInLocalStorage = localStorage.getItem("uid");
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const [formattedAddresses, setFormattedAddresses] = useState([]);
  const statusOptions = [
    "Pre-Printing Procedures",
    "Printing",
    "Post Printing Processes",
    "Ready To Deliver",
    "Delivered",
  ];
  let itemCountChecker = 0;
  let DelivereditemCountChecker = 0;
  async function getPurchaseInstancesForUser(userId) {
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
  const [itemStatuses, setItemStatuses] = useState({});
  useEffect(() => {   
    // Call the function on component mount
    if (!FetchingData && !statusUpdateInProgress) {
      // setFetchingData(true);
      getPurchaseInstancesForUser(userUIDInLocalStorage);
      // setFetchingData(false);
    }
  }, [FetchingData, statusUpdateInProgress]);
  // Function to handle status change


  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
      setFetchingData(false)
    }
    setOpenDropdownIndex(null);
    setStatusUpdateInProgress(false);
    // setFetchingData(false);
  };


  // Function to update print job status
  const updatePrintJobStatus = (printJobId, newStatus) => {
    // Update print job status in Firebase Firestore here
  };

  // Your rendering logic here
  return (
    <>
      <Sidebar isOpen={isOpen} togglesidebar={toggleSidebar} />
      <Navbar togglesidebar={toggleSidebar} />

      <UPHeaderFullline1>Admin Task Page</UPHeaderFullline1>

      <LoginFromcontainer>
        <ItemHeaderprofile>Pending Tasks</ItemHeaderprofile>
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
                          <InnerHeader>
                            <InnerLayerP>
                              FDM Printing({item.color})
                            </InnerLayerP>
                            <InnerLayersP>with</InnerLayersP>
                            <InnerLayerP>
                              {item.material} {item.dimensions.depth} x{" "}
                              {item.dimensions.width} x {item.dimensions.height}
                            </InnerLayerP>
                            <InnerLayersP>Quantity of </InnerLayersP>
                            <InnerLayerP>{item.quantity}</InnerLayerP>
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
                                itemCountChecker === totalItemToDisplay
                              }
                              itemCount={totalItemToDisplay}
                            />
                          </InnerHeader>
                          <InnerHeaderLeft>
                            SGD {item.price.toFixed(2)}
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
                        <InnerLayerP>{purchaseInstance.userName}</InnerLayerP>
                        <InnerLayersP>
                          Contact: {purchaseInstance.userPhone}
                        </InnerLayersP>
                        <InnerLayersP>
                          {item.fileName.substring(6)}
                        </InnerLayersP>
                      </InnerHeader>
                      <InnerHeader>
                        <InnerLayerP>FDM Printing({item.color})</InnerLayerP>
                        <InnerLayersP>with</InnerLayersP>
                        <InnerLayerP>
                          {item.material} {item.dimensions.depth} x{" "}
                          {item.dimensions.width} x {item.dimensions.height}
                        </InnerLayerP>
                        <InnerLayersP>Quantity of </InnerLayersP>
                        <InnerLayerP>{item.quantity}</InnerLayerP>
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
                            DelivereditemCountChecker === TotalDeliveredItems
                          }
                          itemCount={TotalDeliveredItems}
                        />
                      </InnerHeader>
                      <InnerHeaderLeft>
                        SGD {item.price.toFixed(2)}
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

      <Footer />
    </>
  );
};
const plusSignStyle = {
  // paddingRight: '5px',
  fontSize: "20px",
};
export default TaskPage;
