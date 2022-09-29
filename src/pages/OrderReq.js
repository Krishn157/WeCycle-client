import { gql, useLazyQuery } from "@apollo/client";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CustomTable from "../components/CustomTable";
import { useAuth } from "../contexts/authContext";

const ORDERS = gql`
  query wasteByCons($request_Cons_Id: Int!) {
    wastebyreqconsid(request_Cons_Id: $request_Cons_Id) {
      waste_Id
      type
      primary_Substance
      quantity
      month
      prod_Id
      prod_Name
      request_Cons_Id
      request_Cons_Name
    }
  }
`;

const OrderReq = () => {
  const headings = [
    "Sl No.",
    "Producer Name",
    "Type",
    "Primary Substance",
    "Quantity (in Tonnes)",
    "Month",
  ];

  const { user } = useAuth();
  const [tableContents, setTableContents] = useState([]);

  const [getOrders, { loading, error, data }] = useLazyQuery(ORDERS);
  console.log(data);
  console.log(error);

  useEffect(() => {
    if (user) {
      const id = user.id;
      getOrders({
        variables: {
          request_Cons_Id: id,
        },
      })
        .then((res) => {
          console.log(res.data.wastebyreqconsid);
          let apiData = [];
          let contents = [];
          apiData = res.data.wastebyreqconsid;
          let i = 1;
          apiData.forEach((data) => {
            let tempObj = {};
            tempObj["Sl No."] = i;
            i = i + 1;
            tempObj["Producer Name"] = data["prod_Name"];
            tempObj["Type"] = data["type"];
            tempObj["Primary Substance"] = data["primary_Substance"];
            tempObj["Quantity (in Tonnes)"] = data["quantity"];
            tempObj["Month"] = data["month"];
            contents = [...contents, tempObj];
          });
          setTableContents(contents);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [getOrders, user]);
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Order History</strong>
        </CCardHeader>
        <CCardBody>
          <CustomTable
            headings={headings}
            data={tableContents}
            title="Order Requets"
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default OrderReq;
