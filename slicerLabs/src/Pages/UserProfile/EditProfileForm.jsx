import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  LoginContainer,
  LoginFromcontainer,
  LoginHeader,
} from "../Login/LoginComponents/LoginForm/LoginFormelements";
import {
  Addressdiv,
  Inputelem,
  InputelemSmall,
  Regflexdiv,
  RegsubHeader,
  ValidateEmailButton,
} from "../Register/RegisterComponents/Registerformelement";
import { NextBtn } from "../Cart/Cartpageelement";
import { NextBtnCancel } from "./UserProfileElement";
import {
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../ReduxStore/actions/userDetails";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { usersCollection } from "../../firebase";
import { fetchAddressDetails } from "../../globalcomponents/MapServices/MapServices";
import RotatingLoader from "../../globalcomponents/DropDown/RotatingLoader";

const EditProfileForm = ({ user, onClose, onSave }) => {
  const dispatch = useDispatch();
 
  const userDetailsUnparsed = localStorage.getItem("userDetails");
  const userDetails = JSON.parse(userDetailsUnparsed).userDetails;
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const [fetchingAddress, setFetchingAddress] = useState(false);
  const auth = getAuth();
  const [formValues, setFormValues] = useState({
    userName: userDetails.userName || "",
    phone: userDetails.phone || "",
    email: userDetails.email || "",
    postalCode: userDetails.postalCode || "",
    blkNumber: userDetails.blkNumber || "",
    flatNumber: userDetails.flatNumber || "",
    displayFullAddress: "",
  });
  const timeoutIdRef = useRef(null);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({
    userNameError: "",
    passwordError: "",
    phoneError: "",
    emailError: "",
    postalCodeError: "",
    blkNumberError: "",
    flatNumberError: "",
  });

  useEffect(() => {
    setFormValues({
      userName: userDetails.userName || "",
      phone: userDetails.phone || "",
      email: userDetails.email || "",
      postalCode: userDetails.postalCode || "",
      blkNumber: userDetails.blkNumber || "",
      flatNumber: userDetails.flatNumber || "",
    });
  }, [dispatch]);

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
            : userDetails.flatNumber
        }, Singapore ${POSTAL}`;
        setFormValues((prevValues) => ({
          ...prevValues,
          blkNumber: BLK_NO || "",
          flatNumber:
            FLOOR_NO && UNIT_NO
              ? `#${FLOOR_NO}-${UNIT_NO}`
              : userDetails.flatNumber,
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
      setIsEmailValid(false);
    }

    console.log(formattedValue);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: formattedValue,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [`${name}Error`]: validateInput(name, value),
    }));
  };

  useEffect(() => {
    if (formValues.postalCode.length === 6) {
      setFetchingAddress(true);
      console.log(formValues.postalCode);
      if (timeoutIdRef.current) {
        // Clear previous timeout if there was any
        clearTimeout(timeoutIdRef.current);
      }
      // Set a new timeout of 2 seconds to fetch the address
      timeoutIdRef.current = setTimeout(() => {
        fetchAddress(formValues.postalCode);
        setFetchingAddress(false);
      }, 2000);
    }
  }, [formValues.postalCode]);

  const handleSave = async () => {
    if (
      !formValues.userName ||
      //   !newPassword ||
      !formValues.phone ||
      // !formValues.email ||
      !formValues.postalCode ||
      !formValues.blkNumber ||
      !formValues.flatNumber
    ) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        userNameError: !formValues.userName ? "User name is required" : "",
        // passwordError: !newPassword ? "Password is required" : "",
        phoneError: !formValues.phone ? "Phone number is required" : "",
        emailError: !formValues.email ? "Email is required" : "",
        postalCodeError: !formValues.postalCode
          ? "Postal code is required"
          : "",
        blkNumberError: !formValues.blkNumber ? "Block number is required" : "",
        flatNumberError: !formValues.flatNumber
          ? "Flat number is required"
          : "",
      }));
      console.log("error");
      return;
    } else {
      try {
        
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
                  const updatedData = { userDetails: updatedUserDetails };
                  dispatch(setUserDetails(updatedData));
                  setDoc(userDetailsRef, updatedData);
                  // console.log("User information updated in Firestore.");
                  localStorage.setItem(
                    "userDetails",
                    JSON.stringify(updatedData)
                  );
                } catch (error) {
                  console.error(
                    "Error updating user information in Firestore:",
                    error
                  );
                }
                // localStorage.setItem("userDetails", JSON.stringify(updatedUser));
                console.log("Document data:", formValues);

                onClose();
              } else {
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.error("Error fetching user details:", error);
            });
        } catch (error) {
          console.error("Error fetching calculatePrice function:", error);
        }
        onSave(formValues);
      } catch {
        console.error("Error handling payment success:", error);
        // Handle any errors that occur during the update process
        // You can set an error state and display it to the user if needed
        setError("An error occurred while updating user information.");
      }
    }
  };

 
  return (
    <PopupContainer>
      <LoginFromcontainer>
        <LoginHeader>Edit Profile</LoginHeader>
        <Form>
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
         
          {/* <Inputelem
            type="password"
            placeholder="Password"
            name="password"
            value={newPassword}
            onChange={handleInputChange}
          />
          {formErrors.passwordError && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formErrors.passwordError}
            </div>
          )} */}
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
            {formValues.displayFullAddress !== "" && !fetchingAddress ? (
              <Addressdiv>{formValues.displayFullAddress}</Addressdiv>
            ) : fetchingAddress ? (
              <RotatingLoader/>
            ) : (
              <Addressdiv>Please Type in a valid postal Code</Addressdiv>
            )}
          </Regflexdiv>
          {formErrors.flatNumberError && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formErrors.flatNumberError}
            </div>
          )}
          <div style={{ color: " #C4BFBF" }}>Contact Number</div>
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
          <ButtonContainer>
            <NextBtn onClick={handleSave}>Save</NextBtn>
            <NextBtnCancel onClick={onClose}>Cancel</NextBtnCancel>
          </ButtonContainer>
        </Form>
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

export default EditProfileForm;
