import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

    
export const CTABtn = styled(LinkR)`
box-sizing: border-box;
    text-decoration: none;
    padding: 10px 21px;
    background: #F0F0F0;
    border: 2px solid #006B9E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    width: 170px;
    margin: 40px;
    text-align: center;
    border: 1px solid #006B9E;
    transition: all 0.3s ease-in;

    &:hover{
        color: #fff;
        background: #006B9E;
        border: 1px solid white; 
    }

    &.active{
        border-bottom: 3px solid #fbae1a;
    }
`;
