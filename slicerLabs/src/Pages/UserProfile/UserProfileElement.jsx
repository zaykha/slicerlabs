import styled from "styled-components"; 

export const SubHeader = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    // text-align:left;
    color:white;
`;
export const InnerHeaderWrapper = styled.div`
    display:flex;
    flex-direction:row;
    margin-top:20px;
`;
export const InnerHeaderWrapperbtm = styled.div`
    display:flex;
    flex-direction:row;
    margin-top:20px;
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
`;
export const ItemHeaderprofile = styled.div`
    width:100%;
    text-align: left;
    font-size: 1.4rem;
    margin: 10px auto;
    color:Grey;
`;
export const DisplayHeader = styled.div`
    // display:flex;
    // flex-direction:row;
    width:20%;
    text-align:center;
    // border-right: 2px solid #275e78;
    color:Grey;
    margin-right:5px;
    padding:10px;
    
    // white-space: wrap; 
    overflow:hidden;
  text-overflow: ellipsis;
`;
export const InnerHeader = styled.div`
    // display:flex;
    // flex-direction:row;
    width:20%;
    text-align:center;
    // border-right: 2px solid #275e78;
    color: #e6e6e6; 
    margin-right:5px;
    padding:10px;
    
    // white-space: wrap; 
    overflow:hidden;
  text-overflow: ellipsis;
`;
export const InnerHeaderLeft = styled.div`
    // display:flex;
    // flex-direction:row;
    width:20%;
    text-align:right;
    // border-right: 2px solid #275e78;
    color: #e6e6e6; 
    margin-right:5px;
    padding:10px;
    
    // white-space: wrap; 
    overflow:hidden;
  text-overflow: ellipsis;
`;
export const InnerHeader1 = styled.div`
    display:flex;
    flex-direction:row;
    width:20%;
    text-align:center;
    color:white;
    // background:grey;
    margin-right:5px;
    padding:10px;
    border-radius:10px;
`;
export const InnerLayerP = styled.div`
color: #ffffff;
font-family: "Arimo-Regular", Helvetica;
font-size: 12px;
font-weight: 400;
letter-spacing: 0;
line-height: normal;
`;

export const InnerLayersP = styled.div`
color: #959595;
font-family: "Arimo-Regular", Helvetica;
font-size: 10px;
font-weight: 400;
letter-spacing: 0;
line-height: normal;

`;
export const InnerHeaderpersonalize = styled.div`
    // display:flex;
    // flex-direction:row;
    width:75%;
    text-align:left;
    // border-right: 2px solid #275e78;
    color: #e6e6e6; 
    margin-right:5px;
    padding:10px;
    
    // white-space: wrap; 
    overflow:hidden;
  text-overflow: ellipsis;
`;


export const EditIcon = styled.button`
  /* Your styles for the edit icon button */
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: white;
  position: absolute;
  top:50px;
  &:hover {
    color: #0056b3;
  }
`;

export const NextBtnCancel = styled.button`
    box-sizing: border-box;
    text-decoration: none;
    padding: 10px 21px;
    background: gray;
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