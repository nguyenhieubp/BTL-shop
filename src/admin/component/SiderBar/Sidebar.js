import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserAlt,
  FaBox,
  FaShoppingCart,
  FaPlusSquare,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <ul>
        <Link to="/admin/dashboard/home">
          <li
            className={
              location.pathname === "/admin/dashboard/home" ? "active" : ""
            }
          >
            <FaHome />
            <span>Home</span>
          </li>
        </Link>
        <Link to="/admin/dashboard/user">
          <li
            className={
              location.pathname === "/admin/dashboard/user" ? "active" : ""
            }
          >
            <FaUserAlt />
            <span>User</span>
          </li>
        </Link>
        <Link to="/admin/dashboard/product">
          <li
            className={
              location.pathname === "/admin/dashboard/product" ? "active" : ""
            }
          >
            <FaBox />
            <span>Product</span>
          </li>
        </Link>
        <Link to="/admin/dashboard/order">
          <li
            className={
              location.pathname === "/admin/dashboard/order" ? "active" : ""
            }
          >
            <FaShoppingCart />
            <span>Order</span>
          </li>
        </Link>
        <ul>
          <Link to="/admin/dashboard/product/create">
            <li
              className={
                location.pathname === "/admin/dashboard/product/create"
                  ? "active"
                  : ""
              }
            >
              <FaPlusSquare />
              <span>Create Product</span>
            </li>
          </Link>
        </ul>
      </ul>
    </div>
  );
};

export default Sidebar;
