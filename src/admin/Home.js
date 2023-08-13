import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigation = useNavigate();
  const handleGoHome = () => {
    localStorage.setItem("adminId", "");
    navigation("/");
  };
  return (
    <div>
      <div style={{ cursor: "pointer" }} onClick={handleGoHome}>
        <FaHome /> Home
      </div>
    </div>
  );
};

export default Home;
