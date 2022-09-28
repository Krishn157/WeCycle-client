import { gql, useQuery } from "@apollo/client";
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
import React from "react";

const USERS = gql`
  query myquery {
    wasteproducers {
      id
      first_Name
    }
  }
`;

const NewOrder = () => {
  const { loading, error, data } = useQuery(USERS);
  console.log(data);
  console.log(error);
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
                  { label: "One", value: "1" },
                  { label: "Two", value: "2" },
                  { label: "Three", value: "3", disabled: true },
                ]}
              />
            </CCol>
            <CCol xs={6}>
              <CFormInput
                type="text"
                placeholder="Primary Substance"
                aria-label="primary substance"
              />
            </CCol>

            <CCol xs={6}>
              <CFormInput
                type="text"
                placeholder="Quantity in Tonnes"
                aria-label="Quantity"
              />
            </CCol>

            <CCol xs={6}>
              <CFormSelect
                aria-label="Choose Processing Plant"
                options={[
                  "Choose Processing Plant",
                  { label: "One", value: "1" },
                  { label: "Two", value: "2" },
                  { label: "Three", value: "3", disabled: true },
                ]}
              />
            </CCol>
            <CCol xs={6}>
              <CFormSelect
                aria-label="Month"
                options={[
                  "Choose Month",
                  { label: "One", value: "1" },
                  { label: "Two", value: "2" },
                  { label: "Three", value: "3", disabled: true },
                ]}
              />
            </CCol>
            <CCol xs={6}>
              <CButton color="primary" type="submit">
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
