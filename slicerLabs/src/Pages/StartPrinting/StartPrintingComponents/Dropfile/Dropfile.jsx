import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  DropzoneContainer,
  DropzoneFormcontainer,
  Errbutton,
  ErrorCard,
  ErrorContainer,
  QtyDiv,
  QtyDiv2,
  QtyFlexDiv,
  QuantityButton,
  UPFullline,
  UPHeaderFullline,
} from "./Dropfileelements";
import { useDropzone } from "react-dropzone";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshBasicMaterial, PerspectiveCamera } from "three";

import {
  Grid,
  OrbitControls,
  PresentationControls,
  Stage,
} from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import {
  addModel,
  addModelToTempState,
  decreaseQuantity,
  deleteModel,
  increaseQuantity,
  updateColor,
  updateMaterial,
  updateModel,
  updatePrice,
} from "../../../../ReduxStore/reducers/CartItemReducer";
import { v4 as uuidv4 } from "uuid";
import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MeshNormalMaterial, Box3, Vector3, Mesh, LoadingManager } from "three";
import {
  countItemsInDB,
  deleteAllRecordsFromDB,
  deleteFileFromDB,
  storeFileInDB,
} from "../../../../indexedDBUtilis";
import {
  Mdropdownlabel,
  MinP,
  Minputqtt,
  MOdropdown,
  Moption,
  NotiPrompt,
  PMAlertBox,
  PMButton,
  PMContainer,
  TocartCTABtn,
  Tocartflexdiv,
} from "../MaterialsOptions/MaterialsOptionselements";
import ModelSizeChecker from "./ModelSizeChecker";
import Carousel from "../../../../globalcomponents/Carousel/Carousel";
import { useNavigate } from "react-router-dom";
import {
  LoginContainer,
  LoginFlexdiv,
  LoginFromcontainer,
} from "../../../Login/LoginComponents/LoginForm/LoginFormelements";
import { decrementCartCount } from "../../../../ReduxStore/actions/cartCountActions";
import { addingMoreModels } from "../../../../ReduxStore/actions/addingModel";
import { doc, getDoc } from "firebase/firestore";
import { ConfigCollection } from "../../../../firebase";
import PriceTable from "../../../../globalcomponents/PriceTable/priceTable";
import html2canvas from "html2canvas";
import { useScreenshot } from "use-react-screenshot";
import {
  deleteImageFromIndexDB,
  getAllImages,
  getImageById,
  storeImage,
} from "../../../../indexedDBImageUtilis";
import RotatingLoader from "../../../../globalcomponents/DropDown/RotatingLoader";
async function blobToImageFile(blob, fileName) {
  // Create a new File object from the Blob
  const imageFile = new File([blob], fileName, { type: blob.type });
  // const imageUrl = URL.createObjectURL(imageFile);
  // console.log(imageUrl)
  return imageFile;
}

const Dropfile = ({}) => {
  const [files, setFiles] = useState([]);
  const [filetype, setFiletype] = useState("");
  const userDetails = useSelector((state) => state?.userDetails);
  const [model, setModel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupportedFileType, setIsSupportedFileType] = useState(true);
  const [LoadProgress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const cameraRef = useRef();
  const primitiveRef = useRef();
  const meshRef = useRef();
  const dispatch = useDispatch();
  const addingMoreModelLocal = useSelector(
    (state) => state.addingMoreModel.isAdding
  );
  // const [canvasRef, setCanvasRef] = useState(null);
  // const canvasRef = useRef();
  // const canvasRefs = {};
  // const [canvasRefs, setCanvasRefs] = useState([]);
  const [image, takeScreenshot] = useScreenshot();
  // const ProductId = useSelector((state) => state.cartItems.tempModelId);
  const [cameraPosition, setCameraPosition] = useState([
    -7.726866370752757, 7.241928986275022, -8.091348270643504,
  ]); // Initial camera position
  const [imageUrls, setImageUrls] = useState([]);
  const printBedWidth = 235; // mm
  const printBedDepth = 235; // mm
  const printVolumeWidth = 220; // mm
  const printVolumeDepth = 220; // mm
  const printVolumeHeight = 250; // mm
  //Material Options
  const aboveDivRef = useRef(null);
  const belowDivRef = useRef(null);
  const leftDivRef = useRef(null);
  const rightDivRef = useRef(null);
  const [material, setMaterial] = useState("");
  const cart = useSelector((state) => state.cartItems);
  const canvasRefs = useRef(cart.cartItems.map(() => React.createRef()));

  // const dimensions = cart?.cartItems[0]?.dimensions;
  const [color, setColor] = useState("");
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [depth, setDepth] = useState(10);
  const [quantity, setQuantity] = useState(1);
  const Navigate = useNavigate();
  // const [price, setPrice] = useState(0);
  const ProductId = useSelector((state) => state.cartItems.tempModelId);
  const [cartCount, setCartCount] = useState(cart.length > 0 ? cart.length : 0);
  const idToken = localStorage.getItem("idToken");
  const userUIDInLocalStorage = userDetails.userUID;
  const [ErrorHandling, setErrorHandling] = useState({
    state: false,
    header: "",
    message: "",
  });
  const [materialSettings, setMaterialSettings] = useState({
    printTimePerUnitVolume: {
      ABS: 0.05, // minutes/mm^3
      PLA: 0.04, // minutes/mm^3
      TPU: 0.06, // minutes/mm^3
      NYLON: 0.07, // minutes/mm^3
      PETG: 0.05, // minutes/mm^3
      RESIN: 0.03, // minutes/mm^3
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
  useEffect(() => {
    setCartCount(cart.length);
    // console.log(cart);
  }, [cart]);

  // useLayoutEffect(() => {
  //   if (canvasRefs.current) {
  //     const { current: canvas } = canvasRefs;
  //     const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
  //     // Check if the WebGL context is successfully obtained
  //     if (gl) {
  //       console.log("WebGL context obtained successfully.");
  //       // Additional WebGL context configuration can be done here
  //     } else {
  //       console.error("Failed to obtain WebGL context.");
  //     }
  //   }
  // }, []);
  const fetchConfigSettings = async () => {
    try {
      const configDocRef = doc(
        ConfigCollection,
        "irr8pVIaN4S4JjkMlEreZi8wC7G2"
      ); // Replace with your collection and document IDs
      const configDocSnapshot = await getDoc(configDocRef);

      if (configDocSnapshot.exists()) {
        const data = configDocSnapshot.data();
        setMaterialSettings(data);
      }
      // console.log(materialSettings);
    } catch (error) {
      console.error("Error fetching configuration settings:", error);
    }
  };
  useEffect(() => {
    fetchConfigSettings();
    // console.log(cart.cartItems[0]?.dimensions);
  }, []);
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

  const updatePriceLocal = (
    anotherFunction,
    material,
    color,
    width,
    height,
    depth,
    ModelId
  ) => {
    // console.log(anotherFunction);
    if (anotherFunction && material && color && width && height && depth) {
      const newPrice =
        anotherFunction(
          material,
          color,
          {
            width,
            height,
            depth,
          },
          materialSettings
        ) || 100;
      // setPrice(newPrice);
      // console.log(ModelId, newPrice)
      dispatch(updatePrice({ ProductId: ModelId, newPrice }));
    } else {
      console.log("calc fail");
    }
  };

  const cartString = encodeURIComponent(JSON.stringify(cart.options));

  const handleMaterialChange = (e, id) => {
    const newMaterial = e.target.value;
    dispatch(updateMaterial({ ProductId: id, newMaterial }));
  };

  const handleColorChange = (e, id) => {
    const newColor = e.target.value;
    dispatch(updateColor({ ProductId: id, newColor }));
  };

  const generateUniqueId = () => {
    return uuidv4();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".stl,.obj",
    multiple: true,
    onDrop: async (acceptedFiles, rejectedFiles) => {
      setIsLoading(true);
      if (rejectedFiles.length > 0) {
        setError("Invalid file type or file is corrupted");
        setIsLoading(false);
        dispatch(addingMoreModels(false));
        return;
      }

      // const uploadedFile = acceptedFiles[0];
      const maxSize = 60 * 1024 * 1024; // 60MB in bytes
      // Check if any file exceeds the maximum size
      if (acceptedFiles.some((file) => file.size > maxSize)) {
        setError("One or more files exceed the maximum allowed size (60MB).");
        setIsLoading(false);
        dispatch(addingMoreModels(false));
        return;
      }
      for (const uploadedFile of acceptedFiles) {
        const modelId = generateUniqueId();
        const fileExtension = uploadedFile.name.split(".").pop().toLowerCase();

        setIsSupportedFileType(true);
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        await storeFileInDB(uploadedFile, modelId);
        const itemCountInIndexedDB = await countItemsInDB();
        // console.log("itemcount", itemCountInIndexedDB);
        setFiletype(fileExtension);

        const reader = new FileReader();

        reader.onload = async () => {
          try {
            const fileContent = reader.result;

            if (fileExtension === "obj") {
              // Define the onProgress callback function
              const manager = new LoadingManager();
              // const uploadedFile = acceptedFiles[0];
              const totalSize = uploadedFile.size;

              manager.onLoad = function () {
                // console.log("Loading complete!");
                setIsLoading(false);
                dispatch(addingMoreModels(false));
                // setIsModelLoaded(true);
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
                dispatch(addingMoreModels(false));
                // setIsModelLoaded(false);
              };

              const objLoader = new OBJLoader(manager);
              objLoader.load(
                fileContent,
                (objData) => {
                  // console.log(objData);
                  // const material = new MeshNormalMaterial();

                  objData.traverse((child) => {
                    if (child instanceof Mesh) {
                      const material = new THREE.MeshStandardMaterial({
                        color: "#adadc9",
                        roughness: 0.5, // Adjust roughness (0 = very smooth, 1 = very rough)
                        metalness: 0.62, // Adjust metalness (0 = non-metallic, 1 = fully metallic)
                      });
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
                  if (
                    dimensionsInMM.width <= printBedWidth &&
                    dimensionsInMM.depth <= printBedDepth &&
                    dimensionsInMM.height <= printVolumeHeight
                  ) {
                    if (
                      dimensionsInMM.width <= printVolumeWidth &&
                      dimensionsInMM.depth <= printVolumeDepth
                    ) {
                      // Check if any dimension is less than 1mm
                      if (
                        dimensionsInMM.width < 1 ||
                        dimensionsInMM.depth < 1 ||
                        dimensionsInMM.height < 1
                      ) {
                        // Prompt a message for small dimensions
                        setError(
                          `This design appears to be significantly smaller than the recommended dimensions for 3D printing, measuring less than 1 x 1 x 1 mm. If the intention is to create a small-scale object, we kindly request that you reach out to us directly for personalized assistance.`
                        );
                        setIsLoading(false);
                        dispatch(addingMoreModels(false));
                        return;
                      }
                      // Model fits within print volume
                      dispatch(
                        addModel({
                          id: modelId,
                          fileName: uploadedFile.name,
                          model: objData,
                          dimensions: dimensionsInMM,
                          options: {
                            material: "",
                            color: "",
                            quantity: 1,
                          },
                          pricePerUnit: 0,
                        })
                      );
                      setModel((prevModels) => [
                        ...prevModels,
                        { LocalID: modelId, localModel: objData },
                      ]);
                      setCameraPosition([
                        -7.726866370752757, 7.241928986275022,
                        -8.091348270643504,
                      ]);

                      setIsLoading(false);
                      dispatch(addingMoreModels(false));
                      return true;
                    } else {
                      // Model exceeds width or depth of print volume
                      setError(
                        `${uploadedFile.name} is not within our printer capability. Maximum print volume dimensions are ${printVolumeWidth}x${printVolumeDepth}x${printVolumeHeight} mm. Please feel free to contact us at "slicerlabs@gmail.com" for alternative solutions.`
                      );
                      setIsLoading(false);
                      dispatch(addingMoreModels(false));
                      return;
                    }
                  } else {
                    // Model exceeds print bed size
                    setError(
                      `${uploadedFile.name} is not within our printer capability. Maximum print bed dimensions are ${printBedWidth}x${printBedDepth} mm. Please feel free to contact us at "slicerlabs@gmail.com" for alternative solutions.`
                    );
                    setIsLoading(false);
                    dispatch(addingMoreModels(false));
                    return;
                  }
                },
                // undefined,
                function (xhr) {
                  // const percentLoaded = Math.floor((xhr.loaded / totalSize) * 100);
                  // set3DProgress(percentLoaded)
                  // console.log(Math.floor((xhr.loaded / totalSize) * 100));
                },
                // onProgress,
                (error) => {
                  console.log("Error loading OBJ:", error);
                  setIsSupportedFileType(false);
                  setIsLoading(false);
                  dispatch(addingMoreModels(false));
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
                  // console.log(stlGeometry);
                  if (stlGeometry) {
                    // Create a mesh using the loaded geometry and a material
                    const material = new THREE.MeshStandardMaterial({
                      color: "#195375",
                      roughness: 0.5, // Adjust roughness (0 = very smooth, 1 = very rough)
                      metalness: 0.62, // Adjust metalness (0 = non-metallic, 1 = fully metallic)
                    });
                    const stlMesh = new THREE.Mesh(stlGeometry, material);
                    // Assign the mesh to the provided ref
                    meshRef.current = stlMesh;
                    // Calculate dimensions in millimeters
                    const boundingBox = new THREE.Box3().setFromObject(stlMesh);
                    const dimensions = boundingBox.getSize(new THREE.Vector3());

                    // Assuming you have a scale factor to convert units to mm
                    const scaleFactor = 1; // Adjust this based on your assumptions

                    const dimensionsInMM = {
                      width: dimensions.x * scaleFactor,
                      height: dimensions.y * scaleFactor,
                      depth: dimensions.z * scaleFactor,
                    };
                    if (
                      dimensionsInMM.width <= printBedWidth &&
                      dimensionsInMM.depth <= printBedDepth &&
                      dimensionsInMM.height <= printVolumeHeight
                    ) {
                      if (
                        dimensionsInMM.width <= printVolumeWidth &&
                        dimensionsInMM.depth <= printVolumeDepth
                      ) {
                        // Check if any dimension is less than 1mm
                        if (
                          dimensionsInMM.width < 1 ||
                          dimensionsInMM.depth < 1 ||
                          dimensionsInMM.height < 1
                        ) {
                          // Prompt a message for small dimensions
                          setError(
                            `This design appears to be significantly smaller than the recommended dimensions for 3D printing, measuring less than 1 x 1 x 1 mm. If the intention is to create a small-scale object, we kindly request that you reach out to us directly for personalized assistance.`
                          );
                          setIsLoading(false);
                          dispatch(addingMoreModels(false));
                          return;
                        }
                        // Model fits within print volume
                        setModel((prevModels) => [
                          ...prevModels,
                          { LocalID: modelId, localModel: stlMesh },
                        ]);
                        setIsLoading(false);
                        // setIsModelLoaded(true);
                        dispatch(
                          addModel({
                            id: modelId,
                            fileName: acceptedFiles[0].name,
                            model: stlMesh,
                            dimensions: dimensionsInMM,
                            options: {
                              material: "",
                              color: "",
                              quantity: 1,
                            },
                            pricePerUnit: 0,
                          })
                        );
                        setCameraPosition([
                          -7.726866370752757, 7.241928986275022,
                          -8.091348270643504,
                        ]);
                        dispatch(addingMoreModels(false));
                        return true;
                      } else {
                        // Model exceeds width or depth of print volume
                        setError(
                          `${uploadedFile.name} is not within our printer capability. Maximum print volume dimensions are ${printVolumeWidth}x${printVolumeDepth}x${printVolumeHeight} mm. Please feel free to contact us at "slicerlabs@gmail.com" for alternative solutions.`
                        );
                        setIsLoading(false);
                        dispatch(addingMoreModels(false));
                        return;
                      }
                    } else {
                      // Model exceeds print bed size
                      setError(
                        `${uploadedFile.name} is not within our printer capability. Maximum print bed dimensions are ${printBedWidth}x${printBedDepth} mm. Please feel free to contact us at "slicerlabs@gmail.com" for alternative solutions.`
                      );
                      setIsLoading(false);
                      dispatch(addingMoreModels(false));
                      return;
                    }
                    // setModel((prevModels) => [
                    //   ...prevModels,
                    //   { LocalID: modelId, localModel: stlMesh },
                    // ]);
                    // setIsLoading(false);
                    // // setIsModelLoaded(true);
                    // dispatch(
                    //   addModel({
                    //     id: modelId,
                    //     fileName: acceptedFiles[0].name,
                    //     model: stlMesh,
                    //     dimensions: dimensionsInMM,
                    //     options: {
                    //       material: "",
                    //       color: "",
                    //       quantity: 1,
                    //     },
                    //     pricePerUnit: 0,
                    //   })
                    // );
                    // setCameraPosition([
                    //   -7.726866370752757, 7.241928986275022, -8.091348270643504,
                    // ]);
                    // setIsAddedToCart(false);
                  } else {
                    // Handle the case where the STL geometry is invalid
                    setIsSupportedFileType(false);
                    setIsLoading(false);
                    dispatch(addingMoreModels(false));
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
                  dispatch(addingMoreModels(false));
                  setError(
                    "Invalid file type or file is corrupted. Please upload only .stl and .obj files."
                  );
                }
              );
            } else {
              setIsSupportedFileType(false);
              dispatch(addingMoreModels(false));
              setError(
                "Invalid file type. Please upload only .stl and .obj files."
              );
            }

            // Continue processing other files if any
            if (
              acceptedFiles.indexOf(uploadedFile) ===
              acceptedFiles.length - 1
            ) {
              setIsLoading(false);
              dispatch(addingMoreModels(false));
              // setIsModelLoaded(true);
              // setIsAddedToCart(false);
            }
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
            const percentLoaded = Math.floor(
              (event.loaded / event.total) * 100
            );
            setProgress(percentLoaded);
          }
        };

        reader.readAsDataURL(uploadedFile);
      }
    },
  });
  const captureScreenshot = (imageId, index) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const originalCanvas = canvasRefs[index].current;
        if (!originalCanvas) {
          console.error("Canvas ref is not set.");
          return;
        }
        // Create a new canvas element
        const newCanvas = document.createElement("canvas");
        newCanvas.width = originalCanvas.width;
        newCanvas.height = originalCanvas.height;

        const ctx = newCanvas.getContext("2d");

        // Draw the contents of the original canvas onto the new canvas
        ctx.drawImage(originalCanvas, 0, 0);

        // Capture the screenshot from the new canvas
        const screenshotUrl = newCanvas.toDataURL("image/png");

        if (screenshotUrl) {
          const parts = screenshotUrl.split(";base64,");
          const contentType = parts[0].split(":")[1];
          const raw = window.atob(parts[1]);
          const rawLength = raw.length;
          const uInt8Array = new Uint8Array(rawLength);

          for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
          }
          const blob = new Blob([uInt8Array], { type: contentType });
          // const file = blobToImageFile(blob, imageId)

          // console.log(file)
          resolve(blob);
        }
      }, 2000);
    });
  };

  // const handleMainScreenShot = (imageId) => {
  //   storeImage(`image${imageId}`, setTimeout(captureScreenshot, 2000));
  // };
  const handleMainScreenShot = async (imageId, index) => {
    const screenshotUrl = await captureScreenshot(imageId, index);
    await storeImage(`image${imageId}`, screenshotUrl);
  };
  const handleDelete = (tempModelId) => {
    carouselItems.filter((item) => item.id !== tempModelId);
    // Assuming setModel is the useState setter for your model state
    setModel((prevModels) =>
      prevModels.filter((model) => model.LocalID !== tempModelId)
    );
    setIsLoading(false);
    setProgress(0);
    dispatch(deleteModel(tempModelId));
    dispatch(decrementCartCount());
    deleteFileFromDB(tempModelId);
    deleteImageFromIndexDB(tempModelId);
    // deleteAllRecordsFromDB();
    // console.log(model.length);
  };
  useLayoutEffect(() => {
    const updatePosition = () => {
      const aboveDiv = aboveDivRef.current;
      const belowDiv = belowDivRef.current;

      if (aboveDiv && belowDiv) {
        const aboveHeight = aboveDiv.getBoundingClientRect().height;
        belowDiv.style.top = `${aboveHeight + 520}px`;
      }
    };

    const updateHorizontalPosition = () => {
      const leftDiv = leftDivRef.current;
      const rightDiv = rightDivRef.current;

      if (leftDiv && rightDiv) {
        const aboveWidth = leftDiv.getBoundingClientRect().width;
        rightDiv.style.left = `${aboveWidth + 15}px`;
      }
    };

    const handleResize = () => {
      updatePosition();
      updateHorizontalPosition();
    };

    handleResize(); // Set initial positions on page load
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [material, color, width, height, depth]);
  const increaseQuantityAction = (ProductId) => {
    dispatch(increaseQuantity({ ProductId }));
  };

  const decreaseQuantityAction = (ProductId) => {
    dispatch(decreaseQuantity({ ProductId }));
  };
  const handleChange = (
    newMaterial,
    newColor,
    newWidth,
    newHeight,
    newDepth,
    ModelId
  ) => {
    // Check if both material and color are available
    if (newMaterial && newColor) {
      // Calculate price or perform any other action
      if (calculatePriceString) {
        const calculatePriceFunctionToStore = parseStoredFunction(
          "calculatePrice",
          calculatePriceString
        );

        updatePriceLocal(
          calculatePriceFunctionToStore,
          newMaterial,
          newColor,
          newWidth,
          newHeight,
          newDepth,
          ModelId
        );
      }
    }
  };
  const carouselItems = cart.cartItems.map((individualModel, index) => {
    const { material, color, quantity } = individualModel.options || {};
    const { width, height, depth } = individualModel.dimensions || {};
    const price = individualModel.pricePerUnit || 0;
    const getCanvasRef = (ref) => {
      canvasRefs[index] = ref;
    };
    // console.log(`Item ${index}, Price: ${price}`);
    return (
      <div key={index} style={{ width: "100%", height: "auto" }}>
        {/* Your existing code for DropzoneFormcontainer */}
        <DropzoneFormcontainer style={{ width: "100%" }}>
          <DropzoneContainer>
            <Canvas
              // ref={canvasRef}
              ref={(ref) => getCanvasRef(ref)}
              width={"100%"}
              height={"100%"}
              linear={"true"}
              // onCreated={() => setTimeout(captureScreenshot, 2000)}
              onCreated={() => handleMainScreenShot(individualModel.id, index)}
              gl={{ preserveDrawingBuffer: true }}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
              dpr={[1, 2]}
              camera={{ fov: 45 }}
            >
              <color attach="background" args={["rgba(2, 65, 94)"]} />
              <PresentationControls>
                <Stage environment={null}>
                  {/* <Grid cellSize={3} infiniteGrid={true} /> */}
                  <OrbitControls />
                  <ambientLight />
                  <pointLight position={[10, 10, 10]} />
                  {/* <ModelSizeChecker model={individualModel.model} /> */}
                  <meshBasicMaterial color="rgb(10, 20, 30)" />

                  <primitive object={individualModel.model} scale={0.01} />
                  {/* <CameraControls cameraPosition={cameraPosition} /> */}
                </Stage>
              </PresentationControls>
            </Canvas>

            <button
              style={{
                width: "50px",
                position: "absolute",
                top: 0,
                right: 0,
                borderRadius: 10,
              }}
              onClick={() => handleDelete(individualModel.id)}
            >
              X
            </button>
          </DropzoneContainer>
        </DropzoneFormcontainer>

        <LoginFromcontainer
        // ref={aboveDivRef}
        >
          <LoginContainer>
            <Mdropdownlabel htmlFor={`material_${index}`}>
              Materials
            </Mdropdownlabel>
            <MOdropdown
              value={individualModel.options?.material}
              onChange={(e) => {
                handleMaterialChange(e, individualModel.id);
                handleChange(
                  e.target.value,
                  color,
                  width,
                  height,
                  depth,
                  individualModel.id
                );
              }}
              id={`material_${index}`}
            >
              <Moption value="">Please Select a Material</Moption>
              <Moption value="ABS">
                Acrylonitrile Butadiene Styrene (ABS)
              </Moption>
              <Moption value="PLA">Polylactic Acid (PLA)</Moption>
              <Moption value="TPU">Thermoplastic Polyurethane (TPU)</Moption>
              <Moption value="NYLON">Nylon</Moption>
              <Moption value="PETG">
                Polyethylene Terephthalate Glycol (PETG)
              </Moption>
              <Moption value="RESIN">Resins</Moption>
            </MOdropdown>

            <Mdropdownlabel htmlFor={`color_${index}`}>
              Finshing & Color
            </Mdropdownlabel>
            <MOdropdown
              value={individualModel.options?.color}
              onChange={(e) => {
                handleColorChange(e, individualModel.id);
                handleChange(
                  material,
                  e.target.value,
                  width,
                  height,
                  depth,
                  individualModel.id
                );
              }}
              id={`color_${index}`}
            >
              <Moption value="">Please Select a Color</Moption>
              <Moption value="white">White</Moption>
              <Moption value="black">Black</Moption>
              <Moption value="transparent">Transparent</Moption>
            </MOdropdown>

            <Mdropdownlabel htmlFor="width">
              Dimension ( Width x Height x Depth ) in mm
            </Mdropdownlabel>

            <div
              style={{
                display: "flex",
              }}
            >
              <input
                type="number"
                placeholder="Width"
                value={individualModel.dimensions.width.toFixed(2)}
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
                value={individualModel.dimensions.height.toFixed(2)}
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
                value={individualModel.dimensions.depth.toFixed(2)}
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
            {material && color && width && height && depth ? (
              <div>
                <Mdropdownlabel htmlFor={`quantity_${index}`}>
                  Quantity
                </Mdropdownlabel>
                <QtyFlexDiv>
                  <QtyDiv>
                    <QuantityButton
                      onClick={() => increaseQuantityAction(individualModel.id)}
                      customMargin="0 5px 0 0"
                    >
                      +
                    </QuantityButton>
                    <Minputqtt
                      type="number"
                      placeholder="Quantity"
                      min="1"
                      value={individualModel.options?.quantity}
                      onChange={(e) =>
                        handleQuantityChange(e, individualModel.id)
                      }
                    ></Minputqtt>
                    <QuantityButton
                      onClick={() => decreaseQuantityAction(individualModel.id)}
                      customMargin="0 0 0 5px"
                    >
                      -
                    </QuantityButton>
                  </QtyDiv>
                  <QtyDiv2>
                    <MinP>x </MinP>
                    <MinP>${price} </MinP>
                    <MinP>= </MinP>
                    <MinP>$ {(price * parseInt(quantity)).toFixed(2)}</MinP>
                  </QtyDiv2>
                </QtyFlexDiv>
                {/* <PriceTable
                  initialPrice={price}
                  individualModel={individualModel}
                /> */}
              </div>
            ) : (
              <></>
            )}

            {price !== 0 ? (
              <Mdropdownlabel>
                Costs (Price-Match Guarantee): We will ensure that our quotes
                are the cheapest in town to make sure that you get the bang for
                the buck pricings. Supply an official invoice from the supplier
                and a screen shot of our price page we will match it, should you
                find one cheaper than our quote!
              </Mdropdownlabel>
            ) : (
              <></>
            )}
          </LoginContainer>
        </LoginFromcontainer>
        {/* onClick={handleAddToCart} */}
        {/* {price !== 0 && (
          <Tocartflexdiv>
            <TocartCTABtn>ADD TO CART</TocartCTABtn>
          </Tocartflexdiv>
        )} */}
        {/* <TocartCTABtn onClick={()=>getImageById(individualModel.id)}> */}
        {/* <TocartCTABtn onClick={() => getAllImages()}>
          Capture Screenshot
        </TocartCTABtn> */}
      </div>
    );
  });

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

      {cart.cartItems.length > 0 && !isLoading ? (
        <div style={{ display: "flex" }}>
          {/* <Carousel items={carouselItems} /> */}
          <Carousel cart={cart} models={model} setModel={setModel} />
          {addingMoreModelLocal && (
            <div style={{ position: "absolute" }}>
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
              <Tocartflexdiv>
                <TocartCTABtn onClick={() => dispatch(addingMoreModels(false))}>
                  Back
                </TocartCTABtn>
              </Tocartflexdiv>
            </div>
          )}
        </div>
      ) : (
        <>
          {(cart.cartItems.length === 0 && !isLoading) ||
          addingMoreModelLocal ? (
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
        </>
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
      {/* <TocartCTABtn onClick={captureScreenshot}>
        Capture Screenshot
      </TocartCTABtn> */}
      {/* <div style={{ display: "flex", width:"100%"}}>
        {imageUrls.map((imageUrl, index) => (
          <img
            style={{ width: "400px" }}
            key={index}
            src={imageUrl}
            alt={`Image ${index}`}
          />
        ))}
      </div> */}

      {/* <TocartCTABtn onClick={() => getAllImages()}>
        show all images
      </TocartCTABtn> */}
    </>
  );
};

export default Dropfile;
