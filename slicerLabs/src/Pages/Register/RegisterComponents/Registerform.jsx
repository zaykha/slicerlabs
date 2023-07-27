import React, { useState, useEffect } from "react";
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
  Inputelem,
  InputelemSmall,
  Regflexdiv,
  RegsubHeader,
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
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../ReduxStore/actions/userDetails";
// import {
//   GoogleSignin,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";

const Registerform = () => {
  const navigate = useNavigate();
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
  const dispatch = useDispatch();
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

    if (name === "passwordConfirm") {
      // Validate password confirmation or any other condition
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
  const handleSignUp = async () => {
    if (
      !formValues.userName ||
      !formValues.password ||
      !formValues.passwordConfirm ||
      !formValues.occupation ||
      !formValues.phone ||
      !formValues.email ||
      !formValues.postalCode ||
      !formValues.blkNumber ||
      !formValues.flatNumber
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
        userDetails: {
          userName: formValues.userName,
          occupation: formValues.occupation,
          phone: formValues.phone,
          email: formValues.email,
          postalCode: formValues.postalCode,
          blkNumber: formValues.blkNumber,
          flatNumber: formValues.flatNumber,
        },
        userUID:USERUID
      };

      // Add the userDetails to the "users" collection in Firestore
      await setDoc(doc(usersCollection, user.uid), {
        userDetails,
      });
      // Generate JWT token
      const token = await user.getIdToken();
      
      // Store token in local storage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("uid", USERUID);
      localStorage.setItem("userDetails", formValues);

      // Update user details in Redux
      dispatch(setUserDetails(formValues));
      // Redirect to desired page
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
    // } finally {
    //   setLoading(false);
    // }
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
          />
          {formErrors.userNameError && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formErrors.userNameError}
            </div>
          )}
          <Inputelem
            type="password"
            placeholder="Password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          {formErrors.passwordError && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formErrors.passwordError}
            </div>
          )}
          <Inputelem
            type="password"
            placeholder="Repeat Password"
            name="passwordConfirm"
            value={formValues.passwordConfirm}
            onChange={handleInputChange}
          />
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
          />
          {formErrors.phoneError && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formErrors.phoneError}
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
          <LoginFlexdiv>
            <RememberMe type="checkbox" />
            <RememberMelabel>
              I have read and agree the terms and policies provided by
              Slicerlabs
            </RememberMelabel>
          </LoginFlexdiv>
          <LoginBTN onClick={handleSignUp}>Register</LoginBTN>
        </LoginContainer>
      </LoginFromcontainer>
    </>
  );
};

export default Registerform;
