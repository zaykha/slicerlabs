// components/EditLoginDetailForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setUserDetails,
  updateUserEmail,
} from "../../ReduxStore/actions/userDetails";
import styled from "styled-components";
import {
  LoginFromcontainer,
  LoginHeader,
} from "../Login/LoginComponents/LoginForm/LoginFormelements";
import {
  Addressdiv,
  EyeIcon,
  InputContainer,
  Inputelem,
  RegsubHeader,
  ValidateEmailButton,
} from "../Register/RegisterComponents/Registerformelement";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";
import { MdCheckCircleOutline } from "react-icons/md";
import { NextBtnCancel } from "./UserProfileElement";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NextBtn } from "../Cart/Cartpageelement";
import { ServerConfig, usersCollection } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import RotatingLoader from "../../globalcomponents/DropDown/RotatingLoader";

const EditLoginDetailForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const userDetailsUnparsed = localStorage.getItem("userDetails");
  const userDetails = JSON.parse(userDetailsUnparsed);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    userName: userDetails.userName || "",
    password: "",
    phone: userDetails.phone || "",
    email: userDetails.email || "",
    postalCode: userDetails.postalCode || "",
    blkNumber: userDetails.blkNumber || "",
    flatNumber: userDetails.flatNumber || "",
    displayFullAddress: userDetails.displayFullAddress||"",
  });
  const [formErrors, setFormErrors] = useState({
    userNameError: "",
    passwordError: "",
    phoneError: "",
    emailError: "",
    postalCodeError: "",
    blkNumberError: "",
    flatNumberError: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);
  const [loadingForUpdatingEmail, setLoadingForUpdatingEmail] = useState(false);
  const validateInput = (name, value) => {
    if (!value) {
      return `${name} is required.`;
    }

    if (name === "password") {
      // Validate password length or any other condition
      if (value.length < 6) {
        return "Password must be at least 6 characters.";
      }
    }

    if (name === "email") {
      // Validate email format or any other condition
      if (!/\S+@\S+\.\S+/.test(value)) {
        return "Invalid email format.";
      }
    }
    return ""; // If validation passes, return an empty string
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    // Add +65 prefix if the input is empty and user clicks on the field
    if (name === "email") {
      setIsEmailValid(false);
    }

    // console.log(formattedValue);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: formattedValue,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [`${name}Error`]: validateInput(name, value),
    }));
  };

  const handleValidateEmail = async () => {
    const token = "80fbc8ce7e0f482d9f5f36e50cb11389";
    const email = encodeURIComponent(formValues.email);
    try {
      setIsValidatingEmail(true);
      const response = await fetch(
        `${ServerConfig}/validate-email?email=${email}`,
        // `https://cerulean-hermit-crab-robe.cyclic.cloud/validate-email?email=${email}`
      );
      const data = await response.json();
      console.log(data);
      if (data.IsValid) {
        setIsEmailValid(true);
        setIsValidatingEmail(false);
      } else {
        setIsEmailValid(false);
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          emailError: "Invalid email address. Please enter a valid email.",
        }));
        setIsValidatingEmail(false);
      }
    } catch (error) {
      console.error("Error validating email:", error);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Error validating email. Please try again.",
      }));
    }
  };
  const [newPassword, setNewPassword] = useState("");

  const handleEmailUpdateToFireBase = async () => {
    setLoadingForUpdatingEmail(true);
    if (formValues.email !== "" && formValues.email !== userDetails.email) {
      const credential = EmailAuthProvider.credential(
        userDetails.email,
        formValues.password
      );
      // const credential = promptForCredentials();

      // console.log(credential);
      try {
        await reauthenticateWithCredential(auth.currentUser, credential)
          .then(() => {
            updateEmail(auth.currentUser, formValues.email)
              .then((result) => {
                try {
                  const USERUID = userDetails.userUID;
                  const userDetailsRef = doc(usersCollection, USERUID);
                  getDoc(userDetailsRef)
                    .then((docSnap) => {
                      if (docSnap.exists()) {
                        const existingUserDetails = docSnap.data();
                        const updatedUserDetails = { ...existingUserDetails };
                        // Loop through the keys of the existingUserDetails object
                        Object.keys(existingUserDetails).forEach((key) => {
                          // Check if the key is present in the formValues object
                          if (key in formValues) {
                            // Update the corresponding field with the value from formValues
                            updatedUserDetails[key] = formValues[key];
                          } else {
                            // If the key is not present in formValues, use the value from existingUserDetails
                            updatedUserDetails[key] = existingUserDetails[key];
                          }
                        });

                        // Now, add any new keys present in formValues to updatedUserDetails
                        Object.keys(formValues).forEach((key) => {
                          if (!(key in existingUserDetails)) {
                            updatedUserDetails[key] = formValues[key];
                          }
                        });

                        try {
                          const updatedData = {
                            userDetails: updatedUserDetails,
                          };
                          dispatch(setUserDetails(updatedData));
                          setDoc(userDetailsRef, updatedData);
                          // console.log("User information updated in Firestore.");
                          localStorage.setItem(
                            "userDetails",
                            JSON.stringify(updatedData)
                          );
                          console.log("Document data:", formValues);
                          console.log("email Updated", result);
                          setIsEmailUpdated(true);
                          setLoadingForUpdatingEmail(false);
                          onClose();
                        } catch (error) {
                          setLoadingForUpdatingEmail(false);
                          console.error(
                            "Error updating user information in Firestore:",
                            error
                          );
                        }
                        // localStorage.setItem("userDetails", JSON.stringify(updatedUser));
                      } else {
                        setLoadingForUpdatingEmail(false);
                        console.log("No such document!");
                      }
                    })
                    .catch((error) => {
                      setLoadingForUpdatingEmail(false);
                      console.error("Error fetching user details:", error);
                    });
                } catch (error) {
                  setLoadingForUpdatingEmail(false);
                  console.error(
                    "Error fetching calculatePrice function:",
                    error
                  );
                }
              })
              .catch((error) => {
                setLoadingForUpdatingEmail(false);
                console.log("error updating email to firebase", error);
              });
          })
          .catch((error) => {
            if (error.code === "auth/wrong-password") {
              console.log("Incorrect password");
            } else {
              console.log("error with reauth in firebase", error);
            }
            setLoadingForUpdatingEmail(false);
          });
      } catch (error) {
        setLoadingForUpdatingEmail(false);
        console.error("Error updating email:", error);
      }
    }else{
        if (
            !formValues.password ||
            !formValues.email 
          ) {
            setFormErrors((prevErrors) => ({
              ...prevErrors,
              passwordError: !formValues.password ? "Password is required" : "",
              emailError: !formValues.email
                ? "Email is required"
                : "",
            }));
            setLoadingForUpdatingEmail(false);
            return;
          }
    }

  };

  const handlePasswordUpdate = () => {
    // Dispatch the action to update password
    // dispatch(updateUserPassword(newPassword));
    // Clear the input field
    setNewPassword("");
  };

  return (
    <PopupContainer>
      <LoginFromcontainer>
        <div>
          <LoginHeader>Edit Login Details</LoginHeader>
          <RegsubHeader>Enter your New Email</RegsubHeader>
          <InputContainer>
            <Inputelem
              type="email"
              placeholder="Email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              onBlur={handleValidateEmail}
              borderColor={
                formErrors.emailError
                  ? "red"
                  : formValues.email !== "" && isEmailValid
                  ? "green"
                  : null
              }
            />
            <EyeIcon>
              {isEmailUpdated && (
                <MdCheckCircleOutline color="green" size={24} />
              )}
            </EyeIcon>
          </InputContainer>
          {isValidatingEmail ? <Addressdiv>Validating</Addressdiv> : <></>}

          {formErrors.emailError && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formErrors.emailError}
            </div>
          )}
          {/* {formValues.email !== "" &&
          formErrors.emailError == "" &&
          !isEmailValid ? (
            <ValidateEmailButton onClick={handleEmailUpdateToFireBase}>
              UpdateEmail
            </ValidateEmailButton>
          ) : (
            <></>
          )} */}
          <RegsubHeader>Password Required for new login Email</RegsubHeader>
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
        </div>
        {loadingForUpdatingEmail?<><RotatingLoader/></>:<ButtonContainer>
          <NextBtn onClick={handleEmailUpdateToFireBase}>Save</NextBtn>
          <NextBtnCancel onClick={onClose}>Cancel</NextBtnCancel>
        </ButtonContainer>}
      </LoginFromcontainer>
    </PopupContainer>
  );
};
const PopupContainer = styled.div`
  /* Styles for the popup container */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupContent = styled.div`
  /* Styles for the popup content */
  background-color: white;
  width: 80%;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2); /* Shadow effect */
`;

const Form = styled.form`
  /* Styles for the form */
  padding: 40px;
`;

const FormGroup = styled.div`
  /* Styles for the form group */
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  /* Styles for the button container */
  display: flex;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  /* Styles for the cancel button */
  background-color: #ccc;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  /* Styles for the save button */
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
export default EditLoginDetailForm;
