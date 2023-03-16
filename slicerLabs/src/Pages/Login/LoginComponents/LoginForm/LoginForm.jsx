import React from 'react'
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
  SocialIcon
} from './LoginFormelements'
import googleicon from '../../../../assets/Googlelogo.png'
import whatsappicon from '../../../../assets/whatsapp.png'
import facebookicon from '../../../../assets/facebook.png'
import linkedinicon from '../../../../assets/linkedin.png'

const LoginForm = () => {
  return (
    <LoginFromcontainer>
        <LoginContainer>
          <LoginHeader>Login</LoginHeader>
          
          <LoginName type='text' placeholder='User Name'></LoginName>
          
          <LoginPassword type='password' placeholder='Password'></LoginPassword>

          <LoginFlexdiv>
          <RememberMe type="checkbox"/>
          <RememberMelabel>Remember me</RememberMelabel>

          <LoginBTN>Login</LoginBTN>
          </LoginFlexdiv>

          <LoginFlexdiv>
            <LoginLink to='/registerPage'>Register Now</LoginLink>
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
  )
}

export default LoginForm