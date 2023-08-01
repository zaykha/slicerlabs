import React, { useState } from "react";
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
} from "../Register/RegisterComponents/Registerformelement";
import { NextBtn } from "../Cart/Cartpageelement";
import { NextBtnCancel } from "./UserProfileElement";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";

const EditProfileForm = ({ user, onClose, onSave }) => {
  const [formValues, setFormValues] = useState({
    userName: user.userName,
    phone: user.phone,
    email: user.email,
    postalCode: user.postalCode,
    blkNumber: user.blkNumber,
    flatNumber: user.flatNumber,
  });
  const auth = getAuth();
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
        return "Invalid email address.";
      }
    }

    if (name === "phone") {
      // Validate phone number format or any other condition
      // ...
    }

    if (name === "postalCode") {
      // Validate postal code format or any other condition
      if (value.length !== 6) {
        return "Postal Code must be 6 characters.";
      }
    }

    if (name === "blkNumber") {
      // Validate blkNumber format or any other condition
      if (value.length < 3) {
        return "Block Number must at least be 3 characters.";
      }
    }

    if (name === "flatNumber") {
      // Validate flatNumber format or any other condition
      if (value.length < 2) {
        return "Flat Number must be at least 2 characters.";
      }
    }

    return ""; // If validation passes, return an empty string
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [`${name}Error`]: validateInput(name, value),
    }));
  };

  const handleSave = async () => {
    console.log("formvalue",formValues)
    if (
      !formValues.userName ||
    //   !newPassword ||
      !formValues.phone ||
      !formValues.email ||
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
      return;
    }
    if (formValues.email !== "") {
      try {
        await updateEmail(auth, formValues.email);
        setError(null); // Clear any previous errors
        setNewEmail(""); // Clear the input field
        // Show a success message to the user if needed
      } catch (error) {
        setError("Failed to update email: " + error.message);
        return;
      }
    }

    if (newPassword !== "") {
      try {
        await updatePassword(auth, newPassword);
        setError(null); // Clear any previous errors
        setNewPassword(""); // Clear the input field
        // Show a success message to the user if needed
      } catch (error) {
        setError("Failed to update password: " + error.message);
        return;
      }
    }

    // Save the updated user information
    const updatedUser = {
      ...user,
      userName: formValues.userName,
      email: formValues.email,
      phone: formValues.phone,
      flatNumber: formValues.flatNumber,
      postalCode: formValues.postalCode,
      blkNumber: formValues.blkNumber,
    };
    console.log(updatedUser)
    onSave(updatedUser);
    onClose();
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
          />
          {formErrors.userNameError && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formErrors.userNameError}
            </div>
          )}
          <Inputelem
            type="email"
            placeholder="Email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
          {formErrors.emailError && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formErrors.emailError}
            </div>
          )}
          <Inputelem
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
              />
            </div>
            <Addressdiv>Address will be displayed here</Addressdiv>
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
