// Order.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Order.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrders, getAllOrders } from "../../../store/orderSlice";
import { Button, Input, Modal, Table } from "antd";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { confirm } = Modal;
  const { listOrder } = useSelector((state) => state.order);
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    setOrders(listOrder);
  }, [listOrder]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hàm xóa đơn hàng
  const deleteOrder = (id) => {
    dispatch(deleteOrders(id));
  };

  // Hàm xử lý sự kiện click của nút Delete
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa đơn hàng này không?",
      width: 500,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteOrder(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  function showDetail(x) {
    setId(x);
    setIsModalOpen(true);
  }

  const dataSource = filteredOrders.map((x) => ({
    key: x.id,
    customerName: x.customerName,
    phone: x.phone,
    address: x.address,
    dateCreated: x.dateCreated,
    // product:
    //   Array.isArray(x.detail) &&
    //   x.detail.map(
    //     (item) =>
    //       `Sản phẩm : ${item.title}, Số lượng : ${item.quantity}, Giá : ${item.price}`
    //   ),
    actions: (
      <div className="flex gap-3">
        <Button type="primary" onClick={() => showDetail(x.id)}>
          Chi tiết
        </Button>
        <Button type="primary" danger onClick={() => showDeleteConfirm(x.id)}>
          Xóa
        </Button>
      </div>
    ),
  }));

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày mua",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    // {
    //   title: "Sản phẩm",
    //   dataIndex: "product",
    //   key: "product",
    // },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const colums2 = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
    },
  ];

  const dataSource2 = filteredOrders
    .find((x) => x.id === id)
    ?.detail?.map((x) => ({
      key: x.id,
      product: (
        <div className="flex gap-x-4">
          <img src={x.images} className="w-28 rounded-md" />
          {x.title}
        </div>
      ),
      customerName: filteredOrders.find((x) => x.id === id).customerName,
      phone: filteredOrders.find((x) => x.id === id).phone,
      address: filteredOrders.find((x) => x.id === id).address,
      price: Number(x.price).toLocaleString(),
      quantity: x.quantity,
      total: (Number(x.price) * x.quantity).toLocaleString(),
    }));

  const totalPrice = filteredOrders
    .find((x) => x.id === id)
    ?.detail?.reduce((acc, o) => acc + parseInt(o.price) * o.quantity, 0);

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
      <Modal
        title="Chi tiết đơn hàng"
        width={"80%"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Table dataSource={dataSource2} columns={colums2} className="mt-6" />
        <div style={{ fontSize: 20, color: "red" }}>
          Tổng tiền : {totalPrice} $
        </div>
      </Modal>
    </div>
  );
};

export default Order;
