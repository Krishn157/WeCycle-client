import { gql, useMutation, useQuery } from "@apollo/client";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSelect,
  CRow,
} from "@coreui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const CONSUMERS = gql`
  query getConsumers {
    consumers {
      id
      org_Name
    }
  }
`;

const createWasteMutation = gql`
  mutation createWaste($waste: WasteInput!) {
    createwaste(waste: $waste) {
      waste_Id
      type
      primary_Substance
      quantity
      month
      request_Cons_Id
      prod_Id
      cons_Id
      prod_Name
      request_Cons_Name
    }
  }
`;

const NewOrder = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loading, error, data = {} } = useQuery(CONSUMERS);
  console.log(data.consumers);

  const [createWaste] = useMutation(createWasteMutation);

  const [type, setType] = useState("");
  const [subs, setSubs] = useState("");
  const [quant, setQuant] = useState("");
  const [plant, setPlant] = useState("");
  const [month, setMonth] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const orgName = data.consumers?.find(
      (consumer) => consumer.id === +plant
    )?.org_Name;
    // debugger;
    console.log(type, subs, quant, month, user.id, plant, orgName);
    try {
      const res = await createWaste({
        variables: {
          waste: {
            type: type,
            primary_Substance: subs,
            quantity: +quant,
            month: month,
            prod_Id: user.id,
            prod_Name: user.org_Name,
            request_Cons_Id: +plant,
            request_Cons_Name: orgName,
          },
        },
      });
      const data = res.data.createwaste;
      console.log(data);
      navigate("/order-list");
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  const options =
    data.consumers?.map((consumer) => {
      const { id, org_Name } = consumer;
      return { label: org_Name, value: id };
    }) || [];

  console.log("options", options);

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>New Order</strong>
        </CCardHeader>
        <CCardBody>
          <CRow xs={{ gutterY: 4 }}>
            <CCol xs={6}>
              <CFormSelect
                aria-label="Select Waste Type"
                options={[
                  "Select Waste Type",
                  { label: "Type 1", value: "Type 1" },
                  { label: "Type 2", value: "Type 2" },
                  { label: "Type 3", value: "Type 3" },
                  { label: "Type 4", value: "Type 4" },
                ]}
                onChange={(e) => setType(e.target.value)}
              />
            </CCol>
            <CCol xs={6}>
              <CFormInput
                type="text"
                placeholder="Primary Substance"
                aria-label="primary substance"
                value={subs}
                onChange={(e) => setSubs(e.target.value)}
              />
            </CCol>

            <CCol xs={6}>
              <CFormInput
                type="text"
                placeholder="Quantity in Tonnes"
                aria-label="Quantity"
                value={quant}
                onChange={(e) => setQuant(e.target.value)}
              />
            </CCol>

            <CCol xs={6}>
              <CFormSelect
                aria-label="Choose Processing Plant"
                options={["Choose Processing Company", ...options]}
                onChange={
                  (e) => {
                    setPlant(e.target.value);
                  }
                  // onChange={(e, {value}) => setPlant(value)
                }
              />
            </CCol>
            <CCol xs={6}>
              <CFormSelect
                aria-label="Month"
                options={[
                  "Choose Month",
                  { label: "January", value: "January" },
                  { label: "February", value: "February" },
                  { label: "March", value: "March" },
                  { label: "April", value: "April" },
                  { label: "May", value: "May" },
                  { label: "June", value: "June" },
                  { label: "July", value: "July" },
                  { label: "August", value: "August" },
                  { label: "September", value: "Sptember" },
                  { label: "October", value: "October" },
                  { label: "November", value: "November" },
                  { label: "December", value: "December" },
                ]}
                onChange={(e) => setMonth(e.target.value)}
              />
            </CCol>
            <CCol xs={6}>
              <CButton color="primary" onClick={submitHandler} type="submit">
                Place Order
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default NewOrder;
