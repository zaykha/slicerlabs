import React from 'react'
import { LoginBTN, LoginContainer, LoginFlexdiv, LoginFromcontainer, LoginHeader, RememberMe, RememberMelabel } from '../../Login/LoginComponents/LoginForm/LoginFormelements'
import { Addressdiv, Inputelem, InputelemSmall, Regflexdiv, RegsubHeader } from './Registerformelement'

const Registerform = () => {
  return (
    <>
    <LoginFromcontainer>
        <LoginContainer>
            <LoginHeader>Register</LoginHeader>

            <RegsubHeader>General Information</RegsubHeader>
                <Inputelem type='text' placeholder='User name'></Inputelem>
                <Inputelem type='password' placeholder='Password'></Inputelem>
                <Inputelem type='password' placeholder='Repeat-Password'></Inputelem>
                <Inputelem type='text' placeholder='Occupation'></Inputelem>


            <RegsubHeader>Contact Information</RegsubHeader>
                <Inputelem type='text' placeholder='Contact Number'></Inputelem>
                <Inputelem type='email' placeholder='Email'></Inputelem>

                <Regflexdiv>
                    <InputelemSmall type='text' placeholder='Postal code'></InputelemSmall>
                    <InputelemSmall type='text' placeholder='BLK Number'></InputelemSmall>
                </Regflexdiv>   
                <Regflexdiv>
                    <InputelemSmall type='text' placeholder='Flat Number'></InputelemSmall>
                    <Addressdiv>Address will be displayed here</Addressdiv>
                </Regflexdiv>

                <LoginFlexdiv>
                    <RememberMe type="checkbox"/>
                    <RememberMelabel>
                        I have read and agree the terms and policies provided by Slicerlabs       
                    </RememberMelabel>
                </LoginFlexdiv>
                <LoginBTN>Register</LoginBTN>
        </LoginContainer>
    </LoginFromcontainer>
        
          
    </>
  )
}

export default Registerform
