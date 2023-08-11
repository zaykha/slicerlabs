import styled from "styled-components";

export const RegsubHeader = styled.div`
  width: 100%;
  margin: 20px auto;
  text-align: left;
  color: #c4bfbf;
`;
export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;
export const Inputelem = styled.input`
  width: 100%;
  height: 40px;
  background: rgba(87, 87, 87, 0.43);
  border: 1px solid ${({ borderColor }) => borderColor || "#a5a5a5"}; 
  border-radius: 10px;
  text-align: center;
  outline: none;
  margin: 5px auto 10px auto;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.1rem;
`;
export const EyeIcon = styled.span`
  width: 40px;
  // border: 1px solid red;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(10%, -50%);
  //   transform: translateY(-50%);

  cursor: pointer;
`;
export const InputelemSmall = styled.input`
  // width:46%;
  height: 40px;
  background: rgba(87, 87, 87, 0.43);
  border: 1px solid ${({ borderColor }) => borderColor || "#a5a5a5"}; 
  border-radius: 10px;
  text-align: center;
  outline: none;
  margin: 5px 0 10px 0;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.1rem;
  
`;
export const Regflexdiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
`;
export const Addressdiv = styled.div`
  width: 46%;
  color: #ffffff;
  font-size: 14px;
  margin: 5px 0 10px auto;
`;
export const TermsLink = styled.a`
  font-style: italic;
  text-decoration: underline;
  cursor: pointer;
  color: lightblue;

  &:hover {
    text-decoration: underline;
  }
`;

export const ValidateEmailButton = styled.button`
// background: linear-gradient(180deg, #1D1F2B 0%, #1A1A1A 100%);
  background-color: #388fc9;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom:12px;
  &:hover {
    background-color: #2c73a3;
  }
`;
