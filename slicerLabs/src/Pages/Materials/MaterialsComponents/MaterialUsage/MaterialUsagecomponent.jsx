import styled from "styled-components";

export const MUContainer = styled.div`
    width: 100%;
    background: linear-gradient(179.92deg, #083347 0.07%, #005076 99.93%);
    margin: 0 0;
    
`;
export const MUContainer1 = styled.div`
    width: 100%;
    margin: 0 0;
    padding: 20px;
    
`;
export const MUBox = styled.div`
// padding: 20px;
    width: 1000px;
    display: flex;
    flex-wrap: wrap;
    color: white;
    margin: 0 auto;
    // border-bottom: 1px solid #48b2e5;
    @media screen and (max-width:1200px){
        width: 100%;
    }
`;

export const MUcontent = styled.div`
    width: 500px;
    padding: 20px;
    display: flex;
    margin:  auto;
    flex-direction: column;
    gap 20px;
`;
export const MUHeader = styled.div`
    width: 100%;
    text-align: left;
    color:#48b2e5;
    font-size: 2rem;
`;
export const MUSubHeader = styled.div`
    width: 100%;
    text-align: left;
    font-size: 1.2rem;
`;
export const MUp = styled.div`
    text-align: left;
`;
export const MUIMG= styled.img`
    width: 500px;
    height: 100%;
    margin: auto;

    @media screen and (max-width:500px){
        width: 100%;
    }

`;
