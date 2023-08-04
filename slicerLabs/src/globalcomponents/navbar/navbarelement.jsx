import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

export const Nav = styled.nav`
  font-family: "Fredoka", sans-serif;
  // background: rgba(0,0,0,0);
  height: 60px;
  margin: auto;
  // margin-top: -80px;
  display: flex;
  justify-content: space-around;
  align-item: center;
  // gap: 5px;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  // background: linear-gradient(90deg, rgba(9,11,50,1) 0%, rgb(25,28,38) 100%);
  background: linear-gradient(180deg, #111111 64.06%, rgba(2, 2, 2, 0) 100%);

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavController = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-around;
  align-item: center;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 60px;
  z-index: 1;
  width: 40%;
  // padding: 0 24px;
  max-width: 1100px;

  // border: 1px solid red;
`;

export const NavLogo = styled(LinkR)`
  position: relative;
  width: 20%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-contents: center;

  @media screen and (max-width: 1200px) {
    width: 150px;
  }
`;

export const Imgicon = styled.div`
  // display:flex;

  &:hover {
    color: #000;
  }
  // border: 1px solid red;
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 1000px) {
    width: auto;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 40%);
    font-size: 1.8rem;
    cursor: pointer;
    color: white;
    z-index: 99;
  }
`;
export const NavMenu = styled.ul`
  display: flex;
  align-item: center;
  justify-content: center;
  list-style: none;
  text-align: center;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  // height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  // margin: 0 5px;
`;
export const IMGTAG = styled.img`
  // filter: invert(24%) sepia(56%) saturate(2532%) hue-rotate(304deg) brightness(93%) contrast(91%);

  max-width: 150px;
  margin: auto;
  height: 60%;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
export const IMGTAG1 = styled.img`
  width: 30px;
  margin: auto;
  // height: 60%;
  transition: all 0.2s ease-in-out;
  &:hover {
    filter: invert(78%) sepia(78%) saturate(4692%) hue-rotate(183deg)
      brightness(96%) contrast(87%);
  }
`;
export const NavLinks = styled(LinkR)`
  color: #48b2e5;

  display: flex;
  align-item: center;
  text-decoration: none;
  padding: 0 1rem;
  // height: 100%;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  &:hover {
    color: #fff;
  }

  &.active {
    border-bottom: 3px solid #fbae1a;
    background: #e6e6e6;
    border-radius: 11px;
    padding: 3px 20px;
    color: #275e78;
    border: 1px solid #275e78;
    transition: background-color 1s ease-in-out, border-radius 0.4s ease-in-out;
  }
`;
export const NavLinks1 = styled(LinkR)`
  color: #006b9e;

  display: flex;
  align-item: center;
  text-decoration: none;
  text-align: center;
  padding: 0 1rem;
  // height: 100%;
  cursor: pointer;
  width: 9.5rem;
  background: white;
  padding: 5px 1rem;
  border-radius: 16px;
  border: 1px solid #006b9e;
  transition: all 0.3s ease-in;

  &:hover {
    color: #fff;
    background: #006b9e;
    border: 1px solid white;
  }

  &.active {
    width: auto;
    height: 32px;
    padding: 5px 15px;
    background: #48b2e5;
    color: #1e1e1e;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    transition: background-color 1s ease-in-out, border-radius 0.4s ease-in-out;
  }
`;
export const Commerce = styled.div`
  display: flex;
  // align-item: center;
  // justify-content: center;
  list-style: none;
  text-align: center;
  width: 20%;
  // margin-right: 22px;
  // text-shadow: 1px 2px black;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
export const ActionItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #fff;
  }

  &.active {
    border-bottom: 3px solid #fbae1a;
  }
`;
export const NavLinksAdmin = styled(LinkR)`
  color: #48b2e5;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  margin-top:10px;
  margin-bottom:10px;
  &:hover {
    color: red;
  }

  &.active {
    border-bottom: 3px solid #fbae1a;
    background: #e6e6e6;
    border-radius: 11px;
    padding: 3px 20px;
    color: #275e78;
    border: 1px solid #275e78;
    transition: background-color 1s ease-in-out, border-radius 0.4s ease-in-out;
  }
`;

// Styled container for the additional items
export const DropdownContainer = styled.div`
  position: relative;
 
  // display: inline-block;
`;

// Styled dropdown content
export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: linear-gradient(180deg, rgba(8, 51, 71, 0.63) 0%, rgba(0, 80, 118, 0.63) 100%);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 160px;

  ${DropdownContainer}:hover & {
    display: block;
  }
`;