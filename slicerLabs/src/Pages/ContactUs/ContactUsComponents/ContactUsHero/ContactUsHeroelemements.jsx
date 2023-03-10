import styled from "styled-components";

export const CUheader = styled.div`
    width:100%;
    text-align:center;
    color:white;
    font-size:1.6rem;
    margin: 20px auto 10px auto;
`;
export const CUsubheader = styled.div`
    width:100%;
    text-align:center;
    margin: 10px auto;
    color:#999999;

`;
export const CUCTABG = styled.div`
    width:100%;
    background:linear-gradient(360deg, #083347 0%, #005076 100%);
    padding: 10px;
    margin: 30px auto;
`;
export const CUCTAcontainer = styled.div`
    width:1200px;
    margin:20px auto;
    display:flex;
    flex-wrap:wrap;

    @media screen and (max-width:1200px){
        width:100%;
    }
`;
export const CUCTAcard = styled.div`
    width:600px;
    margin:0 auto;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding: 10px 20px;

    @media screen and (max-width:600px){
        width:100%;
        padding: 10px 10px;

    }
`;
export const CUcardheader = styled.div`
    width:100%;
    text-align:center;
    margin: 20px auto 5px auto;
    color:white;
    font-size:1.3rem;
`;
export const CUcardsubH = styled.div`
    width: 100%;
    text-align:center;
    margin: 2px auto;
    color:#999999;


`;
export const CUcontent = styled.div`
    width:100%;
    text-align:center;
    margin: 10px auto;
    color:white;

`;
export const CUsubspan = styled.div`
    font-size:0.9rem;
    color:#48b2e5;
    text-align:center;

`;
export const CUCTABTN = styled.button`
    box-sizing: border-box;
    text-decoration: none;
    padding: 10px 21px;
    background: #F0F0F0;
    border: 2px solid #006B9E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    width: 170px;
    margin: 20px;
    text-align: center;
    border: 1px solid #006B9E;
    transition: all 0.3s ease-in;
    cursor:pointer;

    &:hover{
        color: #fff;
        background: #006B9E;
        border: 1px solid white; 
    }

    &.active{
        border-bottom: 3px solid #fbae1a;
    }
`;

