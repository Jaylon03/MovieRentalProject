import React from "react";
import { Film, ShoppingCart } from "lucide-react"; // Import ShoppingCart icon
import "../styles/Header.css";

export const Header = ({ cart }) => {
  return (
    <header className="header">
      <div className="header-content">
        <a href="/" className="logo">
          <Film size={32} color="#3b82f6" />
          <h1>MovieRental</h1>
        </a>
        <nav>
          <ul className="nav-list">
            <li>
              <a href="/" className="nav-link">Home</a>
            </li>
            <li>
              <a href="#" className="nav-link">
                <ShoppingCart size={20} color="#3b82f6" style={{ marginRight: "8px" }} />
                My Cart <span>({cart.length})</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
