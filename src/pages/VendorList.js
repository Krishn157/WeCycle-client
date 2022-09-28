import { gql, useApolloClient, useLazyQuery, useQuery } from "@apollo/client";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CustomTable from "../components/CustomTable";

const CONSUMERS = gql`
  query getConsumers {
    consumers {
      id
      org_Name
      email
      org_Desc
      phone_No
    }
  }
`;
const VendorList = () => {
  const headings = [
    "Sl No.",
    "Consumer Name",
    "Email",
    "Description",
    "Contact",
  ];

  const [tableContents, setTableContents] = useState([]);

  const [getConsumers, { loading, error, data }] = useLazyQuery(CONSUMERS);
  console.log(data);

  console.log(error);

  useEffect(() => {
    getConsumers()
      .then((res) => {
        console.log(res.data);
        let apiData = [];
        let contents = [];
        apiData = res.data.consumers;
        let i = 1;
        apiData.forEach((data) => {
          let tempObj = {};
          tempObj["Sl No."] = i;
          i = i + 1;
          tempObj["Consumer Name"] = data["org_Name"];
          tempObj["Email"] = data["email"];
          tempObj["Description"] = data["org_Desc"];
          tempObj["Contact"] = data["phone_No"];
          contents = [...contents, tempObj];
        });
        setTableContents(contents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getConsumers]);

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Consumer List</strong>
        </CCardHeader>
        <CCardBody>
          <CustomTable
            headings={headings}
            data={tableContents}
            title="List of Consumers"
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default VendorList;
