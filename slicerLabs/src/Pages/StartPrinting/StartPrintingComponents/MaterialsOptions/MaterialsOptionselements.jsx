import styled from "styled-components"; 


export const Mdropdownlabel = styled.label`
    width: 100%;
    text-align:left;
    font-size: 0.8rem;
    color:#a4a4a4;
    margin: 1px auto 5px;
`;


export const MOdropdown = styled.select`
    width: 100%;
    background: rgba(87, 87, 87, 0.43);
    border: 1px solid ${({ value }) => (value ? 'green' : '#D5D5D5')};
    border-radius: 10px;
    color:white;
    margin:0px auto 15px;
    padding: 8px;
    text-align: center;
    height: 40px;
    font-size: 1.1rem;
`;
export const Moption = styled.option`
    font-size:1.1rem;
    background-color:rgba(255,255,255,0.2);
    color:black;
    border-radius: 10px;
    
    &:hover{
        color:blue;
    }
`;

// export const Minputqtt = styled.input`
//     width: 130px;
//     height: 32px;
//     text-align: center;
//     color: white;
//     background: rgba(87, 87, 87, 0.43);
//     border: 1px solid #D5D5D5;
//     border-radius: 10px;
// `;

export const Minputqtt = styled.input.attrs({
    type: 'number',
  })`
    /* Styles for the input field */
    width: 90px;
    height: 32px;
    // padding: 5px;
    font-size: 16px;
    border: 1px solid #D5D5D5;
    background: rgba(87, 87, 87, 0.43);
    border-radius: 10px;
    color:white;
    text-align: center;
  `;
 
export const MinP = styled.p`
    color:white;
    font-size: 1.1rem;
    text-align: center;
    // border: 1px solid white;
`;
export const Tocartflexdiv = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-around;
    width: 400px;
    margin: auto;
    position: absolute;
    top: ${props => props.top}px;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    margin: auto;
    @media screen and (max-width: 400px){
        width: 100%;
    }
`;
export const TocartCTABtn = styled.div`
    box-sizing: border-box;
    text-decoration: none;
    padding: 10px 5px;
    background: #F0F0F0;
    border: 2px solid #006B9E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    width: 180px;
    // height: 32px;
    // margin: 40px;
    text-align: center;
    border: 1px solid #006B9E;
    transition: all 0.2s ease-in;
    cursor:pointer;
    
    &:hover{
        color: #fff;
        background: #006B9E;
        border: 1px solid white; 
    }
`
export const NotiPrompt = styled.div`
    position:relative;
    // top:-5px;
    background: red;
    width: 20px;
    height:20px;
    border-radius: 50%;
    color: white;
    padding-left:5px;
    // right: 15px;
`

export const PMContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const PMAlertBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

export const PMButton = styled.button`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${props => props.cancel ? 'red' : 'green'};
  color: white;
  border: none;
  cursor: pointer;
`;