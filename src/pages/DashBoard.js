import React from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CCardHeader,
  CRow,
  CProgress,
} from "@coreui/react";
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from "@coreui/react-chartjs";
import DocsCallout from "../components/DocsCallout";
import { cibFacebook, cibGoogle, cibLinkedin, cibTwitter } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useAuth } from "../contexts/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";

const WASTES = gql`
  query lastprodwaste($prod_Id: Int!) {
    lastwastebyprod(prod_Id: $prod_Id) {
      waste_Id
      prod_Id
      month
      quantity
      energy
    }
  }
`;

const ENERGY = gql`
  query lastprodwastenn($prod_Id: Int!) {
    lastwastebyprodenn(prod_Id: $prod_Id) {
      waste_Id
      prod_Id
      month
      quantity
      energy
    }
  }
`;

const DashBoard = () => {
  const [getWastes, { loading, error, data }] = useLazyQuery(WASTES);
  const [
    getEnergy,
    { loading: loadingEnergy, error: errorEnergy, data: energyData },
  ] = useLazyQuery(ENERGY);
  console.log(data);
  console.log(energyData);
  const random = () => Math.round(Math.random() * 100);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [labels, setLabels] = useState([]);
  const [bardata, setBarData] = useState([]);

  const [energyLabels, setEnergyLabels] = useState([]);
  const [linedata, setLineData] = useState([]);

  useEffect(() => {
    console.log(user);
    if (user && user.type === "Consumer") {
      navigate("/dashboard-consumer");
    }
    if (user) {
      const id = user.id;
      getWastes({
        variables: {
          prod_Id: id,
        },
      })
        .then((res) => {
          let apiData = [];
          let contents = [];
          let quant = [];
          console.log(res.data.lastwastebyprod);
          apiData = res.data.lastwastebyprod;
          apiData.forEach((data) => {
            contents.push(data["month"]);
            quant.push(data["quantity"]);
          });
          setLabels(contents);
          setBarData(quant);
        })
        .catch((err) => {
          console.log(err);
        });

      getEnergy({
        variables: {
          prod_Id: id,
        },
      })
        .then((res) => {
          let apiData = [];
          let contents = [];
          let quant = [];
          console.log(res.data.lastwastebyprodenn);
          apiData = res.data.lastwastebyprodenn;
          apiData.forEach((data) => {
            contents.push(data["month"]);
            quant.push(data["energy"]);
          });
          setEnergyLabels(contents);
          setLineData(quant);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate, user]);

  const progressGroupExample3 = [
    { title: "Organic Search", icon: cibGoogle, percent: 56, value: "191,235" },
    { title: "Facebook", icon: cibFacebook, percent: 15, value: "51,223" },
    { title: "Twitter", icon: cibTwitter, percent: 11, value: "37,564" },
    { title: "LinkedIn", icon: cibLinkedin, percent: 8, value: "27,319" },
  ];

  return (
    <CRow>
      <CCol xs={12}>
        {user && <DocsCallout name={user.org_Name} content={user.org_Desc} />}
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Waste Produced</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: labels,
                datasets: [
                  {
                    label: "Waste Produced",
                    backgroundColor: "#f87979",
                    data: bardata,
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Energy Produced</CCardHeader>
          <CCardBody>
            <CChartLine
              data={{
                labels: energyLabels,
                datasets: [
                  {
                    label: "Energy Produced",
                    backgroundColor: "rgba(151, 187, 205, 0.2)",
                    borderColor: "rgba(151, 187, 205, 1)",
                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                    pointBorderColor: "#fff",
                    data: linedata,
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {/* <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Total Waste Composition</CCardHeader>
          <CCardBody>
            <CChartDoughnut
              data={{
                labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
                datasets: [
                  {
                    backgroundColor: [
                      "#41B883",
                      "#E46651",
                      "#00D8FF",
                      "#DD1B16",
                    ],
                    data: [40, 20, 80, 10],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol> */}
    </CRow>
  );
};

export default DashBoard;
