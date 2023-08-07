import React, { useState } from "react";
import styled from "styled-components";
import { getAuth,fetchSignInMethodsForEmail, sendPasswordResetEmail } from "firebase/auth"; // Import your Firebase authentication method
import { LoginFromcontainer, RememberMelabel } from "./LoginFormelements";
import {  Inputelem, ValidateEmailButton } from "../../../Register/RegisterComponents/Registerformelement";

const PromptContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PromptBlurBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
`;

const PromptContent = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const PromptTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color:white;
`;

const PromptForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid lightblue;
  border-radius: 5px;
  outline: none;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: lightblue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;
const CloseButton = styled.button`
  position: absolute;
  width:40px;
  top: 20px;
  left: 92%;
  padding: 5px;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  &:hover {
    color: #2c73a3;
  }
`;

const PasswordResetPrompt = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const auth = getAuth();
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
  
      if (signInMethods.length === 0) {
        // Email is not registered with Firebase Auth
        setEmailError("Email is not registered. Please enter a valid registered email.")
        return;
      }
  
      // Email is registered, send the password reset email
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          setIsEmailSent(true);
        })
        .catch((error) => {
          // Handle error if needed
          console.error("Error sending password reset email:", error);
        });
    } catch (error) {
      console.error("Error checking email existence:", error);
    }
  };
  const validateEmail = (inputEmail) => {
    if (!inputEmail) {
      return "Email field is required.";
    }
    if (!inputEmail.match(/^\S+@\S+\.\S+$/)) {
      return "Invalid email address.";
    }
    return "";
  };
  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    const validationError = validateEmail(inputEmail);
    setEmailError(validationError);
  };
  return (
    <PromptContainer>
     
      <PromptBlurBackground onClick={onClose} />
      <LoginFromcontainer>
      <CloseButton onClick={onClose}>×</CloseButton>
        <PromptTitle>Forgot Password</PromptTitle>
        {isEmailSent ? (
          <RememberMelabel>An email with instructions to reset your password has been sent.</RememberMelabel>
        ) : (
          <PromptForm onSubmit={handleSubmit}>
            <Inputelem
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
              borderColor={
                emailError
                  ? "red"
                  : email !== ""
                  ? "green"
                  : null
              }
            />
             {emailError && <div style={{ color: "red" }}>{emailError}</div>}
            <ValidateEmailButton type="submit">Reset Password</ValidateEmailButton>
            
          </PromptForm>
        )}
      </LoginFromcontainer>
    </PromptContainer>
  );
};

export default PasswordResetPrompt;
