import styled from "styled-components";

export const TBcontainer = styled.div`
    width: 1000px;
    margin: 100px auto 20px;
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    border-bottom: 1px solid white;
    @media screen and (max-width: 1200px){
        width: 80%;
    }
`;
export const TBFlex = styled.div`
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
    align-items:center;
`;
export const TBcontent = styled.div`
    width:400px;
    padding: 40px 40px 40px 0;
    color:white;
`;
export const TBIMG = styled.img`
    width: 600px;
    border: 1px solid white;
    border-radius: 10px;
    @media screen and (max-width: 1200px){
        width: 100%;
    }
`;

