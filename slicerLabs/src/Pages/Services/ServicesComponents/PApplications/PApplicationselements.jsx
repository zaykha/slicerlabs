import styled from "styled-components";


export const PAppBackground = styled.div`
    width: 100%;
    background: linear-gradient(152.04deg, #083347 17.34%, #005076 82.66%);
    padding: 40px;

`;
export const PAppcontainer = styled.div`
    width: 1200px;
    margin: 10px auto;
    @media screen and (max-width:1200px){
        width: 100%;
    }
`;
export const PAppcardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px auto;
`;
export const PAppcard = styled.div`
    width: 330px;
    height: 480px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #292929;
    color: white;
`;
