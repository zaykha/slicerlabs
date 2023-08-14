import styled from "styled-components";
import { RiArrowDropDownLine } from "react-icons/ri";
export const SubHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  // text-align:left;
  color: white;
`;
export const InnerHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    flex-wrap: wrap;
    border-bottom: 1px solid rgba(225, 225, 225, 0.5);
  }
`;
export const InnerHeaderWrapperbtm = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
`;
export const ItemHeaderprofile = styled.div`
  width: 100%;
  text-align: left;
  font-size: 1.4rem;
  margin: 10px auto;
  color: white;
`;

export const UPHeaderFullline1 = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px auto 10px auto;
  color: #d3d3d3;
  font-size: 1.6rem;
`;
export const DisplayHeader = styled.div`
  // display:flex;
  // flex-direction:row;
  width: 20%;
  text-align: center;
  // border-right: 2px solid #275e78;
  color: Grey;
  margin-right: 5px;
  padding: 10px;

  // white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;
export const InnerHeader = styled.div`
  // display:flex;
  // flex-direction:row;
  width: 20%;
  text-align: center;
  // border-right: 2px solid #275e78;
  color: #e6e6e6;
  margin-right: 5px;
  padding: 10px;

  // white-space: wrap;
  // overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 1200px) {
    width: 100%;
    // display:flex;
    // flex-direction:row;
  }
`;
export const InnerHeaderClickable = styled.div`
  // display:flex;
  // flex-direction:row;
  width: 20%;
  text-align: center;
  border: 1px solid #275e78;
  border-radius: 10%;
  color: #e6e6e6;
  margin-right: 5px;
  padding: 10px;
  cursor: pointer;
  text-overflow: ellipsis;
  &:hover {
    color: #fff;
    background: #006b9e;
    border: 1px solid white;
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    // display:flex;
    // flex-direction:row;
  }
`;
export const InnerHeaderP = styled.div`
  // display:flex;
  // flex-direction:row;
  width: 20%;
  text-align: center;
  // border-right: 2px solid #275e78;
  color: #e6e6e6;
  margin-right: 5px;
  padding: 10px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  // white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;
export const InnerHeaderLeft = styled.div`
  // display:flex;
  // flex-direction:row;
  width: 20%;
  text-align: right;
  // border-right: 2px solid #275e78;
  color: #e6e6e6;
  margin-right: 5px;
  padding: 10px;

  // white-space: wrap;
  // overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;
export const InnerHeader1 = styled.div`
  display: flex;
  flex-direction: row;
  width: 20%;
  text-align: center;
  color: white;
  // background:grey;
  margin-right: 5px;
  padding: 10px;
  border-radius: 10px;
`;
export const InnerLayerP = styled.div`
  color: #ffffff;
  font-family: "Arimo-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

export const InnerLayersP = styled.div`
  color: #959595;
  font-family: "Arimo-Regular", Helvetica;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  @media screen and (max-width: 1200px) {
    font-size: 12px;
  }
`;
export const InnerHeaderpersonalize = styled.div`
  // display:flex;
  // flex-direction:row;
  width: 75%;
  text-align: left;
  // border-right: 2px solid #275e78;
  color: #e6e6e6;
  margin-right: 5px;
  padding: 10px;

  // white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EditIcon = styled.button`
  /* Your styles for the edit icon button */
  background: transparent;
  width: 10%;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: white;
  position: absolute;
  top: 50px;
  right: 0;
  &:hover {
    color: #0056b3;
  }
`;
export const EditIconLoginDetails = styled.button`
  /* Your styles for the edit icon button */
  background: transparent;
  width: 10%;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: white;
  position: absolute;
  top: 80px;
  right: 0;
  &:hover {
    color: #0056b3;
  }
`;
export const EditIconLoginDetails1 = styled.button`
  /* Your styles for the edit icon button */
  background: transparent;
  width: 25%;
  border: none;
  cursor: pointer;
  font-size: 0.88rem;
  color: white;
  // position: absolute;
  top: 35%;
  right: 20%;
  text-decoration: underline;
  &:hover {
    color: #0056b3;
  }
`;
export const NextBtnCancel = styled.button`
  box-sizing: border-box;
  text-decoration: none;
  padding: 10px 21px;
  background: gray;
  border: 2px solid #006b9e;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  width: 170px;
  margin: 12px auto;
  text-align: center;
  border: 1px solid #006b9e;
  transition: all 0.3s ease-in;
  cursor: pointer;
  &:hover {
    color: #fff;
    background: #006b9e;
    border: 1px solid white;
  }
`;
export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button`
  background-color: #48b2e5;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #3284b5;
  }
`;

export const DropdownIcon = styled(RiArrowDropDownLine)`
  margin-left: 8px;
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: blue;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%; /* Make the dropdown list width full */
  transform: translateY(100%); /* Move the dropdown below the button */
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 4; /* Ensure the dropdown is above other content */
`;

export const DropdownListItem = styled.li`
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;
