import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useLocation } from "react-router-dom";
import {
  deleteAllRecordsFromDB,
  getAllFilesFromDB,
} from "../../indexedDBUtilis";
import { collection, addDoc } from "firebase/firestore";
import { PurchasedItemsCollection, ServerConfig } from "../../firebase";
import { setSuccessPaymentState } from "../../ReduxStore/actions/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllImages, getAllImages } from "../../indexedDBImageUtilis";

const unparsedStoreditems = localStorage.getItem("TTLprice");
const TTLprice = JSON.parse(unparsedStoreditems);
// Function to convert Blob to Uint8Array
const blobToUint8Array = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      resolve(uint8Array);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
};
const blobToDataURL = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      console.log("Data URL:", dataURL); // Log the data URL
      resolve(dataURL);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
async function blobToImageFile(blob, fileName) {
  // Create a new File object from the Blob
  const imageFile = new File([blob], fileName, { type: blob.type });
  blobToDataURL(blob);
  return imageFile;
}
// Handle success payment response from Stripe
const usePaymentSuccessHandler = async (
  userUID,
  userPurchasedItems,
  userDetails,
  dispatch,
  successPaymentState
) => {
  // Modify purchasedItems to an array of objects
  // const [error, setError] = useState(null);
  const BrevoOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: "SlicerLabs", email: "zaykha@gmail.com" },
      to: [{ email: userDetails.email, name: userDetails.userName }],
      // bcc: [{ email: "helen9766@example.com", name: "Helen" }],
      // cc: [{ email: "ann6533@example.com", name: "Ann" }],
      // htmlContent:
      //   "<!DOCTYPE html> <html> <body> <h1>Confirm you email</h1> <p>Please confirm your email address by clicking on the link below</p> </body> </html>",
      // textContent:
      //   "Please confirm your email address by clicking on the link https://text.domain.com",
      subject: "Purchase Confirmation With SlicerLabs",
      // replyTo: { email: "ann6533@example.com", name: "Ann" },
      // attachment: [
      //   {
      //     url: "https://attachment.domain.com/myAttachmentFromUrl.jpg",
      //     content: "b3JkZXIucGRm",
      //     name: "myAttachment.png",
      //   },
      // ],
      // headers: {
      //   "sender.ip": "1.2.3.4",
      //   "X-Mailin-custom": "some_custom_header",
      //   idempotencyKey: "abc-123",
      // },
      templateId: 1,
      params: { TTLprice: TTLprice },
      // messageVersions: [
      //   {
      //     to: [{ email: "zzaayykkhhaa@gmail.com", name: "Jimmy" }],
      //     params: { FNAME: "Joe", LNAME: "Doe" },
      //     // bcc: [{ email: "helen9766@example.com", name: "Helen" }],
      //     // cc: [{ email: "ann6533@example.com", name: "Ann" }],
      //     // replyTo: { email: "ann6533@example.com", name: "Ann" },
      //     subject: "Login Email confirmation",
      //   },
      // ],
      // tags: ["tag1"],
      // scheduledAt: "2022-04-05T12:30:00+02:00",
      // batchId: "5c6cfa04-eed9-42c2-8b5c-6d470d978e9d",
    }),
  };
  const emailData = {
    to: userDetails.email,
    subject: "Purchase Confirmation With SlicerLabs",
  };
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
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 2);
  const today = new Date();
  const deliveryMinDate = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000); // Minimum delivery date (2 days from now)
  const deliveryMaxDate = new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000); // Maximum delivery date (4 days from now)

  // Format dates as DD-MM-YYYY
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const approxDeliDate = `between ${formatDate(deliveryMinDate)} to ${formatDate(deliveryMaxDate)}`;

  const storeDataInFirestore = async (Purchased3dData, userUID) => {
    try {
      console.log("sending data to firestore");
      // Upload files to Cloud Firestore Storage
      const storage = getStorage();
      console.log(Purchased3dData, userUID);
      // Loop through each file in Purchased3dData and upload it to Storage
      await Promise.all(
        Purchased3dData.map(async (fileData) => {
          const { file, id } = fileData;
          const fileName = fileData.file.name;
          console.log(fileName);
          const storageRef = ref(
            storage,
            `Purchased3DFiles/${userUID}&${fileName}`
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
  // Function to store data in Firestore
  const storeImageInFirestore = async (PurchasedImageData, userUID) => {
    try {
      console.log("purchased image data", PurchasedImageData);
      // Initialize Firestore storage
      const storage = getStorage();
      // Loop through each image data object in PurchasedImageData
      await Promise.all(
        PurchasedImageData.map(async (imageData) => {
          const { id, imagefile } = imageData;
          console.log("image file beforesending", imagefile);
          // // Convert Blob to Uint8Array
          // const uint8Array = await blobToUint8Array(imagefile);
          // Convert Blob to image File
          const file = await blobToImageFile(imagefile, id);
          // Upload Uint8Array to Firestore
          const storageRef = ref(storage, `PurchasedImages/${userUID}/${id}`);
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
  let purchasedItems = [];

  if (userPurchasedItems?.length > 0) {
    purchasedItems = userPurchasedItems.map((item) => {
      const {
        fileName,
        pricePerUnit,
        quantity,
        material,
        color,
        dimensions,
        itemId,
      } = item;
      return {
        itemId,
        fileName,
        material,
        color,
        dimensions,
        quantity,
        pricePerUnit,
        status: "Pre-Printing Procedures",
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
      const imgFiles = await getAllImages();
      console.log("all files retrieved", files);
      console.log("all images retrieved", imgFiles);
      // Send data to Firestore and perform additional functionalities here
      const success = await storeDataInFirestore(files, userUID);
      const imageSuccess = await storeImageInFirestore(imgFiles, userUID);
      if (success && imageSuccess) {
        // Handle successful storage, e.g., show success message to the user
        // Add user details to Firestore
        if (
          userUID &&
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
            userUID: userUID,
            userName: userDetails.userName,
            userEmail: userDetails.email,
            userPostal: userDetails.postalCode,
            userFlatNumber: userDetails.flatNumber,
            userPhone: userDetails.phone,
            purchasedItems,
            purchasedAt: formatDateTime(Date.now()),
            approxDeliDate: approxDeliDate,
          };
          try {
            const documentId = `${userUID}`;
            // Add the data to Firestore
            console.log(PurchasedItemsCollection, dataToAdd);
            await addDoc(PurchasedItemsCollection, dataToAdd);
            console.log("data sent to firebase");

            fetch(`${ServerConfig}/send-email`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(emailData),
            })
              // fetch('https://api.brevo.com/v3/smtp/email', BrevoOptions)
              .then((response) => response.json())
              .then((response) => {
                console.log("Email sent:", response);
                // Rest of your code after successful API call
              })
              .catch((err) => {
                console.error("Error sending email:", err);
                // Handle the error, e.g., show an error message to the user
              });
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
        deleteAllImages();
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

export default usePaymentSuccessHandler;
