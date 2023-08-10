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
import {
  FieldValue,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { ProductConcernCollection } from "../../firebase";
import { CancelIcon } from "../navbar/navbarelement";

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
  setFetchingData
}) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [concernNote, setConcernNote] = useState("");
  const userDetailsUnparsed = localStorage.getItem("userDetails");
  const userDetails = JSON.parse(userDetailsUnparsed).userDetails;
  const userUIDInLocalStorage = localStorage.getItem("uid");
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
    setFetchingData(true);
    if (!selectedProduct || !concernNote) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        selectProductError: !selectedProduct ? "Please Select a Product" : "",
        concernNoteError: !concernNote ? "Please Describe the Issue" : "",
      }));
      return;
    } else {
      if (!ProductConcernCollection || !userUIDInLocalStorage) {
        console.error("Invalid collection or user UID");
        return;
      }

      try {
        const userConcernsRef = doc(ProductConcernCollection, userUIDInLocalStorage);
        const userConcernsDoc = await getDoc(userConcernsRef);
      
        if (!userConcernsDoc.exists()) {
          // Document doesn't exist, create a new document
          const newConcern = {
            concerns: [
              {
                productId: selectedProduct,
                status: "pending",
                lastUpdate: formattedDate,
                concernNote,
              },
            ],
          };
      
          await setDoc(userConcernsRef, newConcern);
        } else {
          const existingConcerns = userConcernsDoc.data()?.concerns || [];
      
          const updatedConcerns = existingConcerns.map((existingConcern) =>
            existingConcern.productId === selectedProduct
              ? { ...existingConcern, concernNote }
              : existingConcern
          );
      
          if (!existingConcerns.find((concern) => concern.productId === selectedProduct)) {
            // Add the new concern to the array
            updatedConcerns.push({
              productId: selectedProduct,
              status: "pending",
              lastUpdate: formattedDate,
              concernNote,
            });
          }
      
          await setDoc(userConcernsRef, { concerns: updatedConcerns });
        }
      
        // Validate and process the form data
        onSubmitProductConcern(selectedProduct, concernNote);
        setFetchingData(false)
      } catch (error) {
        setFetchingData(false)
        console.error("Error submitting concern:", error);
        // Handle the error, e.g., show an error message to the user
      }
      
        
    }
    setFetchingData(false)
  };

  return (
    <PopupContainer>
      <LoginFromcontainer>
        <CancelIcon onClick={onClose}>X</CancelIcon>
        <LoginHeader>Report Issue with Product</LoginHeader>
        <RegsubHeader>Choose a Faulty Product</RegsubHeader>

        <SelectProduct
          selected={selectedProduct !== ""}
          value={selectedProduct}
          onChange={handleProductChange}
        >
          {purchaseInstances.length > 0 &&
          purchaseInstances.map((purchaseInstance) => {
            purchaseInstance.purchasedItems.filter(
              (item) => item.status === "Delivered"
            );
          }) ? (
            <option value=""> Select an Item </option>
          ) : (
            <option value="">No Items Have Been Delivered</option>
          )}

          {purchaseInstances.length > 0 ? (
            purchaseInstances.map((purchaseInstance, outerIndex) =>
              purchaseInstance.purchasedItems
                .filter((item) => item.status == "Delivered")
                .map((item, index) => {
                  return (
                    <option key={item.itemId} value={item.itemId}>
                      {item.fileName}
                    </option>
                  );
                })
            )
          ) : (
            <></>
          )}
        </SelectProduct>

        {selectedProduct !== "" ? (
          <>
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
              {/* <NextBtnCancel onClick={onClose}>Cancel</NextBtnCancel> */}
            </ButtonContainer>
          </>
        ) : (
          <></>
        )}
      </LoginFromcontainer>
    </PopupContainer>
  );
};

export default ProductConcernPrompt;
