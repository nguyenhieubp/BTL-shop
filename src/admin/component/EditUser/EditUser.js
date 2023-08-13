// EditUser.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import "./EditUser.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../../../store/loginSlice";
import { Button, Form, Input } from "antd";
import validators from "../../../utils/validators";

const EditUser = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { email: encodedEmail } = useParams();
  const email = decodeURIComponent(encodedEmail);

  useEffect(() => {
    dispatch(getUserById(email));
  }, [dispatch, email]);

  const { userUpdate } = useSelector((state) => state.login);

  const [formData, setFormData] = useState(userUpdate);

  useEffect(() => {
    setFormData(userUpdate);
  }, [userUpdate]);

  const handleSubmit = (value) => {
    dispatch(
      updateUser({
        id: email,
        email: value.email,
        password: value.password,
      })
    );
    navigation("/admin/dashboard/user");
  };

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="grid grid-cols-3">
      <div>CẬP NHẬT NGƯỜI DÙNG</div>
      <Form
        onFinish={handleSubmit}
        fields={[
          {
            name: ["email"],
            value: userUpdate?.email,
          },
          {
            name: ["password"],
            value: userUpdate?.password,
          },
        ]}
        className="col-start-2 col-end-3"
      >
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
            THAY ĐỔI
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
