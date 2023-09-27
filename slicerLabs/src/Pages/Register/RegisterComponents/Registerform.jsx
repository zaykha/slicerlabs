import React, { useState, useEffect, useRef } from "react";
import {
  LoginBTN,
  LoginContainer,
  LoginFlexdiv,
  LoginFromcontainer,
  LoginHeader,
  RememberMe,
  RememberMelabel,
} from "../../Login/LoginComponents/LoginForm/LoginFormelements";
import {
  Addressdiv,
  EyeIcon,
  InputContainer,
  Inputelem,
  InputelemSmall,
  Regflexdiv,
  RegsubHeader,
  TermsLink,
  ValidateEmailButton,
} from "./Registerformelement";
import { auth, db, usersCollection } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../../ReduxStore/actions/userDetails";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdCheckCircleOutline } from "react-icons/md";
import { fetchAddressDetails } from "../../../globalcomponents/MapServices/MapServices";
import { setAuthenticationStatus } from "../../../ReduxStore/actions/Authentication";
import ErrorPrompt from "../../../globalcomponents/prompt/ErrorPrompt";
import SpinningLoader from "../../../globalcomponents/DropDown/SpinningLoader";
// import {
//   GoogleSignin,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";

const Registerform = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timeoutIdRef = useRef(null);
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isEmailValidating, setIsEmailValidating] = useState(false);
  const [IsFetchingAddressLoading, setIsFetchingAddressLoading] =
    useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordRepeatVisible, setPasswordRepeatVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [formValues, setFormValues] = useState({
    userName: "",
    password: "",
    passwordConfirm: "",
    occupation: "",
    phone: "",
    email: "",
    postalCode: "",
    blkNumber: "",
    flatNumber: "",
    displayFullAddress: "",
  });
  const [formErrors, setFormErrors] = useState({
    userNameError: "",
    passwordError: "",
    passwordConfirmError: "",
    occupationError: "",
    phoneError: "",
    emailError: "",
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
      console.log(isValidPhone);
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
    console.log(formattedValue);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: formattedValue,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [`${name}Error`]: validateInput(name, formattedValue),
    }));
  };
  const handleValidateEmail = async () => {
    setIsEmailValidating(true);
    const token = "80fbc8ce7e0f482d9f5f36e50cb11389";
    const email = encodeURIComponent(formValues.email);
    try {
      const response = await fetch(
        `http://localhost:3000/validate-email?email=${email}`
        // `https://cerulean-hermit-crab-robe.cyclic.cloud/validate-email?email=${email}`,
      );
      const data = await response.json();
      console.log(data);
      if (data.IsValid) {
        setIsEmailValid(true);
      } else {
        setIsEmailValid(false);
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          emailError: "Invalid email address. Please enter a valid email.",
        }));
      }
    } catch (error) {
      console.error("Error validating email:", error);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Error validating email. Please try again.",
      }));
    }
    setIsEmailValidating(false);
  };
  const handleSignUp = async () => {
    setIsRegistering(true);
    if (!agreedToTerms) {
      // alert("Please agree to the terms and policies.");
      setErrorHandling({
        state: true,
        header: "An Error Occured",
        message: "Please agree to the terms and policies.",
      });
      return;
    }
    if (
      !formValues.userName ||
      !formValues.password ||
      !formValues.passwordConfirm ||
      !formValues.occupation ||
      !formValues.phone ||
      !formValues.email ||
      !formValues.postalCode ||
      !formValues.blkNumber ||
      !formValues.flatNumber ||
      !isEmailValid
    ) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        userNameError: !formValues.userName ? "User name is required" : "",
        passwordError: !formValues.password ? "Password is required" : "",
        passwordConfirmError: !formValues.passwordConfirm
          ? "Password confirmation is required"
          : "",
        occupationError: !formValues.occupation ? "Occupation is required" : "",
        phoneError: !formValues.phone ? "Phone number is required" : "",
        emailError: !formValues.email
          ? "Email is required"
          : !isEmailValid
          ? "Please validate your email before registering."
          : "",
        postalCodeError: !formValues.postalCode
          ? "Postal code is required"
          : "",
        blkNumberError: !formValues.blkNumber ? "Block number is required" : "",
        flatNumberError: !formValues.flatNumber
          ? "Flat number is required"
          : "",
      }));
      return;
    }

    try {
      //   setLoading(true);
      // Sign up with email and password
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );

      const user = userCredentials.user;
      const USERUID = user.uid;
      // Store additional user information to Firestore
      const userDetails = {
        userUID: USERUID,
        userName: formValues.userName,
        occupation: formValues.occupation,
        phone: formValues.phone,
        email: formValues.email,
        postalCode: formValues.postalCode,
        blkNumber: formValues.blkNumber,
        flatNumber: formValues.flatNumber,
      };

      // Add the userDetails to the "users" collection in Firestore
      await setDoc(doc(usersCollection, user.uid), {
        userDetails,
      });
      // Generate JWT token
      const token = await user.getIdToken();

      // Store token in local storage
      localStorage.setItem("idToken", token);
      localStorage.setItem("uid", USERUID);
      localStorage.setItem("userDetails", JSON.stringify(formValues));
      dispatch(setAuthenticationStatus(true));
      // Update user details in Redux
      dispatch(setUserDetails(formValues));
      // Redirect to desired page
      // Return a promise after dispatching user details and authentication status
      const navigationPromise = new Promise((resolve) => {
        resolve();
      });
      // Use the returned promise to navigate after data is set
      // navigationPromise.then(() => {
      //   cartItems.length > 0 ? navigate("/cart") : navigate("/");
      // });
      cartItems.length > 0 ? navigate("/cart") : navigate("/");
    } catch (error) {
      console.log(error.message);
    }
    // } finally {
    //   setLoading(false);
    // }
    setIsRegistering(false);
  };

  return (
    <>
      <LoginFromcontainer>
        <LoginContainer>
          <LoginHeader>Register</LoginHeader>

          <RegsubHeader>General Information</RegsubHeader>

          <Inputelem
            type="text"
            placeholder="User name"
            name="userName"
            value={formValues.userName}
            onChange={handleInputChange}
            borderColor={
              formErrors.userNameError
                ? "red"
                : formValues.userName !== ""
                ? "green"
                : null
            }
          />
          {formErrors.userNameError && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formErrors.userNameError}
            </div>
          )}
          <InputContainer>
            <Inputelem
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              borderColor={
                formErrors.passwordError
                  ? "red"
                  : formValues.password !== ""
                  ? "green"
                  : null
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
          {formErrors.passwordError && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formErrors.passwordError}
            </div>
          )}
          <InputContainer>
            <Inputelem
              type={passwordRepeatVisible ? "text" : "password"}
              placeholder="Repeat Password"
              name="passwordConfirm"
              value={formValues.passwordConfirm}
              onChange={handleInputChange}
              borderColor={
                formErrors.passwordConfirmError
                  ? "red"
                  : formValues.passwordConfirm !== ""
                  ? "green"
                  : null
              }
            />
            <EyeIcon
              onClick={() => setPasswordRepeatVisible(!passwordRepeatVisible)}
            >
              {passwordRepeatVisible ? (
                <AiOutlineEyeInvisible size={24} color="white" />
              ) : (
                <AiOutlineEye size={24} color="white" />
              )}
            </EyeIcon>
          </InputContainer>

          {formErrors.passwordConfirmError && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formErrors.passwordConfirmError}
            </div>
          )}
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
          <RegsubHeader>Contact Information</RegsubHeader>
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
          <InputContainer>
            <Inputelem
              type="email"
              placeholder="Email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              readOnly={isEmailValid}
              borderColor={
                formErrors.emailError
                  ? "red"
                  : formValues.email !== ""
                  ? "green"
                  : null
              }
            />
            <EyeIcon>
              {isEmailValid && <MdCheckCircleOutline color="green" size={24} />}
            </EyeIcon>
          </InputContainer>

          {formValues.email !== "" &&
          formErrors.emailError === "" &&
          !isEmailValid ? (
            isEmailValidating ? (
              <SpinningLoader />
            ) : (
              <ValidateEmailButton onClick={handleValidateEmail}>
                Validate Email
              </ValidateEmailButton>
            )
          ) : (
            <></>
          )}

          {formErrors.emailError && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formErrors.emailError}
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
            <LoginBTN onClick={() => navigate("/Login")}>Back</LoginBTN>

            {isRegistering ? (
              <SpinningLoader />
            ) : (
              <LoginBTN onClick={handleSignUp}>Register</LoginBTN>
            )}
          </LoginFlexdiv>
        </LoginContainer>
      </LoginFromcontainer>

      {ErrorHandling.state && (
        <ErrorPrompt
          header={ErrorHandling.header}
          message={ErrorHandling.message}
          onClose={() => setErrorHandling({ ...ErrorHandling, state: false })}
        />
      )}
    </>
  );
};

export default Registerform;
