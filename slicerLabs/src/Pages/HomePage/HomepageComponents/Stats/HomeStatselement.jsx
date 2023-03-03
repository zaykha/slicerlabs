import styled from "styled-components";

export const HomeStatsContainer = styled.div`
    background: linear-gradient(180deg, #083347 0%, #005076 100%);
`;
export const ResponsiveContainer = styled.div`
    width: 1200px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    padding: 20px;
    

    @media screen and (max-width:1200px){
        width: 100%;
    }
`;
export const HSHeader = styled.div`
    text-align: center;
    color: #FFFFFF;
    font-size:2rem;
    margin: 20px auto 10px auto;
`;
export const HSp = styled.div`
    text-align: center;
    color: #48B2E5;

`;
export const HSFlex = styled.div`
    margin: 20px auto;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-wrap:wrap;
    @media screen and (max-width:1200px){
        width: 80%;
    }
`;
export const Stats = styled.div`
    width: 250px;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const Shead = styled.div`
    text-align: center;
    color: #48B2E5;
`;
export const SIMG = styled.img`
    width: 190px;
    height: 130px;
    margin: 20px auto;
`;
export const Sfoot = styled.div`
    text-align: center;
    color: #fff;
`;
