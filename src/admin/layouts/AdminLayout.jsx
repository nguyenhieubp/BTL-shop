import { Affix, Breadcrumb, Layout, Menu } from "antd";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/error.png";
import {
  FaBox,
  FaHome,
  FaPlusSquare,
  FaShoppingCart,
  FaUserAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function AdminLayout(props) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    getItem(
      <Link to={"/admin/dashboard/home"}>Home</Link>,
      "/admin/dashboard/home",
      <FaHome size={18} />
    ),
    getItem(
      <Link to={"/admin/dashboard/user"}>User</Link>,
      "/admin/dashboard/user",
      <FaUserAlt size={18} />
    ),
    getItem(
      <Link to={"/admin/dashboard/product"}>Product</Link>,
      "/admin/dashboard/product",
      <FaBox size={18} />
    ),
    getItem(
      <Link to={"/admin/dashboard/order"}>Order</Link>,
      "/admin/dashboard/order",
      <FaShoppingCart size={18} />
    ),
  ];

  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Affix>
          <Sider
            collapsible
            width={250}
            className="h-screen"
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className="h-24 mb-12 pt-4 text-center">
              <Link to="/" className="navbar-brand">
                <span className="text-regal-blue">Shopping</span>
                <span className="text-gold">Hub.</span>
              </Link>
            </div>
            <Menu
              theme="dark"
              selectedKeys={location?.pathname}
              mode="inline"
              items={items}
            />
          </Sider>
        </Affix>
        <Layout>
          <Affix>
            <Header
              style={{
                padding: "0 60px",
                background: "#ffffff",
              }}
            >
              <div className="flex justify-end gap-3">
                <div className="font-bold">Xin chào !</div>
              </div>
            </Header>
          </Affix>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              className="rounded-md mt-6"
              style={{
                padding: 24,
                minHeight: 360,
                background: "#ffffff",
              }}
            >
              {props.children}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            ©2023 Shopping Hub
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default AdminLayout;
