import React, { useEffect, useRef, useState } from "react";
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

const MaterialsOptions = ({
  tempModelId,
  setTempModelId,
  isModelLoaded,
  setIsModelLoaded,
  isCheckedOut,
  setIsCheckedOut
}) => {

  const aboveDivRef = useRef(null);
  const belowDivRef = useRef(null);
  const leftDivRef = useRef(null);
  const rightDivRef = useRef(null);
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [depth, setDepth] = useState(10);
  const [quantity, setQuantity] = useState(1);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const ProductId = useSelector((state) => state.cartItems.tempModelId);
  const cart = useSelector(state => state.cartItems);
  const [cartCount, setCartCount] = useState(cart.length > 0 ? cart.length : 0);
  useEffect(() => {
    // Perform actions or update the UI based on changes in the cart array
    // For example, you can update a notification count or trigger a checkout process

    // Here's an example of updating a notification count
   setCartCount(cart.length)
   console.log(cart);
    // ... update the UI or trigger other actions based on the notification count
  }, [cart]);
  const handleCheckPrice = async () => {
    console.log("checking");
    const item = {
      material,
      color,
      dimensions: {
        width: Number(width),
        height: Number(height),
        depth: Number(depth),
      },
    };
    try {
      const response = await fetch("http://localhost:3000/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Error calculating price");
      }

      const data = await response.json();
      const calculatedPrice = data.price.toFixed(2); // Round the price to two decimal places
      console.log(data);
      setPrice(calculatedPrice);
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  const handleAddToCart = () => {
    if (!material || !color || !width || !height || !depth || !quantity) {
      alert("please fill in empty fields");
    } else {
      setMaterial("");
      setColor("");
      setWidth("");
      setHeight("");
      setDepth("");
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
      dispatch(addMaterialOptions({options:finalItem}));
      setIsCheckedOut(true);
      console.log(cart);
    }
  };
  const handleCheckOut = () => {
    if (cart.cartItems.length > 0) {
      if (!material && !color && !width && !height && !depth) {
        const cartString = encodeURIComponent(JSON.stringify(cart));
        Navigate(`/cart?cart=${cartString}`);
      } else {
        if (!material || !color || !width || !height || !depth) {
          alert(
            "please fill all in empty fields or empty the field to proceed"
          );
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
          dispatch(addMaterialOptions(tempModelId, finalItem));
          setIsCheckedOut(true);
          setMaterial("");
          setColor("");
          setWidth("");
          setHeight("");
          setDepth("");
          setQuantity(1);
          Navigate(`/cart?cart=${cartString}`);
        }
      }
    } else {
      alert("please add to cart");
      if (!material || !color || !width || !height || !depth || !quantity) {
        alert("please fill in empty fields");
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
        dispatch(addMaterialOptions(tempModelId, finalItem));
        setIsCheckedOut(true);
        setMaterial("");
        setColor("");
        setWidth("");
        setHeight("");
        setDepth("");
        setQuantity(1);
        Navigate(`/cart?cart=${cartString}`);
      }
    }
  };

  useEffect(() => {
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
            <Moption value="Nylon">Nylon</Moption>
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
                  setWidth(value);
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
                  setHeight(value);
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
                  setDepth(value);
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

          {material && color && width && height && depth ? (
            <TocartCTABtn onClick={handleCheckPrice}>Check Price</TocartCTABtn>
          ) : (
            <></>
          )}
          {price ? (
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
          {/* <MinP>Your Product will be Produced in ? business days.</MinP> */}
        </LoginContainer>
      </LoginFromcontainer>
      <Tocartflexdiv ref={belowDivRef}>
        {price ? (
          <TocartCTABtn onClick={handleAddToCart}>ADD TO CART</TocartCTABtn>
        ) : (
          <></>
        )}

        {cart.cartItems.length > 0 ? (
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
        )}
      </Tocartflexdiv>
    </>
  );
};

export default MaterialsOptions;
