import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import CustomTable from "../components/CustomTable";

const OrderList = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Order Requests</strong>
        </CCardHeader>
        <CCardBody>{/* <CustomTable /> */}</CCardBody>
      </CCard>
    </>
  );
};

export default OrderList;
