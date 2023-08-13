// src/components/Checkout.js
import { Breadcrumb, Button, Form, Input, List } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import {
  emptyCartOfUser,
  getCartOfUser,
  selectTotalPrice,
} from "../../store/cartSlice";
import { postOrder } from "../../store/orderSlice";
import validators from "../../utils/validators";
import "./Checkout.css";

function Checkout() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getCartOfUser(userId));
  }, [dispatch]);
  const cartProducts = useSelector((state) => state.cart.carts);
  console.log(cartProducts);
  const totalPrice = useSelector(selectTotalPrice);

  const handleSubmit = async (value) => {
    const newOrder = {
      id: Date.now().toString(),
      customerName: value.customerName,
      phone: value.phone,
      address: value.address,
      dateCreated: new Date().toISOString(),
      detail: cartProducts,
    };

    try {
      dispatch(postOrder(newOrder));
      dispatch(emptyCartOfUser(localStorage.getItem("userId")));
      navigation("/");
      // window.location.reload();
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-36 bg-slate-50">
        <div className="py-8">
          <Breadcrumb
            items={[
              {
                title: <Link to="/">Trang chủ</Link>,
              },
              {
                title: "Thanh toán đơn hàng",
              },
            ]}
          />
        </div>
        <div className="checkout gap-x-10">
          <List
            className="w-1/2 bg-white"
            header={<div className="font-bold">Danh sách sản phẩm</div>}
            footer={
              <div className="font-bold">
                Tổng tiền:{" "}
                <span className="text-red-600">
                  {totalPrice.toLocaleString()} $
                </span>
              </div>
            }
            size="large"
            bordered
            dataSource={cartProducts}
            renderItem={(item) => (
              <List.Item>
                {item.title} - Giá bán : {Number(item.price).toLocaleString()} $
                - Số lượng {item.quantity}
              </List.Item>
            )}
          />
          <Form
            form={form}
            onFinish={handleSubmit}
            className="bg-white w-1/3 px-20 py-10 rounded-md shadow-md"
          >
            <Form.Item
              label="Tên khách hàng"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="customerName"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên khách hàng !",
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
              <Input placeholder="Tên khách hàng" size="large" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="phone"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại !",
                },
                {
                  validator(_, value) {
                    return new Promise((resolve, reject) => {
                      if (!validators.phone.test(value)) {
                        reject("Không đúng định dạng số điện thoại !");
                      } else {
                        resolve();
                      }
                    });
                  },
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="address"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ !",
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
              <Input.TextArea placeholder="Địa chỉ khách hàng" size="large" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full mt-4">
                MUA HÀNG
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Checkout;
