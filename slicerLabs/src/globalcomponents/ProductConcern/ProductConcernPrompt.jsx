import { useState } from "react";
import styled from "styled-components";
import {
  LoginFromcontainer,
  LoginHeader,
} from "../../Pages/Login/LoginComponents/LoginForm/LoginFormelements";
import { RegsubHeader } from "../../Pages/Register/RegisterComponents/Registerformelement";
import { NextBtn } from "../../Pages/Cart/Cartpageelement";
import {
  InnerHeader,
  InnerHeaderWrapper,
  InnerLayerP,
  InnerLayersP,
  NextBtnCancel,
} from "../../Pages/UserProfile/UserProfileElement";
import { doc, setDoc } from "firebase/firestore";
import { ProductConcernCollection } from "../../firebase";

const PromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const StepTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const SelectProduct = styled.select`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid ${({ selected }) => (selected ? "green" : "lightgray")};
  border-radius: 5px;
  outline: none;
  width: 100%;
  max-width: 300px;
`;

const IssueDescription = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
  width: 100%;
  resize: none;
  //   max-width: 300px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: lightblue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const PopupContainer = styled.div`
  /* Styles for the popup container */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupContent = styled.div`
  /* Styles for the popup content */
  background-color: white;
  width: 80%;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2); /* Shadow effect */
`;

const Form = styled.form`
  /* Styles for the form */
  padding: 40px;
`;

const FormGroup = styled.div`
  /* Styles for the form group */
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  /* Styles for the button container */
  display: flex;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  /* Styles for the cancel button */
  background-color: #ccc;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  /* Styles for the save button */
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const ProductConcernPrompt = ({
  purchaseInstances,
  onSubmitProductConcern,
  onClose,
}) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [concernNote, setConcernNote] = useState("");
  const userDetailsUnparsed = localStorage.getItem("userDetails");
  const userDetails = JSON.parse(userDetailsUnparsed).userDetails;
  const [formErrors, setFormErrors] = useState({
    selectProductError: "",
    concernNoteError: "",
  });
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .slice(0, 16)
    .replace("T", " ");

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleNoteChange = (event) => {
    setConcernNote(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedProduct || !concernNote) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        selectProductError: !selectedProduct ? "Please Select a Product" : "",
        concernNoteError: !concernNote ? "Please Describe the Issue" : "",
      }));
      return;
    } else {
      await setDoc(doc(ProductConcernCollection, userDetails.userUID), {
        productId: selectedProduct,
        userUID: userDetails.userUID,
        status: "pending",
        lastUpdate: formattedDate,
        concernNote,
      });
    }
    // Validate and process the form data
    onSubmitProductConcern(selectedProduct, concernNote);
  };

  return (
    <PopupContainer>
      <LoginFromcontainer>
        <LoginHeader>Report Issue with Product</LoginHeader>
        <RegsubHeader>Choose a Faulty Product</RegsubHeader>

        <SelectProduct
          selected={selectedProduct !== ""}
          value={selectedProduct}
          onChange={handleProductChange}
        >
          <option value="">Select a product</option>
          {purchaseInstances.length > 0 ? (
            purchaseInstances
              .filter((item) => item.status !== "Delivered")
              .map((purchaseInstance, index) =>
                purchaseInstance.purchasedItems.map((item) => (
                  <option key={item.itemId} value={item.itemId}>
                    {item.fileName}
                  </option>
                ))
              )
          ) : (
            <></>
          )}
        </SelectProduct>

        <StepContainer>
          <RegsubHeader>Describe the Issue:</RegsubHeader>
          <IssueDescription
            value={concernNote}
            onChange={handleNoteChange}
            rows="4"
          />
        </StepContainer>
        <ButtonContainer>
          <NextBtn onClick={handleSubmit}>Submit</NextBtn>
          <NextBtnCancel onClick={onClose}>Cancel</NextBtnCancel>
        </ButtonContainer>
      </LoginFromcontainer>
    </PopupContainer>
  );
};

export default ProductConcernPrompt;
