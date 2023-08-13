// Product.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Product.css";
import { fetchProducts, deleteProduct } from "../../../store/productSlice";
import { Button, Input, Modal, Table } from "antd";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { confirm } = Modal;
  const products = useSelector((state) => state.product.data);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      width: 500,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        dispatch(deleteProduct(id));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const dataSource = filteredProducts.map((x) => ({
    key: x.id,
    title: x.title,
    description: x.description,
    price: Number(x.price).toLocaleString(),
    category: x.category,
    actions: (
      <div className="action-buttons gap-4">
        <Button
          type="primary"
          onClick={() => navigate("/admin/dashboard/product/create")}
        >
          Thêm
        </Button>
        <Button
          style={{ backgroundColor: "#1dd1a1" }}
          type="primary"
          onClick={() => navigate(`/admin/dashboard/product/edit/${x.id}`)}
        >
          Sửa
        </Button>
        <Button type="primary" danger onClick={() => showDeleteConfirm(x.id)}>
          Xóa
        </Button>
      </div>
    ),
  }));

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Miêu tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  return (
    <div>
      <Input.Search
        size="large"
        placeholder="Tìm kiếm..."
        allowClear
        onSearch={(value) => handleSearchChange(value)}
        className="w-1/2"
      />
      <Table dataSource={dataSource} columns={columns} className="mt-6" />
    </div>
  );
};

export default Product;
