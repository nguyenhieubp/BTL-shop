import React, { useEffect } from "react";
import ProductList from "../../components/ProductList/ProductList";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "./CategoryPage.scss";

const CategoryPage = () => {
  const { products, status } = useSelector((state) => state.category);

  return (
    <div className="category-page">
      <div className="container">
        <div className="breadcrumb">
          <ul className="breadcrumb-items flex">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fas fa-home"></i>
                <span className="breadcrumb-separator">
                  <i className="fas fa-chevron-right"></i>
                </span>
              </Link>
            </li>
            <li>
              Category
              <span className="breadcrumb-separator">
                <i className="fas fa-chevron-right"></i>
              </span>
            </li>
            <li>{products[0] && products[0].category.name}</li>
          </ul>
        </div>
      </div>
      <ProductList products={products} status={status} />
    </div>
  );
};

export default CategoryPage;
