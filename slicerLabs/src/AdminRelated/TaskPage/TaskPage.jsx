import React, { useState, useEffect } from "react";
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
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import {
  ItemHeader,
  NextBtn,
  StyledAddButton,
} from "../../Pages/Cart/Cartpageelement";
import { MdEdit } from "react-icons/md";
import Footer from "../../globalcomponents/Footer/footer";
import { fetchAddressDetails } from "../../globalcomponents/MapServices/MapServices";
import StatusDropdown from "../../globalcomponents/DropDown/customDropDown";

const TaskPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [totalItemToDisplay, settotalItemToDisplay] = useState(0);
  const [pendingPrintJobs, setPendingPrintJobs] = useState([]);
  const [purchaseInstances, setPurchaseInstances] = useState([]);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.userDetails);
  const [localUser, setLocalUser] = useState(userDetails.userDetails);
  const userUIDInLocalStorage = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [formattedAddresses, setFormattedAddresses] = useState([]);
  const statusOptions = [
    "Pre-Printing Procedures",
    "Printing",
    "Post Printing Processes",
    "Ready To Deliver",
    "Delivered",
  ];
  let itemCountChecker=0;
  const [selectedStatus, setSelectedStatus] = useState("");
  useEffect(() => {
    async function getPurchaseInstancesForUser(userId) {
      try {
        const querySnapshot = await getDocs(PurchasedItemsCollection, userId);
        const purchaseInstancesData = [];
        const addresses = [];
        let purchaseTotalItems =0;
        // Loop through the snapshot and extract the data from each document
        for (const doc of querySnapshot.docs) {
          const purchaseInstanceData = doc.data();
          
          const addressResult = await dispatch(
            fetchAddressDetails(purchaseInstanceData.userPostal)
          );

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
        purchaseInstancesData.map((instance)=>{
          // console.log("instances in map",instance.purchasedItems.length)
          purchaseTotalItems += instance.purchasedItems.length; 
          
        })
        settotalItemToDisplay(purchaseTotalItems);
        setPurchaseInstances(purchaseInstancesData);
        
      } catch (error) {
        console.error("Error retrieving purchase instances:", error);
        setPurchaseInstances([]); // Set an empty array if an error occurs
      }
    }

    // Call the function on component mount
    getPurchaseInstancesForUser(userUIDInLocalStorage);
  }, [dispatch, userUIDInLocalStorage]);
  // Function to handle status change
 

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleStatusChange = (selectedOption, index) => {
    setSelectedStatus(selectedOption);
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
    // Call your update status function here
  };
  const handleLogout = () => {
    localStorage.clear();

    //reset redux store
    dispatch(setAuthenticationStatus(false));
    dispatch(resetCartCount());
    dispatch(resetCartState());
    dispatch(resetAddressDetails());
    dispatch(resetUserDetails());

    navigate("/");
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

      <UPHeaderFullline1>
        Welcome {userDetails?.userDetails?.userName ?? ""}
      </UPHeaderFullline1>

      <LoginFromcontainer>
        <ItemHeaderprofile>Item Status</ItemHeaderprofile>
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
              {purchaseInstance.purchasedItems.map((item, index) =>{
                
                itemCountChecker++;
              return(
                <InnerHeaderWrapper key={item.itemId}>
                  <InnerHeader>
                    <InnerLayersP>User: </InnerLayersP>
                    <InnerLayerP>{purchaseInstance.userName}</InnerLayerP>
                    <InnerLayersP>
                      Contact: {purchaseInstance.userPhone}
                    </InnerLayersP>
                    <InnerLayersP>{item.fileName.substring(6)}</InnerLayersP>
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
                  <InnerHeaderP>{formattedAddresses[outerIndex]}</InnerHeaderP>
                  <InnerHeader>
                    <StatusDropdown
                      options={statusOptions}
                      selectedOption={item.status}
                      onSelect={(selectedOption) =>
                        handleStatusChange(selectedOption, item.itemId)
                      }
                      isOpen={openDropdownIndex ===item.itemId}
                      onClick={() => toggleDropdown(item.itemId)}
                      isLastItemTrue={itemCountChecker === totalItemToDisplay}
                      itemCount={totalItemToDisplay}
                    />
                  </InnerHeader>
                  <InnerHeaderLeft>
                    SGD {item.price.toFixed(2)}
                    <InnerLayersP>Purchased Date:</InnerLayersP>
                    <InnerLayerP>{purchaseInstance.purchasedAt}</InnerLayerP>
                  </InnerHeaderLeft>
                </InnerHeaderWrapper>
              )})}
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
