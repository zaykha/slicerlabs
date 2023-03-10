import styled from "styled-components";

export const LSNavcontainer = styled.div`
    width: 80%;
    margin: 2px auto;
    display:flex;
    // gap:20px;
    flex-wrap:wrap;
    align-items:center;
    justify-content: space-around;
    color:white;
    @media screen and (max-width:1200px){
        width: 100%;
    }
`;
export const LSNavbtn = styled.div`
    color:white;
    width: 220px;
    height: 40px;
    text-align:center;
    // border: 1px solid white;
    display:flex;
    align-items:center;
    cursor:pointer;
    border-radius: 10px;

    &:hover{
        color:black;
        background: #48b2e5;
    }
`;
export const LSviewer = styled.div`
    width: 100%;
`;
export const LSslider = styled.div`
    display:flex;
`;
export const LSviewdiv = styled.div`
    width: 100%;
    padding: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
`;
export const LSVDheader = styled.div`
    width:100%;
    text-align:center;
    margin: 20px auto;
    color: #48b2e5;
    font-size: 1.5rem;
`;
export const LSVDsubH = styled.div`
    width:100%;
    text-align:center;
    font-size: 1.2rem;
    color:white;
`;
export const LSVDcontent= styled.div`
    width: 100%;
    margin: 20px auto;
    color:white;
`;
