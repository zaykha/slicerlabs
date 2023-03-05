import styled from "styled-components";

export const SMContainer = styled.div`
    margin: 40px auto;
`;


export const SMCardContainer = styled.div`
    width: 1000px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-wrap: wrap;
    @media screen and (max-width: 1000px){
        width: 100%;
    }
`;
export const SMCard = styled.div`
    width: 450px;
    height: 180px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    background: #015176;
`;
export const SMheader = styled.div`
    width: 100%;
    text-align: center;
    font-size: 1.4rem;
`;
export const SMcontent = styled.div`
    width: 100%;
    text-align: center;
`;
