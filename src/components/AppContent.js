import { CContainer } from "@coreui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import NewOrder from "../pages/NewOrder";
import OrderList from "../pages/OrderList";
import VendorList from "../pages/VendorList";

const AppContent = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    setUserInfo(localStorage.getItem("userInfo"));
    console.log(userInfo);
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);
  return (
    <CContainer lg>
      <Routes>
        <Route path="/dashboard" name="Dashboard" element={<DashBoard />} />
        <Route path="/vendors" name="Vendor List" element={<VendorList />} />
        <Route path="/new-order" element={<NewOrder />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </CContainer>
  );
};

export default AppContent;
