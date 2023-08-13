import React from 'react';
import styled from 'styled-components';
import { LoginFromcontainer } from '../../Pages/Login/LoginComponents/LoginForm/LoginFormelements';
import { ItemHeaderprofile, UPHeaderFullline1 } from '../../Pages/UserProfile/UserProfileElement';

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

    width: 773px;
    padding: 40px;
    margin: 40px auto;
    background: linear-gradient(180deg, rgba(8, 51, 71, 0.83) 0%, rgba(0, 80, 118, 0.63) 100%);
    border: 1px solid rgb(255, 0, 0, 0.9);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(2px);
    /* Note: backdrop-filter has minimal browser support */
    display:flex;
    flex-direction:column;
    justify-content:center;
    border-radius: 10px;

    @media screen and (max-width: 800px){
        width: 95%;
    }
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
const ErrorPrompt = ({ header, message, onClose }) => {
  return (
    <PromptOverlay onClick={onClose}>
      <ContentContainer onClick={(e) => e.stopPropagation()}>
        <UPHeaderFullline1>{header}</UPHeaderFullline1>
        <ConfigSubHeader>{message}</ConfigSubHeader>
        
        <AddButton onClick={onClose}>Close</AddButton>
      </ContentContainer>
    </PromptOverlay>
  );
};

export default ErrorPrompt;
