import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { FaLock, FaUser } from "react-icons/fa";
import validators from "../../utils/validators";

const styles = {
  container: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    margin: "auto",
    height: "40rem",
    borderRadius: "1rem",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: "80%",
    border: "1px solid",
    padding: "0.5rem",
    margin: "0.5rem",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "10%",
  },
  button: {
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "0.5rem 2rem",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "0.5rem",
    cursor: "pointer",
  },
};

function RegisterForm() {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerUser = async (value) => {
    try {
      await axios.post("http://localhost:3000/users", {
        id: Date.now().toString(),
        email: value.email,
        password: value.password,
      });
      navigation("/login");
    } catch (error) {
      console.error("Failed to register user", error);
      throw error;
    }
  };

  return (
    <div className="bg-slate-100 max-h-screen grid grid-cols-3">
      <div className="col-start-2 col-end-3 grid grid-rows-3 bg-white max-h-screen">
        <div className="text-3xl font-bold flex justify-center items-center">
          Đăng ký
        </div>
        <div className="flex justify-center items-center">
          <Form onFinish={registerUser}>
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
                ĐĂNG KÝ
              </Button>
            </Form.Item>
            <Form.Item>
              <Link className="register-link" to="/login">
                Đăng Nhập
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
