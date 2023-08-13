import React from 'react';
import styled from 'styled-components';
import { UPHeaderFullline1 } from '../../Pages/UserProfile/UserProfileElement';

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

const ConfirmationPrompt = ({ header, message, onConfirm, onCancel }) => {
    console.log(header, message);
  return (
    <PromptOverlay>
      <ContentContainer>
      <UPHeaderFullline1>{header}</UPHeaderFullline1>
        <Message>{message}</Message>
        <ButtonContainer>
          <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </ButtonContainer>
      </ContentContainer>
    </PromptOverlay>
  );
};

export default ConfirmationPrompt;
