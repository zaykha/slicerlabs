import React, { useState } from "react";
import styled from "styled-components";
import { updatePrice, updateQuantity } from "../../ReduxStore/reducers/CartItemReducer";
import { useDispatch } from "react-redux";

const Table = styled.table`
  width: 100%;
  margin: 0 auto 30px auto;
  border-collapse: collapse;
  width: 300px;
  color: white;
  table-layout: fixed;
`;

const Th = styled.th`
  width: 33.33%;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid lightblue;
`;

const Tr = styled.tr`
  //   &:nth-child(even) {
  //     background-color: #f2f2f2;
  //   }
  &:hover {
    background: linear-gradient(
      180deg,
      rgba(8, 51, 71, 0.93) 0%,
      rgba(0, 80, 118, 0.63) 100%
    );
    cursor: pointer;
  }
`;

const Td = styled.td`
  padding: 10px;
  text-align: center;
`;

function PriceTable({ initialPrice, individualModel }) {
  // console.log(initialPrice)
  const dispatch = useDispatch();
  // Function to generate prices
  function generatePriceArray(initialPrice) {
    const prices = [];

    // Quantity 1
    prices.push(initialPrice);

    // Quantity 2
    const price2 = initialPrice - 0.5;
    prices.push(price2.toFixed(2));

    // Quantity 5
    const price5 = initialPrice - 0.3; // Applying discount for 3 additional units
    prices.push(price5.toFixed(2));

    // Quantity 10
    const price10 = initialPrice - 0.4; // Applying discount for 8 additional units
    prices.push(price10.toFixed(2));

    // Quantity 50
    const price50 = initialPrice - 0.78; // Applying discount for 45 additional units
    prices.push(price50.toFixed(2));

    // Quantity 100
    const price100 = initialPrice - 1.39; // Applying discount for 99 additional units
    prices.push(price100.toFixed(2));

    return prices;
  }

  const quantities = [1, 2, 5, 10, 50, 100];

  // State to manage prices
  const [prices, setPrices] = useState(
    quantities.map((quantity) => {
      const unitPrices = generatePriceArray(initialPrice);
      console.log(unitPrices)
      const unitPrice = unitPrices[quantities.indexOf(quantity)]; // Get the price corresponding to the current quantity
      const totalPrice = unitPrice * quantity;
      return { quantity, unitPrice, totalPrice };
    })
  );

  // Handler for row click
  const handleRowClick = (index) => {
    dispatch(
      updateQuantity({
        ProductId: individualModel.id,
        newQuantity: quantities[index],
      })
    );
    const newPrices = [...prices];
    dispatch(
        updatePrice({
          ProductId: individualModel.id,
          newPrice: prices[index].unitPrice,
        })
      );
  };

  return (
    <Table>
      <thead>
        <tr>
          <Th>Quantity</Th>
          <Th>Unit Price</Th>
          <Th>Total Price</Th>
        </tr>
      </thead>
      <tbody>
        {prices.map((price, index) => (
          <Tr key={index} onClick={() => handleRowClick(index)}>
            <Td>{price.quantity}</Td>
            <Td>{price.unitPrice}</Td>
            <Td>{price.totalPrice.toFixed(2)}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}

export default PriceTable;
