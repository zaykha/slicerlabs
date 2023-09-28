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
    width: 450px;
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin:10px auto;
    background: #015176;
    padding: 40px;
    @media screen and (max-width:1200px){
        width: 100%;
    }
    
`;
export const Servicespright = styled.div`
    width: 100%;
    text-align: right;
    font-size:0.82rem;
    color: white;
`;
export const Scardhearder = styled.div`
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    color:#48b2e5;
`;
export const Scardp = styled.div`
    width: 100%;
    text-align: left;
    color: white;
    margin: 10px auto;
    font-size:0.82rem;
`;
export const Scardp1 = styled.div`
    width: 100%;
    text-align: center;
    color: white;
    margin: 10px auto;
`;
export const IMGServices = styled.img`
    width: 100%;
    height: 100%;
    margin: auto;
     object-fit: contain;
    @media screen and (max-width: 1200px){
        width: 100%;
        margin: 0;
        height: auto;
    }
`;