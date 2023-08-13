import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAdmin, loginUser } from "../../../store/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import "./LoginAdmin.css";
import axios from "axios";
import { Button, Form, Input } from "antd";
import validators from "../../../utils/validators";

function LoginAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // <-- Hàm này sẽ được sử dụng để điều hướng
  const { user, error } = useSelector((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleLogin = async (value) => {
    const response = await axios.get("http://localhost:3000/admins");
    const admin = response.data;
    if (value.email === admin.email && value.password === admin.password) {
      localStorage.setItem("adminId", admin.id);
      navigate("/admin/dashboard"); // <-- điều hướng đến trang dashboard khi đăng nhập thành công
    } else {
      alert("Mật Khẩu Hoặc Email Không Đúng");
    }
  };

  return (
    <div className="bg-slate-100 max-h-screen grid grid-cols-3">
      <div className="col-start-2 col-end-3 grid grid-rows-3 bg-white max-h-screen">
        <div className="text-3xl font-bold flex justify-center items-center">
          Đăng nhập
        </div>
        <div className="flex justify-center items-center">
          <Form onFinish={handleLogin}>
            <Form.Item
              label="Email"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="email"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ email !",
                },
                {
                  validator(_, value) {
                    return new Promise((resolve, reject) => {
                      if (!validators.email.test(value)) {
                        reject("Không đúng định dạng email !");
                      } else {
                        resolve();
                      }
                    });
                  },
                },
              ]}
            >
              <Input prefix={<FaUser />} placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="password"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu !",
                },
                {
                  validator(_, value) {
                    return new Promise((resolve, reject) => {
                      if (validators.space.test(value)) {
                        reject("Không bao gồm khoảng trắng ở đầu !");
                      } else {
                        resolve();
                      }
                    });
                  },
                },
              ]}
            >
              <Input.Password
                prefix={<FaLock />}
                size="large"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                ĐĂNG NHẬP
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
