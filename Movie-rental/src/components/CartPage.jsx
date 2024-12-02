import React, { useState } from "react";
import axios from "axios";
import "../styles/CartPage.css";

const CartPage = ({ cart, setCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    cardNumber: "",
  });

  const totalPrice = cart.reduce((total, movie) => total + parseFloat(movie.Price || 0), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.address || !formData.cardNumber) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/checkout", formData);

      if (response.status === 201) {
        alert("Checkout successful! Thank you for your purchase.");
        setShowCheckout(false);
        setCart([]); // Clear cart
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          address: "",
          cardNumber: "",
        }); // Reset form
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout. Please try again.");
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((movie, index) => (
              <li key={movie.MovieID || index} className="cart-item">
                <img src={movie.poster_url} alt={movie.Title} className="cart-image" />
                <div className="cart-details">
                  <h3>{movie.Title}</h3>
                  <p>Price: ${parseFloat(movie.Price || 0).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h2>Order Total: ${totalPrice.toFixed(2)}</h2>
            <hr className="cart-divider" />
            <div className="cart-actions">
              <button
                className="cart-button continue-shopping"
                onClick={() => (window.location.href = "/")}
              >
                Continue Shopping
              </button>
              <button
                className="cart-button checkout"
                onClick={() => setShowCheckout(true)}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}

      {showCheckout && (
        <div className="checkout-modal">
          <h2>Checkout</h2>
          <form onSubmit={handleCheckoutSubmit} className="checkout-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
            </label>
            <div className="checkout-actions">
              <button type="submit" className="cart-button submit">
                Submit
              </button>
              <button
                type="button"
                className="cart-button cancel"
                onClick={() => setShowCheckout(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CartPage;
