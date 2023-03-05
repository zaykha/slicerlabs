import styled from "styled-components";

export const Stats1container = styled.div`

    width: 1200px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width:1200px){
        width: 100%;
    }

`;
export const S1contents = styled.div`
    width: 1000px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
    @media screen and (max-width:1200px){
        width: 100%;
    }
`;
export const S1content = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin:10px auto;
    background: #015176;
    padding: 40px;

    &:hover{
        background: #015289;
    }
`;
export const Servicespright = styled.div`
    width: 100%;
    text-align: right;
    font-size:0.92rem;
    color: white;
`;
export const Scardhearder = styled.div`
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    color:#48b2e5;
`;
export const Scardp = styled.div`
    width: 80%;
    text-align: center;
    color: white;
    margin: 10px auto;
`;