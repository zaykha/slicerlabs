import styled from "styled-components";     

export const UploadBTN = styled.div`
    box-sizing: border-box;
    text-decoration: none;
    padding: 5px 21px;
    background: #F0F0F0;
    border: 2px solid #006B9E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    width: 170px;
    height:30px;
    margin: 10px auto;
    text-align: center;
    border: 1px solid #006B9E;
    transition: all 0.3s ease-in;
    cursor:pointer;
    &:hover{
        color: #fff;
        background: #006B9E;
        border: 1px solid white; 
    }
`;

export const UPFullline = styled.div`
    width: 100%;
    text-align:center;
    margin: 2px auto;
    color: #D3D3D3;
    font-size: 12px;
`;

export const UPHeaderFullline = styled.div`
    width: 100%;
    text-align:center;
    margin: 20px auto 10px auto;
    color: #D3D3D3;
    font-size: 1.2rem;
`;