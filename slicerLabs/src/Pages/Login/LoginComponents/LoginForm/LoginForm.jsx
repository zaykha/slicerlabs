import React, { useState, useEffect, useRef } from "react";
import {
  LoginBTN,
  LoginContainer,
  LoginFlexdiv,
  LoginFromcontainer,
  LoginHeader,
  LoginLink,
  LoginLink2,
  LoginName,
  LoginPassword,
  LoginShortcuts,
  RememberMe,
  RememberMelabel,
  SocialDiv,
  SocialIcon,
} from "./LoginFormelements";
import { ServerConfig, auth, db, usersCollection } from "../../../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

import googleicon from "../../../../assets/Googlelogo.png";
import whatsappicon from "../../../../assets/whatsapp.png";
import facebookicon from "../../../../assets/facebook.png";
import linkedinicon from "../../../../assets/linkedin.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticationStatus } from "../../../../ReduxStore/actions/Authentication";
import { setUserDetails } from "../../../../ReduxStore/actions/userDetails";
import { doc, getDoc, setDoc } from "firebase/firestore";
import RotatingLoader from "../../../../globalcomponents/DropDown/RotatingLoader";
import SpinningLoader from "../../../../globalcomponents/DropDown/SpinningLoader";
import PasswordResetPrompt from "./PasswordReset";
import {
  Addressdiv,
  EyeIcon,
  InputContainer,
  Inputelem,
  InputelemSmall,
  Regflexdiv,
  RegsubHeader,
  TermsLink,
} from "../../../Register/RegisterComponents/Registerformelement";
import {
  AiOutlineConsoleSql,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import ErrorPrompt from "../../../../globalcomponents/prompt/ErrorPrompt";
import {
  ContentContainer,
  PromptOverlay,
} from "../../../../globalcomponents/prompt/ConfirmPrompt";
import { fetchAddressDetails } from "../../../../globalcomponents/MapServices/MapServices";

const LoginForm = () => {
  const [email, onChangeEmail] = React.useState("");
  const [emailError, setEmailError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timeoutIdRef = useRef(null);
  const [ssoAddDetails, setSSOAddDetails] = useState(false);
  const [password, onChangePassword] = React.useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [IsLoginComplete, setIsLoginComplete] = useState(false);
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const userDetails = useSelector((state) => state.userDetails);
  const [showPasswordResetPrompt, setShowPasswordResetPrompt] = useState(false);
  const [IsFetchingAddressLoading, setIsFetchingAddressLoading] =
    useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formValues, setFormValues] = useState({
    occupation: "",
    phone: "",
    postalCode: "",
    blkNumber: "",
    flatNumber: "",
    displayFullAddress: "",
  });
  const [formErrors, setFormErrors] = useState({
    occupationError: "",
    phoneError: "",
    postalCodeError: "",
    blkNumberError: "",
    flatNumberError: "",
  });

  const [ErrorHandling, setErrorHandling] = useState({
    state: false,
    header: "",
    message: "",
  });
  useEffect(() => {
    if (formValues.postalCode.length === 6) {
      // console.log(formValues.postalCode);
      if (timeoutIdRef.current) {
        // Clear previous timeout if there was any
        clearTimeout(timeoutIdRef.current);
      }
      // Set a new timeout of 2 seconds to fetch the address
      timeoutIdRef.current = setTimeout(() => {
        fetchAddress(formValues.postalCode);
      }, 2000);
    }
  }, [formValues.postalCode]);

  const validateInput = (name, value) => {
    if (!value) {
      return `${name} is required.`;
    }

    // Additional validation logic for specific fields
    if (name === "userName") {
      // Validate userName length or any other condition
      if (value.length < 3) {
        return "User name must be at least 3 characters.";
      }
    }

    if (name === "password") {
      // Validate password complexity
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasNumbers = /[0-9]/.test(value);
      const hasSpecialChars = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(value);

      if (!hasUppercase) {
        return "Password must include at least one uppercase letter.";
      }

      if (!hasLowercase) {
        return "Password must include at least one lowercase letter.";
      }

      if (!hasNumbers) {
        return "Password must include at least one number.";
      }

      if (!hasSpecialChars) {
        return "Password must include at least one special character.";
      }

      if (value.length < 8) {
        return "Password must be at least 8 characters.";
      }
    }
    if (name === "passwordConfirm") {
      // Check if password confirmation matches the original password
      if (value !== formValues.password) {
        return "Passwords do not match.";
      }
    }

    if (name === "email") {
      // Validate email format or any other condition
      if (!/\S+@\S+\.\S+/.test(value)) {
        return "Invalid email address.";
      }
    }

    if (name === "phone") {
      // const numericValue = value.replace(/\D/g, "");
      // Validate phone number format or any other condition
      const singaporeMobileRegex = /^(\+65\s?)?[89]\d{3}\s?\d{4}$/;

      const isValidPhone = singaporeMobileRegex.test(value);
      // console.log(isValidPhone);
      if (!isValidPhone) {
        // Handle the case when the phone number is not valid
        return "Please enter a valid Singaporean mobile number";
      } else {
        // The phone number is valid, so return null (no error)
        return null;
      }
    }

    if (name === "postalCode") {
      // Validate postal code format or any other condition
      if (value.length !== 6) {
        return "Postal Code must be 6 characters.";
      }
    }
    if (name === "blkNumber") {
      // Validate blkNumber format or any other condition
      const singaporeBlockNumberRegex = /^\d{1,3}[A-Za-z]?$/;
      const isValidBlockNumber = singaporeBlockNumberRegex.test(value);
      if (!isValidBlockNumber) {
        return "Block Number must be in a valid format.";
      }
    }

    if (name === "flatNumber") {
      // Validate flatNumber format or any other condition
      const singaporeFlatNumberRegex = /^\d{1,3}[A-Za-z]?\-\d{1,3}[A-Za-z]?$/;
      const isValidFlatNumber = singaporeFlatNumberRegex.test(value);
      if (!isValidFlatNumber) {
        return `Flat Number must be in a valid format. Examples: "123-456", "123A-456B", "1-2".`;
      }
    }

    return ""; // If validation passes, return an empty string
  };
  const fetchAddress = async (code) => {
    setIsFetchingAddressLoading(true);
    try {
      const result = await dispatch(fetchAddressDetails(code));
      // console.log(result, "code", code);
      // handle the result here (e.g., setAddress(result); setError("");)

      if (result.type === "address/fetchAddressDetails/fulfilled") {
        const { BLK_NO, ROAD_NAME, FLOOR_NO, UNIT_NO, POSTAL } =
          result.payload[0];
        const formattedAddress = `${BLK_NO} ${ROAD_NAME}, ${
          FLOOR_NO && UNIT_NO
            ? `#${FLOOR_NO}-${UNIT_NO}`
            : formValues.flatNumber
        }, Singapore ${POSTAL}`;
        setFormValues((prevValues) => ({
          ...prevValues,
          blkNumber: BLK_NO || "",
          flatNumber:
            FLOOR_NO && UNIT_NO
              ? `#${FLOOR_NO}-${UNIT_NO}`
              : formValues.flatNumber,
          postalCode: POSTAL || "",
          displayFullAddress: formattedAddress,
        }));
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          postalCodeError: "",
        }));

        // console.log(formattedAddress);
      } else {
        // Address not found with the provided postal code
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          postalCodeError: "Address not found with the provided postal code",
        }));
      }
    } catch (error) {
      // handle the error here (e.g., setAddress(""); setError(error.message);)
      console.log("address not fetching");
    }
    setIsFetchingAddressLoading(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    // Add +65 prefix if the input is empty and user clicks on the field
    if (name === "phone" && value === "") {
      formattedValue = "+65 ";
    } else if (name === "phone") {
      // Remove all non-numeric characters from the input
      const numericValue = value.replace(/\D/g, "");

      // Add spaces to the phone number while retaining the "+65" prefix
      const maxLength = 12; // Maximum length for phone number with "+65" prefix and spaces

      if (numericValue.length > 6) {
        const firstPart = numericValue.slice(2, 6);
        const remainingPart = numericValue.slice(6, maxLength);
        formattedValue = `+65 ${firstPart}`;

        if (remainingPart.length > 0) {
          formattedValue += " " + remainingPart;
        }
      }
    } else if (name === "email") {
      formattedValue = value.trim(); // Trim any leading/trailing spaces
    }
    // console.log(formattedValue);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: formattedValue,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [`${name}Error`]: validateInput(name, formattedValue),
    }));
  };

  useEffect(() => {
    // Only run the effect if both userDetails has changed and login is complete
    if (IsLoginComplete && userDetails) {
      // console.log("userDetails after update:", userDetails);

      // Create a Promise and handle navigation after asynchronous operations
      const navigatePromise = new Promise((resolve) => {
        if (cartItems.length > 0) {
          navigate("/cart");
        } else if (isAdmin) {
          console.log("isAdmin is true, navigating to /dashboard");
          navigate("/adminDashboard");
        } else {
          console.log("isAdmin is false, navigating to /");
          navigate("/");
        }

        // Resolve the Promise after navigation
        resolve();
      });

      // Use .then() to run navigation after Promise is resolved
      navigatePromise.then(() => {
        console.log("Navigation completed");
      });
    }
  }, [userDetails, IsLoginComplete, isAdmin]);
  const validateEmail = (inputEmail) => {
    if (!inputEmail) {
      return "Email field is required.";
    }
    if (!inputEmail.match(/^\S+@\S+\.\S+$/)) {
      return "Invalid email address.";
    }
    return "";
  };

  const handleForgotPasswordClick = () => {
    setShowPasswordResetPrompt(true);
  };

  const handleClosePasswordResetPrompt = () => {
    setShowPasswordResetPrompt(false);
  };

  const validatePassword = (inputPassword) => {
    if (!inputPassword) {
      return "Password field is required.";
    }
    if (inputPassword.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return "";
  };

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    onChangeEmail(inputEmail);
    const validationError = validateEmail(inputEmail);
    setEmailError(validationError);
  };
  const handlePasswordChange = (event) => {
    const inputPassword = event.target.value;
    onChangePassword(inputPassword);
    const validationError = validatePassword(inputPassword);
    setPasswordError(validationError);
  };
  const handleProceed = async() => {
    setIsRegistering(true);
    if (!agreedToTerms) {
      // alert("Please agree to the terms and policies.");
      setErrorHandling({
        state: true,
        header: "An Error Occured",
        message: "Please agree to the terms and policies.",
      });
      setIsRegistering(false);
      return;
    }
    if (
      !formValues.occupation ||
      !formValues.phone ||
      !formValues.postalCode ||
      !formValues.blkNumber ||
      !formValues.flatNumber
    ) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        occupationError: !formValues.occupation ? "Occupation is required" : "",
        phoneError: !formValues.phone ? "Phone number is required" : "",
        postalCodeError: !formValues.postalCode
          ? "Postal code is required"
          : "",
        blkNumberError: !formValues.blkNumber ? "Block number is required" : "",
        flatNumberError: !formValues.flatNumber
          ? "Flat number is required"
          : "",
      }));
      setIsRegistering(false);
      return;
    }
    try {
      const userDetailsToUpload = {
        userUID: userDetails.userUID,
        userName: userDetails.userName,
        occupation: formValues.occupation,
        phone: formValues.phone,
        email: userDetails.email,
        postalCode: formValues.postalCode,
        blkNumber: formValues.blkNumber,
        flatNumber: formValues.flatNumber,
        displayFullAddress: formValues.displayFullAddress,
        adminPrivileges: false,
      };
      const auth = getAuth();
      onAuthStateChanged(auth, async(user) => {
        if (user) {
          const USERUID = user.uid;
          const userDetailsRef = doc(usersCollection, USERUID);
          await setDoc(userDetailsRef, { userDetailsToUpload });
          // Generate JWT token
          const token = await user.getIdToken();

          // Store token in local storage
          localStorage.setItem("idToken", token);
          localStorage.setItem("uid", USERUID);
          localStorage.setItem(
            "userDetails",
            JSON.stringify(userDetailsToUpload)
          );
          dispatch(setAuthenticationStatus(true));
          // Update user details in Redux
          dispatch(setUserDetails(userDetailsToUpload));
          // Redirect to desired page
          // Return a promise after dispatching user details and authentication status

          cartItems.length > 0 ? navigate("/cart") : navigate("/");
        } else {
          console.log("error getting user");
        }
      });

    } catch (error) {
      console.log(error.message);
    } finally {
      setIsRegistering(false);
    }
  };
  const handleLogin = async () => {
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    setIsLoggingIn(true);
    try {
      if (emailValidationError || passwordValidationError) {
        setErrorHandling({
          state: true,
          header: "An Error Occured",
          message: emailValidationError || passwordValidationError,
        });
        // alert(emailValidationError || passwordValidationError);
      } else {
        try {
          const userCredentials = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredentials.user;
          const uid = user.uid;
          const idToken = await user.getIdToken();
          localStorage.setItem("idToken", idToken);
          localStorage.setItem("uid", uid);
          const response = await fetch(
            // "http://localhost:3000/calculate-function",
            // "https://cerulean-hermit-crab-robe.cyclic.cloud/calculate-function",
            `${ServerConfig}/calculate-function`,
            {
              method: "GET",
              headers: {
                Authorization: idToken,
              },
            }
          ).catch((error) => {
            setErrorHandling({
              state: true,
              header: "An Error Occured",
              message: "Fetch error:",
              error,
            });
            // console.log("Fetch error:", error);
            throw error;
          });

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
          localStorage.setItem("calculatePriceFunction", calculatePriceString);
          const userDetailsRef = doc(usersCollection, uid);
          const docSnap = await getDoc(userDetailsRef);
          if (docSnap.exists()) {
            try {
              dispatch(setUserDetails(docSnap.data()));
              dispatch(setAuthenticationStatus(true));
              localStorage.setItem(
                "userDetails",
                JSON.stringify(docSnap.data())
              );

              // console.log("Document data in Login:", docSnap.data());
              const AdminCheck = docSnap.data().adminPrivileges;
              setIsAdmin(docSnap.data().userDetailsToUpload.adminPrivileges);
              // console.log(isAdmin, docSnap.data().userDetails?.adminPrivileges )
              setIsLoginComplete(true);
              setIsLoggingIn(false);
              // Create a Promise to handle navigation after asynchronous operations
              // Using useEffect to log userDetails after it's updated
              //  setTimeout(()=>{
              //   // console.log(isAdmin, docSnap.data().userDetails?.adminPrivileges )

              //  },1000)
            } catch (error) {
              // Handle any errors that occurred during the operations
              console.error("Error in Login:", error);
            }
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }

          // // Return a promise after dispatching user details and authentication status
          // const navigationPromise = new Promise((resolve) => {
          //   resolve();
          // });
          // // Use the returned promise to navigate after data is set
          // navigationPromise.then(() => {
          //   cartItems.length > 0 ? navigate("/cart") : navigate("/");
          // });
          setIsLoggingIn(false);
        } catch (error) {
          // alert(error.message);
          setErrorHandling({
            state: true,
            header: "An Error Occured",
            message: error.message,
          });
          setIsLoggingIn(false);
        }
      }
      setIsLoggingIn(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSSO = async (provider) => {
    try {
      let authProvider;
      if (provider === "google") {
        authProvider = new GoogleAuthProvider();
      } else if (provider === "facebook") {
        authProvider = new FacebookAuthProvider();
      }

      await signInWithPopup(auth, authProvider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          // Handle successful sign-in
          const uid = user.uid;

          localStorage.setItem("jwtToken", token);
          localStorage.setItem("uid", uid);

          const userDetailsRef = doc(usersCollection, uid);
          const docSnap = await getDoc(userDetailsRef);
          if (docSnap.exists()) {
            console.log(docSnap.data().userDetailsToUpload);
            dispatch(setUserDetails(docSnap.data()));
            dispatch(setAuthenticationStatus(true));
            localStorage.setItem("userDetails", JSON.stringify(docSnap.data().userDetailsToUpload));

            console.log("Document data in SSO:", docSnap.data());
            setIsAdmin(docSnap.data().userDetailsToUpload.adminPrivileges || false);
            // Navigate to the desired page after successful sign-in
            // cartItems.length > 0
            // ? navigate("/cart")
            // : isAdmin
            // ? navigate("/dashboard")
            // : navigate("/");
            setIsLoginComplete(true);
            setIsLoggingIn(false);
          } else {
            // docSnap.data() will be undefined in this case
            const { uid, displayName, email } = user;
            const userDetailsToUpload = {
              userUID: uid,
              userName: displayName || "", // Use displayName if available, otherwise set to empty string
              email: email || "", // Use email if available, otherwise set to empty string
              // Other fields remain empty
              occupation: "",
              phone: "",
              postalCode: "",
              blkNumber: "",
              flatNumber: "",
            };
            setSSOAddDetails(true);
            // Dispatch an action to update the user details in Redux state
            dispatch(setUserDetails(userDetailsToUpload));
            // setIsLoginComplete(true);
            // setIsLoggingIn(false);
            // navigate("/registerPage");
            // console.log(user.email, user.displayName);
            console.log("No such document!");
          }
        })
        .catch((error) => {
          // // Handle Errors here.
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // // The email of the user's account used.
          // const email = error.customData.email;
          // // The AuthCredential type that was used.
          // const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          console.log(error);
        });
      // Handle successful sign-in (e.g., navigate to dashboard)
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error("SSO Error:", error);
    }
  };
  return (
    <>
      {ssoAddDetails && (
        <PromptOverlay>
          <ContentContainer>
            <LoginHeader>Additional Details for {userDetails.userName}</LoginHeader>
            <RegsubHeader>Contact Information</RegsubHeader>
          
            <Inputelem
              type="text"
              placeholder="Occupation"
              name="occupation"
              value={formValues.occupation}
              onChange={handleInputChange}
              borderColor={
                formErrors.occupation
                  ? "red"
                  : formValues.occupation !== ""
                  ? "green"
                  : null
              }
            />
            {formErrors.occupationError && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {formErrors.occupationError}
              </div>
            )}

            <Inputelem
              type="text"
              placeholder="Contact Number"
              inputMode="numeric"
              name="phone"
              value={formValues.phone}
              onChange={handleInputChange}
              borderColor={
                formErrors.phoneError
                  ? "red"
                  : formValues.phone !== ""
                  ? "green"
                  : null
              }
            />
            {formErrors.phoneError && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {formErrors.phoneError}
              </div>
            )}

            <Regflexdiv>
              <div
                style={{
                  width: "48%",
                }}
              >
                <div style={{ color: " #C4BFBF" }}>Postal code </div>
                <InputelemSmall
                  type="text"
                  placeholder="Postal code"
                  name="postalCode"
                  value={formValues.postalCode}
                  onChange={handleInputChange}
                  borderColor={
                    formErrors.postalCodeError
                      ? "red"
                      : formValues.postalCode !== ""
                      ? "green"
                      : null
                  }
                />
                {formErrors.postalCodeError && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {formErrors.postalCodeError}
                  </div>
                )}
              </div>
              <div
                style={{
                  width: "48%",
                }}
              >
                <div style={{ color: " #C4BFBF" }}>BLK Number </div>
                <InputelemSmall
                  type="text"
                  placeholder="BLK Number"
                  name="blkNumber"
                  value={formValues.blkNumber}
                  onChange={handleInputChange}
                  borderColor={
                    formErrors.blkNumberError
                      ? "red"
                      : formValues.blkNumber !== ""
                      ? "green"
                      : null
                  }
                />
                {formErrors.blkNumberError && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {formErrors.blkNumberError}
                  </div>
                )}
              </div>
            </Regflexdiv>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: " 100%",
                flexWrap: "wrap",
              }}
            ></div>
            <Regflexdiv>
              <div
                style={{
                  width: "48%",
                }}
              >
                <div style={{ color: " #C4BFBF" }}> Flat Number</div>
                <InputelemSmall
                  type="text"
                  placeholder="Flat Number"
                  name="flatNumber"
                  value={formValues.flatNumber}
                  onChange={handleInputChange}
                  borderColor={
                    formErrors.flatNumberError
                      ? "red"
                      : formValues.flatNumber !== ""
                      ? "green"
                      : null
                  }
                />
              </div>
              {formValues.displayFullAddress !== "" ? (
                <Addressdiv>{formValues.displayFullAddress}</Addressdiv>
              ) : IsFetchingAddressLoading ? (
                <SpinningLoader />
              ) : (
                <Addressdiv>Please Type in a valid postal Code</Addressdiv>
              )}
            </Regflexdiv>
            {formErrors.flatNumberError && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {formErrors.flatNumberError}
              </div>
            )}
            <LoginFlexdiv>
              <RememberMe
                type="checkbox"
                id="agreementCheckbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <RememberMelabel htmlFor="agreementCheckbox">
                I have read and agree the{" "}
                <TermsLink href="/terms&policies" target="_blank">
                  terms and policies
                </TermsLink>{" "}
                provided by Slicerlabs
              </RememberMelabel>
            </LoginFlexdiv>
            <LoginFlexdiv>
              {/* <LoginBTN onClick={() => navigate("/Login")}>Back</LoginBTN> */}

              {isRegistering ? (
                <SpinningLoader />
              ) : (
                <LoginBTN onClick={handleProceed}>Proceed</LoginBTN>
              )}
            </LoginFlexdiv>
          </ContentContainer>
          {ErrorHandling.state && (
            <ErrorPrompt
              header={ErrorHandling.header}
              message={ErrorHandling.message}
              onClose={() =>
                setErrorHandling({ ...ErrorHandling, state: false })
              }
            />
          )}
        </PromptOverlay>
      )}
      <LoginFromcontainer>
        {ErrorHandling.state && (
          <ErrorPrompt
            header={ErrorHandling.header}
            message={ErrorHandling.message}
            onClose={() => setErrorHandling({ ...ErrorHandling, state: false })}
          />
        )}
        <LoginContainer>
          <LoginHeader>Login</LoginHeader>

          <Inputelem
            type="text"
            placeholder="Login Email"
            value={email}
            onChange={handleEmailChange}
            borderColor={emailError ? "red" : email !== "" ? "green" : null}
          />
          {emailError && <div style={{ color: "red" }}>{emailError}</div>}
          <InputContainer>
            <Inputelem
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              borderColor={
                passwordError ? "red" : password !== "" ? "green" : null
              }
            />
            <EyeIcon onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? (
                <AiOutlineEyeInvisible size={24} color="white" />
              ) : (
                <AiOutlineEye size={24} color="white" />
              )}
            </EyeIcon>
          </InputContainer>
          {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
          <LoginFlexdiv>
            {/* <RememberMe type="checkbox" /> */}
            <RememberMelabel>
              Single Sign-On Enabled: Sign in once to access all services.
            </RememberMelabel>

            {isLoggingIn ? (
              <SpinningLoader />
            ) : (
              <LoginBTN onClick={handleLogin}>Login</LoginBTN>
            )}
          </LoginFlexdiv>

          <LoginFlexdiv>
            <LoginLink to="/registerPage">Register Now</LoginLink>
            <LoginLink2 onClick={handleForgotPasswordClick}>
              Forget Password?
            </LoginLink2>
          </LoginFlexdiv>
        </LoginContainer>
        {showPasswordResetPrompt && (
          <PasswordResetPrompt onClose={handleClosePasswordResetPrompt} />
        )}
        <LoginShortcuts>
          <SocialDiv onClick={() => handleSSO("google")}>
            <SocialIcon src={googleicon}></SocialIcon>
            Google
          </SocialDiv>
          {/* <SocialDiv onClick={() => handleSSO("whatsapp")}>
          <SocialIcon src={whatsappicon}></SocialIcon>
          Whatsapp
        </SocialDiv> */}
          <SocialDiv onClick={() => handleSSO("facebook")}>
            <SocialIcon src={facebookicon}></SocialIcon>
            Facebook
          </SocialDiv>
          {/* <SocialDiv>
          <SocialIcon src={linkedinicon}></SocialIcon>
          Linkedin
        </SocialDiv> */}
        </LoginShortcuts>
      </LoginFromcontainer>
    </>
  );
};

export default LoginForm;
