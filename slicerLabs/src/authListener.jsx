import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { usersCollection } from './firebase';
import { resetUserDetails, setUserDetails } from './ReduxStore/actions/userDetails';
import usePaymentSuccessHandler from './Pages/Payment/SendDataToFireStore';
import { setAuthenticationStatus } from './ReduxStore/actions/Authentication';
import { resetCartCount } from './ReduxStore/actions/cartCountActions';
import { resetCartState } from './ReduxStore/reducers/CartItemReducer';
import { resetAddressDetails } from './ReduxStore/reducers/MapServicesReducer';

let unsubscribe = null;

export const startAuthListener = () => {
  if (!unsubscribe) {
    const auth = getAuth();
    unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // If the user is logged in, get the ID token
          const idToken = await user.getIdToken();
          // Store the ID token in local storage
          localStorage.setItem("idToken", idToken);

          // Now you can make the fetch request to retrieve the calculatePrice function
          // and store it in local storage.
          try {
            const response = await fetch(
              // "http://localhost:3000/calculate-function",
              "https://cerulean-hermit-crab-robe.cyclic.cloud/calculate-function",
              {
                method: "GET",
                headers: {
                  Authorization: idToken,
                },
              }
            );

            if (!response.ok) {
              // Handle the response error, if any
              console.error("Error fetching calculatePrice function");
              return;
            }

            const data = await response.json();
            // Assuming data contains all three functions: calculatePrice, calculateMassAndPrintTime, and calculatePostProcessingTime
            const { calculatePrice } = data;

            // Serialize the functions to JSON strings
            const calculatePriceString = JSON.stringify(calculatePrice);

            // Store the functions in local storage
            localStorage.setItem(
              "calculatePriceFunction",
              calculatePriceString
            );
            // Continue with your other logic
            const USERUID = user.uid;
            const userDetailsRef = doc(usersCollection, USERUID);
            const docSnap = await getDoc(userDetailsRef);
            if (docSnap.exists()) {
              const userDetailsData = docSnap.data();
              const userDetailsWithUid = {
                ...userDetailsData,
                // userUID: docSnap.id,
              };
              dispatch(setUserDetails(userDetailsData));
              localStorage.setItem(
                "userDetails",
                JSON.stringify(userDetailsWithUid)
              );
              console.log("Document data in APP.jsx:", userDetailsData);
              const userDetails = userDetailsWithUid.userDetails.userDetails;
              const AdminCheck = userDetailsWithUid.userDetails?.adminPrivileges;
                setIsAdmin(AdminCheck)
              if (
                unparsedStoreditems &&
                unparsedStoreditems.length > 0
              ) {
                const { error } = usePaymentSuccessHandler(
                  user.uid,
                  userPurchasedItems,
                  userDetails,
                  dispatch,
                  successPaymentState
                );
                console.log(
                  "localstorage has purchased item and purchase is success"
                );
              } else {
                console.log(
                  "localstorage has no purchased item and no purchase is made"
                );
              }
           } else {
              console.log("No such document!");
            }
            dispatch(setAuthenticationStatus(true));
          
          } catch (error) {
            console.error("Error fetching calculatePrice function:", error);
          }
        }else{
           // User is logged out
        dispatch(setAuthenticationStatus(false));
        dispatch(resetCartCount());
        dispatch(resetCartState());
        dispatch(resetAddressDetails());
        dispatch(resetUserDetails());
        }
        setIsLoading(false); 
      });
  }
};

export const stopAuthListener = () => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
};
