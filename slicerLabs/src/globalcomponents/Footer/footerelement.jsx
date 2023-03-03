import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

export const Footercontainer = styled.div`
    width: 1200px;
    padding: 10px;
    color: white;
    margin: auto;
    // display: flex;

    @media screen and (max-width: 1200px){
        width: 100%;
    }

`;
export const FooterContentcontainer = styled.div`
    display: flex;
    width: 1200px;
    height: 500px;
    margin: 20px auto 40px auto;
    align-items: flex-start;
    justify-content: center;
    // align-content: flex-start;
    flex-wrap: wrap;

    @media screen and (max-width:1200px){
        width: 100%;
        height: auto;

    }
`;
export const FooterContent = styled.div`
    width: 200px;
    margin: 0 auto;
    @media screen and (max-width:786px){
        width: 80%;
    }
`;
export const Footerpartition = styled.div`
    margin: 50px auto;

`;
export const FooterIMG = styled.img`
    width: 158px;
    height: 37px;
    margin: 0 0 20px 0;
`;
export const Footercomp = styled.div`
    text-align: left;
`;

export const Fheader = styled.div`
    font-size: 1.6rem;
    margin: 40px auto 20px auto;
`;
export const Fcontent = styled.div`
    text-align: left;

`;

export const Flinks = styled.div`
    margin: 20px auto;
    display: flex;
    flex-direction: column;

`;
export const Flink = styled(LinkR)`
    margin: 10px auto;
    text-decoration: none;
    color: white;

    &:hover{
        color: #48b2e5;
    }
`;

export const Footercopyright = styled.div`
    width: 400px;
    margin: auto;
    @media screen and (max-width: 400px){
        width: 100%;
    }
`;
export const Copyright = styled.div``;

export const Socials = styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto 40px auto;
`;
export const Sociallogolink = styled(LinkR)`
    margin: 20px auto;
    text-decoration: none;
    color: white;

    &:hover{
        color: #48b2e5;
    }
`;
export const Socialimg = styled.img`
    width: 40px;
    height: 40px;

    &:hover{
        filter: invert(78%) sepia(78%) saturate(4692%) hue-rotate(183deg) brightness(96%) contrast(87%);
    }
    @media screen and (max-width: 786px){
        width: 30px;
        height: 30px;

    }
`;


