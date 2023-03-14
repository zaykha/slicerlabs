import React from 'react'
import { LoginContainer, LoginFromcontainer } from '../../../Login/LoginComponents/LoginForm/LoginFormelements'
import { UPFullline, UPHeaderFullline, UploadBTN } from './Dropfileelements'

const Dropfile = () => {
  return (
    <LoginFromcontainer>
        <LoginContainer>
            <UploadBTN>Single file upload</UploadBTN>
            <UploadBTN>Multi-file upload</UploadBTN>
            <UPFullline>Support files -(STL,OBJ)</UPFullline>
            <UPFullline>Max file size - 60MB</UPFullline>
            <UPFullline>Model measurment - mm</UPFullline>

            <UPHeaderFullline>Or Drop the File Directly.</UPHeaderFullline>
        </LoginContainer>
    </LoginFromcontainer>
  )
}

export default Dropfile