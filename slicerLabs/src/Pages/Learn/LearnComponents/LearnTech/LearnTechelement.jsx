import styled from "styled-components";


export const LTsubHeader = styled.div`
    Width: 100%;
    text-align: center;
    color: #999999;
`;
export const LTBlogCard = styled.div`
    width: 800px;
    height: ${({ toggleExpand }) => (toggleExpand ? 'auto' : '300px')};
    overflow:hidden;
    margin: 20px auto;
    display: flex;
    flex-direction: ${({ toggleExpand }) => (toggleExpand ? 'column' : 'row')};
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    gap: 20px;
    background: linear-gradient(210.69deg, #083347 19.13%, #005076 81.38%);
    border-radius: 25px;
    

        @media screen and (max-width:1200px){
            width: 100%;
            height: ${({ toggleExpand }) => (toggleExpand ? 'auto' : '500px')};
            flex-direction:column;
        }
`;
export const LTBlogIMG = styled.img`
  width: ${({ toggleExpand }) => (toggleExpand ? '600px' : '40%')};
  margin: 20px auto;
  border-radius: 10px;
  
  
  @media screen and (max-width:1200px){
    width: 40%;

}
@media screen and (max-width:780px){
    width: 80%;

}
`;

export const LTBDivider = styled.div`
  width: 80%;
  overflow: hidden;
  height: ${({ toggleExpand }) => (toggleExpand ? 'auto' : '40%')};

`;


export const LTBlogHeader = styled.div`
    width: 100%;
    color: white;
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 20px;
    transition: all 1s ease-in;

`;
export const LTBlogcontent = styled.div`
    width: 100%;
    color: white;
    text-align: center;
    // margin-bottom: 20px;
    padding-bottom: 40px;
    border-bottom: 1px solid white;
    transition: all 1s ease-in;

`;
export const LTBlogtoggle = styled.img`
    width: 50px;
    cursor: pointer;
    transition: all 1s ease-in;

`;


