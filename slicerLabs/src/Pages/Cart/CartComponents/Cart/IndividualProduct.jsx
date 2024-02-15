import React, { useEffect, useRef } from "react";
import "./IndividualProductelement.css";
import {
  MOdropdown,
  Mdropdownlabel,
  Moption,
} from "../../../StartPrinting/StartPrintingComponents/MaterialsOptions/MaterialsOptionselements";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  updateColor,
  updateDimensions,
  updateMaterial,
  updatePrice,
} from "../../../../ReduxStore/reducers/CartItemReducer";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Grid,
  OrbitControls,
  PresentationControls,
  Stage,
} from "@react-three/drei";

import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Box3, DoubleSide, Mesh, MeshNormalMaterial, Vector3 } from "three";
import * as blobUtil from "blob-util";
import { doc, getDoc } from "firebase/firestore";
import { ConfigCollection } from "../../../../firebase";
import RotatingLoader from "../../../../globalcomponents/DropDown/RotatingLoader";
import ConfirmationPrompt from "../../../../globalcomponents/prompt/ConfirmationPrompt";
import styled from "styled-components";
import ModelSizeChecker from "../../../StartPrinting/StartPrintingComponents/Dropfile/ModelSizeChecker";
import html2canvas from "html2canvas";
const Box = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const ItemWrapper = styled.div`
  border: 0px none;
  overflow-x: hidden;
  width: 1200px;
`;

const Item = styled.div`
  position: relative;
  width: 1200px;
`;

const VerticalDivision = styled.div`
  width: ${({ width }) => width || "auto"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Overlap = styled.div`
  background: linear-gradient(180deg, rgb(8, 51, 71) 0%, rgb(0, 80, 118) 100%);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: #386379;
  border-radius: 10px;
  position: relative;
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px;
`;

const TextWrapper = styled.div`
  color: ${({ color }) => color || "#ffffff"};
  font-family: ${({ font }) => font || "Inter-Bold, Helvetica"};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  font-weight: ${({ fontWeight }) => fontWeight || "700"};
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  white-space: nowrap;
`;

const Group = styled.div`
  height: ${({ height }) => height || "auto"};
  position: ${({ position }) => position || "static"};
  width: ${({ width }) => width || "auto"};
`;

const Rectangle = styled.div`
  background-color: ${({ bgColor }) => bgColor || "#e9e9e930"};
  border: 1px solid ${({ borderColor }) => borderColor || "#c1c1c1"};
  border-radius: 10px;
  height: ${({ height }) => height || "auto"};
  position: relative;
  width: ${({ width }) => width || "auto"};
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  type: number;
  placeholder: ${({ placeholder }) => placeholder};
  value: ${({ value }) => value};
  width: ${({ width }) => width || "28%"};
  background: ${({ background }) => background || "rgba(87, 87, 87, 0.43)"};
  border: ${({ border }) => border || "1px solid #D5D5D5"};
  border-radius: 10px;
  color: ${({ color }) => color || "white"};
  margin: ${({ margin }) => margin || "0px auto 15px"};
  padding: 8px;
  text-align: center;
  height: ${({ height }) => height || "40px"};
  font-size: ${({ fontSize }) => fontSize || "1.1rem"};
`;

const Flexdiv = styled.div`
  display: flex;
  height: 30px;
  justify-content: center;
  align-items: flex-start;
  color: white;
`;
const IndividualProduct = ({
  index,
  tempID,
  model,
  material,
  color,
  width,
  height,
  depth,
  quantity,
  price,
  onDelete,
  setuserConfirmationPrompt,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [IndividualTtlPrice, setIndividualTtlPrice] = useState(price);
  const [isFetchingMSetting, setIsFetchingMSetting] = useState(false);
  const cartItemsDetails = useSelector((state) => state.cartItems.cartItems);
  const dispatch = useDispatch();
  // const [model, setModel] = useState(null);
  const [cameraPosition, setCameraPosition] = useState([
    -7.726866370752757, 7.241928986275022, -8.091348270643504,
  ]);
  const canvasRef = useRef();
  const userUIDInLocalStorage = localStorage.getItem("uid");
  const userDetails = useSelector((state) => state?.userDetails);
  const [materialSettings, setMaterialSettings] = useState({
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
  // const [materialSettings, setMaterialSettings] = useState();
  const parseStoredFunction = (functionName, storedFunction) => {
    try {
      const Unstring = JSON.parse(storedFunction);

      // Use eval() to convert the object to a function
      const parsedFunction = eval(`(${Unstring})`);
      // console.log(parsedFunction)
      // const parsedFunction = new Function(`return ${functionization}`)
      if (typeof parsedFunction === "function") {
        return parsedFunction;
      } else {
        throw new Error(`Parsed ${functionName} is not a function`);
      }
    } catch (error) {
      console.error(`Error parsing ${functionName} function:`, error);
      return null;
    }
  };
  const calculatePriceString = localStorage.getItem("calculatePriceFunction");
  const fetchConfigSettings = async () => {
    setIsFetchingMSetting(true);
    try {
      const configDocRef = doc(
        ConfigCollection,
        "irr8pVIaN4S4JjkMlEreZi8wC7G2"
      ); // Replace with your collection and document IDs
      const configDocSnapshot = await getDoc(configDocRef);

      if (configDocSnapshot.exists()) {
        const ConfigData = configDocSnapshot.data();
        // configDocSnapshot.forEach(doc => {
        //   const data = doc.data();
        // console.log(data);

        // });
        setMaterialSettings(ConfigData);
        console.log(ConfigData);
      } else {
        console.log("fail to fetch calc func from firebase");
        console.log(configDocSnapshot);
      }
    } catch (error) {
      console.error("Error fetching configuration settings:", error);
    }
    setIsFetchingMSetting(false);
  };
  useEffect(() => {
    fetchConfigSettings();
  }, []);

  // Fetch the calculatePrice function from local storage
  useEffect(() => {
    if (calculatePriceString) {
      const calculatePriceFunctionToStore = parseStoredFunction(
        "calculatePrice",
        calculatePriceString
      );
      console.log(materialSettings);
      // Now you have the parsed functions, you can use them as needed
      // For example, you can store them in state or use them directly.
      // setCalculatePriceFunction(
      //   calculatePriceFunctionToStore
      // );
      newPricetoUpdate(calculatePriceFunctionToStore);
    }
    // fetchConfigSettings();
  }, [material, color, width, height, depth, isFetchingMSetting]);

  const newPricetoUpdate = (anotherFunction) => {
    // console.log(anotherFunction);
    if (anotherFunction && material && color && width && height && depth) {
      const newPrice = anotherFunction(
        material,
        color,
        {
          width,
          height,
          depth,
        },
        materialSettings
      );
      // console.log(
      //   material,
      //   color,
      //   {
      //     width,
      //     height,
      //     depth,
      //   },
      //   materialSettings
      // );
      dispatch(updatePrice({ ProductId: tempID, newPrice }));
      // setPrice(newPrice);
    }
  };

  const increaseQuantityAction = (ProductId) => {
    dispatch(increaseQuantity({ ProductId }));
  };

  const decreaseQuantityAction = (ProductId) => {
    dispatch(decreaseQuantity({ ProductId }));
  };

  const handleMaterialChange = (e) => {
    const newMaterial = e.target.value;
    dispatch(updateMaterial({ ProductId: tempID, newMaterial }));
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    dispatch(updateColor({ ProductId: tempID, newColor }));
  };

  const handleDimensionsChange = (width, height, depth) => {
    dispatch(updateDimensions({ ProductId: tempID, width, height, depth }));
  };
  // useEffect(() => {
  //   console.log(confirmationHandling.state);
  // }, [confirmationHandling]);
  const handleDelete = () => {
    // setuserConfirmationPrompt(true);
    // console.log("deleting")
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      onDelete(tempID);
    }
  };
  // useEffect(() => {
  //   const captureScreenshot = async () => {
  //     if (canvasRef.current) {
  //       console.log("Canvas component is rendered properly.");
  //       const canvas = await html2canvas(canvasRef.current);
  //       const screenshotUrl = canvas.toDataURL();
  //       console.log("Screenshot taken:", screenshotUrl);
  //     }
  //   };

  //   captureScreenshot();
  // }, [canvasRef.current]);

  const totalPrice = (price * quantity).toFixed(2);
  return (
    <div className="box">
      {isFetchingMSetting ? (
        <RotatingLoader />
      ) : (
        // <div className="ITEM-wrapper">
        // {/* <div className="ITEM"> */}
        <div className="overlap">
          <div className="vertical-Division1">
            <div className="ezgif-wrapper">
              <Canvas
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
                linear={"true"}
                dpr={[1, 2]}
                camera={{ fov: 45 }}
              >
                <color attach="background" args={["#0f4863"]} />
                <PresentationControls>
                  <Stage environment={"forest"}>
                    <OrbitControls />
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <primitive object={model} scale={0.01} />
                  </Stage>
                </PresentationControls>
              </Canvas>
            </div>
          </div>

          <div className="vertical-Division1">
            <h1 className="text-wrapper">ITEM {index}</h1>

            <div className="group-2">
              <div className="overlap-group-wrapper">
                <div
                  className="overlap-group-3"
                  onClick={() => increaseQuantityAction(tempID)}
                >
                  <div className="rectangle-2">
                    <div className="text-wrapper-7">+</div>
                  </div>
                </div>
                <div className="text-wrapper-6">{quantity}</div>

                <div
                  className="overlap-2"
                  onClick={() => decreaseQuantityAction(tempID)}
                >
                  <div className="rectangle-3">
                    <div className="text-wrapper-8">-</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="vertical-Division2">
            <Mdropdownlabel htmlFor="material">Materials</Mdropdownlabel>
            <MOdropdown value={material} onChange={handleMaterialChange}>
              <Moption value="">Please Select a Material</Moption>
              <Moption value="ABS">
                Acrylonitrile Butadiene Styrene (ABS)
              </Moption>
              <Moption value="PLA">Polylactic Acid (PLA)</Moption>
              <Moption value="TPU">Thermoplastic Polyurethane (TPU)</Moption>
              <Moption value="Nylon">Nylon</Moption>
              <Moption value="PETG">
                Polyethylene Terephthalate Glycol (PETG)
              </Moption>
              <Moption value="RESIN">Resins</Moption>
            </MOdropdown>

            <Mdropdownlabel htmlFor="color">Finshing & Color</Mdropdownlabel>
            <MOdropdown value={color} onChange={handleColorChange}>
              <Moption value="">Please Select a Color</Moption>
              <Moption value="white">White</Moption>
              <Moption value="black">Black</Moption>
              <Moption value="transparent">Transparent</Moption>
            </MOdropdown>

            <Mdropdownlabel htmlFor="width">
              Dimension ( Width x Height x Depth )
            </Mdropdownlabel>

            <div
              style={{
                display: "flex",
              }}
            >
              <input
                type="number"
                placeholder="Width"
                value={width.toFixed(2)}
                readOnly // Make the input field uneditable
                step="1" // Allow only whole numbers
                style={{
                  width: "28%",
                  background: "rgba(38, 38, 38, 0.43)",
                  border: "1px solid #4a4a4a",
                  borderRadius: "10px",
                  color: "white",
                  margin: "0px auto 15px",
                  padding: "8px",
                  textAlign: "center",
                  height: "40px",
                  fontSize: "1.1rem",
                  pointerEvents: "none", // Make it unclickable
                }}
              />

              <input
                type="number"
                placeholder="Height"
                value={height.toFixed(2)}
                readOnly // Make the input field uneditable
                step="1" // Allow only whole numbers
                style={{
                  width: "28%",
                  background: "rgba(38, 38, 38, 0.43)",
                  border: "1px solid #4a4a4a",
                  borderRadius: "10px",
                  color: "white",
                  margin: "0px auto 15px",
                  padding: "8px",
                  textAlign: "center",
                  height: "40px",
                  fontSize: "1.1rem",
                  pointerEvents: "none", // Make it unclickable
                }}
              />

              <input
                type="number"
                placeholder="Depth"
                value={depth.toFixed(2)}
                readOnly // Make the input field uneditable
                step="1" // Allow only whole numbers
                style={{
                  width: "28%",
                  background: "rgba(38, 38, 38, 0.43)",
                  border: "1px solid #4a4a4a",
                  borderRadius: "10px",
                  color: "white",
                  margin: "0px auto 15px",
                  padding: "8px",
                  textAlign: "center",
                  height: "40px",
                  fontSize: "1.1rem",
                  pointerEvents: "none", // Make it unclickable
                }}
              />
            </div>
          </div>
          {isFetchingMSetting ? (
            <RotatingLoader />
          ) : (
            <div className="vertical-Division3">
              <div className="div">Total :</div>
              <div className="overlap-group">
                <div className="text-wrapper-3">SGD</div>
                <div className="text-wrapper-2">{totalPrice}</div>
              </div>
            </div>
          )}
          <div className="text-wrapper-4"> ID : {tempID}</div>
          <div className="group" onClick={handleDelete}>
            <div className="overlap-group-2">
              <div className="rectangle">
                <div className="text-wrapper-5">x</div>
              </div>
            </div>
          </div>
        </div>

        //   {/* </div> */}
        // {/* </div> */}
      )}
    </div>
  );
};

export default IndividualProduct;
