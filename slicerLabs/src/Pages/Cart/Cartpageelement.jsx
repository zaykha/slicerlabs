import styled, { keyframes,css } from "styled-components";

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