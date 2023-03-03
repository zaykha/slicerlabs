import styled from "styled-components";

export const HeroContainer = styled.div`
    width: 1200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    margin: 1rem auto;
    padding: 50px;
    box-sizing: border-box;
    // border: 1px solid red;
    height: 40vh;


    @media screen and (max-width: 1200px){
        width: 100%;
    }
    @media screen and (max-width: 786px){
        height: auto;
    }
`;

export const HeroPhrase = styled.div`
    font-family: 'Arimo';
    font-style: normal;
    font-weight: 700;
    font-size: 60px;
    line-height: 69px;
    text-align: center;

    background: linear-gradient(91.13deg, #083348 7.97%, #48B2E5 48%, #083448 89.39%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;

    @media screen and (max-width: 1200px){
        font-size: 2.2rem;
    }
`;


export const Herop = styled.div`
    text-align: center;
    color: #FFFFFF;
`;