import "./App.css";
import products from "./data/products";
import { useState } from "react";

function App() {
  const [cartProduct, setCartProduct] = useState([]);

  const addProductToCart = (product) => {
    const newCartProduct = [...cartProduct]
    const existingProductIndex = newCartProduct.findIndex((p) => p.id === product.id);
    console.log(existingProductIndex)
    if (existingProductIndex !== -1) {
      newCartProduct[existingProductIndex].quantity += 1;
    } else {
      newCartProduct.push({ ...product, quantity: 1 });
    }
    setCartProduct(newCartProduct);
  }

  const deleteCartProduct = (productIndex) => {
    const newCartProduct = [...cartProduct]
    newCartProduct.splice(productIndex, 1)
    setCartProduct(newCartProduct)
  }

  const updateQuantity = (index, newQuantity) => {
    const updateQuantity = [...cartProduct]
    updateQuantity[index].quantity = newQuantity;
    newQuantity === 0 ? deleteCartProduct(index) : setCartProduct(updateQuantity)
  }

  const sumPriceCartProduct = () => {
    return cartProduct.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {products.map((item, index) => {
            return (
              <div className="product" key={index}>
                <img src={item.image} alt={item.name} />
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <button onClick={() => {
                  return(
                    addProductToCart(item)
                  )        
                } }>Add to cart</button>
              </div>  
            );
          })}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">Cart (Total Price is {sumPriceCartProduct()} Baht)</h1>
        <div className="cart-item-list">
          {cartProduct.map((item, index) => {
            return (
              <div className="cart-item">
                <h1>Item name: {item.name}</h1>
                <h2>Price: {(item.quantity) * (item.price)} Baht</h2>
                <h2>Quantity: {item.quantity}</h2>
                <button className="delete-button" onClick={() => {deleteCartProduct(index)}}>x</button>
                <div className="quantity-actions">
                  <button className="add-quantity" onClick={() => {updateQuantity(index, item.quantity + 1)}}>+</button>
                  <button className="subtract-quantity" onClick={() => {updateQuantity(index, item.quantity - 1)}}>-</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
