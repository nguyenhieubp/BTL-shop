import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../store/productSlice";
import "./CreateProduct.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import validators from "../../../utils/validators";
import { FaUpload } from "react-icons/fa";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [image, setImage] = useState([]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage([e.target.result]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = (value) => {
    dispatch(
      createProduct({
        title: value.title,
        description: value.description,
        price: value.price,
        category: value.category,
        images: image,
      })
    );
    navigation("/admin/dashboard/product");
  };

  return (
    <div className="grid grid-cols-6">
      <div className="col-start-1 col-end-7 mb-6">TẠO MỚI SẢN PHẨM</div>
      <Form
        onFinish={handleSubmit}
        className="col-start-2 col-end-6 grid grid-cols-2 gap-4"
      >
        <Form.Item
          label="Tên sản phẩm"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="title"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên sản phẩm !",
            },
            {
              validator(_, value) {
                return new Promise((resolve, reject) => {
                  if (validators.space.test(value)) {
                    reject("Không bao gồm khoảng cách ở đầu !");
                  } else {
                    resolve();
                  }
                });
              },
            },
          ]}
        >
          <Input placeholder="Tên sản phẩm" size="large" />
        </Form.Item>
        <Form.Item
          label="Miêu tả"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="description"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập miêu tả sản phẩm !",
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
          <Input size="large" placeholder="Miêu tả" />
        </Form.Item>
        <Form.Item
          label="Giá"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="price"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá sản phẩm !",
            },
            {
              validator(_, value) {
                return new Promise((resolve, reject) => {
                  if (!validators.positiveIntNum.test(value)) {
                    reject("Không đúng định dạng số !");
                  } else {
                    resolve();
                  }
                });
              },
            },
          ]}
        >
          <InputNumber min={1} className="w-full" size="large" />
        </Form.Item>
        <Form.Item
          label="Loại sản phẩm"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="category"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại sản phẩm !",
            },
          ]}
        >
          <Select
            size="large"
            allowClear
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
        </Form.Item>
        <Form.Item
          label="Ảnh"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ảnh sản phẩm !",
            },
          ]}
        >
          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image.length > 0 && (
            <img src={image[0]} alt="Product" className="mt-4" />
          )}
        </Form.Item>
        <Form.Item className="col-start-1">
          <Button type="primary" htmlType="submit" className="w-full">
            TẠO MỚI
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
