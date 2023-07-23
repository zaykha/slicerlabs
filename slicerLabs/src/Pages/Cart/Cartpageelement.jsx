import styled, { keyframes,css } from "styled-components";
import { Link as LinkR } from "react-router-dom";
const Pulse = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.7;
    background:white;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.7;
    background:#48b2e5;
  }
`;

export const Itemdiv = styled.div`
    width: 800px;
    margin: 10px auto;
    color:white;
    text-align: center;
    background: linear-gradient(180deg, #083347 0%, #005076 100%);
    border-bottom: 1px solid #386379;
    border-radius: 10px;
    padding: 10px;

    @media screen and (max-width:800px){
        width: 90%;
    }
    
`;

export const Step1Container = styled.div`
    width: 1000px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width:1000px){
      width: 90%;
  }
`
export const ItemHeader = styled.div`
    width:100%;
    text-align: center;
    font-size: 1.4rem;
    margin: 10px auto;
`;
export const ItemStats = styled.div`
    width:100%;
    text-align: center;
    margin: 3px auto;
`;
export const ItemBtn = styled.button`
    box-sizing: border-box;
    text-decoration: none;
    padding: 10px 21px;
    background: #F0F0F0;
    border: 2px solid #006B9E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    width: 170px;
    margin: 12px auto;
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

export const NextBtn = styled.button`
    box-sizing: border-box;
    text-decoration: none;
    padding: 10px 21px;
    background: #F0F0F0;
    border: 2px solid #006B9E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    width: 170px;
    margin: 12px auto;
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

export const NoitemCart = styled.div`
    width: 100%;
    height: 60vh;
    display:flex;
    align-items:center;
`;
export const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  margin: 20px auto;

  @media screen and (max-width:1200px){
    width: 100%;
  }
`;

export const ProgressBarStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const ProgressBarBall = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#083347' : '#d0d0d0')};
  ${(props) => props.active && css`animation: ${Pulse} 2s linear infinite`};
  margin-bottom: 5px;
`;

export const ProgressBarText = styled.span`
  font-size: ${props => props.active ? '1.2rem' : '14px'};
  text-align: center;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? '#48b2e5' : 'gray'};
`;

export const PaymentroutingContainer = styled.div`
  width: 80%;
  margin: 40px auto;
  padding: 40px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  background: #F4F4F4;
  border-radius: 10px;
`;
export const PaymentImg = styled.img`
  width: 300px;
  margin: 10px auto 20px auto;
`;
export const PaymentRinner = styled.div`
  width: 90%;
  margin: 10px auto;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
`;
export const PRHead = styled.div`
  width: 100%;
  font-size: 1.4rem;
  text-align: left;
  font-weight: bold;
  margin: 0 auto 10px;
`;
export const PRsub = styled.div`
  width: 100%;
  border-top: 1px solid #979797;
  display:flex;
  justify-content: space-between;
  margin: 0 auto 40px;
  padding-top: 10px;
`;
export const PRp = styled.p`
  width: auto;
`;
export const PaymentOptionLabel= styled.label`
  width: 100%;
  font-size: 1.1rem;
  text-align: left;
  font-weight: bold;
  margin: 20px 0 10px;
`;

export const Shippingoption = styled.select`
    width: 100%;
    background: rgba(87, 87, 87, 0.43);
    border: 1px solid #D5D5D5;
    border-radius: 10px;
    color:white;
    margin:0px auto 15px;
    padding: 8px;
    text-align: center;
    height: 40px;
    font-size: 1.1rem;
`;
export const Soption = styled.option`
    font-size:1.1rem;
    background-color:rgba(255,255,255,0.2);
    color:black;
    border-radius: 10px;
    
    &:hover{
        color:blue;
    }
`;

export const PromoInput = styled.input`
  width: 100%;
  background: rgba(87, 87, 87, 0.43);
  border: 1px solid #D5D5D5;
  border-radius: 10px;
  color:white;
  margin:0px auto 15px;
  padding: 8px;
  text-align: center;
  height: 40px;
  font-size: 1.1rem;
`;
export const Grandtotaldisplay = styled.div`
  width: 100%;
  border-top: 1px solid #979797;
  display:flex;
  justify-content: space-between;
  margin: 40px auto;
  padding-top: 10px;
`;

export const StyledAddButton = styled(LinkR)`
  margin-top: 20px;
  display: inline-block;
  padding: 10px 20px;
  background: linear-gradient(180deg, rgb(38, 115, 130) 0%, rgb(0, 121, 188) 100%);
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(180deg, rgb(38, 102, 130) 0%, rgb(0, 128, 188) 100%);
  }
`;


export const StyledAddButtonForStartPrinting = styled.div`
  width: 380px;
  margin-top: 20px;
  display: inline-block;
  padding: 10px 20px;
  background: linear-gradient(180deg, rgb(38, 115, 130) 0%, rgb(0, 121, 188) 100%);
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  transition: background 0.3s ease;

  &:hover {
    color: lightblue;
    background: linear-gradient(180deg, rgb(38, 102, 130) 0%, rgb(0, 128, 188) 100%);
  }
`;