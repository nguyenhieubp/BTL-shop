import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import "./LoginForm.css";
import { Button, Form, Input } from "antd";
import validators from "../../utils/validators";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      window.location.reload();
    }
  }, [user]);

  const handleLogin = (value) => {
    dispatch(loginUser({ email: value.email, password: value.password }));
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
              <Link className="register-link" to="/register">
                Đăng Ký
              </Link>
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

export default LoginForm;
