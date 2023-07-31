import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useLocation } from "react-router-dom";
import {
  deleteAllRecordsFromDB,
  getAllFilesFromDB,
} from "../../indexedDBUtilis";
import { collection, addDoc } from "firebase/firestore";
import { PurchasedItemsCollection } from "../../firebase";
import { setSuccessPaymentState } from "../../ReduxStore/actions/Authentication";
import { useDispatch, useSelector } from "react-redux";

// const location = useLocation();
// const userUID = new URLSearchParams(location.search).get("user_id");
// const userUIDInLocalStorage = localStorage.getItem("uid");
// const userDetailsUnparsed = localStorage.getItem("userDetails");
// const userDetailsParsed = JSON.parse(userDetailsUnparsed);
// const userDetails = userDetailsParsed.userDetails;
const unparsedStoreditems = localStorage.getItem("TempItemsDetailsStorage");
const userPurchasedItems = JSON.parse(unparsedStoreditems);
const formatDateTime = (dateTime) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateTime).toLocaleDateString(undefined, options);
};

const storeDataInFirestore = async (Purchased3dData, userID) => {
  try {
    // Upload files to Cloud Firestore Storage
    const storage = getStorage();

    // Loop through each file in Purchased3dData and upload it to Storage
    await Promise.all(
      Purchased3dData.map(async (fileData) => {
        const { file, id } = fileData;
        const fileName = fileData.file.name;
        console.log(fileName);
        const storageRef = ref(
          storage,
          `Purchased3DFiles/${userID}&${fileName}`
        );
        await uploadBytes(storageRef, file);
      })
    );

    // Return true to indicate success
    return true;
  } catch (error) {
    // Log and handle the error
    console.error("Error storing data in Firestore:", error);

    // Return false to indicate failure
    return false;
  }
};
// Handle success payment response from Stripe
export const handlePaymentSuccess = async (
  userUID,
  userPurchasedItems,
  userDetailsParsed,
  userDetails
) => {
  // Modify purchasedItems to an array of objects
  const dispatch = useDispatch();
  const successPaymentState = useSelector((state) => state.paymentState.isSuccessPaymentDone);

  let purchasedItems = [];

  if (userPurchasedItems?.length > 0) {
    purchasedItems = userPurchasedItems.map((item) => {
      const { fileName, price, quantity, material, color, dimensions, itemId } =
        item;
      return {
        itemId,
        fileName,
        material,
        color,
        dimensions,
        quantity,
        price,
      };
    });
  } else {
    console.log("userPurchasedItems nothing in there");
    // Handle the situation where userPurchasedItems is not an array, e.g., show an error message
  }

  if (userUID) {
    try {
      // Get all files from IndexedDB
      const files = await getAllFilesFromDB();

      // Send data to Firestore and perform additional functionalities here
      const success = await storeDataInFirestore(files, userUID);

      if (success) {
        // Handle successful storage, e.g., show success message to the user
        // Add user details to Firestore
        if (
          userDetailsParsed.userUID &&
          userDetails &&
          userDetails.userName &&
          userDetails.email &&
          userDetails.postalCode &&
          userDetails.flatNumber &&
          userDetails.phone &&
          purchasedItems.length > 0
        ) {
          // Create the data object to be added to Firestore
          const dataToAdd = {
            userUID: userDetailsParsed.userUID,
            userName: userDetails.userName,
            userEmail: userDetails.email,
            userPostal: userDetails.postalCode,
            userFlatNumber: userDetails.flatNumber,
            userPhone: userDetails.phone,
            purchasedItems,
            purchasedAt: formatDateTime(Date.now()),
          };
          try {
            const documentId = `${userDetailsParsed.userUID}`;
            // Add the data to Firestore
            await addDoc(PurchasedItemsCollection, dataToAdd);
            console.log("data sent to firebase");
            // Rest of your code after successful addition to Firestore
          } catch (error) {
            console.error("Error adding document to Firestore:", error);
            // Handle the error, e.g., show an error message to the user
          }
        } else {
          console.error(
            "Missing required fields. Data not added to Firestore."
          );
          // Handle the case where required fields are missing, e.g., show an error message to the user
        }
        dispatch(setSuccessPaymentState(true));
        deleteAllRecordsFromDB();
        localStorage.removeItem("TempItemsDetailsStorage");
        console.log(successPaymentState);
      } else {
        // Handle failure to store data, e.g., show an error message to the user
        console.log("Error storing data.");
      }
    } catch (error) {
      console.error("Error handling payment success:", error);
    }
    //   setsuccessPaymentState(true);
    // console.error("mock send data success");
  } else {
    // Handle case where userId is missing (e.g., if user directly navigates to /success)
    console.error("Invalid payment response from Stripe.");
  }
};
