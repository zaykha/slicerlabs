import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

export const MScontainter = styled.div`
    width: 1200px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    Color: white;

    @media screen and (max-width: 1200px){
        width:100%;
    }

`;
export const MSCardContainer = styled.div`
    width: 1000px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items:center;
    flex-wrap:wrap;

    @media screen and (max-width: 1200px){
        width:100%;
    }
`;
export const MSCard = styled.div`
    width: 400px;
    margin: 40px auto;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    background: #015176;
`;
export const MSBtn = styled(LinkR)`
    width: 200px;
    margin: 10px auto;
    padding: 10px 18px;
    color: black;
    background:white;
    border-radius: 10px;
    text-align: center;
    transition: 0.3s all ease-in;

    &:hover{
        color: white;
        background: black;
    }
`;
