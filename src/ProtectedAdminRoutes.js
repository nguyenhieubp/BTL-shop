import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Admin from "./admin/Admin";

const ProtectedAdminRoutes = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      const adminId = localStorage.getItem("adminId");
      if (!adminId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/admins?id=${adminId}`
        );
        setAdmin(response.data);
      } catch (error) {
        console.error("Failed to fetch admin", error);
      }

      setLoading(false);
    };

    fetchAdmin();
  }, []);

  if (loading) return null;
  if (admin) return <Admin />;
  return <Navigate to="/private/login" replace />;
};

export default ProtectedAdminRoutes;
