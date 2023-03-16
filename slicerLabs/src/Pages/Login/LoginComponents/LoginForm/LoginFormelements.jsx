import styled from "styled-components";
import usericon from '../../../../assets/login.png'
import lockicon from '../../../../assets/lock.png'
import { Link as LinkR } from "react-router-dom";

export const Welcometext = styled.div`
    font-size:1.8rem;
    width: 100%;
    text-align: center;
    color:white;
    margin: 20px auto;
    font-weight:bold;
`;

export const LoginFromcontainer = styled.div`
    box-sizing: border-box;

    width: 773px;
    padding: 40px;
    margin: 40px auto;
    background: linear-gradient(180deg, rgba(8, 51, 71, 0.63) 0%, rgba(0, 80, 118, 0.63) 100%);
    border: 1px solid rgba(201, 201, 201, 0.41);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(2px);
    /* Note: backdrop-filter has minimal browser support */

    border-radius: 10px;

    @media screen and (max-width: 800px){
        width: 95%;
    }
`;

export const LoginContainer = styled.div`
    width:400px;
    margin: 10px auto;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    
    @media screen and (max-width: 400px){
        width: 100%;
    }
`;
export const LoginHeader = styled.div`
    width:100%;
    color:white;
    text-align:center;
    font-size:1.8rem;
    margin-bottom: 30px;
`;
export const LoginName = styled.input`
    width:100%;
    height:40px;
    background: rgba(87, 87, 87, 0.43);
    border: 1px solid #A5A5A5;
    border-radius: 10px;
    text-align:center;
    outline:none;
    margin: 5px auto 10px auto;
    display:flex;
    align-items:center;
    color:white;
    font-size:1.1rem;
    background-image: url(${usericon});
    background-size: 40px 40px; /* set the size of the image */
    background-repeat: no-repeat;
    background-position: 5px center;
`;
export const Nameicon = styled.img`
    width: 40px;
    height: 40px;
    left: 20px;
`;
export const LoginPassword = styled.input`
    width:100%;
    height:40px;
    background: rgba(87, 87, 87, 0.43);
    border: 1px solid #A5A5A5;
    border-radius: 10px;
    text-align:center;
    outline:none;
    margin: 5px auto 20px auto;
    display:flex;
    align-items:center;
    color:white;
    font-size:1.1rem;
    background-image: url(${lockicon});
    background-size: 40px 32px; /* set the size of the image */
    background-repeat: no-repeat;
    background-position: 5px center;
`;
export const Lockicon = styled.div`
    width: 40px;
    height: 40px;
    left: 20px;
`;
export const LoginFlexdiv = styled.div`
    display:flex;
    width:100%;
    align-items:center;
    margin-bottom: 20px;
    justify-content: space-between;
`;
export const RememberMe = styled.input`
    width: 35px;
    height: 35px;
    background: #D9D9D9;
    border-radius: 5px;
    cursor:pointer;
    &:hover{
        color: #fff;
        background: #006B9E;
        border: 1px solid white; 
    }
`;
export const RememberMelabel = styled.label`
    color:#A7A7A7;
    margin-left: 10px;
   
`;
export const LoginBTN = styled.div`
    box-sizing: border-box;
    text-decoration: none;
    padding: 5px 21px;
    background: #F0F0F0;
    border: 2px solid #006B9E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    width: 170px;
    // height:40px;
    text-align: center;
    border: 1px solid #006B9E;
    transition: all 0.3s ease-in;
    cursor:pointer;
    &:hover{
        color: #fff;
        background: #006B9E;
        border: 1px solid white; 
    }
`;
export const LoginLink = styled(LinkR)`
    color:#48B2E5;
    cursor:pointer;

    &:hover{
        color: #fff;
    }
`;

export const LoginLink2 = styled.div`
    color:#48B2E5;
    cursor:pointer;
    text-align: right;
    &:hover{
        color: #fff;
    }
`;
export const LoginShortcuts = styled.div`
    width:400px;
    margin: 10px auto;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    @media screen and (max-width: 400px){
        width: 100%;
    }
`;
export const SocialDiv = styled.div`
    box-sizing: border-box;
    text-decoration: none;
    padding: 10px auto;
    background: #F0F0F0;
    height:40px;
    border: 1px solid #006B9E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    width: 100%;
    text-align: center;
    border: 1px solid #006B9E;
    transition: all 0.3s ease-in;
    margin: 10px auto;
    display:flex;
    align-items:center;
    cursor:pointer;
    text-align:center;

    &:hover{
        color: #fff;
        background: #006B9E;
        border: 1px solid white; 
    }
`;
export const SocialIcon = styled.img`
    width: 30px;
    height: 30px;
    margin: 0 20px;
`;

