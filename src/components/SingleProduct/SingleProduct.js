import React, { useState } from "react";
import "./SingleProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalVisible } from "../../store/modalSlice";
import { formatPrice } from "../../utils/helpers";
import { addCartOfUser } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const SingleProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: product } = useSelector((state) => state.modal);

  const [quantity, setQuantity] = useState(1);

  const modalOverlayHandler = (e) => {
    if (e.target.classList.contains("overlay-bg")) {
      dispatch(setIsModalVisible(false));
    }
  };

  const handleAddCart = () => {
    const newCart = {
      id: new Date().getTime().toString(),
      userId: localStorage.getItem("userId"),
      title: product.title,
      category: product.category,
      description: product.description,
      price: product.price,
      images: product.images,
      quantity,
    };
    dispatch(addCartOfUser(newCart));
    dispatch(setIsModalVisible(false));
    navigate("/cart");
  };

  return (
    <div className="overlay-bg" onClick={modalOverlayHandler}>
      <div className="product-details-modal bg-white">
        <button
          type="button"
          className="modal-close-btn flex flex-center fs-14"
          onClick={() => dispatch(setIsModalVisible(false))}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="details-content grid">
          {/* details left */}
          <div className="details-right">
            <div className="details-img">
              <img
                src={product.images[0]}
                alt={product.title}
                className="rounded-md h-96"
              />
            </div>
          </div>
          <div className="details-left">
            <div className="details-info">
              <h3 className="title text-regal-blue fs-22 fw-5">
                {product.title}
              </h3>
              <p className="description text-pine-green">
                {product.description}
              </p>
              <p className="description text-pine-green">
                Loại sản phẩm : {product.category}
              </p>
              <div className="price fw-7 fs-24">
                Giá bán :{" "}
                <span className="text-red-600">
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="qty flex">
                <span className="text-light-blue qty-text">Số lượng: </span>
                <div className="qty-change flex">
                  <button
                    onClick={() => {
                      if (quantity <= 1) {
                        return;
                      }
                      setQuantity(quantity - 1);
                    }}
                    type="button"
                    className="qty-dec fs-14"
                  >
                    <i className="fas fa-minus text-light-blue"></i>
                  </button>
                  <span className="qty-value flex flex-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    type="button"
                    className="qty-inc fs-14 text-light-blue"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <Button
                onClick={handleAddCart}
                className="mt-3 w-full"
                size="large"
                type="primary"
              >
                <span className="btn-icon">
                  <i className="fas fa-cart-shopping"></i>
                </span>
                <span className="btn-text ml-2">THÊM VÀO GIỎ HÀNG</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
