import { CContainer } from "@coreui/react";
import { RequireAuth } from "./RequireAuth";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import NewOrder from "../pages/NewOrder";
import OrderList from "../pages/OrderList";
import VendorList from "../pages/VendorList";
import DashBoardConsumer from "../pages/DashBoardConsumer";
import OrderReq from "../pages/OrderReq";
import AcceptedReq from "../pages/AcceptedReq";
import ConsEnergyRecords from "../pages/ConsEnergyRecords";

const AppContent = () => {
  const getElement = (Component, redirectTo = "/login") => {
    return (
      <RequireAuth redirectTo={redirectTo}>
        <Component />
      </RequireAuth>
    );
  };

  return (
    <CContainer lg>
      <Routes>
        <Route
          path="/dashboard"
          name="Dashboard"
          element={getElement(DashBoard)}
        />
        <Route
          path="/dashboard-consumer"
          name="Consumer Dashboard"
          element={getElement(DashBoard)}
        />
        <Route
          path="/vendors"
          name="Vendor List"
          element={getElement(VendorList)}
        />
        <Route path="/new-order" element={getElement(NewOrder)} />
        <Route path="/order-list" element={getElement(OrderList)} />
        <Route path="/order-req" element={getElement(OrderReq)} />
        <Route path="/accept" element={getElement(AcceptedReq)} />
        <Route path="/energy-cons" element={getElement(ConsEnergyRecords)} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </CContainer>
  );
};

export default AppContent;
