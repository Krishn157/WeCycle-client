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

const DashBoard = () => {
  const random = () => Math.round(Math.random() * 100);

  const progressGroupExample3 = [
    { title: "Organic Search", icon: cibGoogle, percent: 56, value: "191,235" },
    { title: "Facebook", icon: cibFacebook, percent: 15, value: "51,223" },
    { title: "Twitter", icon: cibTwitter, percent: 11, value: "37,564" },
    { title: "LinkedIn", icon: cibLinkedin, percent: 8, value: "27,319" },
  ];

  return (
    <CRow>
      <CCol xs={12}>
        <DocsCallout
          name="XYZ Organization"
          href="components/chart"
          content="XYZ organization was established in 1956, it has been a major contributor of solid wastes since then"
        />
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Waste Produced</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                ],
                datasets: [
                  {
                    label: "GitHub Commits",
                    backgroundColor: "#f87979",
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
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
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                ],
                datasets: [
                  {
                    label: "My Second dataset",
                    backgroundColor: "rgba(151, 187, 205, 0.2)",
                    borderColor: "rgba(151, 187, 205, 1)",
                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                    pointBorderColor: "#fff",
                    data: [
                      random(),
                      random(),
                      random(),
                      random(),
                      random(),
                      random(),
                      random(),
                    ],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Top Energy Producing Wastes</CCardHeader>
          <CCardBody>
            {progressGroupExample3.map((item, index) => (
              <div className="progress-group" key={index}>
                <div className="progress-group-header">
                  <CIcon className="me-2" icon={item.icon} size="lg" />
                  <span>{item.title}</span>
                  <span className="ms-auto fw-semibold">
                    {item.value}{" "}
                    <span className="text-medium-emphasis small">
                      ({item.percent}%)
                    </span>
                  </span>
                </div>
                <div className="progress-group-bars">
                  <CProgress thin color="success" value={item.percent} />
                </div>
              </div>
            ))}
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
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
      </CCol>
    </CRow>
  );
};

export default DashBoard;
