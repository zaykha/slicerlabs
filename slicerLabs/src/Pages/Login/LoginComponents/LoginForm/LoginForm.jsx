import React, { useState, useEffect } from "react";
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
import { auth, db } from "../../../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { get, ref } from "firebase/database";
import googleicon from "../../../../assets/Googlelogo.png";
import whatsappicon from "../../../../assets/whatsapp.png";
import facebookicon from "../../../../assets/facebook.png";
import linkedinicon from "../../../../assets/linkedin.png";
import { Navigate } from 'react-router-dom';
const LoginForm = () => {
  const [email, onChangeEmail] = React.useState("");
  const [emailError, setEmailError] = useState("");

  const [password, onChangePassword] = React.useState("");
  const [passwordError, setPasswordError] = useState("");
  const validateEmail = (inputEmail) => {
    if (!inputEmail) {
      return "Email field is required.";
    }
    if (!inputEmail.match(/^\S+@\S+\.\S+$/)) {
      return "Invalid email address.";
    }
    return "";
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
  const handleLogin = async () => {
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    if (emailValidationError || passwordValidationError) {
      alert(emailValidationError || passwordValidationError);
    } else {
      try {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;

        // Retrieve user type from Firebase Realtime Database
        const snapshot = await get(ref(db, `users/${user.uid}`));
        const userData = snapshot.val();
        Navigate('/cart');
      } catch (error) {
        alert(error.message);
      }
    }
  };
  return (
    <LoginFromcontainer>
      <LoginContainer>
        <LoginHeader>Login</LoginHeader>

        <LoginName
          type="text"
          placeholder="User Name"
          value={email}
          onChange={handleEmailChange}
        ></LoginName>
        {emailError && <div style={{ color: "red" }}>{emailError}</div>}
        <LoginPassword
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        <LoginFlexdiv>
          <RememberMe type="checkbox" />
          <RememberMelabel>Remember me</RememberMelabel>

          <LoginBTN onClick={handleLogin}>Login</LoginBTN>
        </LoginFlexdiv>

        <LoginFlexdiv>
          <LoginLink to="/registerPage">Register Now</LoginLink>
          <LoginLink2>Forget Password?</LoginLink2>
        </LoginFlexdiv>
      </LoginContainer>

      <LoginShortcuts>
        <SocialDiv>
          <SocialIcon src={googleicon}></SocialIcon>
          Google
        </SocialDiv>
        <SocialDiv>
          <SocialIcon src={whatsappicon}></SocialIcon>
          Whatsapp
        </SocialDiv>
        <SocialDiv>
          <SocialIcon src={facebookicon}></SocialIcon>
          Facebook
        </SocialDiv>
        <SocialDiv>
          <SocialIcon src={linkedinicon}></SocialIcon>
          Linkedin
        </SocialDiv>
      </LoginShortcuts>
    </LoginFromcontainer>
  );
};

export default LoginForm;
