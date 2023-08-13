import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import { Home, LoginForm, CartPage, Checkout } from "./pages/index";
// components
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "./pages/Register/Register";
import LoginAdmin from "./admin/component/LoginAdmin/LoginAdmin";
import ProtectedAdminRoutes from "./ProtectedAdminRoutes";
import { getUserCurrent } from "./store/loginSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCurrent(localStorage.getItem("userId")));
  }, [dispatch]);
  const user = useSelector((state) => state.login.userCurrent);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <LoginForm />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/admin/*" element={<ProtectedAdminRoutes />} />
          <Route path="/private/login" element={<LoginAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
