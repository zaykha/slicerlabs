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
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { PerspectiveCamera } from "three";
import { Grid, OrbitControls } from "@react-three/drei";
import { useDispatch } from "react-redux";
import {
  addModelToCart,
  addModelToTempState,
} from "../../../../ReduxStore/reducers/CartItemReducer";
import { v4 as uuidv4 } from "uuid";
const Dropfile = ({
  tempModelId,
  setTempModelId,
  isModelLoaded,
  setIsModelLoaded,
}) => {
  const [files, setFiles] = useState([]);
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupportedFileType, setIsSupportedFileType] = useState(true);
  const [error, setError] = useState(null);
  const cameraRef = useRef();
  const dispatch = useDispatch();

  const generateUniqueId = () => {
    return uuidv4();
  };
  const DB_NAME = 'TEMP_MODEL_STORAGE';
  const DB_VERSION = 1;
  const OBJECT_STORE_NAME = 'models';

  const modelId = generateUniqueId();
  // Function to open IndexedDB
  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
  
      request.onupgradeneeded = () => {
        const db = request.result;
        db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
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
    const transaction = db.transaction([OBJECT_STORE_NAME], 'readwrite');
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
      const transaction = db.transaction([OBJECT_STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
      objectStore.clear();
      transaction.oncomplete = () => {
        console.log('All models deleted from IndexedDB');
      };
      transaction.onerror = () => {
        console.log('Error deleting models from IndexedDB');
      };
    } catch (error) {
      console.log('Failed to open IndexedDB', error);
    }
  };
  

  // Function to delete a particular item from IndexedDB based on its ID
  const deleteModelFromIndexedDB = async (modelId) => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction([OBJECT_STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
      objectStore.delete(modelId);
      transaction.oncomplete = () => {
        console.log('Model deleted from IndexedDB');
      };
      transaction.onerror = () => {
        console.log('Error deleting model from IndexedDB');
      };
    } catch (error) {
      console.log('Failed to open IndexedDB', error);
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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".stl,.obj",
    onDrop: async (acceptedFiles, rejectedFiles) => {
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
      reader.readAsArrayBuffer(acceptedFiles[0]);
      reader.onload = async () => {
        try {
          const gltfLoader = new GLTFLoader();
          gltfLoader.parse(reader.result, "", async (gltf) => {
            setModel(gltf.scene);
            setIsLoading(false);
            setIsModelLoaded(true);
            const file = acceptedFiles[0];
            await saveModelToIndexedDB(modelId, file);
            // Dispatch an action to add the model to the Redux store
            // Store the UUID
            setTempModelId(modelId); // Set the tempModelId state
            dispatch(addModelToCart(modelId));
          });
        } catch (error) {
          setIsSupportedFileType(false);
          setIsLoading(false);
          setError(
            "Invalid file type or file is corrupted, Please upload again only with .stl and .obj files"
          );
        }
      };
    },
  });

  // const handleDrop = (event) => {
  //   event.preventDefault();
  //   const file = event.dataTransfer.files[0];
  //   setModel(file);
  //   handleModelChange(file);
  // };

  const handleDelete = () => {
    setModel(null);
    setIsModelLoaded(false);
    setFiles(null); // remove the file from the state
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

      {/* {isLoading ? (
        <div>Loading...</div>
      ) : */}
      {model && (
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
              <OrbitControls args={[cameraRef.current]} />
              {/* <PerspectiveCamera ref={cameraRef} position={[0, 0, 5]} /> */}
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <primitive object={model} />
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
      )}
      {!model && (
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
      )}

      {isLoading && <div>Loading</div>}

      <button
        style={{
          width: "150px",
          padding: "10px",
          borderRadius: 10,
          position:'absolute',
          left:'45%',
          bottom:'30%'
        }}
        onClick={handleDeleteAllModels}
      >
        delete all
      </button>
    </>
  );
};

export default Dropfile;
