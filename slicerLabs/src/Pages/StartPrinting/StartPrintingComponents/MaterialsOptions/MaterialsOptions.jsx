import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  LoginContainer,
  LoginFlexdiv,
  LoginFromcontainer,
} from "../../../Login/LoginComponents/LoginForm/LoginFormelements";
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
} from "./MaterialsOptionselements";
import { useNavigate } from "react-router-dom";
// import { useCartCount } from "../../../../App";
import { useDispatch, useSelector } from "react-redux";
import { addMaterialOptions } from "../../../../ReduxStore/reducers/CartItemReducer";
import { doc, getDoc } from "firebase/firestore";
import { ConfigCollection } from "../../../../firebase";
import ErrorPrompt from "../../../../globalcomponents/prompt/ErrorPrompt";
const defaultCalculatePriceFunction = (material, color, dimensions) => {
  // You can return a default value or an error message here if needed
  return 0; // For example, returning 0 as a default price
};
const MaterialsOptions = ({
  tempModelId,
  setTempModelId,
  isModelLoaded,
  setIsModelLoaded,
  isCheckedOut,
  setIsCheckedOut,
  isAddedToCart,
  setIsAddedToCart,
  isFormFilled,
  setisFormFilled,
  handleCheckOutInChild,
}) => {
  const aboveDivRef = useRef(null);
  const belowDivRef = useRef(null);
  const leftDivRef = useRef(null);
  const rightDivRef = useRef(null);
  const [material, setMaterial] = useState("");
  const cart = useSelector((state) => state.cartItems);
  const dimensions = cart.cartItems[0].dimensions;
  const [color, setColor] = useState("");
  const [width, setWidth] = useState(Math.round(dimensions?.width));
  const [height, setHeight] = useState(Math.round(dimensions?.height));
  const [depth, setDepth] = useState(Math.round(dimensions?.depth));
  const [quantity, setQuantity] = useState(1);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const ProductId = useSelector((state) => state.cartItems.tempModelId);

  const [cartCount, setCartCount] = useState(cart.length > 0 ? cart.length : 0);
  const idToken = localStorage.getItem("idToken");
  const userUIDInLocalStorage = localStorage.getItem("uid");

  const [ErrorHandling, setErrorHandling] = useState({
    state: false,
    header: "",
    message: "",
  });
  const [materialSettings, setMaterialSettings] = useState({
    printTimePerUnitVolume: {
      ABS: 0.06, // minutes/mm^3
      PLA: 0.04, // minutes/mm^3
      TPU: 0.06, // minutes/mm^3
      NYLON: 0.07, // minutes/mm^3
      PETG: 0.05, // minutes/mm^3
      RESIN: 0.03, // minutes/mm^3
    },
    materialCosts: {
      ABS: 0.06, // SGD per gram
      PLA: 0.04, // SGD per gram
      TPU: 0.06, // SGD per gram
      NYLON: 0.07, // SGD per gram
      PETG: 0.05, // SGD per gram
      RESIN: 0.1, // SGD per gram
    },
    hourlyRate: 24,
    laborCost: 20,
    overheadCost: 4,
  });
  useEffect(() => {
    // Perform actions or update the UI based on changes in the cart array
    // For example, you can update a notification count or trigger a checkout process

    // Here's an example of updating a notification count
    setCartCount(cart.length);
    //  console.log(cart);
    // ... update the UI or trigger other actions based on the notification count
  }, [cart]);
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
      console.log(materialSettings);
    } catch (error) {
      console.error("Error fetching configuration settings:", error);
    }
  };
  useEffect(() => {
    fetchConfigSettings();
    console.log(cart.cartItems[0].dimensions);
  }, []);

  // Fetch the calculatePrice function from local storage
  useEffect(() => {
    if (material && color && width && height && depth) {
      setisFormFilled(true);
    }
    if (calculatePriceString) {
      const calculatePriceFunctionToStore = parseStoredFunction(
        "calculatePrice",
        calculatePriceString
      );

      updatePrice(calculatePriceFunctionToStore);
    }
  }, [material, color, width, height, depth]);

  // function calculatePriceFunction(material, color, dimensions) {
  //   // Check if dimensions is defined, if not, set it to an empty object
  //   dimensions = dimensions || {};

  //   // Define the density values for different materials
  //   const densityValues = {
  //     ABS: 1.04,     // g/cm^3
  //     PLA: 1.25,     // g/cm^3
  //     TPU: 1.21,     // g/cm^3
  //     NYLON: 1.14,   // g/cm^3
  //     PETG: 1.27,    // g/cm^3
  //     RESIN: 1.05    // g/cm^3
  //   };

  //   // Define the print time per unit volume for different materials (in minutes)
  //   const printTimePerUnitVolume = {
  //     ABS: 0.05,     // minutes/cm^3
  //     PLA: 0.04,     // minutes/cm^3
  //     TPU: 0.06,     // minutes/cm^3
  //     NYLON: 0.07,   // minutes/cm^3
  //     PETG: 0.05,    // minutes/cm^3
  //     RESIN: 0.03    // minutes/cm^3
  //   };

  //   // Define the base cost per gram for different materials
  //   const materialCosts = {
  //     ABS: 0.05, // SGD per gram
  //     PLA: 0.04, // SGD per gram
  //     TPU: 0.06, // SGD per gram
  //     NYLON: 0.07, // SGD per gram
  //     PETG: 0.05, // SGD per gram
  //     Resin: 0.1, // SGD per gram
  //   };

  //   // Define the hourly machine usage rate
  //   const hourlyRate = 20; // SGD per hour

  //   // Define the labor cost per hour for post-processing tasks
  //   const laborCost = 25; // SGD per hour

  //   // Define any additional overhead costs per print or per hour
  //   const overheadCost = 5; // SGD per print or per hour

  //   // Calculate mass and print time using the calculateMassAndPrintTime function
  //   const volume = dimensions.width * dimensions.height * dimensions.depth || 0;; // cm^3
  //   const density = densityValues[material] || 0; // g/cm^3
  //   const mass = volume * density; // grams
  //   const printTime = volume * printTimePerUnitVolume[material] || 0; // minutes

  //   // Calculate material cost based on the weight of the object
  //   const materialCost = materialCosts[material] * mass;

  //   // Calculate the machine usage cost based on the print time
  //   const machineUsageCost = (printTime / 60) * hourlyRate;

  //   // Calculate the labor cost based on the post-processing time (if applicable)
  //   const complexityLower = dimensions.complexity?.toLowerCase() || "";
  //   let postProcessingTime = 0;

  //   if (complexityLower === "low") {
  //     postProcessingTime = 1;
  //   } else if (complexityLower === "medium") {
  //     postProcessingTime = 2;
  //   } else if (complexityLower === "high") {
  //     postProcessingTime = 3;
  //   }

  //   const LaborCost = postProcessingTime * laborCost;

  //   // Calculate the total cost including material, machine usage, labor, and overhead costs
  //   const totalCost = materialCost + machineUsageCost + LaborCost + overheadCost;

  //   const roundedTotalCost = totalCost.toFixed(2);
  //   // Return the calculated price
  //   return parseFloat(roundedTotalCost);
  // }
  const updatePrice = (anotherFunction) => {
    // console.log(anotherFunction);
    if (anotherFunction && material && color && width && height && depth) {
      const newPrice = anotherFunction(
        material,
        color,
        {
          width,
          height,
          depth,
        },
        materialSettings
      );
      setPrice(newPrice);
    }
  };

  const cartString = encodeURIComponent(JSON.stringify(cart.options));
  const handleAddToCart = () => {
    if (!material || !color || !width || !height || !depth || !quantity) {
      // alert("please fill in empty fields");
      setErrorHandling({
        state: true,
        header: "An Error Occured",
        message: "please fill in empty fields",
      });
    } else {
      setMaterial("");
      setColor("");
      setWidth(10);
      setHeight(10);
      setDepth(10);
      setQuantity(1);
      setPrice(0);
      const finalItem = {
        ProductId, // generate a unique ID for the item
        material,
        color,
        dimensions: {
          width,
          height,
          depth,
        },
        quantity,
        price,
      };
      handleCheckOutInChild();
      dispatch(
        addMaterialOptions({ checkID: tempModelId, options: finalItem })
      );
      setIsAddedToCart(true);
      setIsModelLoaded(false);
      setisFormFilled(false);
      // setIsCheckedOut(true);
      console.log(cart);
    }
  };
  const handleCheckOut = () => {
    if (cart.cartItems.length > 0) {
      if (!material && !color && !width && !height && !depth) {
        Navigate(`/cart?cart=${cartString}`);
      } else {
        if (!material || !color || !width || !height || !depth) {
          // alert(
          //   "please fill all in empty fields or empty the field to proceed"
          // );
          setErrorHandling({
            state: true,
            header: "An Error Occured",
            message:
              "please fill all in empty fields or empty the field to proceed.",
          });
        } else {
          const finalItem = {
            tempID, // generate a unique ID for the item
            material,
            color,
            dimensions: {
              width,
              height,
              depth,
            },
            quantity,
            price,
          };
          dispatch(
            addMaterialOptions({ checkID: tempModelId, options: finalItem })
          );
          setIsCheckedOut(true);
          // setIsAddedToCart(false);
          setMaterial("");
          setColor("");
          setWidth("");
          setHeight("");
          setDepth("");
          setQuantity(1);
          Navigate(`/cart?cart=${cartString}`);
          console.log(cart);
        }
      }
    } else {
      // alert("please add to cart");
      setErrorHandling({
        state: true,
        header: "An Error Occured",
        message: "please add to cart",
      });
      if (!material || !color || !width || !height || !depth || !quantity) {
        // alert("please fill in empty fields");
        setErrorHandling({
          state: true,
          header: "An Error Occured",
          message: "please fill in empty fields",
        });
      } else {
        const finalItem = {
          tempID, // generate a unique ID for the item
          material,
          color,
          dimensions: {
            width,
            height,
            depth,
          },
          quantity,
          price,
        };
        dispatch(
          addMaterialOptions({ checkID: tempModelId, options: finalItem })
        );
        setIsCheckedOut(true);
        // setIsAddedToCart(false);
        setMaterial("");
        setColor("");
        setWidth("");
        setHeight("");
        setDepth("");
        setQuantity(1);
        Navigate(`/cart?cart=${cartString}`);
        console.log(cart);
      }
    }
  };

  useLayoutEffect(() => {
    const updatePosition = () => {
      const aboveHeight = aboveDivRef.current.getBoundingClientRect().height;
      belowDivRef.current.style.top = `${aboveHeight + 520}px`;
    };
    const updateHorizontalPosition = () => {
      if (leftDivRef.current && rightDivRef.current) {
        const aboveWidth = leftDivRef.current.getBoundingClientRect().width;
        rightDivRef.current.style.left = `${aboveWidth + 15}px`;
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
  }, [material, color, width, height, depth, price]);

  return (
    <>
      <LoginFromcontainer ref={aboveDivRef}>
        <LoginContainer>
          <Mdropdownlabel htmlFor="material">Materials</Mdropdownlabel>
          <MOdropdown
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <Moption value="">Please Select a Material</Moption>
            <Moption value="ABS">Acrylonitrile Butadiene Styrene (ABS)</Moption>
            <Moption value="PLA">Polylactic Acid (PLA)</Moption>
            <Moption value="TPU">Thermoplastic Polyurethane (TPU)</Moption>
            <Moption value="NYLON">Nylon</Moption>
            <Moption value="PETG">
              Polyethylene Terephthalate Glycol (PETG)
            </Moption>
            <Moption value="Resin">Resins</Moption>
          </MOdropdown>

          <Mdropdownlabel htmlFor="color">Finshing & Color</Mdropdownlabel>
          <MOdropdown value={color} onChange={(e) => setColor(e.target.value)}>
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
              value={Math.round(dimensions?.width)}
              readOnly // Make the input field uneditable
              step="1" // Allow only whole numbers
              // onChange={(e) => {
              //   const value = e.target.value;
              //   if (value >= 10) {
              //     setWidth(value);
              //   }
              // }}
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
              value={Math.round(dimensions?.height)}
              readOnly // Make the input field uneditable
              step="1" // Allow only whole numbers
              // onChange={(e) => {
              //   const value = e.target.value;
              //   if (value >= 10) {
              //     setHeight(value);
              //   }
              // }}
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
              value={Math.round(dimensions?.depth)}
              readOnly // Make the input field uneditable
              step="1" // Allow only whole numbers
              // onChange={(e) => {
              //   const value = e.target.value;
              //   if (value >= 10) {
              //     setDepth(value);
              //   }
              // }}
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

          {/* {material && color && width && height && depth ? (
            <TocartCTABtn onClick={handleCheckPrice}>Check Price</TocartCTABtn>
          ) : (
            <></>
          )} */}
          {material && color && width && height && depth ? (
            <div>
              <Mdropdownlabel htmlFor="quantity">Quantity</Mdropdownlabel>
              <LoginFlexdiv>
                <Minputqtt
                  type="number"
                  placeholder="Quantity"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                ></Minputqtt>
                <MinP>x </MinP>
                <MinP>${price} </MinP>
                <MinP>= </MinP>
                <MinP>$ {(price * parseInt(quantity)).toFixed(2)}</MinP>
              </LoginFlexdiv>
            </div>
          ) : (
            <></>
          )}
          {price ? (
            <Mdropdownlabel>Costs (Price-Match Guarantee): We will ensure that our quotes are the cheapest in town to make sure that you get the bang for the buck pricings. Supply an official invoice from the supplier and we will match it should you find one cheaper than our quote!</Mdropdownlabel>
          ) : (
            <></>
          )}
        </LoginContainer>
      </LoginFromcontainer>
      <Tocartflexdiv ref={belowDivRef}>
        {price ? (
          <TocartCTABtn onClick={handleAddToCart}>ADD TO CART</TocartCTABtn>
        ) : (
          <></>
        )}

        {/* {cart.cartItems.length > 0 ? (
          <>
            <div style={{ display: "flex", width: "180px" }}>
              <TocartCTABtn onClick={handleCheckOut}>
                <div>CHECK OUT</div>
              </TocartCTABtn>
              {cart && <NotiPrompt>{cart.cartItems.length}</NotiPrompt>}
            </div>
          </>
        ) : (
          <></>
        )} */}
      </Tocartflexdiv>
      {ErrorHandling.state && (
        <ErrorPrompt
          header={ErrorHandling.header}
          message={ErrorHandling.message}
          onClose={() => setErrorHandling({ ...ErrorHandling, state: false })}
        />
      )}
    </>
  );
};

export default MaterialsOptions;
