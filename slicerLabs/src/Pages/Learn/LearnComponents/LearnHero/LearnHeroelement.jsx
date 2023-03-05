import styled from "styled-components";

export const LHcontainer = styled.div`
    width:100%;
    padding: 40px;
    // border: 1px solid red;
    margin: 0 auto 60px auto;

    background: linear-gradient(184.57deg, #001018 5.89%, rgba(72, 178, 229, 0) 96.3%);`;
export const LHcontents = styled.div`
    width: 1200px;
    margin: 20px auto 60px auto;
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    @media screen and (max-width: 1200px){
        width: 100%;
    }
`;
export const LHheader = styled.div`
    width: 100%;
    text-align:center;
    color:white;
    margin: 20px auto;
    font-size: 2rem;
`;
export const LHsubHeader = styled.div`
    font-size: 1.2rem;
    color:white;
    width: 100%;
    text-align:center;
    margin: 20px auto;
`;
export const LHp = styled.div`
    color:white;
    width: 60%;
    margin: 20px auto 0 auto;
`;
export const ScrollLinks = styled.div`
    width: 1000px;
    display:flex;
    gap: 10px;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
    top: 47%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    margin: auto;
    @media screen and (max-width: 1200px){
        width: 100%;
    }
    @media screen and (max-width: 686px){
    top: 56%;
       
    }
`;
export const SLCard = styled.div`
    width: 20%;
    color:#48b2e5;
    background: white;
    border-radius: 10px;
    padding: 20px 10px;
    text-align: center;
    @media screen and (max-width: 1200px){
        width: 28%;
        padding: 20px 10px ;
        font-size: 0.9rem;
    }
`;

