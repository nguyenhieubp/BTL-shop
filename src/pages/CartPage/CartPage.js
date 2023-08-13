import React, { useEffect, useState } from "react";
import "./CartPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import Navbar from "../../components/Navbar/Navbar";
import {
  getCartOfUser,
  removeCartOfUser,
  selectTotalPrice,
  updateQuantityOfCartItem,
} from "../../store/cartSlice";
import { Breadcrumb, Pagination } from "antd";
import { FaTrash } from "react-icons/fa";

const CartPage = () => {
  const dispatch = useDispatch();
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getCartOfUser(userId));
  }, [dispatch]);
  const cartProducts = useSelector((state) => state.cart.carts);

  const removeFromUserCart = (id) => {
    dispatch(removeCartOfUser(id));
  };

  const totalPrice = useSelector(selectTotalPrice);

  const emptyCartMsg = <h4 className="text-red fw-6">No items found!</h4>;

  const itemsPerPage = 2;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = cartProducts.slice(itemOffset, endOffset);
  const size = cartProducts.length;

  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    const newOffset = ((page - 1) * itemsPerPage) % size;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Navbar />
      <div className="cart-page px-48">
        <div className="py-8">
          <Breadcrumb
            items={[
              {
                title: <Link to="/">Trang chủ</Link>,
              },
              {
                title: "Giỏ hàng của tôi",
              },
            ]}
          />
        </div>
        <div className="bg-slate-50 py-5 mb-10">
          <div className="container">
            <div className="section-title bg-slate-50">
              <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
                Danh sách sản phẩm
              </h3>
            </div>
            {currentItems.length === 0 ? (
              emptyCartMsg
            ) : (
              <div className="cart-content grid">
                <div className="cart-left">
                  <div className="cart-items grid">
                    {currentItems.map((cartProduct) => (
                      <div key={cartProduct?.id} className="cart-item grid">
                        <img
                          src={cartProduct?.images?.[0]}
                          alt={cartProduct?.title}
                          className="w-full h-52 rounded-md"
                        />
                        <div className="cart-item-info">
                          <h6 className="fs-16 fw-5 text-light-blue grid grid-cols-2">
                            <div>{cartProduct?.title}</div>
                            <div className="flex justify-end">
                              <button
                                type="button"
                                className="btn-square rmv-from-cart-btn"
                                onClick={() =>
                                  dispatch(removeFromUserCart(cartProduct.id))
                                }
                              >
                                <FaTrash color="red" />
                              </button>
                            </div>
                          </h6>
                          <h6 className="fs-16 fw-5 text-light-blue">
                            Loại sản phẩm : {cartProduct?.category}
                          </h6>
                          <div className="qty flex">
                            <span className="text-light-blue qty-text">
                              Số Lượng:{" "}
                            </span>
                            <div className="qty-change flex">
                              <button
                                type="button"
                                className="qty-inc fs-14 text-light-blue"
                                onClick={() => {
                                  if (cartProduct.quantity > 1) {
                                    dispatch(
                                      updateQuantityOfCartItem({
                                        cartId: cartProduct.id,
                                        quantity: cartProduct.quantity - 1,
                                      })
                                    );
                                  }
                                }}
                              >
                                <i className="fas fa-minus text-light-blue"></i>
                              </button>
                              <span className="qty-value flex flex-center">
                                {cartProduct?.quantity}
                              </span>
                              <button
                                type="button"
                                className="qty-inc fs-14 text-light-blue"
                                onClick={() =>
                                  dispatch(
                                    updateQuantityOfCartItem({
                                      cartId: cartProduct.id,
                                      quantity: cartProduct.quantity + 1,
                                    })
                                  )
                                }
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-between">
                            <div className="text-pine-green fw-4 fs-15 price">
                              Giá :{" "}
                              <span className="text-red-600">
                                {Number(cartProduct?.price).toLocaleString()} $
                              </span>
                            </div>
                            <div className="sub-total fw-6 fs-18 text-regal-blue">
                              <span>
                                Thành tiền :{" "}
                                <span className="text-red-600">
                                  {(
                                    cartProduct?.price * cartProduct?.quantity
                                  ).toLocaleString()}{" "}
                                  $
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    {/* Pagination */}
                    <Pagination
                      showSizeChanger={false}
                      defaultCurrent={1}
                      onChange={handlePageClick}
                      pageSize={itemsPerPage}
                      total={size}
                    />
                  </div>
                </div>
                <div className="cart-right bg-white rounded-md">
                  <div className="cart-summary text-light-blue">
                    <div className="cart-summary-title">
                      <h6 className="fs-20 fw-5">Tất cả sản phẩm</h6>
                    </div>
                    <ul className="cart-summary-info">
                      <li className="flex flex-between">
                        <span className="fw-4">
                          Có {cartProducts.length} sản phẩm giá
                        </span>
                        <span className="fw-7">
                          {totalPrice.toLocaleString()} $
                        </span>
                      </li>
                    </ul>
                    <div className="cart-summary-total flex flex-between fs-18">
                      <span className="fw-6">Tổng tiền: </span>
                      <span className="fw-6 text-red-600">
                        {totalPrice.toLocaleString()} $
                      </span>
                    </div>
                    <Link to="/checkout">
                      <div className="cart-summary-btn">
                        <button type="button" className="btn-secondary">
                          Tiến hành thanh toán
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
