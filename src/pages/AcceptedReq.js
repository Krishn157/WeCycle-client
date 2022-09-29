import { gql, useLazyQuery, useMutation } from "@apollo/client";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
} from "@coreui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      status
      request_Cons_Id
      request_Cons_Name
      energy
    }
  }
`;

const updateEnergyMutation = gql`
  mutation uodate($waste: WasteInput!) {
    updateEnergy(waste: $waste) {
      waste_Id
      status
      cons_Id
      energy
    }
  }
`;

const AcceptedReq = () => {
  const [updateEnergy] = useMutation(updateEnergyMutation);
  const headings = [
    "Sl No.",
    "Producer Name",
    "Type",
    "Primary Substance",
    "Quantity (in Tonnes)",
    "Month",
    "Enter Energy",
  ];

  const { user } = useAuth();
  const [tableContents, setTableContents] = useState([]);
  const [energy, setEnergy] = useState([]);
  const navigate = useNavigate();

  const [getOrders, { loading, error, data }] = useLazyQuery(ORDERS);
  console.log(data);

  const submitHandler = async (id) => {
    console.log(energy, id);
    try {
      const res = await updateEnergy({
        variables: {
          waste: {
            waste_Id: id,
            energy: +energy,
          },
        },
      });
      console.log(res.data);
      navigate("/energy-cons");
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
          apiData.forEach((data, index) => {
            if (data["status"] === "Accepted" && data["energy"] === 0) {
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
              tempObj["Enter Energy"] = (
                <>
                  <CFormInput
                    type="text"
                    placeholder="in Units"
                    aria-label="Energy"
                    size="sm"
                    value={energy[i]}
                    onChange={(e) => setEnergy(e.target.value)}
                  />
                  <br />
                  <CButton
                    color="primary"
                    type="submit"
                    size="sm"
                    onClick={() => {
                      submitHandler(data.waste_Id);
                    }}
                  >
                    Enter
                  </CButton>
                </>
              );
              contents = [...contents, tempObj];
            }
          });
          setTableContents(contents);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [energy, getOrders, user]);

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Accepted Requests</strong>
        </CCardHeader>
        <CCardBody>
          <CustomTable
            headings={headings}
            data={tableContents}
            title="Enter Energy Generated"
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default AcceptedReq;
