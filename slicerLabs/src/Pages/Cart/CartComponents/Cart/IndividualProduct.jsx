import React from "react";
import "./IndividualProductelement.css";
import {
  MOdropdown,
  Mdropdownlabel,
  Moption,
} from "../../../StartPrinting/StartPrintingComponents/MaterialsOptions/MaterialsOptionselements";
import { useState } from "react";
import { useSelector } from "react-redux";
const IndividualProduct = ({
  index,
  tempID,
  material,
  color,
  width,
  height,
  depth,
  quantity,
  price,
  onDelete
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const cartItemsDetails = useSelector((state) => state.cartItems.cartItems);

  const increaseQuantity = () => {
    dispatch(increaseQuantity({ ProductId: tempID }));

  };

  const decreaseQuantity = () => {
    dispatch(decreaseQuantity({ ProductId: tempID }));
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      onDelete(tempID);
    }
  };
  return (
    <div className="box">
      <div className="ITEM-wrapper">
        <div className="ITEM">
          <div className="overlap">
            <div className="vertical-Division1">
              <div className="ezgif-wrapper">
                <img className="ezgif" alt="Ezgif" src="ezgif.png" />
              </div>
            </div>

            <div className="vertical-Division1">
              <h1 className="text-wrapper">ITEM {index}</h1>

              <div className="group-2">
                <div className="overlap-group-wrapper">
                  <div className="overlap-group-3">
                    <div className="rectangle-2"  onClick={increaseQuantity}>
                      <div className="text-wrapper-7">+</div> 
                    </div>
                  </div>
                  <div className="text-wrapper-6">{quantity}</div>

                  <div className="overlap-2" onClick={decreaseQuantity}>
                    <div className="rectangle-3">
                      <div className="text-wrapper-8">-</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="vertical-Division2">
              <Mdropdownlabel htmlFor="material">Materials</Mdropdownlabel>
              <MOdropdown
                value={material}
                // onChange={(e) => setMaterial(e.target.value)}
              >
                <Moption value="">Please Select a Material</Moption>
                <Moption value="ABS">
                  Acrylonitrile Butadiene Styrene (ABS)
                </Moption>
                <Moption value="PLA">Polylactic Acid (PLA)</Moption>
                <Moption value="TPU">Thermoplastic Polyurethane (TPU)</Moption>
                <Moption value="Nylon">Nylon</Moption>
                <Moption value="PETG">
                  Polyethylene Terephthalate Glycol (PETG)
                </Moption>
                <Moption value="Resin">Resins</Moption>
              </MOdropdown>

              <Mdropdownlabel htmlFor="color">Finshing & Color</Mdropdownlabel>
              <MOdropdown
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
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
            </div>

            <div className="vertical-Division3">
              <div className="div">Total :</div>
              <div className="overlap-group">
                <div className="text-wrapper-3">SGD</div>
                <div className="text-wrapper-2">{price}</div>
              </div>
            </div>

            <div className="group" onClick={handleDelete}>
              <div className="overlap-group-2">
                <div className="rectangle">
                  <div className="text-wrapper-5">x</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-wrapper-4"> ID : {tempID}</div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProduct;
