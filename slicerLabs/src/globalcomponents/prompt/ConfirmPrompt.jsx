import React from 'react';
import styled from 'styled-components';
import { UPHeaderFullline1 } from '../../Pages/UserProfile/UserProfileElement';
import { LoginFromcontainer } from '../../Pages/Login/LoginComponents/LoginForm/LoginFormelements';

const PromptOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ContentContainer = styled.div`
  box-sizing: border-box;
  width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  background-color: lightblue;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 10px;
`;

const CancelButton = styled.button`
  background-color: lightgray;
  border: none;
  color: black;
  padding: 5px 10px;
  cursor: pointer;
`;
const Button = styled.button`
  background-color: lightblue;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
`;
const AddButton = styled(Button)`
  background-color: #388fc9;
  width: 80%;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px auto;
  &:hover {
    background-color: #2c73a3;
  }
`;
const ConfigSubHeader = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.1rem;
  margin: 20px auto;
  color: white;
`;
const AddButtonDelete = styled(Button)`
  background-color: #e83e00;
  width: 200px;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px 20px;
  &:hover {
    background-color: #a82e02;
  }
`;
const ConfirmationPrompt = ({ header, message, onConfirm, onCancel }) => {
    // console.log(header, message);
  return (
    <PromptOverlay>
      <LoginFromcontainer>
      <UPHeaderFullline1>{header}</UPHeaderFullline1>
        <ConfigSubHeader>{message}</ConfigSubHeader>
        <ButtonContainer>
          <AddButton onClick={onConfirm}>Confirm</AddButton>
          <AddButtonDelete onClick={onCancel}>Cancel</AddButtonDelete>
        </ButtonContainer>
      </LoginFromcontainer>
    </PromptOverlay>
  );
};

export default ConfirmationPrompt;
