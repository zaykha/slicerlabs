import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { ConfigCollection } from "../../firebase";
import { Step1Container } from "../../Pages/Cart/Cartpageelement";
import {
  InnerLayerP,
  InnerLayersP,
  ItemHeaderprofile,
  UPHeaderFullline1,
} from "../../Pages/UserProfile/UserProfileElement";
import { LoginFromcontainer } from "../../Pages/Login/LoginComponents/LoginForm/LoginFormelements";
import { InputelemSmall } from "../../Pages/Register/RegisterComponents/Registerformelement";
import RotatingLoader from "../../globalcomponents/DropDown/RotatingLoader";
import PriceCalculatorExplanation from "./PriceCalculatorExplanation";

const ConfigPageContainer = styled.div`
  /* Your styling here */
  width: 80%;
  height: 800px;
`;
const Container = styled.div`
  color: white;
  padding: 20px;
  // background-color: #f5f5f5;
`;
const EditButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: lightblue;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: lightblue;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
`;
const AddButton = styled(Button)`
  background-color: #388fc9;
  width: 200px;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 5px 10px 5px 12px;
  &:hover {
    background-color: #2c73a3;
  }
`;
const FontMid = styled.div`
  color: #959595;
  font-family: "Arimo-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
`;
const ConfigSubHeader = styled.div`
  width: 100%;
  text-align: left;
  font-size: 1.1rem;
  margin: 20px auto;
  color: white;
`;

const CloseButton = styled.button`
  position: absolute;
  width:50px;
  top: 55px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  color: #fff;
  &:hover {
    color: #2c73a3;
  }
`;
const ConfigPage = () => {
  const [configSettings, setConfigSettings] = useState({
    printTimePerUnitVolume: {
      ABS: 0.05, // minutes/cm^3
      PLA: 0.04, // minutes/cm^3
      TPU: 0.06, // minutes/cm^3
      NYLON: 0.07, // minutes/cm^3
      PETG: 0.05, // minutes/cm^3
      RESIN: 0.03, // minutes/cm^3
    },
    materialCosts: {
      ABS: 0.05, // SGD per gram
      PLA: 0.04, // SGD per gram
      TPU: 0.06, // SGD per gram
      NYLON: 0.07, // SGD per gram
      PETG: 0.05, // SGD per gram
      RESIN: 0.1, // SGD per gram
    },
    hourlyRate: 20,
    laborCost: 25,
    overheadCost: 5,
  });
  const userDetails =
    useSelector((state) => state?.userDetails) ;
  const userUIDInLocalStorage = userDetails.userUID;
  const [isEditing, setIsEditing] = useState(false);
  const [editedSettings, setEditedSettings] = useState({ ...configSettings });
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    // Fetch configuration settings from Firestore
    const fetchConfigSettings = async () => {
      try {
        const configDocRef = doc(ConfigCollection, userUIDInLocalStorage); // Replace with your collection and document IDs
        const configDocSnapshot = await getDoc(configDocRef);

        if (configDocSnapshot.exists()) {
          const data = configDocSnapshot.data();
          setConfigSettings(data);
        }
      } catch (error) {
        console.error("Error fetching configuration settings:", error);
      }
    };

    fetchConfigSettings();
    setIsFetching(false);
  }, [isFetching]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedSettings({ ...configSettings });
  };

  const handleSave = async () => {
    try {
      // Update configuration settings in Firestore

      const configDocRef = doc(ConfigCollection, userUIDInLocalStorage); // Replace with your collection and document IDs
      await setDoc(configDocRef, editedSettings);

      setConfigSettings(editedSettings);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating configuration settings:", error);
    }
  };
  const materialTypes = ["ABS", "PLA", "TPU", "NYLON", "PETG", "RESIN"];
  return (
    <Step1Container>
      <Container>
     
        <UPHeaderFullline1>Admin Config Page</UPHeaderFullline1>
        <LoginFromcontainer>
        <PriceCalculatorExplanation />
          {isFetching?
            <RotatingLoader/>
          :
          isEditing ? (
            <div>
              <div>
                <UPHeaderFullline1>
                  Edit Configuration Settings
                </UPHeaderFullline1>
                <CloseButton onClick={() => setIsEditing(false)}>X</CloseButton>
                {/* Input fields for each setting */}
                <ConfigSubHeader>
                  Print Time Per Unit Volume (minutes/cm^3):
                </ConfigSubHeader>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "10px",
                  }}
                >
                  {materialTypes.map((materialType) => (
                    <label
                      key={materialType}
                      style={{
                        width: "80px",
                        marginRight: "15px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <FontMid>{materialType}</FontMid>
                      <InputelemSmall
                        type="number"
                        value={
                          editedSettings.printTimePerUnitVolume[materialType]
                        }
                        onChange={(e) =>
                          setEditedSettings((prevSettings) => ({
                            ...prevSettings,
                            printTimePerUnitVolume: {
                              ...prevSettings.printTimePerUnitVolume,
                              [materialType]: parseFloat(e.target.value),
                            },
                          }))
                        }
                      />
                    </label>
                  ))}
                  {/* Repeat similar input fields for other materials */}
                </div>
                <ConfigSubHeader>
                  Material Costs (SGD per gram):
                </ConfigSubHeader>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "10px",
                  }}
                >
                  {materialTypes.map((materialType) => (
                    <label
                      key={materialType}
                      style={{
                        width: "80px",
                        marginRight: "15px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <FontMid>{materialType}</FontMid>
                      <InputelemSmall
                        type="number"
                        value={
                          editedSettings.materialCosts[materialType]
                        }
                        onChange={(e) =>
                          setEditedSettings((prevSettings) => ({
                            ...prevSettings,
                            materialCosts: {
                              ...prevSettings.materialCosts,
                              [materialType]: parseFloat(e.target.value),
                            },
                          }))
                        }
                      />
                    </label>
                  ))}
               
                  {/* Repeat similar input fields for other materials */}
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "10px",
                  }}
                >
                  <label
                    style={{
                      width: "150px",
                      marginRight: "15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <p>Hourly Rate (SGD/hour):</p>

                    <InputelemSmall
                      type="number"
                      value={editedSettings.hourlyRate}
                      onChange={(e) =>
                        setEditedSettings((prevSettings) => ({
                          ...prevSettings,
                          hourlyRate: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </label>

                  <label
                    style={{
                      width: "150px",
                      marginRight: "15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <p>Labor Cost (SGD/hour):</p>

                    <InputelemSmall
                      type="number"
                      value={editedSettings.laborCost}
                      onChange={(e) =>
                        setEditedSettings((prevSettings) => ({
                          ...prevSettings,
                          laborCost: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </label>

                  <label
                    style={{
                      width: "150px",
                      marginRight: "15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <p>Overhead Cost (SGD):</p>

                    <InputelemSmall
                      type="number"
                      value={editedSettings.overheadCost}
                      onChange={(e) =>
                        setEditedSettings((prevSettings) => ({
                          ...prevSettings,
                          overheadCost: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </label>
                </div>
              </div>
              <AddButton onClick={handleSave}>Save</AddButton>
            </div>
          ) : (
            <div>
              <UPHeaderFullline1>
                Current Configuration Settings
              </UPHeaderFullline1>
              <ConfigSubHeader>
                Print Time Per Unit Volume (minutes/cm^3)
              </ConfigSubHeader>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  margin: "10px",
                }}
              >
                {materialTypes.map((materialType) => (
                    <label
                      key={materialType}
                      style={{
                        width: "80px",
                        marginRight: "15px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <FontMid>{materialType}</FontMid>
                      {configSettings.printTimePerUnitVolume[materialType]}
                    </label>
                  ))}
               
              
              </div>

              <ConfigSubHeader>Material Costs (SGD per gram): </ConfigSubHeader>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  margin: "10px",
                }}
              >
                  {materialTypes.map((materialType) => (
                    <label
                      key={materialType}
                      style={{
                        width: "80px",
                        marginRight: "15px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <FontMid>{materialType}</FontMid>
                      {configSettings.materialCosts[materialType]}
                    </label>
                  ))}
              
              </div>
              <ConfigSubHeader>Administrative Costs: </ConfigSubHeader>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  margin: "10px",
                }}
              >
                <label
                  style={{
                    width: "150px",
                    marginRight: "15px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <FontMid>Hourly Rate (SGD/hour):</FontMid>
                  {configSettings.hourlyRate}
                </label>

                <label
                  style={{
                    width: "150px",
                    marginRight: "15px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <FontMid>Labor Cost (SGD/hour):</FontMid>
                  {configSettings.laborCost}
                </label>

                <label
                  style={{
                    width: "150px",
                    marginRight: "15px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <FontMid>Overhead Cost (SGD):</FontMid>
                  {configSettings.overheadCost}
                </label>
              </div>

              <AddButton onClick={handleEdit}>Edit</AddButton>
            </div>
          )}

          {/* Display price structure explanation */}
          {/* ... */}
        </LoginFromcontainer>

       
      </Container>
    </Step1Container>
  );
};

export default ConfigPage;
