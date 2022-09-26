import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import CustomTable from "../components/CustomTable";

const VendorList = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Vendor List</strong>
        </CCardHeader>
        <CCardBody>
          <CustomTable />
        </CCardBody>
      </CCard>
    </>
  );
};

export default VendorList;
