import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCartTotal } from "../../store/cartSlice";
import { getUserById } from "../../store/loginSlice";
import { FaCartPlus, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigator = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = useSelector((state) => state.login.userCurrent?.email);
  const cartProducts = useSelector((state) => state.cart.carts);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigator("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="container">
          <div className="navbar-top flex flex-between">
            <Link to="/" className="navbar-brand">
              <span className="text-regal-blue">Shopping</span>
              <span className="text-gold">Hub.</span>
            </Link>
            <div className="navbar-btns flex gap-4">
              <p
                onClick={handleLogout}
                className="text-blue-600 cursor-pointer"
              >
                <FaSignOutAlt /> Đăng Xuất
              </p>
              <Link to="/cart" className="add-to-cart-btn flex">
                <div className="btn-txt fw-5 text-red-600">
                  <FaCartPlus className="mr-2" />
                  Giỏ hàng
                  {cartProducts.length > 0 ? (
                    <span className="cart-count-value">
                      {cartProducts.length}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-bottom bg-regal-blue">
          <div className="container flex flex-between">
            <ul
              className={`nav-links flex ${
                isSidebarOpen ? "show-nav-links" : ""
              }`}
            >
              <button
                type="button"
                className="navbar-hide-btn text-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </ul>
            <button
              type="button"
              className="navbar-show-btn text-gold"
              onClick={() => setIsSidebarOpen(true)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
