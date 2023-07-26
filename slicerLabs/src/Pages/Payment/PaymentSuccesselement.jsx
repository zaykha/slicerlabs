import styled from "styled-components";

export const PaymentResponsecontainer = styled.div`
  box-sizing: border-box;

  width: 773px;
  padding: 40px;
  margin: 40px auto;
  height: 300px;
  background: linear-gradient(
    180deg,
    rgba(8, 51, 71, 0.63) 0%,
    rgba(0, 80, 118, 0.63) 100%
  );
  border: 1px solid rgba(201, 201, 201, 0.41);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  overflow: hidden;
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 10px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 

  @media screen and (max-width: 800px) {
    width: 95%;
  }
`;