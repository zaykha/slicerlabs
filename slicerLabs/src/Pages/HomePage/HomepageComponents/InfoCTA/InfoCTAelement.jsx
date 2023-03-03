import styled from "styled-components";


export const InfoCTAContainer = styled.div`
    width: 1200px;
    padding: 40px;
    margin: 80px auto;
    display: flex;
    align-items:center;
    justify-content: center;
    flex-wrap: wrap;
    @media screen and (max-width: 1200px){
        width: 100%;
    }
`;
export const Infop = styled.div`
    color: white;
    margin: 20px auto 20px auto;
`;

export const LeftContent = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    @media screen and (max-width: 1200px){
        width: 80%;
    }
`;
export const InfoIMG = styled.img`
    width: 400px;
    height: 300px;
    margin: auto;
    @media screen and (max-width: 400px){
        width: 100%;
        margin: 0;
        height: auto;
    }
`;
export const RightContent = styled.div`
    width: 500px;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 1200px){
        width: 80%;
    }
`;
export const CTAh1 = styled.div`
    font-size: 1.8rem;
    text-align: center;
    color: #48B2E5;
`;