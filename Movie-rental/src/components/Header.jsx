import React from "react";
import { Film, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

export const Header = ({ cart }) => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <Film size={32} color="#3b82f6" />
          <h1>MovieRental</h1>
        </Link>
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/cart" className="nav-link">
                <ShoppingCart size={20} color="#3b82f6" style={{ marginRight: "8px" }} />
                My Cart <span>({cart.length})</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
