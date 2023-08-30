import styled from "styled-components";


export const InfoCTAContainer = styled.div`
    width: 1200px;
    padding: 40px;
    margin: 0px auto;
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
    // text-align:left;
`;

export const LeftContent = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: right;
    justify-content: center;
    flex-wrap: wrap;
    @media screen and (max-width: 1200px){
        width: 80%;
    }
`;
export const InfoIMG = styled.img`
    width: 600px;
    height: 400px;
    margin: auto;
     object-fit: contain;
    @media screen and (max-width: 1200px){
        width: 100%;
        margin: 0;
        height: auto;
    }
`;
export const Sheader = styled.div`
    text-align: center;
    color: grey;
`;
export const RightContent = styled.div`
    width: 500px;
    margin: 10px auto;
    padding: 50px;
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