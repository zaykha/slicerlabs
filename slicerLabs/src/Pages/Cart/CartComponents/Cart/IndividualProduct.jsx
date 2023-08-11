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
import { Grid, OrbitControls } from "@react-three/drei";

import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Box3, DoubleSide, Mesh, MeshNormalMaterial, Vector3 } from "three";
import * as blobUtil from "blob-util";
import { doc, getDoc } from "firebase/firestore";
import { ConfigCollection } from "../../../../firebase";
import RotatingLoader from "../../../../globalcomponents/DropDown/RotatingLoader";

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
  const userUIDInLocalStorage = localStorage.getItem("uid");
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
    try {
      const configDocRef = doc(ConfigCollection, userUIDInLocalStorage); // Replace with your collection and document IDs
      const configDocSnapshot = await getDoc(configDocRef);

      if (configDocSnapshot.exists()) {
        const data = configDocSnapshot.data();
        setMaterialSettings(data);
      }
      console.log(materialSettings)
    } catch (error) {
      console.error("Error fetching configuration settings:", error);
    }
  };
  useEffect(() => {
    setIsFetchingMSetting(true);
    fetchConfigSettings();
    setIsFetchingMSetting(false);
  }, [isFetchingMSetting])
  
  // Fetch the calculatePrice function from local storage
  useEffect(() => {

    if (calculatePriceString) {
     const calculatePriceFunctionToStore = parseStoredFunction(
        "calculatePrice",
        calculatePriceString
      );
      // console.log(
      //   "Parsed calculatePriceFunction:",
      //   calculatePriceFunctionToStore
      // );

      // Now you have the parsed functions, you can use them as needed
      // For example, you can store them in state or use them directly.
      // setCalculatePriceFunction(
      //   calculatePriceFunctionToStore
      // );
      newPricetoUpdate(calculatePriceFunctionToStore);
    }
    // fetchConfigSettings();
  }, [material, color, width, height, depth]);

  const newPricetoUpdate = (anotherFunction) => {
    // console.log(anotherFunction);
    if (
      anotherFunction &&
      material &&
      color &&
      width &&
      height &&
      depth
    ) {
      const newPrice = anotherFunction(material, color, {
        width,
        height,
        depth,
      },
      materialSettings
      );
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
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      onDelete(tempID);
    }
  };

  const CameraControls = ({ cameraPosition }) => {
    const { camera } = useThree();
    useEffect(() => {
      if (camera && cameraPosition) {
        camera.position.set(...cameraPosition);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      }
    }, [camera, cameraPosition]);

    // useFrame(() => {
    //   console.log('Camera Position:', camera.position.toArray());
    // });

    return null;
  };
  const ModelSizeChecker = ({ model }) => {
    const { camera } = useThree();
    const boundingBoxRef = useRef();
  
    if (model && boundingBoxRef.current) {
      // Calculate the size of the model's bounding box
      const boundingBox = new Box3().setFromObject(model);
      const size = new Vector3();
      boundingBox.getSize(size);
  
      // Get the size of the camera frustum
      const frustumSize =
        Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z * 2;
  
      // Calculate the scale factor based on the size of the model and the frustum size
      const scaleFactor = frustumSize / Math.max(size.x, size.y, size.z);
  
      // Apply the scale factor to the model
      model.scale.set(scaleFactor, scaleFactor, scaleFactor);
  
      // Set the camera position based on the model's size
      const cameraPosition = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      };
      camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
      model.rotation.x = Math.PI;
    }
  
    return <primitive object={model} ref={boundingBoxRef} />;
  };

  const totalPrice = (price * quantity).toFixed(2);
  return (
    <div className="box">
      {isFetchingMSetting?
        <RotatingLoader />
      :<div className="ITEM-wrapper">
        <div className="ITEM">
          <div className="overlap">
            <div className="vertical-Division1">
              <div className="ezgif-wrapper">
                <Canvas>
                  <Grid cellSize={3} infiniteGrid={true} />
                  <OrbitControls />
                  <ambientLight />
                  <pointLight position={[10, 10, 10]} />
                  <ModelSizeChecker model={model} />
                  {/* {model && (
                    <primitive
                      object={model}
                      position={[0, 0, 0]}
                      scale={[0.1, 0.1, 0.1]}
                    />
                  )} */}
                  <CameraControls cameraPosition={cameraPosition} />
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
                <Moption value="Resin">Resins</Moption>
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
                  value={width}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value >= 10) {
                      dispatch(
                        updateDimensions({
                          ProductId: tempID,
                          width: value,
                          height,
                          depth,
                        })
                      );
                    }
                  }}
                  style={{
                    width: "28%",
                    background: "rgba(87, 87, 87, 0.43)",
                    border: "1px solid #D5D5D5",
                    borderRadius: "10px",
                    color: "white",
                    margin: "0px auto 15px",
                    padding: "8px",
                    textAlign: "center",
                    height: "40px",
                    fontSize: "1.1rem",
                  }}
                />

                <input
                  type="number"
                  placeholder="Height"
                  value={height}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value >= 10) {
                      handleDimensionsChange(width, value, depth);
                    }
                  }}
                  style={{
                    width: "28%",
                    background: "rgba(87, 87, 87, 0.43)",
                    border: "1px solid #D5D5D5",
                    borderRadius: "10px",
                    color: "white",
                    margin: "0px auto 15px",
                    padding: "8px",
                    textAlign: "center",
                    height: "40px",
                    fontSize: "1.1rem",
                  }}
                />

                <input
                  type="number"
                  placeholder="Depth"
                  value={depth}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value >= 10) {
                      handleDimensionsChange(width, height, value);
                    }
                  }}
                  style={{
                    width: "28%",
                    background: "rgba(87, 87, 87, 0.43)",
                    border: "1px solid #D5D5D5",
                    borderRadius: "10px",
                    color: "white",
                    margin: "0px auto 15px",
                    padding: "8px",
                    textAlign: "center",
                    height: "40px",
                    fontSize: "1.1rem",
                  }}
                />
              </div>
            </div>

            <div className="vertical-Division3">
              <div className="div">Total :</div>
              <div className="overlap-group">
                <div className="text-wrapper-3">SGD</div>
                <div className="text-wrapper-2">{totalPrice}</div>
              </div>
            </div>

            <div className="group" onClick={handleDelete}>
              <div className="overlap-group-2">
                <div className="rectangle">
                  <div className="text-wrapper-5">x</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-wrapper-4"> ID : {tempID}</div>
        </div>
      </div>}
    </div>
  );
};

export default IndividualProduct;
