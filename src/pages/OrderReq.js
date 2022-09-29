import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CustomOptnsTable from "../components/CustomOptnsTable";
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
      status
      request_Cons_Id
      request_Cons_Name
    }
  }
`;

const updateStatusMutation = gql`
  mutation updateStat($waste: WasteInput!) {
    updateStatus(waste: $waste) {
      status
      waste_Id
    }
  }
`;

const updateConsIdsMutation = gql`
  mutation updateCons($waste: WasteInput!) {
    updateConsId(waste: $waste) {
      waste_Id
      cons_Id
      status
    }
  }
`;

const OrderReq = () => {
  const [updateAccept] = useMutation(updateStatusMutation);
  const [updateCons] = useMutation(updateConsIdsMutation);
  const navigate = useNavigate();
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

  const handleReject = async (id) => {
    try {
      const result = await updateAccept({
        variables: {
          waste: {
            waste_Id: id,
            status: "Rejected",
          },
        },
      });
      console.log(result);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (id) => {
    try {
      const res = await updateCons({
        variables: {
          waste: {
            waste_Id: id,
            cons_Id: user.id,
            status: "Accepted",
          },
        },
      });
      console.log(res);
      navigate("/accept");
    } catch (error) {
      console.log(error);
    }
  };

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
            if (data["status"] === "Pending") {
              let tempObj = {};
              tempObj["Sl No."] = i;
              i = i + 1;
              tempObj["Producer Name"] = data["prod_Name"];
              tempObj["Type"] = data["type"];
              tempObj["Primary Substance"] = data["primary_Substance"];
              tempObj["Quantity (in Tonnes)"] = data["quantity"];
              tempObj["Month"] = data["month"];
              tempObj["id"] = data["waste_Id"];
              tempObj["status"] = data["status"];
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
          <strong>Order History</strong>
        </CCardHeader>
        <CCardBody>
          <CustomOptnsTable
            headings={headings}
            data={tableContents}
            title="Order Requets"
            actionFunc={handleAccept}
            cancelFunc={handleReject}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default OrderReq;
