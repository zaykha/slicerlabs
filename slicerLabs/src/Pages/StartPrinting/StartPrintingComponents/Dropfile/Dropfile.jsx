import React, { useEffect, useRef, useState } from "react";
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
import { PerspectiveCamera } from "three";
import { Grid, OrbitControls } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import { addModel, addModelToTempState, deleteModel, updateModel } from "../../../../ReduxStore/reducers/CartItemReducer";
import { v4 as uuidv4 } from "uuid";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MeshNormalMaterial, Box3, Vector3, Mesh, LoadingManager } from "three";
const Dropfile = ({
  tempModelId,
  setTempModelId,
  isModelLoaded,
  setIsModelLoaded,
  isCheckedOut,
  setIsCheckedOut,
  isAddedToCart,
  setIsAddedToCart
}) => {
  const [files, setFiles] = useState([]);
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupportedFileType, setIsSupportedFileType] = useState(true);
  const [LoadProgress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const cameraRef = useRef();
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

    // useFrame(() => {
    //   console.log('Camera Position:', camera.position.toArray());
    // });

    return null;
  };

  const generateUniqueId = () => {
    return uuidv4();
  };
  useEffect(() => {
    // console.log(model);
    console.log(LoadProgress);
  }, [setProgress]);
  useEffect(() => {
    
    setModel(null);
    // setIsModelLoaded(false);
    setFiles(null);
  }, [isCheckedOut,isAddedToCart]);

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

      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const fileContent = reader.result;
         
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
              const percentLoaded = Math.floor((itemsLoaded / itemsTotal) * 100);
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
                const material = new MeshNormalMaterial();

                objData.traverse((child) => {
                  if (child instanceof Mesh) {
                    child.material = material;
                  }
                });
                objData.updateMatrix();

                // const serializedModel = JSON.stringify(objData);
                dispatch(addModel({ id: modelId, model: objData }));
                setModel(objData);
                setCameraPosition([
                  -7.726866370752757, 7.241928986275022, -8.091348270643504,
                ]);
                setIsLoading(false);
                setIsModelLoaded(true);
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
            const stlData = await stlLoader.loadAsync(fileContent);
            setModel(stlData);
            setIsLoading(false);
            setIsModelLoaded(true);
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
          console.log(model, "this is model in dropfile")
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
        const scaleFactor = frustumSize / Math.max(size.x, size.y, size.z);

        // Apply the scale factor to the model
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);

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

      {model && !isCheckedOut && !isLoading ? (
        <DropzoneFormcontainer>
          <DropzoneContainer>
            <Canvas
              style={{
                width: "773px",
                height: "300px",
                // zIndex: 6,
                // border:"1px solid red"
              }}
            >
              <Grid cellSize={3} infiniteGrid={true} />
              <OrbitControls />
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
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

      
    </>
  );
};

export default Dropfile;
