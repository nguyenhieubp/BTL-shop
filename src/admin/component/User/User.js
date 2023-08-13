// User.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUser } from "../../../store/loginSlice";
import "./User.css";
import { Button, Input, Modal, Table } from "antd";
import { FaTrash } from "react-icons/fa";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { confirm } = Modal;
  const { users } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hàm xóa người dùng
  const deleteUser = (id) => {
    dispatch(deleteUsers(id));
  };

  // Hàm xử lý sự kiện click của nút Delete
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa người dùng này không?",
      width: 500,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteUser(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const dataSource = filteredUsers.map((x) => ({
    key: x.id,
    email: x.email,
    password: x.password,
    actions: (
      <div className="action-buttons">
        <Button
          type="primary"
          onClick={() => navigate(`/admin/dashboard/user/edit/${x.id}`)}
        >
          Sửa
        </Button>
        <Button
          type="primary"
          danger
          style={{ marginLeft: "4rem" }}
          onClick={() => showDeleteConfirm(x.id)}
        >
          Xóa
        </Button>
      </div>
    ),
  }));

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      key: "password",
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

export default User;
