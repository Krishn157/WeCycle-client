import { CContainer } from "@coreui/react";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import NewOrder from "../pages/NewOrder";
import OrderList from "../pages/OrderList";
import VendorList from "../pages/VendorList";

const AppContent = () => {
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
