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
import { auth, db, usersCollection } from "../../../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { get, ref } from "firebase/database";
import googleicon from "../../../../assets/Googlelogo.png";
import whatsappicon from "../../../../assets/whatsapp.png";
import facebookicon from "../../../../assets/facebook.png";
import linkedinicon from "../../../../assets/linkedin.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticationStatus } from "../../../../ReduxStore/actions/Authentication";
import { setUserDetails } from "../../../../ReduxStore/actions/userDetails";
import { doc, getDoc } from "firebase/firestore";
import RotatingLoader from "../../../../globalcomponents/DropDown/RotatingLoader";
import SpinningLoader from "../../../../globalcomponents/DropDown/SpinningLoader";
import PasswordResetPrompt from "./PasswordReset";
import {
  EyeIcon,
  InputContainer,
  Inputelem,
} from "../../../Register/RegisterComponents/Registerformelement";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ErrorPrompt from "../../../../globalcomponents/prompt/ErrorPrompt";

const LoginForm = () => {
  const [email, onChangeEmail] = React.useState("");
  const [emailError, setEmailError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, onChangePassword] = React.useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const [showPasswordResetPrompt, setShowPasswordResetPrompt] = useState(false);
  const [ErrorHandling, setErrorHandling] = useState({
    state: false,
    header: "",
    message: "",
  });
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
            "https://cerulean-hermit-crab-robe.cyclic.cloud/calculate-function",
            {
              method: "GET",
              headers: {
                Authorization: idToken,
              },
            }
          ).catch(error=>{
            setErrorHandling({
              state: true,
              header: "An Error Occured",
              message: "Fetch error:", error,
            });
            // console.log("Fetch error:", error);
            throw error;
          })

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
            dispatch(setUserDetails(docSnap.data().userDetails));
            dispatch(setAuthenticationStatus(true));
            localStorage.setItem("userDetails", JSON.stringify(docSnap.data()));

            console.log("Document data in Login:", docSnap.data().userDetails);
            const AdminCheck = docSnap.data().userDetails.adminPrivileges;
            setIsAdmin(AdminCheck);
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
          cartItems.length > 0
            ? navigate("/cart")
            : isAdmin
            ? navigate("/Dashboard")
            : navigate("/");
          // Return a promise after dispatching user details and authentication status
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
        .then((result) => {
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
          const docSnap = getDoc(userDetailsRef);
          if (docSnap.exists()) {
            dispatch(setUserDetails(docSnap.data().userDetails));
            dispatch(setAuthenticationStatus(true));
            localStorage.setItem("userDetails", JSON.stringify(docSnap.data()));

            console.log("Document data in SSO:", docSnap.data().userDetails);

            // Navigate to the desired page after successful sign-in
            navigate("/cart");
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
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
          <RememberMe type="checkbox" />
          <RememberMelabel>Remember me</RememberMelabel>

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
        <SocialDiv onClick={() => handleSSO("whatsapp")}>
          <SocialIcon src={whatsappicon}></SocialIcon>
          Whatsapp
        </SocialDiv>
        <SocialDiv onClick={() => handleSSO("facebook")}>
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
