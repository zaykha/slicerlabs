import styled from "styled-components";

export const Testcontainer = styled.div`
    width: 80%;
    padding: 10px;
    display: flex;

    align-items: center;
    justify-content: flex-start;
    margin: auto;
    @media screen and (max-width: 1200px){
        width: 100%;
        flex-wrap:wrap;
    }
`;

export const Avatar = styled.img`
    width: 280px;
    height: 100px;
    object-fit: fill;
    margin: 20px 10px;
    @media screen and (max-width: 1200px){
        width: auto;
        // flex-wrap:wrap;
        object-fit: fill;
    }
`;
export const Avatarname = styled.div`
    color: #48B2E5;
    font-size: 1.1rem;
    text-align: center;

`;
export const Testimonialp = styled.div`
    color: white;
    text-align: center;
`;

export const CTAh2 = styled.div`
    font-size: 1.5rem;
    text-align: center;
    color: #fff;
`;

