import React,{useState} from 'react'
import { LoginContainer, LoginFromcontainer } from '../../../Login/LoginComponents/LoginForm/LoginFormelements'
import { DropzoneContainer, DropzoneFormcontainer, Errbutton, ErrorCard, ErrorContainer, UPFullline, UPHeaderFullline, UploadBTN } from './Dropfileelements'
import { useDropzone } from 'react-dropzone';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Dropfile = (props) => {
  const [files, setFiles] = useState([]);
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".stl,.obj",
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        // Handle errors when a wrong file type is uploaded or when the file is corrupted
        setError("Invalid file type or file is corrupted");
        return;
      }
    
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    
      // Set the model state to the first file uploaded
      const reader = new FileReader();
      reader.readAsArrayBuffer(acceptedFiles[0]);
      reader.onload = () => {
        try {
          const gltfLoader = new GLTFLoader();
          gltfLoader.parse(reader.result, "", (gltf) => {
            setModel(gltf.scene);
            setIsLoading(false);
          });
        } catch (error) {
          setError("Invalid file type or file is corrupted, Please upload again only with .stl and .obj files");
        }
      };
      
    },
  });

  
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
    <DropzoneFormcontainer {...getRootProps()} >
         <DropzoneContainer>
          <input {...getInputProps()} />
        {isLoading?(
          <div>Loading...</div>
        ):
          model ? (
              <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <primitive object={model} />
              </Canvas>
            ) 
            // : isDragActive ? (
            //   <UPHeaderFullline>Drop the file here ...</UPHeaderFullline>
            // ) 
            :!isLoading && !error && (
            <>
                <UPFullline>Support files -(STL,OBJ)</UPFullline>
                <UPFullline>Max file size - 60MB</UPFullline>
                <UPFullline>Model measurment - mm</UPFullline>
                <UPHeaderFullline> Click Here Or Drop the File Directly.</UPHeaderFullline>
            </>
        )}
        
      </DropzoneContainer>
    </DropzoneFormcontainer>
    </>
  )
}

export default Dropfile