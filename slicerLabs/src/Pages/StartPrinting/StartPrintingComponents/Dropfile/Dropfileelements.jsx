import styled from "styled-components";

export const UploadBTN = styled.div`
  box-sizing: border-box;
  text-decoration: none;
  padding: 5px 21px;
  background: #f0f0f0;
  border: 2px solid #006b9e;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  width: 170px;
  height: 30px;
  margin: 10px auto;
  text-align: center;
  border: 1px solid #006b9e;
  transition: all 0.3s ease-in;
  cursor: pointer;
  &:hover {
    color: #fff;
    background: #006b9e;
    border: 1px solid white;
  }
`;

export const UPFullline = styled.div`
  width: 100%;
  text-align: center;
  margin: 2px auto;
  color: #d3d3d3;
  font-size: 12px;
`;

export const UPHeaderFullline = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px auto 10px auto;
  color: #d3d3d3;
  font-size: 1.2rem;
`;
export const DropzoneFormcontainer = styled.div`
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
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    border: 1px solid white;
  }

  @media screen and (max-width: 800px) {
    width: 95%;
  }
`;
export const DropzoneContainer = styled.div`
  width: "100%";
  height: "100%";
  position: "relative";
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const ErrorContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ErrorCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 1.4rem;
  width: 400px;
  padding: 40px;
  text-align: center;
  background: linear-gradient(
    180deg,
    rgba(8, 51, 71, 0.63) 0%,
    rgba(0, 80, 118, 0.63) 100%
  );
  border: 1px solid rgba(201, 201, 201, 0.41);
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Errbutton = styled.button`
  box-sizing: border-box;
  text-decoration: none;
  padding: 10px 21px;
  background: #f0f0f0;
  border: 2px solid #006b9e;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  width: 170px;
  margin: 40px auto 10px auto;
  text-align: center;
  border: 1px solid #006b9e;
  transition: all 0.3s ease-in;
  cursor: pointer;
  &:hover {
    color: #fff;
    background: #006b9e;
    border: 1px solid white;
  }
`;

export const ContainerforResponse = styled.div`
  margin: 100px 0;
`;