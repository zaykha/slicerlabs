import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MdAdd, MdCheck } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  MOdropdown,
  Mdropdownlabel,
  MinP,
  Minputqtt,
  Moption,
  TocartCTABtn,
  Tocartflexdiv,
} from "../../Pages/StartPrinting/StartPrintingComponents/MaterialsOptions/MaterialsOptionselements";
import { useNavigate } from "react-router-dom";
import { addingMoreModels } from "../../ReduxStore/actions/addingModel";
import {
  DropzoneContainer,
  DropzoneFormcontainer,
  QtyDiv,
  QtyDiv2,
  QtyFlexDiv,
  QuantityButton,
} from "../../Pages/StartPrinting/StartPrintingComponents/Dropfile/Dropfileelements";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PresentationControls, Stage } from "@react-three/drei";
import {
  LoginContainer,
  LoginFromcontainer,
} from "../../Pages/Login/LoginComponents/LoginForm/LoginFormelements";
import {
  deleteModel,
  updateCartItem,
  updateColor,
  updateMaterial,
  updatePrice,
} from "../../ReduxStore/reducers/CartItemReducer";
import { decrementCartCount } from "../../ReduxStore/actions/cartCountActions";
import { deleteFileFromDB } from "../../indexedDBUtilis";
import { deleteImageFromIndexDB, storeImage } from "../../indexedDBImageUtilis";
import { doc, getDoc } from "firebase/firestore";
import { ConfigCollection } from "../../firebase";
import { MeshBasicMaterial } from "three";
const StyledOuterDiv = styled.div`
  width: 100vw;
  padding: 30px 0;
  position: relative;
  right: ${({ addingMoreModel }) => (addingMoreModel ? "100vw" : "0")};
  transition: all 0.2s ease-in;
`;
const CarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
  box-sizing: border-box;

  width: 773px;
  margin: 40px auto;
  height: auto; /* Set the desired height of your carousel */
  //   border: 1px solid #ccc;
  // padding-bottom: 40px;
  padding: 20px 0;
  position: relative;
  @media screen and (max-width: 800px) {
    width: 95%;
  }
`;

const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 100%;
  // height: 100%;
  // padding: 20px;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  //   transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
`;
const PageIndicator = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) =>
    props.active
      ? props.priceNotZero
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(255, 255, 255, 0.4)"
      : "transparent"};
  border: 1px solid ${(props) => (props.priceNotZero ? "green" : "#636363")};
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  svg {
    color: green;
    display: ${(props) => (props.priceNotZero ? "block" : "none")};
  }
`;
const PageIndicatorplus = styled.div`
  width: 20px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.25);
  border: 1px solid #636363;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  svg {
    color: lightblue;
    display: "block";
  }
`;
const NavigationButton = styled.button`
  //   background: rgba(0, 0, 0, 0.5);
  background: none;
  color: #fff;
  border: none;
  //   padding: 10px;
  cursor: pointer;
`;
export const Tocartflexdiv1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 400px;
  margin: auto;
  position: relative;

  margin: auto;
  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;
export const TocartCTABtn1 = styled.div`
  box-sizing: border-box;
  text-decoration: none;
  padding: 10px 5px;
  background: #f0f0f0;
  border: 2px solid #006b9e;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  width: 180px;
  // height: 32px;
  // margin: 40px;
  text-align: center;
  border: 1px solid #006b9e;
  transition: all 0.2s ease-in;
  cursor: pointer;

  &:hover {
    color: #fff;
    background: #006b9e;
    border: 1px solid white;
  }
`;

const Carousel = ({ setModel }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const cart = useSelector((state) => state.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addingMoreModelLocal = useSelector(
    (state) => state.addingMoreModel.isAdding
  );
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
  const [imageUrls, setImageUrls] = useState([]);
  const calculatePriceString = localStorage.getItem("calculatePriceFunction");
  useEffect(() => {
    // Check if the currentItem is still valid after deletion
    if (currentItem >= cart.length) {
      setCurrentItem(cart.length - 1);
    }
    // console.log(addingMoreModelLocal);
  }, [currentItem, cart.length]);
  const [allRefsSet, setAllRefsSet] = useState(false);
  // const canvasRefs = useRef(
  //   Array.from({ length: cart.cartItems.length }, () => React.createRef())
  // );
  const canvasRefs = useRef([]);
  useEffect(() => {
    // Update canvasRefs to match the current number of items in the cart
    canvasRefs.current = Array.from({ length: cart.cartItems.length }, () =>
      React.createRef()
    );
    console.log(canvasRefs.current.length);
  }, [cart.cartItems]);
  // useEffect(() => {
  //   if (!allRefsSet && canvasRefs.current.every(ref => ref && ref.current)) {
  //     console.log('allrefset triggered')
  //     // All refs are set
  //     setAllRefsSet(true);
  //   }
  // }, [canvasRefs.current, allRefsSet]);
  // // useEffect for capturing screenshots
  // useEffect(() => {
  //   if (allRefsSet) {
  //     // Access each ref individually and do something with it
  //     canvasRefs.current.forEach((ref, index) => {
  //       if (ref && ref.current) {
  //         // Use a block statement to create a new scope for index
  //         {
  //           const currentIndex = index;
  //           captureScreenshot(cart.cartItems[currentIndex].id, currentIndex, ref.current)
  //             .then((blob) => {
  //               // Do something with the blob
  //               console.log(
  //                 `Screenshot captured for item ${cart.cartItems[currentIndex].id}:`,
  //                 blob
  //               );
  //               // You can call storeImage here if needed
  //             })
  //             .catch((error) => {
  //               console.error(
  //                 `Error capturing screenshot for item ${currentIndex}:`,
  //                 error
  //               );
  //             });
  //         }
  //       } else {
  //         console.error(`Canvas ref is not set for item ${index}.`);
  //       }
  //     });
  //   }
  // }, [canvasRefs.current, cart, allRefsSet]);

  useEffect(() => {
    const captureScreenshots = async () => {
      if (canvasRefs.current.every((ref) => ref.current)) {
        // All refs are set
        console.log("All refs are set. Capturing screenshots...");
        const newImageUrls = [];
        for (let i = 0; i < canvasRefs.current.length; i++) {
          const ref = canvasRefs.current[i];
          const canvas = ref.current;
          const itemId = cart.cartItems[i].id;
          if (canvas) {
            try {
              const blob = await captureScreenshot(itemId, i, canvas);
              console.log(`Screenshot captured for item ${itemId}:`, blob);
              // Do something with the blob
              const dataURL = await blobToDataURL(blob);
              newImageUrls.push(dataURL);
            } catch (error) {
              console.error(
                `Error capturing screenshot for item ${itemId}:`,
                error
              );
            }
          } else {
            console.error(`Canvas ref is not set for item ${i}.`);
          }
        }

        setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
        // console.log(newImageUrls)
      } else {
        console.log("Not all refs are set yet.");
      }
    };

    setTimeout(captureScreenshots, 2000);
  }, [cart, canvasRefs.current]);

  // Function to convert blob to data URL
  const blobToDataURL = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Function to display blob as image and add to state array
  const displayBlobAsImage = async (blob) => {
    try {
      const dataURL = await blobToDataURL(blob);
      setImageUrls((prevUrls) => [...prevUrls, dataURL]);
    } catch (error) {
      console.error("Error displaying blob as image:", error);
    }
  };

  const scrollLeft = () => {
    if (currentItem > 0) {
      setCurrentItem(currentItem - 1);
    }
  };
  const scrollRight = () => {
    if (currentItem < items.length - 1) {
      setCurrentItem(currentItem + 1);
    }
  };
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

  const handleMaterialChange = (e, id) => {
    const newMaterial = e.target.value;
    dispatch(updateMaterial({ ProductId: id, newMaterial }));
  };

  const handleColorChange = (e, id) => {
    const newColor = e.target.value;
    dispatch(updateColor({ ProductId: id, newColor }));
  };
  const handleDelete = (tempModelId) => {
    const filteredCartItems = cart.cartItems.filter((item) => item.id !== tempModelId);
    // Assuming setModel is the useState setter for your model state
    setModel((prevModels) =>
      prevModels.filter((model) => model.LocalID !== tempModelId)
    );
    dispatch(deleteModel(tempModelId));
    dispatch(decrementCartCount());
    deleteFileFromDB(tempModelId);
    deleteImageFromIndexDB(tempModelId);
    dispatch(updateCartItem({ updatedCartItems: filteredCartItems }));
    // deleteAllRecordsFromDB();
  };

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
  const captureScreenshot = (imageId, index, originalCanvas) => {
    return new Promise((resolve) => {
      // console.log("Original canvas:", originalCanvas);
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
        // Store the image directly
        storeImage(`image${imageId}`, blob)
          .then((imageUrl) => {
            resolve(imageUrl);
          })
          .catch((error) => {
            console.error("Error storing image:", error);
            resolve(null);
          });
        resolve(blob);
      } else {
        resolve(null);
      }
    });
  };
  const goToPage = (pageIndex) => {
    setCurrentItem(pageIndex);
  };
  const handleToCart = () => {
    navigate(`/cart?cart=${cart.cartItems.length}`);
  };
  return (
    <StyledOuterDiv addingMoreModel={addingMoreModelLocal}>
      {cart.cartItems.every(
        (item) =>
          item.pricePerUnit !== 0 &&
          item.options.material !== "" &&
          item.options.color !== ""
      ) && (
        <Tocartflexdiv>
          <TocartCTABtn onClick={handleToCart}>TO CART</TocartCTABtn>
        </Tocartflexdiv>
      )}

      <CarouselContainer>
        <ButtonContainer>
          {cart.cartItems.map((item, index) => (
            <PageIndicator
              key={index}
              active={index === currentItem}
              onClick={() => goToPage(index)}
              priceNotZero={
                item.pricePerUnit !== 0 &&
                item.options.material !== "" &&
                item.options.color !== ""
              }
            >
              <MdCheck />
            </PageIndicator>
          ))}
          <PageIndicatorplus
            onClick={() => dispatch(addingMoreModels(true))}
            style={{ cursor: "pointer" }}
          >
            <MdAdd />
          </PageIndicatorplus>
        </ButtonContainer>
        <div
          style={{
            display: "flex",
            transform: `translateX(-${currentItem * 100}%)`,
            transition: "transform 0.3s",
          }}
        >
          {/* {items.map((item, index) => (
            <CarouselItem key={index}>{item}</CarouselItem>
          ))} */}
          {cart.cartItems.map((individualModel, index) => {
            const { material, color, quantity } = individualModel.options || {};
            const { width, height, depth } = individualModel.dimensions || {};
            const price = individualModel.pricePerUnit || 0;
            // console.log(`Item ${index}, Price: ${price}`);
            return (
              <div key={index} style={{ width: "100%", height: "auto" }}>
                {/* Your existing code for DropzoneFormcontainer */}
                <DropzoneFormcontainer style={{ width: "100%" }}>
                  <DropzoneContainer>
                    <Canvas
                     key={individualModel.id}
                      ref={canvasRefs.current[index]}
                      width={"100%"}
                      height={"100%"}
                      linear={"true"}
                      gl={{ preserveDrawingBuffer: true }}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                      }}
                      dpr={[1, 2]}
                      camera={{ fov: 45 }}
                    >
                      <color attach="background" args={["#e3e3e3"]} />
                      <PresentationControls>
                        <Stage environment={"studio"}>
                          <OrbitControls />
                          <ambientLight />
                          <pointLight position={[10, 10, 10]} />
                          <primitive
                            object={individualModel.model}
                            scale={0.01}
                          />
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
                      <Moption value="TPU">
                        Thermoplastic Polyurethane (TPU)
                      </Moption>
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
                              onClick={() =>
                                increaseQuantityAction(individualModel.id)
                              }
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
                              onClick={() =>
                                decreaseQuantityAction(individualModel.id)
                              }
                              customMargin="0 0 0 5px"
                            >
                              -
                            </QuantityButton>
                          </QtyDiv>
                          <QtyDiv2>
                            <MinP>x </MinP>
                            <MinP>${price} </MinP>
                            <MinP>= </MinP>
                            <MinP>
                              $ {(price * parseInt(quantity)).toFixed(2)}
                            </MinP>
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
                        Costs (Price-Match Guarantee): We will ensure that our
                        quotes are the cheapest in town to make sure that you
                        get the bang for the buck pricings. Supply an official
                        invoice from the supplier and a screen shot of our price
                        page we will match it, should you find one cheaper than
                        our quote!
                      </Mdropdownlabel>
                    ) : (
                      <></>
                    )}
                  </LoginContainer>
                </LoginFromcontainer>
                {/* {imageUrls.length != 0 ? (
                  imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Screenshot ${index}`} />
                  ))
                ) : (
                  <>not loaded</>
                )} */}
              </div>
            );
          })}
        </div>
      </CarouselContainer>
    </StyledOuterDiv>
  );
};

export default Carousel;
