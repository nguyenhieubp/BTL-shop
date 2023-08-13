import React, { useState } from "react";
import { STATUS } from "../../utils/status";
import "./ProductList.scss";
import { setModalData, setIsModalVisible } from "../../store/modalSlice";
import SingleProduct from "../SingleProduct/SingleProduct";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../../utils/helpers";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { Carousel, Divider, Input, Pagination, Select } from "antd";
import { sliderImages } from "../../utils/images";
import { Footer } from "antd/es/layout/layout";

const ProductList = ({ products, status }) => {
  const dispatch = useDispatch();
  const { isModalVisible } = useSelector((state) => state.modal);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [productsPerPage] = useState(5);

  const viewModalHandler = (data) => {
    dispatch(setModalData(data));
    dispatch(setIsModalVisible(true));
  };

  const filteredProducts =
    Array.isArray(products) &&
    products
      .filter(
        (product) =>
          product?.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          product?.category?.toLowerCase().includes(category.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === "lowToHigh") {
          return a.price - b.price;
        } else if (sortOrder === "highToLow") {
          return b.price - a.price;
        } else {
          return 0;
        }
      });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const size = filteredProducts.length;

  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    const newOffset = ((page - 1) * itemsPerPage) % size;
    setItemOffset(newOffset);
  };

  if (status === STATUS.ERROR) return <Error />;
  if (status === STATUS.LOADING) return <Loader />;

  return (
    <>
      <section className="product px-44 py-10" id="products">
        {isModalVisible && <SingleProduct />}
        <div className="container">
          <Carousel autoplay>
            <img src={sliderImages[0]} className="rounded-md" />
            <img src={sliderImages[1]} className="rounded-md" />
            <img src={sliderImages[2]} className="rounded-md" />
          </Carousel>
          <div className="product-content mt-10">
            <Divider orientation="left">Lọc và tìm kiếm sản phẩm</Divider>
            <div className="flex gap-6 mt-3 mb-20">
              <Input.Search
                size="large"
                placeholder="Tìm kiếm..."
                allowClear
                onSearch={(value) => setSearchTerm(value)}
                className="w-1/2"
              />
              <Select
                placeholder="Chọn loại sắp xếp"
                allowClear
                size="large"
                onChange={(value) => setSortOrder(value)}
                options={[
                  {
                    value: "highToLow",
                    label: "Cao đến thấp",
                  },
                  {
                    value: "lowToHigh",
                    label: "Thấp đến cao",
                  },
                ]}
              />
              <Select
                placeholder="Danh mục sản phẩm"
                allowClear
                size="large"
                onChange={(value) => setCategory(value)}
                options={[
                  {
                    value: "IPhone",
                    label: "IPhone",
                  },
                  {
                    value: "SamSung",
                    label: "SamSung",
                  },
                ]}
              />
            </div>
            <Divider>Danh sách sản phẩm</Divider>
            <div className="grid grid-cols-5 gap-10">
              {currentItems.map((product) => (
                <div
                  className="product-item bg-white"
                  key={product.id}
                  onClick={() => viewModalHandler(product)}
                >
                  <div className="product-item-img">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="rounded-md h-96"
                    />
                    <div className="product-item-cat text-white fs-13 text-uppercase bg-gold fw-6"></div>
                  </div>
                  <div className="product-item-body">
                    <h6 className="product-item-title text-pine-green fw-4 fs-15">
                      {product.title}
                    </h6>
                    <div className="product-item-price text-regal-blue fw-7 fs-18">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
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
        </div>
      </section>
      <Footer className="text-center mt-16">©2023 Shopping Hub</Footer>
    </>
  );
};

export default ProductList;
