import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CustomTable from "../components/CustomTable";
import { useAuth } from "../contexts/authContext";

const ORDERS = gql`
  query wasteByProd($prod_Id: Int!) {
    wastebyprodid(prod_Id: $prod_Id) {
      waste_Id
      type
      primary_Substance
      quantity
      month
      status
      prod_Id
      prod_Name
      request_Cons_Id
      request_Cons_Name
    }
  }
`;

const OrderList = () => {
  const headings = [
    "Sl No.",
    "Type",
    "Primary Substance",
    "Quantity (in Tonnes)",
    "Month",
    "Requested To",
    "Status",
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
          prod_Id: id,
        },
      })
        .then((res) => {
          console.log(res.data.wastebyprodid);
          let apiData = [];
          let contents = [];
          apiData = res.data.wastebyprodid;
          let i = 1;
          apiData.forEach((data) => {
            let tempObj = {};
            tempObj["Sl No."] = i;
            i = i + 1;
            tempObj["Type"] = data["type"];
            tempObj["Primary Substance"] = data["primary_Substance"];
            tempObj["Description"] = data["org_Desc"];
            tempObj["Quantity (in Tonnes)"] = data["quantity"];
            tempObj["Month"] = data["month"];
            tempObj["Requested To"] = data["request_Cons_Name"];
            tempObj["Status"] = data["status"];
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
            title="Order List"
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default OrderList;
