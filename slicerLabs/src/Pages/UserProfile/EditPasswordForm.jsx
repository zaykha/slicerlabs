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
  updatePassword,
} from "firebase/auth";
import { MdCheckCircleOutline } from "react-icons/md";
import { NextBtnCancel } from "./UserProfileElement";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NextBtn } from "../Cart/Cartpageelement";
import { usersCollection } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import RotatingLoader from "../../globalcomponents/DropDown/RotatingLoader";

const EditPasswordForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const userDetailsUnparsed = localStorage.getItem("userDetails");
  const userDetails = JSON.parse(userDetailsUnparsed);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    password: "",
    newPassword: "",
    passwordConfirm: "",
  });
  const [formErrors, setFormErrors] = useState({
    passwordError: "",
    newPasswordError: "",
    passwordConfirmError: "",
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

    if (name === "newPassword") {
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
      if (value !== formValues.newPassword) {
        return "Passwords do not match.";
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
  const handleUpdatePassword = async () => {
    setLoadingForUpdatingEmail(true);
    if (
      !formValues.password ||
      !formValues.passwordConfirm ||
      !formValues.newPassword
    ) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: !formValues.password ? "Password is required" : "",
        passwordConfirmError: !formValues.passwordConfirm
          ? "Password confirmation is required"
          : "",
        newPasswordError: !formValues.newPassword
          ? "new Password is required"
          : "",
      }));
      setLoadingForUpdatingEmail(false);
      return;
    }
    const credential = EmailAuthProvider.credential(
      userDetails.email,
      formValues.password
    );
    console.log(credential);
    try {
      await reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
          const user = auth.currentUser;
          updatePassword(user, formValues.newPassword)
            .then(() => {
                console.log("update Password Success")
                setLoadingForUpdatingEmail(false);
                onClose();
            })
            .catch((error) => {
              console.log("error updating Password",error)
              setLoadingForUpdatingEmail(false);
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
  };

  return (
    <PopupContainer>
      <LoginFromcontainer>
        <div>
          <LoginHeader>Change Password</LoginHeader>
          <RegsubHeader>Enter your current Password</RegsubHeader>
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

          <RegsubHeader>Enter New Password</RegsubHeader>
          <InputContainer>
            <Inputelem
              type={newPasswordVisible ? "text" : "password"}
              placeholder="New Password"
              name="newPassword"
              value={formValues.newPassword}
              onChange={handleInputChange}
              borderColor={
                formErrors.newPasswordError
                  ? "red"
                  : formValues.newPassword !== ""
                  ? "green"
                  : null
              }
            />
            <EyeIcon onClick={() => setNewPasswordVisible(!newPasswordVisible)}>
              {newPasswordVisible ? (
                <AiOutlineEyeInvisible size={24} color="white" />
              ) : (
                <AiOutlineEye size={24} color="white" />
              )}
            </EyeIcon>
          </InputContainer>
          {formErrors.newPasswordError && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formErrors.newPasswordError}
            </div>
          )}

          <RegsubHeader>Confirm New Password</RegsubHeader>
          <InputContainer>
            <Inputelem
              type={passwordConfirmVisible ? "text" : "password"}
              placeholder="Password"
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
              onClick={() => setPasswordConfirmVisible(!passwordConfirmVisible)}
            >
              {passwordConfirmVisible ? (
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
        </div>
        {loadingForUpdatingEmail ? (
          <>
            <RotatingLoader />
          </>
        ) : (
          <ButtonContainer>
            <NextBtn onClick={handleUpdatePassword}>UpdatePassword</NextBtn>
            <NextBtnCancel onClick={onClose}>Cancel</NextBtnCancel>
          </ButtonContainer>
        )}
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
export default EditPasswordForm;
