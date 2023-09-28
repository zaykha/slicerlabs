import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  DropzoneContainer,
  DropzoneFormcontainer,
  Errbutton,
  ErrorCard,
  ErrorContainer,
  UPFullline,
  UPHeaderFullline,
} from "./Dropfileelements";
import { useDropzone } from "react-dropzone";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshBasicMaterial, PerspectiveCamera } from "three";
import { Grid, OrbitControls } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import {
  addModel,
  addModelToTempState,
  deleteModel,
  updateModel,
} from "../../../../ReduxStore/reducers/CartItemReducer";
import { v4 as uuidv4 } from "uuid";
import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MeshNormalMaterial, Box3, Vector3, Mesh, LoadingManager } from "three";
import {
  deleteAllRecordsFromDB,
  deleteFileFromDB,
  storeFileInDB,
} from "../../../../indexedDBUtilis";
import { TocartCTABtn } from "../MaterialsOptions/MaterialsOptionselements";
import ModelSizeChecker from "./ModelSizeChecker";

const STLModelSizeChecker = ({ model }) => {
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

const Dropfile = ({
  tempModelId,
  setTempModelId,
  isModelLoaded,
  setIsModelLoaded,
  isCheckedOut,
  setIsCheckedOut,
  isAddedToCart,
  setIsAddedToCart,
}) => {
  const [files, setFiles] = useState([]);
  const [filetype, setFiletype] = useState("");

  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupportedFileType, setIsSupportedFileType] = useState(true);
  const [LoadProgress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const cameraRef = useRef();
  const meshRef = useRef();
  const dispatch = useDispatch();
  // const ProductId = useSelector((state) => state.cartItems.tempModelId);
  const [cameraPosition, setCameraPosition] = useState([
    -7.726866370752757, 7.241928986275022, -8.091348270643504,
  ]); // Initial camera position
  const CameraControls = ({ cameraPosition }) => {
    const { camera } = useThree();
    useEffect(() => {
      if (camera && cameraPosition) {
        camera.position.set(...cameraPosition);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      }
    }, [camera, cameraPosition]);
    return null;
  };

  const generateUniqueId = () => {
    return uuidv4();
  };

  useEffect(() => {
    if (isCheckedOut || isAddedToCart) {
      setModel(null);
      // setIsModelLoaded(false);
      setFiles(null);
    }
  }, [isCheckedOut, isAddedToCart]);

  const modelId = generateUniqueId();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".stl,.obj",
    onDrop: async (acceptedFiles, rejectedFiles) => {
      setIsLoading(true);
      if (rejectedFiles.length > 0) {
        setError("Invalid file type or file is corrupted");
        setIsLoading(false);
        return;
      }

      const uploadedFile = acceptedFiles[0];
      const maxSize = 60 * 1024 * 1024; // 60MB in bytes
      if (uploadedFile.size > maxSize) {
        setError("File size exceeds the maximum allowed (60MB).");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setIsSupportedFileType(true);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      const fileExtension = acceptedFiles[0].name
        .split(".")
        .pop()
        .toLowerCase();
      await storeFileInDB(acceptedFiles[0], fileExtension, modelId);
      console.log(fileExtension);
      setFiletype(fileExtension);
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const fileContent = reader.result;
          console.log("fileContent", acceptedFiles[0]);
          if (fileExtension === "obj") {
            // Define the onProgress callback function
            const manager = new LoadingManager();
            const uploadedFile = acceptedFiles[0];
            const totalSize = uploadedFile.size;

            manager.onLoad = function () {
              console.log("Loading complete!");
              setIsLoading(false);
              setIsModelLoaded(true);
            };

            manager.onProgress = function (url, itemsLoaded, itemsTotal) {
              const percentLoaded = Math.floor(
                (itemsLoaded / itemsTotal) * 100
              );
              // set3DProgress(percentLoaded);
              // console.log(itemsTotal, itemsLoaded, percentLoaded);
            };

            manager.onError = function (url) {
              console.log("There was an error loading " + url);
              setIsLoading(false);
              setIsModelLoaded(false);
            };

            const objLoader = new OBJLoader(manager);
            objLoader.load(
              fileContent,
              (objData) => {
                console.log(objData);
                const material = new MeshNormalMaterial();

                objData.traverse((child) => {
                  if (child instanceof Mesh) {
                    child.material = material;
                  }
                });
                objData.updateMatrix();

                const boundingBox = new THREE.Box3().setFromObject(objData);
                const dimensions = boundingBox.getSize(new THREE.Vector3());
                const scaleFactor = 1; // Adjust this based on your assumptions

                const dimensionsInMM = {
                  width: dimensions.x * scaleFactor,
                  height: dimensions.y * scaleFactor,
                  depth: dimensions.z * scaleFactor,
                };

                console.log("Dimensions in millimeters:", dimensionsInMM);
                // const serializedModel = JSON.stringify(objData);
                dispatch(
                  addModel({
                    id: modelId,
                    fileName: acceptedFiles[0].name,
                    model: objData,
                    dimensions: dimensionsInMM
                  })
                );
                setModel(objData);
                setCameraPosition([
                  -7.726866370752757, 7.241928986275022, -8.091348270643504,
                ]);
                setIsLoading(false);
                setIsModelLoaded(true);
                setIsAddedToCart(false);

                
              },
              // undefined,
              function (xhr) {
                // const percentLoaded = Math.floor((xhr.loaded / totalSize) * 100);
                // set3DProgress(percentLoaded)
                console.log(Math.floor((xhr.loaded / totalSize) * 100));
              },
              // onProgress,
              (error) => {
                console.log("An error happened", error);
                setIsSupportedFileType(false);
                setIsLoading(false);
                setError(
                  "Invalid file type or file is corrupted. Please upload only .stl and .obj files."
                );
              }
            );
          } else if (fileExtension === "stl") {
            const stlLoader = new STLLoader();
            stlLoader.load(
              fileContent,
              (stlGeometry) => {
                console.log(stlGeometry);
                if (stlGeometry) {
                  // Create a mesh using the loaded geometry and a material
                  const material = new THREE.MeshNormalMaterial();
                  const stlMesh = new THREE.Mesh(stlGeometry, material);
                  // Assign the mesh to the provided ref
                  meshRef.current = stlMesh;
                   // Calculate dimensions in millimeters
                   const boundingBox = new THREE.Box3().setFromObject(
                    stlGeometry
                  );
                  const dimensions = boundingBox.getSize(new THREE.Vector3());

                  // Assuming you have a scale factor to convert units to mm
                  const scaleFactor = 1; // Adjust this based on your assumptions

                  const dimensionsInMM = {
                    width: dimensions.x * scaleFactor,
                    height: dimensions.y * scaleFactor,
                    depth: dimensions.z * scaleFactor,
                  };
                  setModel(stlMesh);
                  setIsLoading(false);
                  setIsModelLoaded(true);
                  dispatch(
                    addModel({
                      id: modelId,
                      fileName: acceptedFiles[0].name,
                      model: stlMesh,
                      dimensions: dimensionsInMM
                    })
                  );
                  setCameraPosition([
                    -7.726866370752757, 7.241928986275022, -8.091348270643504,
                  ]);
                  setIsAddedToCart(false);
                 
                } else {
                  // Handle the case where the STL geometry is invalid
                  setIsSupportedFileType(false);
                  setIsLoading(false);
                  setError("Invalid STL file or file is corrupted.");
                }
              },
              (xhr) => {
                // Progress callback for STL loading
                const percentLoaded = Math.floor(
                  (xhr.loaded / xhr.total) * 100
                );
                console.log(percentLoaded);
              },
              (error) => {
                console.log("An error happened", error);
                setIsSupportedFileType(false);
                setIsLoading(false);
                setError(
                  "Invalid file type or file is corrupted. Please upload only .stl and .obj files."
                );
              }
            );
          } else {
            setIsSupportedFileType(false);
            setIsLoading(false);
            setError(
              "Invalid file type. Please upload only .stl and .obj files."
            );
          }

          // await saveModelToIndexedDB(modelId, fileContent, fileExtension);
          setTempModelId(modelId);
          dispatch(addModelToTempState(modelId));
          console.log(model, "this is model in dropfile");
        } catch (error) {
          console.log(error);
          setIsSupportedFileType(false);
          setIsLoading(false);
          setError(
            "Invalid file type or file is corrupted. Please upload only .stl and .obj files."
          );
        }
      };
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentLoaded = Math.floor((event.loaded / event.total) * 100);
          setProgress(percentLoaded);
        }
      };

      // setProgress(0);
      reader.readAsDataURL(acceptedFiles[0]);
    },
  });

  const handleDelete = () => {
    setModel(null);
    setIsModelLoaded(false);
    setFiles(null); // remove the file from the state
    // deleteModelFromIndexedDB(modelId);
    setProgress(0);
    dispatch(deleteModel(tempModelId));
    deleteFileFromDB(modelId);
  };

  // const ModelSizeChecker = ({ model }) => {
  //   const { camera } = useThree();
  //   const boundingBoxRef = useRef();

  //   useLayoutEffect(() => {
  //     const checkModelSize = () => {
  //       const boundingBox = new Box3().setFromObject(model);
  //       const size = new Vector3();
  //       boundingBox.getSize(size);

  //       // Get the size of the camera frustum
  //       const frustumSize =
  //         Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z * 2;

  //       // Calculate the scale factor based on the size of the model and the frustum size
  //       const scaleFactor = frustumSize / Math.max(size.x, size.y, size.z);

  //       // Apply the scale factor to the model
  //       model.scale.set(scaleFactor, scaleFactor, scaleFactor);

  //       // // Position the model at the center of the viewport
  //       // const modelCenter = boundingBox.getCenter(new Vector3());
  //       // model.position.sub(modelCenter);
  //     };

  //     if (model && boundingBoxRef.current) {
  //       checkModelSize();
  //     }
  //   }, [model, camera]);

  //   return <primitive object={model} ref={boundingBoxRef} />;
  // };

  // const ModelSizeChecker = ({ model }) => {
  //   const { camera } = useThree();
  //   const boundingBoxRef = useRef();

  //   if (model && boundingBoxRef.current) {
  //     // Calculate the size of the model's bounding box
  //     const boundingBox = new Box3().setFromObject(model);
  //     const size = new Vector3();
  //     boundingBox.getSize(size);

  //     // // Get the size of the camera frustum
  //     const frustumSize =
  //       Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z * 2;

  //     // Calculate the scale factor based on the size of the model and the frustum size
  //     const scaleFactor = frustumSize / Math.max(size.x, size.y, size.z);
  //     // const scaleFactor = 1;
  //     // Apply the scale factor to the model
  //     model.scale.set(scaleFactor, scaleFactor, scaleFactor);
  //     model.position.set(0, 0, 0);
  //     // Set the camera position based on the model's size
  //     const cameraPosition = {
  //       x: camera.position.x,
  //       y: camera.position.y,
  //       z: camera.position.z,
  //     };
  //     camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
  //     model.rotation.x = Math.PI;
  //   }

  //   return <primitive object={model} ref={boundingBoxRef} />;
  // };
  const ProgressBar = ({ LoadProgress }) => {
    return (
      <div>
        <div
          style={{
            width: "100%",
            height: "20px",
            border: "1px solid white",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: `${LoadProgress}%`,
              // width:"100%",
              height: "100%",
              backgroundColor: "#006B9E",
              borderRadius: "10px",
            }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <>
      {error && (
        <ErrorContainer>
          <ErrorCard>
            <h2>Error!</h2>
            {error}
            <Errbutton onClick={() => setError(null)}>OK</Errbutton>
          </ErrorCard>
        </ErrorContainer>
      )}

      {model && !isLoading ? (
        <DropzoneFormcontainer>
          <DropzoneContainer>
            <Canvas
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
            >
              <Grid cellSize={3} infiniteGrid={true} />
              <OrbitControls />
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              {/* {filetype === "obj" ? (
                <ModelSizeChecker model={model} />
              ) : (
                <STLModelSizeChecker  model={model}/>
                // model && <primitive object={model} ref={meshRef} />
              )} */}
              <ModelSizeChecker model={model} />
              <CameraControls cameraPosition={cameraPosition} />
            </Canvas>

            <button
              style={{
                width: "50px",
                position: "absolute",
                top: 0,
                right: 0,
                borderRadius: 10,
              }}
              onClick={handleDelete}
            >
              X
            </button>
          </DropzoneContainer>
        </DropzoneFormcontainer>
      ) : (
        <></>
      )}
      {!model && !isLoading ? (
        <DropzoneFormcontainer {...getRootProps()}>
          <DropzoneContainer>
            <input {...getInputProps()} />
            <UPFullline>Support files -(STL,OBJ)</UPFullline>
            <UPFullline>Max file size - 60MB</UPFullline>
            <UPFullline>Model measurment - mm</UPFullline>
            <UPHeaderFullline>
              {" "}
              Click Here Or Drop the File Directly.
            </UPHeaderFullline>
          </DropzoneContainer>
        </DropzoneFormcontainer>
      ) : (
        <></>
      )}

      {isLoading && (
        <DropzoneFormcontainer>
          <DropzoneContainer>
            <UPHeaderFullline>
              {LoadProgress === 100
                ? `Preparing 3D model ...`
                : `Loading ${LoadProgress}%`}
            </UPHeaderFullline>

            <ProgressBar LoadProgress={LoadProgress} />
          </DropzoneContainer>
        </DropzoneFormcontainer>
      )}
      {/* <TocartCTABtn onClick={deleteAllRecordsFromDB}>Delete all in indexDB</TocartCTABtn> */}
    </>
  );
};

export default Dropfile;
