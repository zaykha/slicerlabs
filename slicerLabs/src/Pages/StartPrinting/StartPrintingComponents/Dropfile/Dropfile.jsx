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
import { useDispatch } from "react-redux";
import { addModelToTempState } from "../../../../ReduxStore/reducers/CartItemReducer";
import { v4 as uuidv4 } from "uuid";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MeshNormalMaterial, Box3, Vector3, Mesh } from "three";
const Dropfile = ({
  tempModelId,
  setTempModelId,
  isModelLoaded,
  setIsModelLoaded,
  isCheckedOut,
  setIsCheckedOut,
}) => {
  const [files, setFiles] = useState([]);
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupportedFileType, setIsSupportedFileType] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const cameraRef = useRef();
  const dispatch = useDispatch();
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

    return null; // Since this component doesn't render anything, return null
  };

  const generateUniqueId = () => {
    return uuidv4();
  };
  useEffect(() => {
    console.log(model);
  }, [model]);
  useEffect(() => {
    setModel(null);
    // setIsModelLoaded(false);
    setFiles(null);
  }, [isCheckedOut]);
  const DB_NAME = "TEMP_MODEL_STORAGE";
  const DB_VERSION = 1;
  const OBJECT_STORE_NAME = "models";

  const modelId = generateUniqueId();
  // Function to open IndexedDB
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

  const saveModelToIndexedDB = async (modelId, file) => {
    const db = await openDatabase();
    const transaction = db.transaction([OBJECT_STORE_NAME], "readwrite");
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
    const data = { id: modelId, file };

    return new Promise((resolve, reject) => {
      const request = objectStore.put(data);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  };

  // Function to delete all items from IndexedDB
  const deleteAllModelsFromIndexedDB = async () => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction([OBJECT_STORE_NAME], "readwrite");
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
      objectStore.clear();
      transaction.oncomplete = () => {
        console.log("All models deleted from IndexedDB");
      };
      transaction.onerror = () => {
        console.log("Error deleting models from IndexedDB");
      };
    } catch (error) {
      console.log("Failed to open IndexedDB", error);
    }
  };

  // Function to delete a particular item from IndexedDB based on its ID
  const deleteModelFromIndexedDB = async (modelId) => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction([OBJECT_STORE_NAME], "readwrite");
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
      objectStore.delete(modelId);
      transaction.oncomplete = () => {
        console.log("Model deleted from IndexedDB");
      };
      transaction.onerror = () => {
        console.log("Error deleting model from IndexedDB");
      };
    } catch (error) {
      console.log("Failed to open IndexedDB", error);
    }
  };

  // Function to delete all items
  const handleDeleteAllModels = async () => {
    await deleteAllModelsFromIndexedDB();
  };

  // Function to delete a particular item based on its ID
  const handleDeleteModel = async (modelId) => {
    await deleteModelFromIndexedDB(modelId);
  };

  const saveModelToLocalStorage = (modelId, model) => {
    try {
      // Convert the model to a string and store it in local storage
      const serializedModel = JSON.stringify(model);
      localStorage.setItem(modelId, serializedModel);
    } catch (error) {
      // Handle any potential errors
      console.error("Error saving model to local storage:", error);
    }
  };

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   accept: ".stl,.obj",
  //   onDrop: async (acceptedFiles, rejectedFiles) => {
  //     if (rejectedFiles.length > 0) {
  //       setError("Invalid file type or file is corrupted");
  //       return;
  //     }
  //     setIsLoading(true);
  //     setIsSupportedFileType(true);
  //     setFiles(
  //       acceptedFiles.map((file) =>
  //         Object.assign(file, {
  //           preview: URL.createObjectURL(file),
  //         })
  //       )
  //     );
  //     const reader = new FileReader();

  //     // reader.readAsArrayBuffer(acceptedFiles[0]);
  //     // reader.readAsText(acceptedFiles[0]);
  //     reader.readAsText(acceptedFiles[0], "ISO-8859-1");

  //     console.log(reader.result)
  //     reader.onload = async () => {
  //       try {
  //         const gltfLoader = new GLTFLoader();
  //         gltfLoader.parse(reader.result, "", async (gltf) => {
  //           setModel(gltf.scene);
  //           setIsLoading(false);
  //           setIsModelLoaded(true);
  //           const file = acceptedFiles[0];
  //           await saveModelToIndexedDB(modelId, file);
  //           // Dispatch an action to add the model to the Redux store
  //           // Store the UUID
  //           setTempModelId(modelId); // Set the tempModelId state
  //           dispatch(addModelToTempState(modelId));

  //         });
  //       } catch (error) {
  //         setIsSupportedFileType(false);
  //         setIsLoading(false);
  //         setError(
  //           "Invalid file type or file is corrupted, Please upload again only with .stl and .obj files",
  //         );
  //         console.log(error)
  //       }
  //     };
  //   },
  // });

  // const handleDrop = (event) => {
  //   event.preventDefault();
  //   const file = event.dataTransfer.files[0];
  //   setModel(file);
  //   handleModelChange(file);
  // };
  // Log the scale of the model
  // console.log("Model Scale:", objData.scale);

  // // Log the position of the model
  // console.log("Model Position:", objData.position);

  // // Log the material(s) applied to the model
  // console.log("Model Material(s):", objData.material);

  // // Log the geometry of the model
  // console.log("Model Geometry:", objData.geometry);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".stl,.obj",
    onDrop: async (acceptedFiles, rejectedFiles) => {
      setIsLoading(true);
      if (rejectedFiles.length > 0) {
        setError("Invalid file type or file is corrupted");
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

      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const fileContent = reader.result;
          const fileExtension = acceptedFiles[0].name
            .split(".")
            .pop()
            .toLowerCase();

          if (fileExtension === "obj") {
            const objLoader = new OBJLoader();
            objLoader.load(
              fileContent,
              (objData) => {
                const material = new MeshNormalMaterial();

                objData.traverse((child) => {
                  if (child instanceof Mesh) {
                    child.material = material;
                  }
                });

                // const box = new Box3().setFromObject(objData);
                // const size = new Vector3();
                // box.getSize(size);
                // // Determine the maximum dimension of the model
                // const maxDimension = Math.max(size.x, size.y, size.z);

                // // Calculate the scale factor based on the maximum dimension and the target size
                // const targetSize = 1; // Target size of 1 unit
                // const scale = targetSize / maxDimension;

                // // Apply the scale factor to the model
                // objData.scale.set(scale, scale, scale);

                // const center = box.getCenter(new Vector3());
                // objData.position.sub(center);
                objData.updateMatrix();
                setModel(objData);
                setCameraPosition([
                  -7.726866370752757, 7.241928986275022, -8.091348270643504,
                ]);
                setIsLoading(false);
                setIsModelLoaded(true);
              },
              (xhr) => {
                const percentLoaded = Math.floor((xhr.loaded / xhr.total) * 100);;
                setProgress(percentLoaded);
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
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

          const file = acceptedFiles[0];
          await saveModelToIndexedDB(modelId, file);
          setTempModelId(modelId);
          dispatch(addModelToTempState(modelId));
        } catch (error) {
          console.log(error);
          setIsSupportedFileType(false);
          setIsLoading(false);
          setError(
            "Invalid file type or file is corrupted. Please upload only .stl and .obj files."
          );
        }
      };
      setProgress(0)
      reader.readAsDataURL(acceptedFiles[0]);
    },
  });

  const handleDelete = () => {
    setModel(null);
    setIsModelLoaded(false);
    setFiles(null); // remove the file from the state
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
  const ProgressBar = ({ progress }) => {
    return (
      <div>
        <div style={{ width: "100%", height: "20px", border: "1px solid white", borderRadius:"10px" }}>
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#006B9E",
              borderRadius:"10px"
            }}
          ></div>
        </div>
        <p style={{color:'white'}}>{`${progress}%`}</p>
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
            <UPHeaderFullline>Loading</UPHeaderFullline>
            <ProgressBar progress={progress} />
          </DropzoneContainer>
        </DropzoneFormcontainer>
      )}

      <button
        style={{
          width: "150px",
          padding: "10px",
          borderRadius: 10,
          position: "absolute",
          left: "45%",
          bottom: "30%",
        }}
        onClick={handleDeleteAllModels}
      >
        delete all
      </button>
    </>
  );
};

export default Dropfile;
