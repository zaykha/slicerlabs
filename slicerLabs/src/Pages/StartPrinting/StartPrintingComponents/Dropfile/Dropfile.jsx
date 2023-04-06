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

const Dropfile = ({isModelLoaded, setIsModelLoaded}) => {
  const [files, setFiles] = useState([]);
  const [model, setModel] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [isSupportedFileType, setIsSupportedFileType] = useState(true);
  const [error, setError] = useState(null);
  const cameraRef = useRef();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".stl,.obj",
    onDrop: (acceptedFiles, rejectedFiles) => {
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
      reader.onload = () => {
        try {
          const gltfLoader = new GLTFLoader();
          gltfLoader.parse(reader.result, "", (gltf) => {
            setModel(gltf.scene);
            setIsLoading(false);
            setIsModelLoaded(true);
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
      <Grid cellSize={3} infiniteGrid={true}/>
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
          borderRadius:10
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
  
    {isLoading && (
      <div>Loading</div>
    )}


    </>
  );
};

export default Dropfile;
