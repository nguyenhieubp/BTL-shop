import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { getProductId, updateProduct } from "../../../store/productSlice";
import "./EditProduct.css";
import { Button, Form, Input, InputNumber, Select } from "antd";
import validators from "../../../utils/validators";

const EditProduct = () => {
  const navigation = useNavigate();
  const { name: idProduct } = useParams();
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);

  useEffect(() => {
    dispatch(getProductId(idProduct));
  }, [dispatch, idProduct]);

  const product = useSelector((state) => state.product.productEdit);

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
      updateProduct({
        title: value.title,
        description: value.description,
        price: value.price,
        category: value.category,
        images: image.length > 0 ? image : product.images,
        id: idProduct,
      })
    );
    navigation("/admin/dashboard/product");
  };

  return (
    <div className="grid grid-cols-6">
      <div className="col-start-1 col-end-7 mb-6">CẬP NHẬT SẢN PHẨM</div>
      <Form
        fields={[
          {
            name: ["title"],
            value: product.title,
          },
          {
            name: ["description"],
            value: product.description,
          },
          {
            name: ["price"],
            value: product.price,
          },
          {
            name: ["category"],
            value: product.category,
          },
        ]}
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
          <InputNumber min={1} size="large" className="w-full" />
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
            placeholder="Chọn loại sản phẩm"
            allowClear
            size="large"
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
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Item>
        <Form.Item>
          {product.images?.map(
            (img, index) =>
              img.startsWith("data:image") && (
                <img
                  key={index}
                  src={image.length > 0 ? image : img}
                  alt="Product"
                  className="mt-4"
                />
              )
          )}
        </Form.Item>
        <Form.Item className=" col-start-1">
          <Button type="primary" htmlType="submit" className="w-full">
            CẬP NHẬT
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProduct;
