import styled from "styled-components";

export const LMContainer = styled.div`
    width:100%;
    display: flex;
    flex-wrap: wrap;
    margin: 20px auto;
`;
export const LMNAV = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: auto;
`;
export const LMlist = styled.div`
    width: 220px;
    height: 42px;
    padding: 2px 12px;
    background: white;
    text-align: center;
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    align-items: center;

    &:hover{
        color: white;
        background: black;
        border: 1px solid white;
    }
`;
export const LMcontentContainer = styled.div`
    width: 700px;
    padding: 20px;
    margin: 20px auto;
    background: white;
    border-radius: 10px;
`;
export const LMheaderbtn = styled.div`
    width: 140px;
    
    position: relative;
    top: -30px;
    right: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid blue;
    text-align: center;
    height: 22px;
`;
export const LMContent = styled.div`
    text-align: left;
`;




