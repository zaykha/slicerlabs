import React from 'react'

const Cart = () => {
  return (
    <div>
    <h1>Checkout</h1>
    <ul>
      {state.cart.map((item, index) => (
        <li key={index}>
          Material: {item.material}, Finishing: {item.finishing}, Dimension: {item.dimension}, Quantity: {item.quantity}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Cart