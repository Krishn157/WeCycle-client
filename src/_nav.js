import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cibAddthis,
  cibClockify,
  cilBell,
  cilBook,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilList,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilTruck,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _prodnav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Producer Options",
  },
  {
    component: CNavItem,
    name: "New Order",
    to: "new-order",
    icon: <CIcon icon={cibAddthis} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Consumers List",
    to: "/vendors",
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Order List",
    to: "/order-list",
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Energy Records",
    to: "/energy-prod",
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
];

const _consnav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard-consumer",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Consumer Options",
  },
  {
    component: CNavItem,
    name: "View Requests",
    to: "order-req",
    icon: <CIcon icon={cibClockify} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Accepeted Requests",
    to: "/accept",
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Energy Records",
    to: "/energy-cons",
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
];

export { _consnav, _prodnav };
