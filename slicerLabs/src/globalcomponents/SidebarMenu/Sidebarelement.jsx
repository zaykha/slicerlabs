import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { Link as LinkS } from "react-router-dom";

export const SidebarContainer = styled.aside`
    position:fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #0d0d0d;
    display: grid;
    align-item: center;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    top: ${({ isOpen })=>( isOpen ? '0' : '-400%')};
    
`;

export const CloseIcon = styled(FaTimes)`
    color: #fff;
    font-size: 2rem;

    &:hover{
        color:#48b2e5;
    }
`;

export const Icon = styled.div`
    position: absolute;
    width: auto;
    top: 0;
    right: 0;
    transform: translate(-100%, 40%);
    background: transparent:
    
    cursor: pointer;
    outline: none;

   

`;

export const SidebarWrapper= styled.div`
    color: #fff;
    margin: 40px auto;
`;

export const SidebarMenu = styled.ul`
    display: grid;
    grid-template-column: 1fr;
    grid-template-rows: repeat(6,80px);
    text-align: center;

    @media screen and (max-width: 480px){
        grid-template-rows: repeat(6,60px)
    }
`

export const SidebarLink = styled(LinkS)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:1.5rem;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    text-decoration: none;
    color: #fff;
    cursor: pointer;

    &:hover{
        color: #48b2e5;
        transition: 0.2s ease-in-out;
    }
`;

