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
} from "../../../../ReduxStore/reducers/CartItemReducer";
import { Canvas, useThree } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";

import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Box3, Mesh, MeshNormalMaterial, Vector3 } from "three";
import * as blobUtil from 'blob-util';

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
  const cartItemsDetails = useSelector((state) => state.cartItems.cartItems);
  const dispatch = useDispatch();
  // const [model, setModel] = useState(null);
  const [cameraPosition, setCameraPosition] = useState([
    -7.726866370752757, 7.241928986275022, -8.091348270643504,
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const DB_NAME = "TEMP_MODEL_STORAGE";
  const DB_VERSION = 1;
  const OBJECT_STORE_NAME = "models";

  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        db.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
      };

      request.onsuccess = () => {
        const db = request.result;
        resolve(db);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  };

  useEffect(() => {
    console.log(model)
    const loadModel = async () => {
      try {
        // const filesRetrieved = await cartItemsDetails.model;
        // console.log(filesRetrieved);
        // retrieveModelsFromIndexedDB(tempID);
        const objLoader = new OBJLoader();
        objLoader.load(
          model,
          (objData) => {
            const material = new MeshNormalMaterial();

            objData.traverse((child) => {
              if (child instanceof Mesh) {
                child.material = material;
              }
            });
            objData.updateMatrix();
            // setModel(objData);
            setCameraPosition([
              -7.726866370752757, 7.241928986275022, -8.091348270643504,
            ]);
            setIsLoading(false);
            // setIsModelLoaded(true);
          },
          // undefined,
          function (xhr) {
            // const percentLoaded = Math.floor((xhr.loaded / totalSize) * 100);
            // set3DProgress(percentLoaded)
            console.log(Math.floor((xhr.loaded) * 100));
          },
          // onProgress,
          (error) => {
            console.log("An error happened", error);
            // setIsSupportedFileType(false);
            setIsLoading(false);
            console.log (
              "Invalid file type or file is corrupted. Please upload only .stl and .obj files."
            );
          }
        );
        // if (filesRetrieved.length > 0) {
        //   const fileContent = filesRetrieved[0].file;
        //   const fileExtension = filesRetrieved[0].fileExtension;
  
        //   if (fileExtension === 'obj') {
        //     const objLoader = new OBJLoader();
        //     objLoader.load(
        //       fileContent,
        //       (objData) => {
        //         const material = new MeshNormalMaterial();

        //         objData.traverse((child) => {
        //           if (child instanceof Mesh) {
        //             child.material = material;
        //           }
        //         });
        //         objData.updateMatrix();
        //         setModel(objData);
        //         setCameraPosition([
        //           -7.726866370752757, 7.241928986275022, -8.091348270643504,
        //         ]);
        //         setIsLoading(false);
        //         setIsModelLoaded(true);
        //       },
        //       // undefined,
        //       function (xhr) {
        //         // const percentLoaded = Math.floor((xhr.loaded / totalSize) * 100);
        //         // set3DProgress(percentLoaded)
        //         console.log(Math.floor((xhr.loaded / totalSize) * 100));
        //       },
        //       // onProgress,
        //       (error) => {
        //         console.log("An error happened", error);
        //         setIsSupportedFileType(false);
        //         setIsLoading(false);
        //         setError(
        //           "Invalid file type or file is corrupted. Please upload only .stl and .obj files."
        //         );
        //       }
        //     );
        //   } else if (fileExtension === 'stl') {
        //     // const stlLoader = new STLLoader();
        //     // const stlData = await stlLoader.loadAsync(fileContent);
        //     // setModel(stlData);
        //   }
        // }
      } catch (error) {
        console.log("Error loading model:", error);
      }
    };

    loadModel();
  }, [tempID]);

  const retrieveModelsFromIndexedDB = async (tempID) => {
    try {
      const db = await openDatabase(); // Await the openDatabase call
      const transaction = db.transaction([OBJECT_STORE_NAME], "readonly");
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

      const getRequest = objectStore.getAll();

      return new Promise((resolve, reject) => {
        getRequest.onsuccess = (event) => {
          const models = event.target.result;

          // Filter the models by tempID
          const filteredModels = models.filter((model) => model.id === tempID);

          // Log the count and retrieved models
          console.log("Number of items:", filteredModels.length);
          console.log("Retrieved models:", filteredModels);
          console.log("Retrieved file type:", filteredModels[0].fileExtension);


          resolve(filteredModels);
        };

        getRequest.onerror = (event) => {
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.log("Failed to open IndexedDB", error);
      throw error;
    }
  };

  const handleRetrieveAllModels = async () => {
    await retrieveModelsFromIndexedDB();
  };

  // const retrieveModelFromIndexedDB = async (tempID) => {
  //   return new Promise((resolve, reject) => {
  //     const request = indexedDB.open(DB_NAME, DB_VERSION);
  //     request.onerror = (event) => {
  //       reject(request.error);
  //     };

  //     request.onsuccess = (event) => {
  //       const db = event.target.result;
  //       const transaction = db.transaction(OBJECT_STORE_NAME , 'readonly');
  //       const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

  //       const getRequest = objectStore.get(tempID);

  //       getRequest.onsuccess = (event) => {
  //         const result = event.target.result;
  //         if (result) {
  //           // const decodedContent = atob(result.file); // Decode the file content
  //           // resolve(decodedContent);
  //           // console.log(result.file);
  //           resolve(result.file)
  //         } else {
  //           reject(new Error('Model not found in IndexedDB'));
  //         }
  //       };

  //       getRequest.onerror = (event) => {
  //         reject(request.error);
  //       };
  //     };
  //   });
  // };

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
  const ModelSizeChecker = ({ model }) => {
    const { camera } = useThree();
    const boundingBoxRef = useRef();

    useEffect(() => {
      const checkModelSize = () => {
        const boundingBox = new Box3().setFromObject(model);
        const size = new Vector3();
        boundingBox.getSize(size);

        // Get the size of the camera frustum
        const frustumSize =
          Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z * 2;

        // Calculate the scale factor based on the size of the model and the frustum size
        // const scaleFactor = frustumSize / Math.max(size.x, size.y, size.z);

        // Apply the scale factor to the model
        // model.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // // Position the model at the center of the viewport
        // const modelCenter = boundingBox.getCenter(new Vector3());
        // model.position.sub(modelCenter);
      };

      if (model && boundingBoxRef.current) {
        checkModelSize();
      }
    }, [model, camera]);

    return <primitive object={model} ref={boundingBoxRef} />;
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
  return (
    <div className="box">
      <div className="ITEM-wrapper">
        <div className="ITEM">
          <div className="overlap">
            <div className="vertical-Division1">
              <div className="ezgif-wrapper">
                <Canvas
                // style={{
                //   width: "773px",
                //   height: "300px",
                //   // zIndex: 6,
                //   // border:"1px solid red"
                // }}
                >
                  <Grid cellSize={3} infiniteGrid={true} />
                  <OrbitControls />
                  <ambientLight />
                  <pointLight position={[10, 10, 10]} />
                  <ModelSizeChecker model={model} />
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
                <div className="text-wrapper-2">{price}</div>
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
      </div>
    </div>
  );
};

export default IndividualProduct;
