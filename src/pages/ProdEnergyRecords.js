import { gql, useLazyQuery } from "@apollo/client";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
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
      prod_Id
      prod_Name
      status
      request_Cons_Id
      request_Cons_Name
      energy
    }
  }
`;

const ProdEnergyRecords = () => {
  const headings = [
    "Sl No.",
    "Consumer Name",
    "Type",
    "Primary Substance",
    "Quantity (in Tonnes)",
    "Month",
    "Energy Generated",
  ];

  const { user } = useAuth();
  const [tableContents, setTableContents] = useState([]);

  const [getOrders, { loading, error, data }] = useLazyQuery(ORDERS);
  console.log(data);

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
            if (data["status"] === "Accepted" && data["energy"] > 0) {
              let tempObj = {};
              tempObj["Sl No."] = i;
              i = i + 1;
              tempObj["Consumer Name"] = data["cons_Name"];
              tempObj["Type"] = data["type"];
              tempObj["Primary Substance"] = data["primary_Substance"];
              tempObj["Quantity (in Tonnes)"] = data["quantity"];
              tempObj["Month"] = data["month"];
              tempObj["id"] = data["waste_Id"];
              tempObj["status"] = data["status"];
              tempObj["Energy Generated"] = data["energy"];
              contents = [...contents, tempObj];
            }
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
          <strong>Energy Records</strong>
        </CCardHeader>
        <CCardBody>
          <CustomTable
            headings={headings}
            data={tableContents}
            title="Energy Generated"
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default ProdEnergyRecords;
