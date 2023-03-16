import styled from "styled-components";


export const Itemdiv = styled.div`
    width: 800px;
    margin: 10px auto;
    color:white;
    text-align: center;
    background: linear-gradient(180deg, #083347 0%, #005076 100%);
    border-bottom: 1px solid #386379;
    border-radius: 10px;
    padding: 10px;
    
`;
export const ItemHeader = styled.div`
    width:100%;
    text-align: center;
    font-size: 1.4rem;
    margin: 10px auto;
`;
export const ItemStats = styled.div`
    width:100%;
    text-align: center;
    margin: 3px auto;
`;
export const ItemBtn = styled.button`
box-sizing: border-box;
text-decoration: none;
padding: 10px 21px;
background: #F0F0F0;
border: 2px solid #006B9E;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 50px;
width: 170px;
margin: 12px auto;
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
export const NoitemCart = styled.div`
    width: 100%;
    height: 60vh;
    display:flex;
    align-items:center;
`;
